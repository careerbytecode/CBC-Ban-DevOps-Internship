#### Week 3 Assignment

######## Instructions

- Answer all questions in your own words.
- **Build every resource live in your own Azure account** — this is a hands-on week.
- **Screenshots are mandatory** for every practical question.
- Submit your work in PDF or Markdown format.
- Upload your YAML files, Dockerfiles, and screenshots to your GitHub repository.

> 💳 **Cloud cost warning:** VMs, Bastion, AKS and Public IPs are **billable**. Keep everything in **one resource group** and delete it after every lab: `az group delete --name <your-rg> --yes --no-wait`.

---

######## Questions

#### Q1.
What is the difference between a **Resource Group**, a **Virtual Network**, and a **Subnet**? Explain with a simple analogy.

#### Answer

#### Before We Start - What is Azure?

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

#### Analogy

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

#### Definitions

######## 1. Resource Group

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

######## 2. Virtual Network (VNet)

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

######## 3. Subnet

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

#### Diagram



<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/17beda92-0ab6-4212-8590-8b2ced6bc41c" />



---

#### How They Work Together

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

#### Example

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

#### Comparison Table

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

#### Common Questions

#### Can a Resource Group have multiple VNets?

✅ Yes.

---

#### Can a VNet have multiple subnets?

✅ Yes.

---

#### Can a subnet exist without a VNet?

❌ No.

---

#### Can a VM exist without a subnet?

❌ No.

---

#### Can a Resource Group contain many different resources?

✅ Yes.



#### Q2.
What is the difference between `10.0.0.0/16` and `10.0.1.0/24`? Explain how many addresses each provides and when you would use them.

#### Answer

#### Step 1: Why do we even need IP addresses?

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

#### Step 2: What is a CIDR Block?

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

#### Step 3: Analogy

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

#### Benefits:

- **Security** - a breach in one subnet doesn't automatically spread to others
- **Performance** - less broadcast traffic (devices stop shouting to the entire network)
- **Organization** - HR team on one subnet, Engineering on another, Database servers on another
- **Control** - apply different firewall rules per subnet

> On AWS, this is exactly why you have **public subnets** (for web servers) and **private subnets** (for databases) inside a VPC.

---

#### Step 4: Real-Life Analogy

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

#### Step 5: Visual Diagram

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

#### Step 6: How Many IP Addresses?

######## A. `10.0.0.0/16`

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

######## B. `10.0.1.0/24`

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

#### Step 7: Azure Special Rule

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

#### Step 8: Where Would You Use Them?

######## Use `/16` when:

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

######## Use `/24` when:

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

#### Step 9: Relationship Between `/16` and `/24`

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

#### Step 10: Comparison Table

| Feature                    | `10.0.0.0/16`                                  | `10.0.1.0/24`                                            |
| -------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| Network Size               | Large                                          | Small                                                    |
| Total IP Addresses         | 65,536                                         | 256                                                      |
| Usable IPs in Azure        | Depends on subnets; each subnet reserves 5 IPs | 251 usable (256 total − 5 reserved by Azure)             |
| Best For                   | Large production VNet                          | Single subnet, labs, testing                             |
| Future Expansion           | Excellent                                      | Limited                                                  |
| Contains Multiple Subnets? | Yes                                            | No (it's already a subnet-sized network in most designs) |

---

#### Step 11: Remember

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

#### Common Questions

#### Can you create multiple `/24` subnets inside one `/16` VNet?

✅ Yes.

#### Is `/16` larger than `/24`?

✅ Yes.

#### Which provides more IP addresses?

✅ `/16`

#### Does Azure reserve some IP addresses?

✅ Yes, Azure reserves **5 IP addresses in every subnet**.

#### What is CIDR?
✅ Classless Inter-Domain Routing (CIDR) is a compact way to write IP address ranges and their network masks.

#### Why is CIDR notation useful?
✅ It lets network engineers allocate address space precisely, aggregate routes and keep routing tables smaller.

#### How is an IP address structured?
✅ An IPv4 address consists of four 8-bit numbers (octets) ranging from 0 to 255, separated by dots.

#### What does the number after the slash mean?
✅ The slash value (e.g. /24) shows how many bits belong to the network prefix; the rest identify individual hosts.

#### Refernce:
- https://echoflare.ca/tools/subnet-calculator/
- https://cidr.xyz/


#### Q3.
Create a VNet and subnet in the Azure portal, then attach screenshots showing both.

#### Answer

#### Before We Start

Remember what we learned?

<img width="452" height="480" alt="image" src="https://github.com/user-attachments/assets/8c365ad8-0143-4f4b-bfb7-5b4854e83f05" />


Azure will ask you to create them in this order.

---

#### Analogy

Imagine your mom says:

> "We're building a new house."

First, you buy land.

```text
Land
```

Then you build the house.

```text
House
```

Then you divide the house into rooms.

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

#### Step 1: Sign in to Azure

Open your browser and go to:

**[https://portal.azure.com](https://portal.azure.com)**

Log in with your Azure account.

You'll see the Azure Portal dashboard.

<img width="1608" height="990" alt="image" src="https://github.com/user-attachments/assets/684c87fc-067e-43c0-b29b-52e286f28114" />


---

#### Step 2: Create a Resource Group

######## Why?

Azure needs a place to keep all your resources together.

Think of it as creating a folder before saving files.

#### Click

```text
☰ Menu

↓

Resource Groups

↓

Create
```
<img width="1182" height="1176" alt="image" src="https://github.com/user-attachments/assets/c36667f2-572f-466f-a033-c8cf970eab65" />




---

#### Fill these values

| Field               | Value                                                  |
| ------------------- | ------------------------------------------------------ |
| Subscription        | Your Azure Subscription                                |
| Resource Group Name | `week3-rg`                                             |
| Region              | East US (or the same region you'll use for everything) |

> 💡 **Important:** Use the **same region** for all resources in this assignment to avoid compatibility issues.

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

#### Step 3: Create a Virtual Network (VNet)

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

#### Basics Tab

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

#### Step 4: Configure IP Addresses

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

Now you'll see a subnet.

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

So now your network looks like this:

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

#### What Just Happened?

You created:

```text
week3-rg
        │
        ▼
week3-vnet
        │
        ▼
frontend-subnet
```

This is the foundation for almost every Azure network.

---

#### Step 5: Verify the VNet

Go to:

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

---

Click:

```text
Subnets
```

You should see:

```text
frontend-subnet

10.0.1.0/24
```

Congratulations! 🎉

You've successfully created your first Azure network.


---

#### Diagram

<img width="1122" height="1402" alt="image" src="https://github.com/user-attachments/assets/597e954d-329b-4b13-ab8e-90cb5fd67201" />


---

#### Why Do We Create a `/16` VNet?

Because later we can create more subnets:

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

All of them fit inside:

```text
10.0.0.0/16
```

This is why companies usually create a **larger VNet** and then divide it into **smaller subnets**.

---

#### Common Beginner Mistakes

❌ Creating the VNet in one region and the VM in another.

✔ Always use the same region.

---

❌ Creating a `/24` VNet.

✔ Use `/16` for the VNet and `/24` for the subnet unless the assignment specifies otherwise.

---

❌ Creating resources in different Resource Groups.

✔ Keep everything in **`week3-rg`**.

This also makes cleanup easy:

```bash
az group delete --name week3-rg --yes --no-wait
```

Deleting the Resource Group deletes everything inside it.



> A Virtual Network (VNet) is the private network where Azure resources communicate securely. A subnet is a smaller section of the VNet used to organize resources based on their role, such as frontend or backend. In this lab, I created a VNet with the address space `10.0.0.0/16` and a subnet with the address range `10.0.1.0/24`. This design provides room for future expansion while keeping workloads organized.

---

#### Q4.
What is the difference between a **private IP** and a **public IP**? Can a VM work without a public IP? Explain.

#### Answer

Excellent! Now we're getting into networking, which is the heart of Azure.

#### Q4. What is the difference between a Private IP and a Public IP? Can a VM work without a Public IP? Explain.

This is a very common interview question, and you'll use this knowledge in **Q5, Q7, Q10, and Q11**.

---

#### Step 1: What is an IP Address?

Think of an IP address as a **home address**.

If someone wants to send you a letter, they need your address.

Similarly, if one computer wants to communicate with another, it needs its IP address.

Example:

```text
VM
↓

10.0.1.4
```

This is the VM's address.

---

#### Step 2: Two Types of IP Addresses

There are **two main types**:

1. Private IP
2. Public IP

---

#### Kid Analogy 👶

Imagine you live in an apartment.

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

#### Real-Life Example

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

#### What is a Private IP?

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

#### ASCII Diagram

```text
Internet

❌ Cannot see

10.0.1.4

10.0.1.5
```

Only devices inside the VNet can access them.

---

#### What is a Public IP?

A Public IP is visible on the internet.

Example:

```text
20.120.50.10
```

Anyone who knows this IP can try to connect (subject to security rules like an NSG).

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

The Public IP is like the **front gate**, and the Private IP is like the **room number inside the building**.

---

#### Can a VM Work Without a Public IP?

**Yes! Absolutely.**

This surprises many beginners.

A VM **does not need** a Public IP to run.

It can still:

* Boot successfully
* Communicate with other VMs in the same VNet
* Connect to Azure services (depending on networking setup)
* Be managed using services like Azure Bastion

The only thing you **cannot** do is connect to it **directly from the internet**.

---

#### Example 1: VM with Public IP

```text
Your Laptop

↓

Internet

↓

Public IP

↓

VM
```

You can SSH directly (if port 22 is allowed).

---

#### Example 2: VM without Public IP

```text
Your Laptop

↓

Internet

↓

Azure Bastion

↓

VM

Private IP Only
```

The VM is still running, but it isn't exposed to the internet.

This is considered **more secure**.

---

#### Comparison Table

| Feature                        | Private IP                                        | Public IP                                |
| ------------------------------ | ------------------------------------------------- | ---------------------------------------- |
| Visible on Internet?           | ❌ No                                              | ✅ Yes                                    |
| Used Inside VNet?              | ✅ Yes                                             | ❌ No                                     |
| Can Internet connect directly? | ❌ No                                              | ✅ Yes (if allowed by NSG)                |
| More Secure?                   | ✅ Yes                                             | Less secure because it's internet-facing |
| Changes?                       | Usually stays with the VM's network configuration | Can be Static or Dynamic                 |
| Example                        | `10.0.1.4`                                        | `20.x.x.x`                               |

---

#### Real Company Example

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

↓

Public IP

↓

Web Server

↓

Private IP

↓

Database
```

This is a common production design.

---

#### Why Not Give Every VM a Public IP?

Imagine every room in your house had its own front door opening directly to the street.

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

#### Common Beginner Mistakes

❌ Thinking a VM needs a Public IP to run.

✔ It only needs a Public IP if you want direct internet access.

---

❌ Thinking a Private IP is accessible from home.

✔ A Private IP is only reachable within its network (or through configured private connectivity).

---

❌ Thinking a Public IP automatically allows login.

✔ You also need an NSG rule permitting the traffic and the appropriate service (such as SSH) running.

---

#### Interview Answer

> A Private IP is used for communication within an Azure Virtual Network and is not accessible from the internet. A Public IP is internet-routable and allows external users to connect to Azure resources, provided security rules permit it. A virtual machine can work without a Public IP because it can still communicate within the VNet and can be accessed securely using services like Azure Bastion. In production, many organizations keep application and database servers on Private IPs to reduce internet exposure.

---

#### Quick Revision

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

######## What's Next? (Q5)

In the next lab, you'll:

* Create a VM
* **Keep all inbound ports closed**
* Try to SSH into it
* See why the connection fails
* Learn the difference between:

  * **Connection timed out**
  * **Connection refused**

This is one of the most practical networking troubleshooting exercises you'll encounter in Azure.



---

#### Q5.
Create a VM with no inbound ports open and attempt to SSH. Explain the difference between a **"connection timed out"** error and a **"connection refused"** error, and which one you received.

#### Answer

Perfect! Now we reach your **first real networking troubleshooting lab**. This question is very important because interviewers often ask about these errors.

---

#### Q5. Create a VM with no inbound ports open and attempt to SSH. Explain the difference between a "connection timed out" error and a "connection refused" error, and which one you received.

This question teaches you:

* How to create your first Azure VM
* What SSH is
* What "No inbound ports" means
* Why the connection fails
* The difference between **Timed Out** and **Connection Refused**

---

#### Step 1: What is a Virtual Machine (VM)?

Imagine you buy a new laptop.

It has:

* CPU
* RAM
* Hard Disk
* Operating System

A Virtual Machine is exactly the same, except it runs inside Microsoft's datacenter instead of your house.

Think of it as:

```text
Your Laptop
        =
Azure Virtual Machine
```

---

#### Step 2: What is SSH?

SSH stands for **Secure Shell**.

It lets you control a Linux machine remotely.

Imagine your computer is in another city.

Instead of traveling there, you type commands from your own laptop.

That's SSH.

---

#### Kid Analogy 👶

Imagine your friend lives in another apartment.

You want to visit.

There is one main door.

If the door is locked...

You cannot enter.

SSH is like knocking on that door.

Port **22** is the door used for SSH.

---

#### Step 3: What is a Port?

Think of a house.

```text
House

🚪 Front Door

🚪 Back Door

🚪 Garage Door
```

Each door has a purpose.

Computers also have doors.

These are called **Ports**.

Common ports:

| Port | Purpose                  |
| ---- | ------------------------ |
| 22   | SSH (Linux Remote Login) |
| 80   | HTTP Website             |
| 443  | HTTPS Secure Website     |

---

#### Step 4: What Does "No Inbound Ports Open" Mean?

Imagine your house.

```text
All Doors Locked
```

Nobody can enter.

Azure does the same.

When you choose:

```text
No Inbound Ports
```

Azure does **not** allow traffic from the internet.

Even if your VM is running...

Nobody can connect.

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

Connection fails.

---

#### Step 5: Practical Lab

######## Create a VM

Go to:

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

Fill these values:

| Field          | Value                                                          |
| -------------- | -------------------------------------------------------------- |
| Resource Group | week3-rg                                                       |
| VM Name        | week3-vm                                                       |
| Region         | Same as VNet                                                   |
| Image          | Ubuntu Server 24.04 LTS (or latest Ubuntu LTS available)       |
| Size           | Standard B1s (or the free/low-cost option available)           |
| Authentication | SSH Public Key (recommended) or Password if your lab allows it |

---

#### Networking Tab

Select:

| Field           | Value           |
| --------------- | --------------- |
| Virtual Network | week3-vnet      |
| Subnet          | frontend-subnet |

Now look carefully.

You'll see:

```text
Public Inbound Ports
```

Choose:

```text
None
```

This is the most important step.

It means Azure will **not** create an NSG rule allowing SSH.

Click:

```text
Review + Create

↓

Create
```

Wait until deployment completes.

---

#### Step 6: Try SSH

After the VM is created:

Open:

```text
VM

↓

Overview
```

If the VM has a Public IP, note it.

From your terminal:

```bash
ssh azureuser@<public-ip>
```

Example:

```bash
ssh azureuser@20.120.xxx.xxx
```

---

#### What Happens?

Most likely you'll see:

```text
Connection timed out
```

---

#### Why?

Let's see what happens.

```text
Laptop

↓

Internet

↓

Azure Network

↓

NSG

❌ Stop

↓

VM
```

The traffic never reaches the VM.

The firewall silently drops the packets.

So your laptop waits...

and waits...

and waits...

until it gives up.

Hence:

```text
Connection timed out
```

---

#### What is "Connection Timed Out"?

Imagine calling your friend.

Phone keeps ringing.

Nobody answers.

Eventually:

```text
Call Ended
```

That's exactly what happens.

Your computer never receives any response.

---

#### ASCII

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

---

#### What is "Connection Refused"?

Now imagine the house door is open.

You knock.

Friend opens the door and says:

> "Sorry, you can't come in."

You got a response.

It was:

"No."

---

In networking:

```text
Laptop

↓

VM

↓

"I received your request."

↓

"But SSH service isn't accepting connections."

↓

Connection Refused
```

The request reached the machine, but the service or port isn't available.

---

#### ASCII Comparison

######## Timed Out

```text
Laptop

↓

Internet

↓

❌ Firewall

↓

VM Never Receives Request
```

---

######## Refused

```text
Laptop

↓

Internet

↓

VM

↓

SSH Service Rejects Connection
```

---

#### Comparison Table

| Feature             | Connection Timed Out                    | Connection Refused                             |
| ------------------- | --------------------------------------- | ---------------------------------------------- |
| Request reaches VM? | ❌ No                                    | ✅ Yes                                          |
| Usually caused by   | Firewall / NSG / Route blocking traffic | Service not listening or port closed on the VM |
| Wait Time           | Long                                    | Immediate                                      |
| Did VM reply?       | ❌ No                                    | ✅ Yes                                          |
| Common Azure Cause  | Port 22 blocked by NSG                  | SSH service stopped or misconfigured           |

---

#### Which Error Will You Get?

Because the assignment says:

> Create VM with **No Inbound Ports Open**

The expected result is usually:

```text
Connection timed out
```

Reason:

Port 22 is blocked by the Network Security Group (NSG), so your SSH request never reaches the VM.

---

#### Screenshot for Assignment

Take screenshots of:

1. VM Overview
2. Networking page showing **No inbound rule for port 22**
3. Your terminal showing the SSH failure (for example, **Connection timed out**)

---

#### Common Beginner Mistakes

❌ Thinking the VM is broken.

✔ The VM is running; only the network is blocking access.

---

❌ Thinking SSH always works if a VM has a Public IP.

✔ A Public IP alone is not enough. Port 22 must also be allowed by the NSG, and the SSH service must be available on the VM.

---

❌ Confusing "Timed Out" and "Refused."

Remember:

```text
Timed Out

↓

Nobody answered
```

```text
Refused

↓

Someone answered

But said NO
```

---

#### Interview Answer

> A connection timed out error means the SSH request never reached the virtual machine, usually because a firewall or Network Security Group blocked the traffic. A connection refused error means the request successfully reached the VM, but the SSH service was not accepting connections on port 22. In this lab, I created a VM with no inbound ports open, so the SSH request was blocked by the NSG and I received a connection timed out error.

---

#### Quick Revision

```text
No Inbound Port

↓

NSG blocks SSH

↓

Request never reaches VM

↓

Connection Timed Out
```

```text
Port Open

↓

VM receives request

↓

SSH service unavailable

↓

Connection Refused
```

---

######## Next (Q6)

In **Q6**, you'll learn one of the most confusing Azure topics:

* **Network Security Group (NSG)** vs **Route Table**
* Why they are completely different
* Easy analogies
* ASCII diagrams
* Real-world examples
* A comparison table that is perfect for interviews and your assignment.


---


#### Q6.
What is the difference between a **Network Security Group (NSG)** and a **Route Table**? Compare them in a table covering purpose, what they act on, and what they attach to.

#### Answer

Awesome! This is one of the **most asked Azure interview questions**. Many beginners think an **NSG** and a **Route Table** do the same thing because both affect network traffic—but they have completely different jobs.

---

#### Q6. What is the difference between a Network Security Group (NSG) and a Route Table?

The assignment asks you to compare:

* Purpose
* What they act on
* What they attach to

We'll understand **why both are needed**.

---

#### Step 1: Imagine a City 🚗

Suppose you're driving to a shopping mall.

Two things happen:

#### First

Google Maps tells you:

> "Take Highway A."

This is **Routing**.

It decides **which road** to take.

---

#### Second

When you reach the mall gate,

The security guard asks:

> "Who are you?"

If you're allowed,

✅ Enter

Otherwise,

❌ Go back.

This is **Security**.

---

Azure works exactly the same way.

```text
Route Table

↓

Which road should the traffic take?

↓

NSG

↓

Should I allow this traffic?
```

---

#### Kid Analogy 👶

Imagine your school.

You want to visit the Principal.

First,

The teacher tells you:

```text
Go

↓

Left

↓

Second Floor

↓

Room 205
```

This is the **Route Table**.

It tells you **where to go**.

---

When you reach Room 205,

The security guard asks:

```text
Do you have permission?
```

This is the **NSG**.

---

#### Real-Life Example

Airport

Step 1

Signs tell you:

```text
Gate A

↓

Immigration

↓

Security Check

↓

Boarding
```

These signs are the **Route Table**.

---

Step 2

Security officer checks your passport.

Allowed?

```text
Yes

↓

Proceed
```

No?

```text
Stop
```

That's the **NSG**.

---

#### What is a Route Table?

A Route Table tells Azure:

> **Where should network traffic go?**

Example:

A VM wants to send traffic to the Internet.

Route Table says:

```text
Destination

Internet

↓

Go to

Internet Gateway
```

Another example:

Traffic should go to a Firewall.

```text
VM

↓

Firewall

↓

Internet
```

The Route Table tells Azure to send traffic through the firewall first.

---

#### What is an NSG?

NSG stands for **Network Security Group**.

It is basically a firewall.

It decides:

> **Allow or Block?**

Example:

```text
Port 22

↓

Allow
```

```text
Port 3389

↓

Block
```

```text
Port 80

↓

Allow
```

It doesn't change the path.

It only decides whether traffic is allowed.

---

#### ASCII Diagram

```text
Laptop
   │
   ▼
Internet
   │
   ▼
Route Table
"Which way?"
   │
   ▼
NSG
"Allowed?"
   │
   ▼
VM
```

Notice:

The Route Table **doesn't block traffic**.

The NSG **doesn't choose roads**.

---

#### Another Example

Suppose your VM wants to reach the Internet.

#### Route Table

```text
VM

↓

Internet
```

Simple.

---

Suppose company policy says:

"Everything must go through a firewall."

Now the Route Table becomes:

```text
VM

↓

Firewall

↓

Internet
```

The Route Table changed the path.

---

Now the firewall (or NSG) says:

```text
Port 80

Allow

Port 22

Block
```

Different job.

---

#### Think Like Water 💧

Imagine water flowing in pipes.

Route Table

```text
Water

↓

Which pipe?
```

NSG

```text
Valve

↓

Open?

Closed?
```

---

#### Comparison Table (Perfect for Assignment)

| Feature               | Network Security Group (NSG)              | Route Table                             |
| --------------------- | ----------------------------------------- | --------------------------------------- |
| Purpose               | Controls (allows/denies) network traffic  | Decides where network traffic should go |
| Works Like            | Firewall / Security Guard                 | GPS / Road Map                          |
| Main Job              | Allow or Block                            | Choose the path                         |
| Acts On               | IP addresses, ports, protocols, direction | Destination IP address and next hop     |
| Attached To           | Subnet or Network Interface (NIC)         | Subnet (typically)                      |
| Changes Traffic Path? | ❌ No                                      | ✅ Yes                                   |
| Blocks Traffic?       | ✅ Yes                                     | ❌ No                                    |

---

#### Easy Memory Trick

######## NSG

Think:

```text
N

↓

No
```

It can say:

```text
Allow

OR

Deny
```

---

######## Route Table

Think:

```text
Road

↓

Direction
```

It tells traffic:

```text
Go Left

Go Right

Go Firewall

Go Internet
```

---

#### Azure Example

Imagine this setup:

```text
Internet

↓

Public IP

↓

VM
```

Without an NSG,

Anyone could try to connect.

Add an NSG:

```text
Port 22

Allow

Port 80

Allow

Port 3389

Block
```

Now only approved traffic enters.

---

Now imagine company policy says:

"No VM should directly access the Internet."

The Route Table changes to:

```text
VM

↓

Azure Firewall

↓

Internet
```

The Route Table decides the path.

The NSG still decides whether to allow or deny traffic.

---

#### Common Beginner Mistakes

❌ "Route Table blocks traffic."

No.

It only chooses the next path.

---

❌ "NSG decides where traffic goes."

No.

It only allows or blocks traffic.

---

❌ "Both are the same."

Definitely not.

They solve different problems.

---

#### Interview Answer (2 Minutes)

> A Network Security Group (NSG) is a virtual firewall that controls network traffic by allowing or denying connections based on rules such as source, destination, port, and protocol. A Route Table does not filter traffic. Instead, it determines the path that traffic should take by defining the next hop, such as the Internet, a virtual appliance, or another network. In simple terms, the Route Table decides **where traffic goes**, while the NSG decides **whether the traffic is allowed**.

---

#### Visual Summary

```text
Traffic Starts

      │

      ▼

+------------------+

 Route Table

"Where should it go?"

+------------------+

      │

      ▼

+------------------+

      NSG

"Allow or Block?"

+------------------+

      │

      ▼

      VM
```

---

#### What Happens Next? (Q7)

Now you'll **use an NSG in practice**.

You'll:

* Open **Port 22**
* Test SSH
* Open **Port 80**
* Host a web page
* Open **Port 443**
* Understand HTTPS

You'll also learn **why we open one port at a time** and what each port actually enables, with screenshots for your assignment. This lab will make the theory from Q4, Q5, and Q6 come together.


---


#### Q7.
Open ports 22, 80 and 443 one at a time, documenting what became possible after each. Attach screenshots.

#### Answer

Excellent! 🎉 This is where you'll **actually see the effect of opening ports**. By the end of this lab, you'll understand **why port 22, 80, and 443 exist** and what each one allows.

---

#### Q7. Open ports 22, 80, and 443 one at a time, documenting what became possible after each. Attach screenshots.

######## What is the goal?

The assignment is **not** asking you to open all ports at once.

It wants you to:

1. Open **Port 22** → Test what changed.
2. Open **Port 80** → Test what changed.
3. Open **Port 443** → Test what changed.

This helps you understand the purpose of each port.

---

#### Step 1: Remember the House Analogy 🏠

Imagine your house has three doors.

```text
Door 1 → Friend
Door 2 → Delivery Person
Door 3 → Family
```

Each door has a different purpose.

A computer also has many "doors."

These doors are called **Ports**.

---

#### What is a Port?

A port is simply a **number used by a service**.

Think of it like an apartment number.

```
Building

Apartment 22

Apartment 80

Apartment 443
```

Each apartment has different people.

Similarly,

```
Port 22

↓

SSH
```

```
Port 80

↓

HTTP Website
```

```
Port 443

↓

HTTPS Secure Website
```

---

#### Step 2: Current Situation

Right now your VM looks like this.

```text
Internet

↓

Azure

↓

NSG

↓

VM

All Ports Closed
```

Nobody can connect.

---

#### PART A — Open Port 22

######## Why?

Port 22 is used for **SSH**.

SSH allows you to control a Linux VM remotely.

---

######## Analogy

Imagine your house has only one door.

Your parents give you the key.

Now you can enter.

SSH is that key.

---

######## How to Open Port 22

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

You'll see the NSG rules.

Click:

```
Add Inbound Rule
```

Fill:

| Field            | Value                                    |
| ---------------- | ---------------------------------------- |
| Source           | My IP Address (recommended for security) |
| Source Port      | *                                        |
| Destination      | Any                                      |
| Service          | SSH                                      |
| Destination Port | 22                                       |
| Action           | Allow                                    |
| Priority         | 300 (or Azure default if available)      |
| Name             | Allow-SSH                                |

Click:

```
Add
```

---

#### Test SSH

From your terminal:

```bash
ssh azureuser@<Public-IP>
```

Example:

```bash
ssh azureuser@20.xxx.xxx.xxx
```

If everything is correct:

```
Welcome to Ubuntu...
```

🎉 You are inside the VM!

---

#### What Became Possible?

Before:

❌ Could not log into the VM.

After:

✅ Can remotely manage the Linux VM.

---

#### Screenshot

Take:

* NSG rule showing Port 22
* Terminal showing successful SSH login

---

#### PART B — Open Port 80

######## What is Port 80?

Port 80 is used for **HTTP** websites.

Without Port 80,

Nobody can open your website.

---

######## Real-Life Example

Imagine opening a restaurant.

People know your address.

But the entrance is locked.

No customers.

Opening Port 80 is like unlocking the restaurant entrance.

---

#### What Should We Do?

First, SSH into the VM.

Then install Apache.

```bash
sudo apt update
```

```bash
sudo apt install apache2 -y
```

Start Apache if needed:

```bash
sudo systemctl enable apache2
sudo systemctl start apache2
```

Check:

```bash
systemctl status apache2
```

It should show:

```
active (running)
```

---

######## Open Port 80

Go to:

```
Networking

↓

Add Inbound Rule
```

Choose:

| Field   | Value |
| ------- | ----- |
| Service | HTTP  |
| Port    | 80    |
| Action  | Allow |

Click:

```
Add
```

---

######## Test

Open browser.

```
http://<Public-IP>
```

Example

```
http://20.xxx.xxx.xxx
```

You should see

```
Apache2 Ubuntu Default Page
```

🎉 Your website is live!

---

#### What Became Possible?

Before:

❌ Browser could not access the website.

After:

✅ Anyone allowed by your NSG can open your website over HTTP.

---

#### Screenshot

Take:

* Browser showing Apache page
* NSG rule showing Port 80

---

#### PART C — Open Port 443

######## What is Port 443?

Port 443 is used for

**HTTPS**

The **S** means **Secure**.

It encrypts traffic between the browser and the server.

---

######## Analogy

Suppose you send a postcard.

Everyone can read it.

That's HTTP.

Now imagine putting the letter inside a locked envelope.

Only the receiver can open it.

That's HTTPS.

---

#### Open Port 443

Go to

```
Networking

↓

Add Inbound Rule
```

Choose:

| Field   | Value |
| ------- | ----- |
| Service | HTTPS |
| Port    | 443   |
| Action  | Allow |

Click:

```
Add
```

---

######## Important Note

Opening Port 443 **does not automatically make your website secure**.

You also need:

* An SSL/TLS certificate
* Web server configuration for HTTPS

Without those, opening the port alone won't give you a working HTTPS site.

For this assignment, they only asked you to **open the port and document what it enables**.

---

#### What Became Possible?

Before:

No HTTPS traffic could reach the VM.

After:

The VM can accept HTTPS connections **once a valid certificate and HTTPS configuration are added**.

---

#### ASCII Diagram

######## Initially

```text
Internet

↓

NSG

❌22

❌80

❌443

↓

VM
```

---

######## After Opening 22

```text
Internet

↓

22 ✅

80 ❌

443 ❌

↓

VM

SSH Works
```

---

######## After Opening 80

```text
Internet

↓

22 ✅

80 ✅

443 ❌

↓

VM

SSH + Website
```

---

######## After Opening 443

```text
Internet

↓

22 ✅

80 ✅

443 ✅

↓

VM

SSH

HTTP

HTTPS (after SSL/TLS configuration)
```

---

#### Comparison Table

| Port | Service | What Became Possible?                                         |
| ---- | ------- | ------------------------------------------------------------- |
| 22   | SSH     | Remote login and administration of the Linux VM               |
| 80   | HTTP    | Users can access the website over HTTP                        |
| 443  | HTTPS   | Secure web traffic becomes possible after configuring SSL/TLS |

---

#### Common Beginner Mistakes

❌ Opening Port 80 but forgetting to install Apache.

Result:

Website won't load.

---

❌ Opening Port 22 but using the wrong username.

SSH fails.

Ubuntu images often use the username you created during VM setup.

---

❌ Thinking opening Port 443 automatically enables HTTPS.

No.

You still need an SSL/TLS certificate and web server configuration.

---

#### Interview Answer

> Port 22 is used for SSH and allows secure remote administration of a Linux virtual machine. Port 80 is used for HTTP and allows users to access a website over the internet. Port 443 is used for HTTPS and enables encrypted web communication once SSL/TLS is configured. In my lab, opening Port 22 allowed me to log into the VM, opening Port 80 made the Apache web page accessible, and opening Port 443 prepared the VM to accept secure HTTPS traffic after certificate configuration.

---

#### 📸 Screenshots to Include

1. NSG rule showing **Port 22**.
2. Successful SSH terminal session.
3. NSG rule showing **Port 80**.
4. Browser displaying the Apache default page.
5. NSG rule showing **Port 443**.

---

######## Before We Move to Q8

A small but important security tip:

For **Port 22 (SSH)**, **don't use `Any` as the source** if you don't have to.

Use **`My IP Address`** instead.

Why?

Because using `Any` means **any computer on the internet can attempt to connect** to your VM, while `My IP Address` restricts SSH access to **only your current public IP**.

Q8 is all about these source options (`Any`, `My IP Address`, and `Service Tag`), so this tip will make perfect sense in the next lesson.


---


#### Q8.
What is the difference between the NSG source options **Any**, **My IP address**, and **Service Tag**? Which is safest for SSH and why?

#### Answer

Awesome! ⭐ Q8 is a very important **security** question. If Q7 taught you **how to open a door**, Q8 teaches you **who should be allowed through that door**.

---

#### Q8. What is the difference between the NSG source options **Any**, **My IP Address**, and **Service Tag**? Which is safest for SSH and why?

Before we answer, let's understand one thing.

######## What is "Source"?

Imagine someone rings your doorbell.

The first question you ask is:

> **"Who is outside?"**

That person is the **source**.

In networking:

```text
Source  ------------->  Destination

Your Laptop  ------->  Azure VM
```

* **Source** = Where the traffic is coming from.
* **Destination** = Where the traffic is going.

---

#### Kid Analogy 👶

Imagine your house.

Someone knocks on your door.

There are three ways you can decide who can enter.

#### Option 1

You say:

> "Anyone can come inside."

That's **Any**.

---

#### Option 2

You say:

> "Only my best friend Rahul can enter."

That's **My IP Address**.

---

#### Option 3

You say:

> "Only the school bus driver can enter."

That's **Service Tag**.

---

#### What is "Any"?

When you choose:

```text
Source

↓

Any
```

Azure understands:

> Allow traffic from **every IP address on the Internet**.

Example:

```text
India ✅

USA ✅

Japan ✅

Australia ✅

Everyone ✅
```

---

######## ASCII Diagram

```text
Internet

Laptop A ✅

Laptop B ✅

Laptop C ✅

Laptop D ✅

        │

        ▼

Azure VM
```

Everyone is allowed to try connecting.

---

######## Is it Safe?

❌ No.

Because attackers from anywhere in the world can try to connect.

Even if they don't know your password, they can still attempt login.

---

#### What is "My IP Address"?

Azure automatically detects your current public IP.

Example:

```text
Your Laptop

↓

49.xx.xx.xx
```

Azure creates a rule like:

```text
Allow

Source

49.xx.xx.xx
```

Only **your laptop** can connect.

---

######## ASCII Diagram

```text
Your Laptop ✅

Friend's Laptop ❌

Random Hacker ❌

Office PC ❌

        │

        ▼

Azure VM
```

Only you are allowed.

---

######## Is it Safe?

✅ Yes.

This is the recommended option for SSH during development and learning.

---

#### What is a Service Tag?

This confuses many beginners.

A **Service Tag** is **not a person**.

It represents a **group of Microsoft-managed IP addresses**.

Instead of writing hundreds of IPs manually...

Azure gives them a name.

Example:

```text
AzureLoadBalancer
```

or

```text
VirtualNetwork
```

or

```text
AzureCloud
```

These are **Service Tags**.

---

#### Kid Analogy 👶

Imagine your school.

Instead of writing every teacher's name,

The principal says:

```text
Teachers
```

That one word includes all teachers.

Similarly,

```text
AzureLoadBalancer
```

includes all IP addresses used by Azure Load Balancer.

---

#### Real Azure Example

Suppose Azure Load Balancer needs to check if your VM is healthy.

Instead of allowing thousands of Azure IPs,

You simply choose:

```text
Source

↓

Service Tag

↓

AzureLoadBalancer
```

Done!

Azure manages the list for you.

---

#### Another Example

Suppose two VMs are inside the same VNet.

Instead of typing all private IP addresses,

Choose:

```text
VirtualNetwork
```

Now every resource inside that VNet is allowed.

---

#### ASCII Diagram

```text
Azure

VM1

VM2

VM3

VM4

↓

VirtualNetwork

↓

NSG

↓

VM5
```

No need to list each IP individually.

---

#### Comparison Table

| Source Option     | Who Can Connect?                        | Typical Use                                          | Security                              |
| ----------------- | --------------------------------------- | ---------------------------------------------------- | ------------------------------------- |
| **Any**           | Anyone on the internet                  | Public websites (HTTP/HTTPS)                         | ❌ Lowest                              |
| **My IP Address** | Only your current public IP             | SSH or RDP during administration                     | ✅ Highest for individual admin access |
| **Service Tag**   | Azure services or a defined Azure group | Azure Load Balancer, Virtual Network, Azure services | ✅ Secure when used appropriately      |

---

#### Which is Safest for SSH?

The answer is:

######## ✅ My IP Address

Why?

Because only **your computer** is allowed to attempt an SSH connection.

Everyone else is blocked.

---

######## Why Not "Any"?

Imagine your home.

```text
Door Open

↓

Everyone Can Knock
```

Not a good idea.

On the internet,

Millions of automated bots continuously scan for machines with SSH (Port 22) open.

If you allow **Any**,

They can all attempt to connect.

---

#### Why Not Service Tag?

Service Tags are designed for **Azure services**, not for your personal laptop.

Your laptop is **not** an Azure Service Tag.

So Service Tags are generally **not used for SSH from your home computer**.

---

#### Real Company Example

A company has 500 employees.

Developers need SSH access.

Instead of allowing:

```text
Any
```

The company allows only:

```text
Office Public IP

or

VPN Public IP
```

This greatly improves security.

---

#### Common Beginner Mistakes

❌ Using **Any** for SSH because it's easier.

✔ Use **My IP Address** whenever possible.

---

❌ Thinking **Service Tag** means "Microsoft employee."

✔ It represents a **Microsoft-managed group of IP addresses**, not people.

---

❌ Thinking **My IP Address** never changes.

✔ If you're using a home internet connection or mobile hotspot, your public IP can change. If it changes, you may need to update the NSG rule.

---

#### Interview Answer (2 Minutes)

> In an Azure Network Security Group, the Source field defines where incoming traffic is allowed from. **Any** allows traffic from all IP addresses on the internet, which is suitable for public services like web servers but is not recommended for SSH. **My IP Address** automatically uses my current public IP address and restricts access to only my machine, making it the safest option for SSH administration. **Service Tag** represents a Microsoft-managed group of IP addresses, such as Azure Load Balancer or Virtual Network, and is used to securely allow traffic from Azure services without manually maintaining IP address lists.

---

#### Quick Revision

```text
Any

↓

Everyone
```

```text
My IP Address

↓

Only Me
```

```text
Service Tag

↓

Azure Services
```

---

#### Easy Memory Trick

Think of your phone contacts.

```text
Any

↓

Answer every unknown call
```

```text
My IP Address

↓

Answer only your mom's number
```

```text
Service Tag

↓

Answer calls from your company's official office number
```

---

#### Assignment Answer (Short Version)

> **Any** allows traffic from any IP address on the internet and is suitable for public services like websites but is not recommended for SSH because it increases the attack surface. **My IP Address** restricts access to my current public IP, making it the safest option for SSH because only my computer can connect. **Service Tag** allows traffic from predefined Azure service IP ranges, such as Azure Load Balancer or Virtual Network, and is mainly used for communication between Azure services rather than direct administrator access.

---

######## 🎯 Next: Q9

Q9 is one of the most practical networking labs.

You'll learn:

* What **System Routes** are
* What **User-Defined Routes (UDRs)** are
* What **Next Hop = None** means
* How to create a UDR in Azure
* Why traffic suddenly stops after applying it
* Exactly which screenshots to capture for your assignment

This is where you'll see Azure routing in action.


---


#### Q9.
What is the difference between a **system route** and a **user-defined route (UDR)**? Create a UDR with next hop **None** and demonstrate its effect. Attach screenshots.

#### Answer

Excellent! ⭐ Q9 is where you actually learn **how Azure decides where network traffic should go**. This builds directly on Q6 (Route Table vs NSG).

Don't worry if "Next Hop = None" sounds confusing right now. By the end, it'll feel simple.

---

#### Q9. What is the difference between a System Route and a User-Defined Route (UDR)? Create a UDR with Next Hop = None and demonstrate its effect.

---

#### Step 1: What is a Route?

Imagine you're going from your house to a shopping mall.

You open Google Maps.

Google Maps says:

```text
Go straight

↓

Turn left

↓

Take Highway

↓

Mall
```

Google Maps is deciding **which road you should take**.

This is called **Routing**.

Azure does exactly the same thing for network traffic.

---

#### Kid Analogy 👶

Imagine your school.

You ask your teacher:

> "How do I go to the library?"

Teacher says:

```text
Classroom

↓

Left

↓

Stairs

↓

Library
```

These directions are called a **Route**.

---

#### Step 2: What is a System Route?

When Azure creates a VNet, it automatically creates routes for you.

You don't have to do anything.

These are called **System Routes**.

Think of them as **Google Maps' default directions**.

---

######## Example

Suppose your VM wants to reach another VM.

```text
VM1

↓

VM2
```

Azure already knows the path.

You never configured anything.

Why?

Because Azure created a **System Route** automatically.

---

#### ASCII Diagram

```text
Azure Creates Automatically

VM1

↓

System Route

↓

VM2
```

No manual work.

---

#### What Can a System Route Do?

It knows things like:

* How to reach the Internet
* How to reach other subnets in the VNet
* How to reach Azure services

Everything works automatically.

---

#### Step 3: What is a User-Defined Route (UDR)?

Now imagine your father says:

> "Don't use the main road."

Instead:

```text
House

↓

Park

↓

Bridge

↓

Mall
```

You changed the route.

This is a **User-Defined Route**.

You are overriding the default path.

---

#### Azure Example

Normally:

```text
VM

↓

Internet
```

Company policy says:

"No direct Internet."

Instead:

```text
VM

↓

Firewall

↓

Internet
```

You created a UDR.

---

#### Difference So Far

System Route

```text
Azure decides
```

User-Defined Route

```text
You decide
```

---

#### Step 4: What is "Next Hop"?

This is the most important concept.

Imagine you're delivering a parcel.

Current location:

```text
House
```

Where should you go next?

Maybe:

```text
Post Office
```

The **next place** is called the **Next Hop**.

Networking works the same way.

Traffic asks:

> "Where should I go next?"

---

#### Example

```text
VM

↓

Next Hop

↓

Internet
```

or

```text
VM

↓

Next Hop

↓

Firewall
```

---

#### Step 5: What does "Next Hop = None" mean?

This sounds strange but it's very simple.

Imagine you're driving.

Google Maps suddenly says:

```text
STOP

Do not continue.
```

That's **Next Hop = None**.

Azure drops the traffic.

It goes nowhere.

---

#### ASCII Diagram

Normal

```text
VM

↓

Internet
```

---

After UDR

```text
VM

↓

None

❌ Traffic Dropped
```

The packet simply stops.

---

#### Real-Life Analogy

Imagine your office.

Normally:

```text
Employee

↓

Reception

↓

Meeting Room
```

Now security says:

```text
Reception

↓

STOP

↓

No Entry
```

Nobody reaches the meeting room.

That's **Next Hop = None**.

---

#### Practical Lab

######## Step 1

Go to Azure Portal.

Search:

```text
Route Tables
```

Click:

```text
Create
```

---

######## Fill Details

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

#### Step 2

Open the Route Table.

Click:

```text
Routes

↓

Add
```

---

Fill:

| Field            | Value          |
| ---------------- | -------------- |
| Route Name       | block-internet |
| Destination Type | IP Addresses   |
| Destination CIDR | `0.0.0.0/0`    |
| Next Hop Type    | None           |

---

######## Why `0.0.0.0/0`?

This means:

> **Every possible IP address**

In other words:

```text
Everything
```

So you're saying:

> "Drop all traffic going anywhere."

---

Click:

```text
Add
```

---

#### Step 3

Associate the Route Table

Click:

```text
Subnets

↓

Associate
```

Choose:

```text
week3-vnet

↓

frontend-subnet
```

Click:

```text
OK
```

Now every VM inside that subnet uses this Route Table.

---

#### Step 4

Test the Effect

SSH into your VM (if you already have SSH access).

Try:

```bash
ping google.com
```

or

```bash
curl https://www.microsoft.com
```

You should notice that internet access no longer works because the UDR is dropping outbound traffic.

---

#### Why Did This Happen?

Normally:

```text
VM

↓

Internet
```

Now:

```text
VM

↓

Route Table

↓

Next Hop = None

↓

❌ Dropped
```

Traffic never reaches the Internet.

---

#### Comparison Table

| Feature          | System Route         | User-Defined Route (UDR)                        |
| ---------------- | -------------------- | ----------------------------------------------- |
| Created By       | Azure                | User                                            |
| Configuration    | Automatic            | Manual                                          |
| Can Be Modified? | No                   | Yes                                             |
| Purpose          | Default routing      | Override default routing                        |
| Typical Use      | Normal communication | Firewall, VPN, traffic control, blocking routes |

---

#### Screenshots for Assignment

Take these screenshots:

1. ✅ Route Table overview
2. ✅ Route showing:

   * Destination: `0.0.0.0/0`
   * Next Hop: **None**
3. ✅ Subnet association
4. ✅ Terminal showing internet access failing (for example, `curl` or `ping` not working)

---

#### Common Beginner Mistakes

❌ Thinking the VM is broken.

✔ The VM is fine. The Route Table is preventing traffic from leaving the subnet.

---

❌ Forgetting to associate the Route Table with the subnet.

✔ Creating the Route Table alone has **no effect**. It must be associated with the subnet.

---

❌ Confusing NSG and UDR.

Remember:

* **NSG** = "Should I allow this traffic?"
* **UDR** = "Where should this traffic go?"

---

#### Easy Memory Trick

Think of a road trip.

```text
System Route

↓

GPS chooses the road automatically
```

```text
User-Defined Route

↓

You change the GPS route
```

```text
Next Hop = None

↓

Road Closed 🚧

No one can pass
```

---

#### Interview Answer

> A System Route is automatically created and managed by Azure to provide default connectivity within a Virtual Network and to external destinations. A User-Defined Route (UDR) is created manually to override Azure's default routing behavior. In this lab, I created a UDR with the destination `0.0.0.0/0` and the next hop set to **None**, then associated it with the subnet. As a result, outbound internet traffic from the VM was dropped because there was no valid next hop for the traffic.

---

#### Visual Summary

```text
Without UDR

VM
 │
 ▼
System Route
 │
 ▼
Internet ✅


With UDR (Next Hop = None)

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

######## 🎯 Next: Q10

Q10 introduces **Azure Bastion**, one of Azure's most important secure access services.

We'll compare:

* **Public IP + Port 22 (SSH)** vs **Azure Bastion**
* A detailed comparison table with more than five points
* Why companies increasingly prefer Bastion over exposing SSH to the internet
* Real-world architecture diagrams and simple analogies.


---


#### Q10.
What is the difference between connecting to a VM using a **public IP with port 22 open** versus using **Azure Bastion**? Compare in a table with at least five points.

#### Answer

Excellent! 🌟 Q10 is one of the most important Azure security concepts. If you understand this, you'll also understand **why Azure Bastion exists** and why companies use it.

---

#### Q10. What is the difference between connecting to a VM using a Public IP with Port 22 open versus using Azure Bastion?

The assignment asks you to compare them in **at least five points**.

Let's first understand the problem.

---

#### Step 1: Imagine Your House 🏠

Suppose you live in a house.

There are two ways your friend can visit.

#### Method 1

You leave your front door open.

Your friend comes directly.

```text
Friend
   │
   ▼
Front Door
   │
   ▼
Your House
```

But...

Anyone walking on the street can also see your door.

---

#### Method 2

Instead of opening your front door,

You tell your friend:

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
Your House
```

This is exactly how **Azure Bastion** works.

---

#### Step 2: Public IP + Port 22

Suppose your VM has:

* Public IP ✅
* Port 22 Open ✅

Architecture:

```text
Your Laptop
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

#### Is This Good?

Yes.

It's simple.

But...

Your VM is visible on the Internet.

Anyone can try connecting to it.

Even if they don't know the password, they can still scan Port 22 and attempt login.

---

#### Step 3: What is Azure Bastion?

Azure Bastion is a **managed service** provided by Microsoft.

It lets you connect to a VM **without giving the VM a Public IP**.

Think of Bastion as a **secure jump server** managed by Azure.

---

#### Kid Analogy 👶

Imagine your school.

Visitors cannot enter classrooms directly.

Instead,

```text
Visitor

↓

Security Office

↓

Visitor Pass

↓

Classroom
```

Azure Bastion is that **Security Office**.

---

#### How Does Bastion Work?

Architecture:

```text
Your Laptop
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

#### Real-World Example

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

#### ASCII Comparison

######## Public IP + SSH

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

######## Azure Bastion

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

#### Why is Bastion More Secure?

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

#### Features of Azure Bastion

Azure Bastion provides:

* Browser-based SSH/RDP
* No Public IP required on the VM
* Managed by Microsoft
* Secure access
* Clipboard (copy/paste) support
* No need to expose management ports to the internet

---

#### Comparison Table (Perfect for Assignment)

| Feature                            | Public IP + Port 22         | Azure Bastion           |
| ---------------------------------- | --------------------------- | ----------------------- |
| Public IP required on VM?          | ✅ Yes                       | ❌ No                    |
| SSH Port (22) exposed to Internet? | ✅ Yes                       | ❌ No                    |
| Security                           | Lower (internet-facing)     | Higher (private access) |
| Connection Method                  | SSH client (Terminal/PuTTY) | Azure Portal (browser)  |
| Attack Surface                     | Higher                      | Lower                   |
| Microsoft Managed                  | ❌ No                        | ✅ Yes                   |
| Best For                           | Labs, testing               | Production environments |

---

#### When Should You Use Each?

#### Public IP + SSH

Good for:

* Learning Azure
* Personal lab
* Quick testing

Example:

```text
Student

↓

SSH

↓

VM
```

---

#### Azure Bastion

Good for:

* Companies
* Production
* Secure environments
* Sensitive workloads

Example:

```text
Employee

↓

Azure Portal

↓

Bastion

↓

Private VM
```

---

#### Common Beginner Mistakes

#### ❌ "Bastion replaces the VM."

No.

The VM is still there.

Bastion is only a secure way to connect to it.

---

#### ❌ "A VM using Bastion needs a Public IP."

No.

One of Bastion's biggest advantages is that the VM **can remain private**.

---

#### ❌ "If I use Bastion, I still need Port 22 open to the internet."

No.

Bastion connects to the VM over the private Azure network. You don't expose SSH to the public internet.

---

#### Interview Answer (2 Minutes)

> Connecting with a Public IP and Port 22 allows direct SSH access to a virtual machine from the internet. While it is simple and useful for testing, it exposes the VM to internet-based attacks and port scanning. Azure Bastion provides secure browser-based SSH or RDP access without requiring a Public IP on the VM. The VM remains on a private network, reducing the attack surface. Because Azure Bastion is a managed Azure service, it is commonly used in production environments to improve security.

---

#### Easy Memory Trick

Think of visiting a celebrity.

#### Public IP

```text
Walk straight to the celebrity's house.
```

Everyone knows where it is.

---

#### Bastion

```text
Visit the security office first.

↓

Identity Checked

↓

Then meet the celebrity.
```

Much safer.

---

#### Quick Revision

```text
Public IP

↓

Direct Internet Access

↓

Easy

↓

Less Secure
```

```text
Azure Bastion

↓

Private VM

↓

Secure Gateway

↓

More Secure
```

---

#### Assignment Answer (Short Version)

> A VM with a Public IP and Port 22 open allows direct SSH access from the internet, making it easy to administer but increasing the attack surface because the SSH port is publicly exposed. Azure Bastion provides secure browser-based SSH/RDP access through the Azure Portal without requiring a Public IP on the VM. This keeps the VM private, reduces security risks, and is the preferred approach for production environments.

---

######## 🌟 Before Q11 (Important Azure Cost Tip)

Q11 asks you to **deploy Azure Bastion**.

⚠️ Bastion is **not part of Azure's free tier** and **incurs charges** while it's running.

For your assignment:

* Create Bastion.
* Take the required screenshots.
* Test the connection.
* **Delete Bastion immediately after completing the lab** if you no longer need it.

This follows the assignment's own cost warning and helps avoid unnecessary charges.


---


#### Q11.
Deploy Bastion and connect to a VM that has **no public IP**. Then enable copy/paste and demonstrate it. Attach screenshots.

#### Answer

Awesome! 🎉 Now you'll actually **use Azure Bastion**. Don't worry—I'll explain every click and every concept.

---

#### Q11. Deploy Bastion and connect to a VM that has no Public IP. Then enable copy/paste and demonstrate it.

This question combines everything you've learned so far.

You'll learn:

* What Azure Bastion actually does
* Why the VM doesn't need a Public IP
* How Bastion connects to the VM
* How to enable copy/paste
* Which screenshots to take

---

#### Before We Start

Let's remember the two architectures.

######## Method 1 (Old Way)

```text
Your Laptop
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

######## Method 2 (Azure Bastion)

```text
Your Laptop
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

#### Kid Analogy 👶

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

#### Step 1: Why Do We Remove the Public IP?

Ask yourself:

> If Azure Bastion is going to connect to my VM...

Why should my VM also be visible on the Internet?

It shouldn't.

So first we remove the Public IP.

---

#### Step 2: Remove the Public IP

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

Now your VM only has:

```text
Private IP

10.0.1.x
```

No Public IP.

---

#### What Just Happened?

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

#### Step 3: Create Azure Bastion

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

#### What is AzureBastionSubnet?

This confuses many beginners.

Think of Bastion as another machine inside your VNet.

It needs its own dedicated room.

That room is called:

```text
AzureBastionSubnet
```

It is a **special subnet reserved only for Azure Bastion**.

You cannot place your own VMs there.

---

#### Kid Analogy 👶

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

#### Step 4: Wait for Deployment

Bastion deployment may take several minutes.

This is normal.

---

#### Step 5: Connect Using Bastion

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

#### What Happens?

Instead of opening PuTTY or Terminal...

Azure opens the VM **inside your web browser**.

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

#### Step 6: Enable Copy/Paste

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

#### Why is Copy/Paste Useful?

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

#### ASCII Diagram

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

#### What Changed?

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

#### Screenshots for Assignment

Take these screenshots:

#### Screenshot 1

Bastion Overview

Show:

```text
week3-bastion
```

---

#### Screenshot 2

VM

```text
Public IP

None
```

This proves the VM has no Public IP.

---

#### Screenshot 3

Browser showing Bastion connected to the VM.

---

#### Screenshot 4

Copy text.

Paste into terminal.

Take a screenshot.

---

#### Common Beginner Mistakes

#### ❌ Forgetting AzureBastionSubnet

Bastion cannot be deployed without its dedicated subnet.

---

#### ❌ Different Regions

Keep:

* VM
* Bastion
* VNet

all in the same region.

---

#### ❌ Expecting SSH from your laptop to work

Once the Public IP is removed,

This won't work:

```bash
ssh azureuser@20.xx.xx.xx
```

Because there is no Public IP anymore.

You must use the Azure Portal and Bastion.

---

#### Comparison

| Feature             | SSH                | Azure Bastion      |
| ------------------- | ------------------ | ------------------ |
| Public IP Needed    | Yes                | No                 |
| Browser Access      | No                 | Yes                |
| SSH Client Required | Yes                | No                 |
| Copy/Paste          | Terminal dependent | Built into Bastion |
| Internet Exposure   | Higher             | Lower              |

---

#### Interview Answer

> In this lab, I deployed Azure Bastion in the same Virtual Network as my virtual machine. I removed the VM's Public IP and connected to it through the Azure Portal using Bastion. Azure Bastion used the VM's private IP address, so the VM remained inaccessible directly from the internet. I also enabled clipboard support and successfully copied and pasted text into the VM terminal. This approach is more secure because it avoids exposing SSH (port 22) to the public internet.

---

#### Easy Memory Trick

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

#### Cost Tip ⚠️

Azure Bastion is **billable**.

Once you've:

* Connected successfully
* Taken your screenshots

Delete it if you don't need it anymore.

This follows your assignment's instruction to avoid unnecessary Azure costs.

---

#### Quick Revision

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

######## 🎯 Next: Q12

Q12 moves from **network security** to **identity security**.

You'll learn one of the most fundamental concepts in cloud computing:

* **Authentication** vs **Authorization**
* Why they are different
* Real-world analogies
* Azure Entra ID examples
* Real login failure vs permission failure scenarios
* Interview questions and easy memory tricks

This concept is used not just in Azure, but in AWS, Kubernetes, GitHub, Linux, and almost every modern application.


---


#### Q12.
What is the difference between **authentication** and **authorization**? Give one example of each failing.

#### Answer

Excellent! ⭐ Q12 is one of the **most important concepts in cloud computing**. It doesn't just apply to Azure—it also applies to AWS, Linux, Kubernetes, GitHub, and even your phone.

Many beginners confuse these two words:

* **Authentication**
* **Authorization**

Let's make them super simple.

---

#### Q12. What is the difference between Authentication and Authorization? Give one example of each failing.

---

#### Step 1: First Understand the Problem

Imagine you're going to watch a movie in a theatre.

There are **two checks**.

#### Check 1

The security guard asks:

> "Show me your ticket."

He is checking:

**Who are you?**

This is **Authentication**.

---

#### Check 2

After entering,

You try to sit in the VIP seats.

The staff asks:

> "Do you have a VIP ticket?"

They are checking:

**Are you allowed to sit here?**

This is **Authorization**.

---

#### Kid Analogy 👶

Imagine your school.

You reach the school gate.

The teacher asks:

> "Are you a student here?"

You show your ID card.

✅ You're allowed inside.

This is:

######## Authentication

---

Now you walk into the Principal's office.

The peon says:

> "Only teachers may enter."

Even though you're a student,

❌ You can't enter.

This is:

######## Authorization

---

#### Easy Way to Remember

Authentication answers:

```text
WHO ARE YOU?
```

Authorization answers:

```text
WHAT ARE YOU ALLOWED TO DO?
```

---

#### Step 2: What is Authentication?

Authentication is the process of **proving your identity**.

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

#### ASCII Diagram

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

#### Authentication Failure Example

Suppose your password is wrong.

You enter:

```text
Username

Malathi

Password

12345
```

But your real password is different.

Azure says:

```text
❌ Invalid Username or Password
```

This is an **Authentication Failure**.

Azure doesn't know who you are.

---

#### Step 3: What is Authorization?

Now Azure already knows who you are.

Next it asks:

> "What are you allowed to do?"

Maybe you're allowed to:

* Read
* Restart a VM

But not allowed to:

* Delete the VM

This is Authorization.

---

#### ASCII Diagram

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

#### Authorization Failure Example

Suppose you're logged into Azure successfully.

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

#### Real Azure Example

Imagine you're working in a company.

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

Azure checks your role.

Maybe you're only a Reader.

Azure says:

```text
❌ Access Denied
```

Authentication succeeded.

Authorization failed.

---

#### Another Real-Life Example

Think about an ATM.

Step 1

Insert ATM Card.

Enter PIN.

```text
PIN Correct

↓

Authentication
```

---

Step 2

Try to withdraw $5,000.

Bank checks your balance.

Only $500 available.

```text
❌ Transaction Denied
```

That's Authorization.

The bank knows who you are.

You just aren't allowed to perform that action.

---

#### Comparison Table

| Feature         | Authentication         | Authorization                |
| --------------- | ---------------------- | ---------------------------- |
| Main Question   | Who are you?           | What can you do?             |
| Happens First?  | ✅ Yes                  | ❌ No (after authentication)  |
| Verifies        | Identity               | Permissions                  |
| Examples        | Password, OTP, SSH Key | Azure RBAC Roles             |
| Failure Example | Wrong password         | No permission to delete a VM |

---

#### Easy Memory Trick

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

#### Flow Diagram

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

#### Azure Example

Suppose Malathi logs into Azure.

Step 1

```text
Username

Password

↓

Authentication

↓

Success
```

---

Step 2

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

#### Common Beginner Mistakes

#### ❌ Thinking they're the same.

No.

Authentication verifies **identity**.

Authorization verifies **permissions**.

---

#### ❌ Thinking Authorization happens first.

No.

Azure must know **who you are** before it can check **what you're allowed to do**.

---

#### ❌ Thinking login failure is Authorization.

No.

Wrong password = Authentication Failure.

---

#### Interview Answer (2 Minutes)

> Authentication is the process of verifying a user's identity, such as by using a username and password, SSH key, or multi-factor authentication. It answers the question, "Who are you?" Authorization happens after successful authentication and determines what actions the user is allowed to perform. It answers the question, "What are you allowed to do?" An example of authentication failure is entering an incorrect password and being unable to log in. An example of authorization failure is successfully logging into Azure but being denied permission to delete a virtual machine because your assigned role does not allow that action.

---

#### Assignment Answer (Short Version)

> Authentication verifies the identity of a user, while authorization determines what that authenticated user is permitted to do. For example, entering an incorrect password results in an authentication failure because Azure cannot verify the user's identity. Logging into Azure successfully but receiving an "Access Denied" message when trying to delete a resource group is an authorization failure because the user lacks the required permissions.

---

#### Quick Revision

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

#### Real Azure Example

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

---

######## 🎯 Next: Q13

Q13 is a continuation of this topic.

You'll learn:

* Why Azure uses **Groups**
* Why companies almost never assign roles to users one by one
* A real example with **10 employees and 5 Resource Groups**
* Azure RBAC (Role-Based Access Control)
* Best practices used in real companies
* Simple analogies, ASCII diagrams, and interview-ready answers.


---


#### Q13.
What is the difference between assigning a role to a **user** and assigning it to a **group**? Explain with a team of 10 people needing access to 5 resource groups.

#### Answer

Excellent! 🌟 Q13 teaches one of the most important Azure administration concepts: **Role-Based Access Control (RBAC)**.

This is exactly how companies manage access for hundreds or thousands of employees.

---

#### Q13. What is the difference between assigning a role to a user and assigning it to a group? Explain with a team of 10 people needing access to 5 Resource Groups.

---

#### First, What is a Role?

A **role** is simply a **set of permissions**.

For example:

* Reader → Can only view resources.
* Contributor → Can create, modify, and delete resources (but cannot manage access).
* Owner → Full control, including assigning roles to others.

Think of a role as a **job responsibility**.

---

#### Kid Analogy 👶

Imagine your school.

There are 10 students.

The teacher wants everyone to enter the library.

She has two choices.

#### Option 1

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

#### Option 2

Create one group.

```text
Class 5A
```

Tell the librarian:

> "Everyone in Class 5A can enter."

Done!

Much easier.

---

#### Azure Works the Same Way

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

#### Method 1: Assign Role to Each User

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

#### Method 2: Assign Role to a Group

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

#### Real-Life Analogy 🏢

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

#### ASCII Diagram

######## User-Based Assignment

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

######## Group-Based Assignment

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

#### Let's Solve the Assignment Scenario

You have:

```text
10 People
```

Need access to:

```text
5 Resource Groups
```

---

######## Option 1: Individual Users

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

######## Option 2: Group

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

#### What Happens When a New Employee Joins?

Suppose **Neha** joins the company.

#### User-Based

You must manually assign:

* RG1
* RG2
* RG3
* RG4
* RG5

Five separate role assignments.

---

#### Group-Based

Simply:

```text
Add Neha

↓

Developers Group
```

Done.

She automatically gets access everywhere the group already has permissions.

---

#### What Happens When Someone Leaves?

Suppose Rahul resigns.

#### User-Based

Remove Rahul from every Resource Group individually.

---

#### Group-Based

Just remove Rahul from the group.

Access is removed automatically.

---

#### Comparison Table

| Feature         | Role Assigned to User       | Role Assigned to Group |
| --------------- | --------------------------- | ---------------------- |
| Assigned To     | Individual user             | Azure Entra ID group   |
| Administration  | More manual work            | Easier to manage       |
| Best for        | One or two users            | Teams and departments  |
| New Employee    | Assign roles manually       | Add user to the group  |
| Employee Leaves | Remove multiple assignments | Remove from the group  |
| Scalability     | Poor for large teams        | Excellent              |

---

#### Why Do Companies Prefer Groups?

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

#### Common Beginner Mistakes

#### ❌ "Groups and Resource Groups are the same."

No.

* **Resource Group** = Container for Azure resources.
* **Entra ID Group** = Collection of users.

Completely different things.

---

#### ❌ "Groups store VMs."

No.

Groups store **users**, not Azure resources.

---

#### ❌ "Assigning roles to users is always bad."

No.

It's fine for one or two users.

For teams, groups are the recommended approach.

---

#### Easy Memory Trick

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

#### Interview Answer (2 Minutes)

> A role assignment to a user gives permissions directly to one individual. A role assignment to a group gives permissions to all members of that group. In a scenario where 10 people need access to 5 Resource Groups, assigning roles individually would require 50 separate assignments. Using a group, I would add all 10 users to an Entra ID group and assign the required role to the group for each Resource Group. This reduces administrative effort, simplifies onboarding and offboarding, and follows Azure RBAC best practices.

---

#### Assignment Answer (Short Version)

> Assigning a role directly to a user gives permissions only to that individual. Assigning a role to an Entra ID group gives the same permissions to every member of the group. For a team of 10 people needing access to 5 Resource Groups, assigning roles individually would require 50 role assignments. By creating one group, adding all 10 users, and assigning the role to the group, only 5 assignments are needed. This approach is easier to manage, scales better, and is the recommended practice in Azure.

---

#### Quick Revision

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

######## 🌟 What You'll Do in Q14

Now you'll actually perform this in Azure:

1. Create an **Entra ID User**
2. Create an **Entra ID Group**
3. Add the user to the group
4. Assign a role (such as **Contributor**) to the group at the **Resource Group** scope
5. Take screenshots of every step for your assignment

This is your first hands-on lab with **Microsoft Entra ID (formerly Azure Active Directory)**.


---


#### Q14.
Create an Entra ID user and group, add the user to the group, and assign a role at resource-group scope. Attach screenshots of every step.

#### Answer

Excellent! 🌟 Now we're going to do your **first Identity Management lab** in Azure.

This is the practical implementation of Q13.

---

#### Q14. Create an Entra ID User and Group, add the User to the Group, and assign a Role at Resource Group scope.

This question is testing whether you understand **Azure RBAC (Role-Based Access Control)**.

Don't worry if you've never used **Microsoft Entra ID** before. We'll start from zero.

---

#### Step 1: What is Microsoft Entra ID?

Microsoft Entra ID (previously called **Azure Active Directory**) is Azure's **Identity and Access Management (IAM)** service.

It stores:

* Users
* Groups
* Applications
* Roles

Think of it as Azure's **employee directory**.

---

#### Kid Analogy 👶

Imagine your school.

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

#### Step 2: What are We Going to Build?

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

#### Step 3: Create an Entra ID User

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
| User Principal Name | `malathi.test@<yourtenant>.onmicrosoft.com`   |
| Display Name        | `Malathi Test`                                |
| Password            | Auto-generated or set one manually if allowed |

Click:

```text
Review + Create

↓

Create
```

---

#### What Just Happened?

You created a new Azure identity.

Think of it like creating a new employee account.

---

#### Screenshot 1 📸

Take a screenshot showing:

```text
Microsoft Entra ID

↓

Users

↓

Malathi Test
```

---

#### Step 4: Create a Group

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

#### Why Security Group?

Azure RBAC works with **Security Groups**.

Microsoft 365 Groups are mainly for collaboration tools like Outlook and Teams.

---

#### Screenshot 2 📸

Take a screenshot showing:

```text
Groups

↓

Dev-Team
```

---

#### Step 5: Add User to Group

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

Now your group looks like:

```text
Dev-Team

↓

Malathi Test
```

---

#### ASCII Diagram

```text
Dev-Team

│

└── Malathi Test
```

---

#### Screenshot 3 📸

Take a screenshot showing:

```text
Dev-Team

↓

Members

↓

Malathi Test
```

---

#### Step 6: Assign a Role

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

What is IAM?

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

#### Step 7: Add Role Assignment

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

#### What Happened?

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

#### ASCII Diagram

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

#### Screenshot 4 📸

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

#### How Does It Work?

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

✅ Access Granted

---

#### Real-Life Analogy 🏢

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

#### Comparison

######## Without Group

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

######## With Group

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

#### Common Beginner Mistakes

#### ❌ Assigning the role to the user instead of the group

The assignment specifically asks you to:

* Create a User
* Create a Group
* Add the User to the Group
* Assign the Role to the **Group**

---

#### ❌ Choosing Microsoft 365 Group

Choose:

```text
Security Group
```

---

#### ❌ Forgetting to add the user to the group

If the user isn't a member,

they won't inherit the group's permissions.

---

#### Screenshots Required

Your assignment asks for every step.

Take these:

✅ User Created

✅ Group Created

✅ User Added to Group

✅ IAM showing Contributor assigned to Dev-Team

---

#### Interview Questions

#### Why assign the role to the group instead of the user?

Because it's easier to manage.

---

#### What happens if a new employee joins?

Add them to the group.

No need to create new role assignments.

---

#### What happens if someone leaves?

Remove them from the group.

Their inherited access is removed.

---

#### Interview Answer

> In this lab, I created a new Microsoft Entra ID user and a Security Group. I added the user to the group and then assigned the Contributor role to the group at the Resource Group scope using Azure RBAC. This approach follows best practices because permissions are managed through groups instead of individual users, making onboarding and offboarding much easier.

---

#### Assignment Answer (Short Version)

> I created a Microsoft Entra ID user and a Security Group, added the user to the group, and assigned the Contributor role to the group at the Resource Group scope using Azure RBAC. Assigning roles to groups instead of individual users simplifies permission management because any new user added to the group automatically inherits the assigned permissions.

---

#### Quick Revision

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

######## 🎯 Next (Q15)

Q15 is another very common interview question:

> **Contributor Role vs Virtual Machine Administrator Login Role**

You'll learn why someone can:

* ✅ Restart a VM
* ❌ Still be unable to log in to it

This is a real-world Azure RBAC scenario that often confuses beginners, and we'll break it down with simple analogies and practical examples.


---


#### Q15.
What is the difference between the **Contributor** role and the **Virtual Machine Administrator Login** role? Why might a user be able to restart a VM but not log into it?

#### Answer

Excellent! 🌟 Q15 is one of the **most commonly asked Azure interview questions** because it teaches that **managing a VM and logging into a VM are two different permissions**.

Let's understand it step by step.

---

#### Q15. What is the difference between the Contributor role and the Virtual Machine Administrator Login role? Why might a user be able to restart a VM but not log into it?

---

#### Step 1: Think of a Hotel 🏨

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

#### Step 2: What is the Contributor Role?

The **Contributor** role is an Azure RBAC role.

It allows a user to **manage Azure resources**.

Think of it as:

> "You can manage the VM."

Examples:

✅ Create VM

✅ Restart VM

✅ Stop VM

✅ Resize VM

✅ Delete VM

But...

It **does not automatically allow you to log into the operating system**.

---

#### Kid Analogy 👶

Imagine you're the school principal.

You can:

* Paint classrooms
* Buy desks
* Repair windows

But...

You don't automatically know every classroom's lock password.

Managing the building is different from entering a locked room.

---

#### Step 3: What is the Virtual Machine Administrator Login Role?

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

#### Step 4: Visualize the Difference

######## Contributor

```text
User
 │
 ▼
Azure Portal
 │
 ▼
Restart VM ✅

Delete VM ✅

Resize VM ✅

Create VM ✅
```

Notice:

No OS login.

---

######## Virtual Machine Administrator Login

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
Inside VM ✅
```

---

#### Real-Life Analogy

Imagine you own an apartment.

There are two people.

#### Building Maintenance

Can:

* Repair the lift
* Turn electricity on/off
* Paint walls

Cannot:

Enter your apartment without permission.

---

#### Apartment Owner

Can:

* Unlock the apartment
* Enter inside
* Use everything

This is like the **Virtual Machine Administrator Login** role.

---

#### Step 5: Why Can Someone Restart a VM but Not Log In?

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

✅ Allowed

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
Restart VM ✅

SSH Login ❌
```

---

#### ASCII Diagram

```text
Rahul

 │

 ▼

Contributor

 │

 ├── Create VM ✅

 ├── Restart VM ✅

 ├── Delete VM ✅

 └── Login to VM ❌
```

---

Another user:

```text
Priya

 │

 ▼

Virtual Machine Administrator Login

 │

 ├── SSH Login ✅

 ├── RDP Login ✅

 └── Restart VM ❌
```

Unless Priya also has Contributor (or another management role), she cannot manage the VM itself.

---

#### Why Did Microsoft Separate These?

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

#### Comparison Table

| Feature                 | Contributor               | Virtual Machine Administrator Login  |
| ----------------------- | ------------------------- | ------------------------------------ |
| Purpose                 | Manage Azure resources    | Log into the VM OS                   |
| Restart VM              | ✅ Yes                     | ❌ No (unless another role allows it) |
| Create/Delete VM        | ✅ Yes                     | ❌ No                                 |
| SSH/RDP Login           | ❌ No                      | ✅ Yes                                |
| Azure Portal Management | ✅ Yes                     | Limited to login permission          |
| Used For                | Infrastructure management | Operating system administration      |

---

#### Common Beginner Mistakes

#### ❌ "Contributor means full access."

No.

Contributor has broad **resource management** permissions, but not automatic OS login rights.

---

#### ❌ "If I can SSH, I can restart the VM."

Not necessarily.

SSH access and Azure resource management are different permission sets.

---

#### ❌ "Logging into Azure Portal means I can log into every VM."

No.

Portal access and VM OS login are separate authorizations.

---

#### Easy Memory Trick

Think of a car.

#### Contributor

```text
Can repair the car.
```

But doesn't have the car key.

---

#### VM Administrator Login

```text
Has the car key.

Can drive it.
```

---

#### Interview Question

**Interviewer:**

> Why could someone restart a VM but still fail to SSH into it?

**Answer:**

> Because restarting a VM requires Azure resource management permissions, which the Contributor role provides. Logging into the VM requires a separate role, such as Virtual Machine Administrator Login, along with valid credentials. Azure separates infrastructure management from operating system access for better security.

---

#### Assignment Answer (Short Version)

> The Contributor role allows a user to manage Azure resources such as creating, deleting, starting, stopping, and restarting virtual machines. However, it does not grant permission to log into the operating system. The Virtual Machine Administrator Login role allows a user to sign in to the VM using SSH (Linux) or RDP (Windows), but it does not provide permissions to manage Azure resources. Therefore, a user may be able to restart a VM using the Contributor role but still be unable to log into it because they do not have the required VM login role.

---

#### Quick Revision

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

#### Visual Summary

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

######## 🎯 Next: Q16

Q16 moves into **Kubernetes on Azure (AKS)**.

We'll compare:

* **AKS (Azure Kubernetes Service)** vs **On-Premises Kubernetes**
* A table with at least **6 comparison points**
* Real-world analogies
* ASCII architecture diagrams
* Cost, management, upgrades, scalability, and responsibility differences explained like you're seeing Kubernetes for the first time.


---


#### Q16.
What is the difference between a **managed Kubernetes cluster (AKS)** and an **on-premises Kubernetes cluster**? Compare in a table with at least six points.

#### Answer

Awesome! 🌟 Welcome to the Kubernetes part of your assignment. Since you've already used **Minikube in Week 2**, now you'll learn **AKS (Azure Kubernetes Service)**.

Don't worry—we'll start from the beginning.

---

#### Q16. What is the difference between a Managed Kubernetes Cluster (AKS) and an On-Premises Kubernetes Cluster?

The assignment asks you to compare them in **at least six points**.

---

#### Step 1: First Understand Kubernetes

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

#### Step 2: What is On-Premises Kubernetes?

"On-Premises" means:

> **You own and manage everything yourself.**

Imagine building your own house.

You must buy:

* Land
* Bricks
* Cement
* Doors
* Electricity
* Plumbing

Everything is your responsibility.

---

######## Kubernetes Version

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

Everything is your responsibility.

---

#### Step 3: What is AKS?

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

#### Kid Analogy 👶

######## On-Prem

Build your own playground.

```text
Buy Slide

Buy Swing

Install Everything

Repair Everything
```

---

######## AKS

Go to a public playground.

Everything is already built.

You just play.

---

#### Step 4: Architecture

######## On-Prem Kubernetes

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

######## AKS

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

#### Step 5: Who Does What?

#### On-Prem

You manage:

* Servers
* Networking
* Control Plane
* Upgrades
* Backups
* Security patches

---

#### AKS

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

#### Real-Life Analogy

Imagine owning a school.

#### On-Prem

You own:

* Building
* Furniture
* Electricity
* Internet
* CCTV
* Water
* Repairs

---

#### AKS

You rent classrooms.

The building owner maintains the infrastructure.

You focus on teaching.

---

#### Comparison Table (Assignment)

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

#### Which One is Easier?

Imagine you buy a washing machine.

#### On-Prem

You repair it yourself.

---

#### AKS

The company sends a service engineer.

That's AKS.

---

#### Why Do Companies Like AKS?

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

#### Common Beginner Mistakes

#### ❌ "AKS means Azure runs my application."

Not exactly.

You still deploy and manage **your applications**.

Azure mainly manages the Kubernetes platform components.

---

#### ❌ "AKS is free."

The **AKS control plane** is managed by Azure, but you **pay for the worker nodes (VMs)** and other Azure resources like load balancers and storage.

---

#### ❌ "On-Prem is always bad."

No.

Some companies choose on-premises Kubernetes because of:

* Compliance
* Data residency
* Existing infrastructure
* Regulatory requirements

---

#### Easy Memory Trick

######## On-Prem

```text
Build Your Own House
```

Everything is your responsibility.

---

######## AKS

```text
Rent an Apartment
```

The building owner maintains the building.

You live in it.

---

#### Interview Answer (2 Minutes)

> AKS is a managed Kubernetes service provided by Microsoft Azure. In AKS, Microsoft manages important platform components such as the Kubernetes control plane, making deployment, upgrades, and maintenance easier. In an on-premises Kubernetes cluster, the organization is responsible for installing, configuring, upgrading, securing, and maintaining the entire Kubernetes environment, including the control plane and infrastructure. AKS reduces operational overhead and is commonly used for cloud-native workloads, while on-premises Kubernetes is suitable for organizations that require complete control over their infrastructure.

---

#### Assignment Answer (Short Version)

> AKS is a managed Kubernetes service where Microsoft manages the Kubernetes control plane and simplifies operations such as upgrades and maintenance. In contrast, an on-premises Kubernetes cluster is fully managed by the organization, including servers, networking, Kubernetes installation, upgrades, and troubleshooting. AKS reduces operational effort and allows teams to focus on deploying applications, while on-premises Kubernetes provides greater control but requires more administrative work.

---

#### Quick Revision

```text
On-Prem Kubernetes

You manage:

✅ Servers
✅ Linux
✅ Kubernetes
✅ Control Plane
✅ Upgrades
✅ Networking
```

```text
AKS

Microsoft manages:

✅ Control Plane
✅ Kubernetes platform

You manage:

✅ Worker Nodes
✅ Applications
✅ Pods
```

---

######## 🌟 Before Q17 (Important)

Q17 is closely related to this question, but it's much more specific.

Many students confuse these two questions:

* **Q16:** AKS **vs** On-Prem Kubernetes (overall comparison)
* **Q17:** **Control Plane vs Worker Nodes** *inside an AKS cluster*—who manages each part and who pays for each part.

We'll break that down with diagrams and real Azure examples next.


---


#### Q17.
What is the difference between the AKS **control plane** and the **worker nodes** in terms of who manages them and who pays for them?

#### Answer

Perfect! ⭐ Q17 is one of the **most important AKS concepts**. If you understand this, you'll understand what Microsoft manages and what **you** are responsible for.

This question is asked very often in interviews.

---

#### Q17. What is the difference between the AKS Control Plane and the Worker Nodes in terms of who manages them and who pays for them?

Let's start from the beginning.

---

#### Step 1: What is a Kubernetes Cluster?

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

#### Kid Analogy 👶

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

#### Step 2: What is the Control Plane?

The **Control Plane** is the **brain** of Kubernetes.

It doesn't run your application.

Instead, it decides:

* Where should Pods run?
* Is a Pod unhealthy?
* Should another Pod be created?
* Which Node should receive the workload?

---

#### Real-Life Analogy

Imagine an airport.

The Air Traffic Controller does not fly airplanes.

Instead, they decide:

* Which runway to use
* When to land
* When to take off

The Air Traffic Controller is like the **Control Plane**.

---

#### ASCII Diagram

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

#### Step 3: What are Worker Nodes?

Worker Nodes are the machines that **actually run your applications**.

If you deploy:

```text
nginx
```

The Pod runs on a Worker Node.

---

#### ASCII Diagram

```text
Worker Node

 │

 ├── Pod

 ├── Pod

 ├── Pod

 └── Container Runtime
```

This is where your application lives.

---

#### Step 4: Another Analogy 🍕

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

#### Step 5: Who Manages the Control Plane in AKS?

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

#### Step 6: Who Manages Worker Nodes?

You manage the Worker Nodes.

That means:

* Choose VM size
* Choose number of nodes
* Scale nodes
* Upgrade node pools (with Azure assistance)
* Deploy applications
* Monitor workloads

Think of Worker Nodes as **your virtual machines**.

---

#### Step 7: Who Pays?

This is exactly what the assignment asks.

######## Control Plane

In AKS,

Microsoft manages it.

For the standard AKS experience used in learning labs, you are **not charged separately for the managed control plane**.

---

######## Worker Nodes

Worker Nodes are Azure Virtual Machines.

VMs cost money.

So you pay for:

* Worker Node VMs
* Storage disks
* Load Balancers (if used)
* Public IPs (if used)

---

#### Kid Analogy 💰

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
Your Shop

↓

Worker Nodes
```

---

#### Visual Diagram

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

#### Example

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

#### Comparison Table

| Feature                | Control Plane               | Worker Nodes                                 |
| ---------------------- | --------------------------- | -------------------------------------------- |
| Main Purpose           | Manages the cluster         | Runs applications                            |
| Runs Pods?             | ❌ No                        | ✅ Yes                                        |
| Managed By (AKS)       | Microsoft                   | Customer                                     |
| User Access            | Limited                     | Full (through node management and workloads) |
| Separate Charge in AKS | No separate charge          | Yes (VMs and related resources)              |
| Examples               | API Server, Scheduler, etcd | Virtual Machines running Pods                |

---

#### Common Beginner Mistakes

#### ❌ "Pods run on the Control Plane."

No.

Pods run on **Worker Nodes**.

---

#### ❌ "Microsoft manages everything."

No.

Microsoft manages the **Control Plane**.

You still manage:

* Applications
* Deployments
* Node pools
* Scaling decisions
* Worker node configuration

---

#### ❌ "I don't pay anything in AKS."

Not true.

You pay for the Azure resources your cluster uses, especially the **Worker Node VMs**.

---

#### Easy Memory Trick

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

#### Interview Answer (2 Minutes)

> An AKS cluster consists of a Control Plane and one or more Worker Nodes. The Control Plane is responsible for managing the Kubernetes cluster by scheduling Pods, maintaining cluster state, and handling API requests. In AKS, Microsoft manages the Control Plane, so users do not manage or pay separately for it. Worker Nodes are Azure Virtual Machines where containers and Pods actually run. Customers are responsible for choosing the node size, scaling the node pool, deploying applications, and paying for the Worker Node VMs and other Azure resources they consume.

---

#### Assignment Answer (Short Version)

> In AKS, the Control Plane is the management component of Kubernetes and is operated by Microsoft. It handles scheduling, cluster state, and API operations. The Worker Nodes are Azure Virtual Machines that run Pods and containers. Microsoft manages the Control Plane without a separate charge, while customers manage and pay for the Worker Nodes and the Azure resources associated with them.

---

#### Quick Revision

```text
Control Plane

🧠 Brain

↓

Managed by Microsoft

↓

Makes Decisions

↓

No separate control-plane charge
```

```text
Worker Nodes

💪 Workers

↓

Managed by You

↓

Run Pods

↓

You pay for the VMs
```

---

######## 🎯 Next: Q18 (Hands-on AKS)

This is your first practical AKS lab.

You'll learn:

* How to create an **AKS cluster with one node**
* How to connect using **kubectl**
* Why `kubectl get nodes` looks different from Minikube
* How AKS differs from your Week 2 Minikube setup
* Every Azure Portal click, Azure CLI command, expected output, troubleshooting tips, and exactly which screenshots to capture for your assignment.


---


#### Q18.
Create an AKS cluster with 1 node and connect `kubectl`. Explain the difference between what you saw on **Minikube** in Week 2 and what you see on **AKS** now. Attach screenshots.

#### Answer

Excellent! 🌟 This is one of the most exciting labs because you'll deploy your **first managed Kubernetes cluster on Azure**.

Since this is your **first time using Azure**, I'll explain every step like you're 5 years old.

> ⚠️ **Cost Reminder:** AKS worker nodes are billable. After completing the lab and taking screenshots, delete the AKS cluster (or the entire Resource Group if you no longer need anything in it).

---

#### Q18. Create an AKS Cluster with 1 Node and connect kubectl. Explain the difference between what you saw on Minikube in Week 2 and what you see on AKS now.

---

#### Step 1: Remember Minikube

Last week you used:

```text
Your Laptop

↓

Minikube

↓

Node

↓

Pods
```

Everything was running on **your laptop**.

Your laptop was doing all the work.

---

#### Step 2: What is AKS?

Now imagine instead of using your laptop...

Azure gives you a computer in Microsoft's data center.

```text
Your Laptop

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

Your laptop only sends commands.

The real work happens in Azure.

---

#### Kid Analogy 👶

#### Minikube

Imagine playing with LEGO at home.

```text
You

↓

Bedroom

↓

LEGO
```

Everything is in your room.

---

#### AKS

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

#### Step 3: Create the AKS Cluster

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

######## Fill the Basics

| Field              | Value                                     |
| ------------------ | ----------------------------------------- |
| Resource Group     | week3-rg                                  |
| Cluster Name       | week3-aks                                 |
| Region             | Same as your VM                           |
| Kubernetes Version | Default                                   |
| Node Size          | Default or smallest available for the lab |
| Node Count         | **1**                                     |

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

#### Step 4: Wait

AKS creation takes several minutes.

This is normal.

Azure is creating:

* Kubernetes Control Plane
* Worker Node
* Networking
* Storage configuration

---

#### Step 5: Connect to AKS

You need **kubectl**.

Remember Week 2?

You typed:

```bash
kubectl get nodes
```

We'll do exactly the same.

---

#### Step 6: Open Azure Cloud Shell

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

#### Step 7: Connect kubectl

Run:

```bash
az aks get-credentials --resource-group week3-rg --name week3-aks
```

Replace the names if you used different ones.

---

######## What does this command do?

Think of it like getting the address of your new school.

Without the address...

You don't know where to go.

This command tells kubectl:

> "This is the Kubernetes cluster you should talk to."

---

#### ASCII Diagram

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

#### Step 8: Verify Connection

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

#### Minikube Output

You probably saw something like:

```text
minikube

Ready
```

---

#### AKS Output

Now you see a much longer name.

Example:

```text
aks-nodepool1-xxxxxxxx-vmss000001
```

Why?

Because this is an Azure Virtual Machine Scale Set (VMSS) node created by AKS.

---

#### Step 9: Check Pods

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

#### Kid Analogy 👶

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

#### What Changed Compared to Minikube?

Let's compare.

---

######## Minikube

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

######## AKS

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

#### Comparison Table

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

#### Step 1: What is a Container Registry?

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

#### Step 2: What is Docker Hub?

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

#### Step 3: What is Azure Container Registry (ACR)?

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

#### Step 4: Why Use ACR Instead of Docker Hub?

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

#### Step 5: Architecture

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

#### Step 6: Create Azure Container Registry

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

#### Step 7: Enable Admin User

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

#### Step 8: Login to ACR

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

#### Step 9: Tag the Image

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

#### Step 10: Push the Image

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

#### Step 11: Verify

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

#### Step 1: First Understand the Two Websites

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

#### Step 2: What Does Azure Portal Do?

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

#### Step 3: What Does Azure DevOps Do?

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

#### Step 4: Why Can't Azure DevOps Deploy Directly?

Imagine you're working at a bank.

You receive a phone call:

> "I'm Rahul. Please transfer $10,000."

Will the bank transfer the money?

No.

The bank first verifies who is calling.

Azure works the same way.

Azure DevOps must prove its identity before Azure allows it to create or modify resources.

---

#### Step 5: What is a Service Connection?

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

#### Step 6: Architecture

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

#### Step 7: Real Pipeline Flow

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

#### Step 8: What Information Does a Service Connection Store?

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

######## 🎯 Next: Q21 (Final Practical Lab)

This is the biggest question in the assignment.

You'll build a complete **CI/CD pipeline** that:

```text
GitHub

↓

Azure DevOps Pipeline

↓

Build Docker Image

↓

Push to Azure Container Registry (ACR)

↓

Successful Pipeline Run
```

I'll explain every click, every YAML line, every command, and exactly what screenshots and Git commits you need to score full marks.


---


#### Q21.
What is the difference between a **Microsoft-hosted agent** and a **self-hosted agent**? Build a CI pipeline that pushes an image to ACR and show a successful run.
Create a GitHub repository named **azure-week3-assignment** containing:
- `azure-pipelines.yml`
- Dockerfile and application code
- A `README.md` explaining the differences you documented
- At least **five Git commits**
- Screenshots of the pipeline run and the image in ACR

#### Answer

Awesome! 🎉 This is the **final technical question** and probably the most important one because it combines:

* GitHub
* Azure DevOps
* Docker
* ACR
* CI/CD Pipeline

This is a mini real-world DevOps project.

---

#### Q21. What is the difference between a Microsoft-hosted Agent and a Self-hosted Agent?

Build a CI pipeline that pushes an image to ACR and show a successful run.

---

#### Part 1: Understand Agents First

Before writing YAML, you must understand what an **Agent** is.

---

#### What is an Agent?

A pipeline doesn't magically execute itself.

Someone has to run:

```bash
docker build
docker push
npm install
mvn package
```

The machine that executes these commands is called an:

```text
Agent
```

---

#### Kid Analogy 👶

Imagine you tell your mom:

> Make noodles.

Who actually cooks?

Not you.

Your mom.

Similarly:

```text
Pipeline

↓

Agent

↓

Runs Commands
```

The Agent does the actual work.

---

#### Part 2: Microsoft-hosted Agent

Microsoft gives you a temporary VM.

Example:

```text
Azure DevOps

↓

Creates Temporary VM

↓

Runs Pipeline

↓

Deletes VM
```

You don't manage it.

---

#### Analogy

Like booking a taxi.

```text
Need Ride

↓

Book Uber

↓

Ride

↓

Uber Leaves
```

You don't own the car.

---

#### Microsoft-hosted Agent Advantages

✅ Easy

✅ No maintenance

✅ Ready to use

✅ Good for learning

---

#### Disadvantages

❌ Limited customization

❌ Build time limits

❌ Shared infrastructure

---

#### Part 3: Self-hosted Agent

You provide your own machine.

Example:

```text
Your Laptop

OR

Your VM

OR

Your Server
```

and register it with Azure DevOps.

---

#### Architecture

```text
Azure DevOps

↓

Your Server

↓

Pipeline Executes
```

---

#### Analogy

Instead of using Uber,

you use your own car.

---

#### Advantages

✅ Full control

✅ Install custom software

✅ Faster for large builds

✅ No hosted-agent limitations

---

#### Disadvantages

❌ You maintain it

❌ You patch it

❌ You secure it

❌ You troubleshoot it

---

#### Comparison Table

| Feature         | Microsoft-hosted Agent                 | Self-hosted Agent    |
| --------------- | -------------------------------------- | -------------------- |
| Managed By      | Microsoft                              | You                  |
| Setup           | Very Easy                              | Manual               |
| Maintenance     | None                                   | Your Responsibility  |
| Cost            | Included in hosted minutes/plan limits | Infrastructure cost  |
| Custom Software | Limited                                | Full Control         |
| Best For        | Learning, small teams                  | Enterprise workloads |

---

#### Assignment Answer (Theory)

> A Microsoft-hosted agent is a temporary build machine provided and maintained by Microsoft. It is automatically created for pipeline execution and removed afterward. A self-hosted agent is installed and maintained by the organization on its own infrastructure. Microsoft-hosted agents are easier to use, while self-hosted agents provide greater control and customization.

---

#### Part 4: Build the CI Pipeline

Let's build:

```text
GitHub

↓

Azure DevOps

↓

Build Docker Image

↓

Push to ACR
```

---

#### Step 1: Create GitHub Repository

Assignment requires:

```text
azure-week3-assignment
```

Create repository:

```text
azure-week3-assignment
```

---

#### Required Files

```text
azure-week3-assignment

│

├── Dockerfile

├── azure-pipelines.yml

├── README.md

└── app files
```

---

#### Step 2: Create Simple Application

Use something tiny.

Example:

`index.html`

```html
<h1>Azure Week 3 Assignment</h1>
```

---

#### Step 3: Dockerfile

Create:

#### Dockerfile

```dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
```

---

#### What does it do?

```text
nginx Image

↓

Copy index.html

↓

Create New Image
```

---

#### Step 4: Push Code to GitHub

Commit ####1

```bash
git add .
git commit -m "Initial commit"
git push
```

---

Assignment requires:

```text
At least 5 commits
```

Example:

```text
Commit 1 - Initial application

Commit 2 - Added Dockerfile

Commit 3 - Added README

Commit 4 - Added Pipeline

Commit 5 - Updated documentation
```

---

#### Step 5: Create Azure DevOps Project

Go:

```text
dev.azure.com
```

Create:

```text
week3-project
```

---

#### Step 6: Import GitHub Repo

```text
Azure DevOps

↓

Pipelines

↓

New Pipeline

↓

GitHub

↓

Select Repository
```

Choose:

```text
azure-week3-assignment
```

---

#### Step 7: Create Service Connection

Remember Q20?

Pipeline needs permission.

Create:

```text
Project Settings

↓

Service Connections

↓

New Service Connection

↓

Azure Resource Manager
```

Follow wizard.

Connect your Azure subscription.

---

#### Step 8: Create ACR

You already created:

```text
week3acr
```

(or your chosen name)

Example login server:

```text
week3acr.azurecr.io
```

---

#### Step 9: Azure Pipeline YAML

Create:

#### azure-pipelines.yml

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  imageName: 'azure-week3-app'

steps:

- task: Docker@2
  displayName: Build and Push Image
  inputs:
    containerRegistry: 'YOUR-SERVICE-CONNECTION'
    repository: 'azure-week3-app'
    command: 'buildAndPush'
    Dockerfile: '**/Dockerfile'
    tags: |
      latest
```

---

#### Explain Like a Kid

Trigger:

```text
Git Push

↓

Pipeline Starts
```

---

Agent:

```yaml
vmImage: ubuntu-latest
```

Means:

```text
Microsoft Hosted Ubuntu Machine
```

---

Build:

```text
Docker Build
```

Creates image.

---

Push:

```text
Docker Push
```

Uploads image to ACR.

---

#### Step 10: Run Pipeline

Push code:

```bash
git push
```

Pipeline starts automatically.

---

#### Pipeline Flow

```text
GitHub

↓

Azure DevOps

↓

Hosted Agent

↓

Docker Build

↓

Push To ACR

↓

Success
```

---

#### Step 11: Verify in ACR

Go:

```text
Azure Portal

↓

ACR

↓

Repositories
```

You should see:

```text
azure-week3-app
```

Success!

---

#### Screenshots Required

Take these carefully.

---

#### Screenshot 1

GitHub repository

```text
azure-week3-assignment
```

---

#### Screenshot 2

Repository showing:

```text
Dockerfile

azure-pipelines.yml

README.md
```

---

#### Screenshot 3

Azure DevOps Pipeline

```text
Successful Run
```

Green checkmark.

---

#### Screenshot 4

Pipeline stages

```text
Build

Push

Succeeded
```

---

#### Screenshot 5

ACR Repository

```text
azure-week3-app
```

---

#### Screenshot 6

Image tag

```text
latest
```

---

#### Common Beginner Mistakes

#### ❌ Forgetting Service Connection

Result:

```text
Authorization Failed
```

Pipeline cannot push.

---

#### ❌ Wrong ACR Connection

Result:

```text
Login Failed
```

---

#### ❌ Wrong Dockerfile Path

Result:

```text
Dockerfile not found
```

---

#### ❌ Less than 5 commits

Assignment requirement not met.

---

#### Final Assignment Repository Structure

```text
azure-week3-assignment

│

├── Dockerfile

├── azure-pipelines.yml

├── README.md

├── index.html

└── screenshots/
```

---

#### Interview Answer

> A Microsoft-hosted agent is a temporary build machine managed by Microsoft, while a self-hosted agent is installed and maintained by the organization. For this assignment, I used a Microsoft-hosted Ubuntu agent in Azure DevOps. I created a GitHub repository, added a Dockerfile and Azure Pipeline YAML file, configured a service connection to Azure Container Registry, and built a CI pipeline that automatically built and pushed a Docker image to ACR whenever code was pushed to the repository. This demonstrated a basic CI workflow integrating GitHub, Azure DevOps, Docker, and Azure Container Registry.

---

#### 🎯 Only One Question Left: Q22 (Self-Speech Video)

This is actually the easiest one.

I'll give you a complete **3-minute speech script** based on your journey:

* Software Testing → DevOps transition
* Week 3 Azure learning
* AKS, Networking, Entra ID
* What you enjoyed
* What was difficult
* What extra topic you explored
* Capstone goals

You can literally read it while recording and submit it. 🚀


---


---

######## 🎥 Q22. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering the following:

- Introduce yourself.
- What did you learn during Week 3?
- Which topic did you enjoy the most?
- Which topic did you find difficult?
- What additional concept did you explore beyond the training?
- What are your learning goals for the capstone week?

---



- [ ] All Azure resources deleted — attach proof
Excellent! 🎉 This is the **last step** of your assignment, and it's very important because it helps you **avoid Azure charges**.

---

#### ✅ Before You Submit

######## All Azure Resources Deleted — Attach Proof

---

#### Why Should We Delete Resources?

Remember your assignment warning:

> **VMs, Bastion, AKS, Public IPs, and other resources can incur charges.**

Think of Azure like a hotel.

######## Analogy

Imagine you book a hotel room.

```text
You Check In

↓

Use Room

↓

Finish Trip

↓

Check Out
```

If you never check out...

The hotel keeps charging you.

Azure works the same way.

If your resources keep running,

Azure may continue billing.

---

#### What Should We Delete?

If you created everything inside **one Resource Group** (which your assignment recommended), then it's very easy.

Example:

```text
week3-rg

│

├── VM

├── Virtual Network

├── Subnet

├── NSG

├── Public IP

├── Azure Bastion

├── AKS

├── Azure Container Registry

├── Route Table

└── Other Resources
```

Instead of deleting them one by one...

Delete the **Resource Group**.

Everything inside it is deleted automatically.

---

#### Step 1: Open Azure Portal

Go to:

```text
portal.azure.com

↓

Resource Groups
```

---

#### Step 2: Open Your Resource Group

Example:

```text
week3-rg
```

You'll see all the resources inside.

---

#### Step 3: Delete Resource Group

Click:

```text
Delete Resource Group
```

Azure will ask you to confirm.

To prevent accidental deletion, Azure asks you to type the Resource Group name.

Example:

```text
week3-rg
```

Type it exactly.

Then click:

```text
Delete
```

---

#### What Happens?

```text
Delete Resource Group

        │

        ▼

Deletes VM

Deletes AKS

Deletes Bastion

Deletes VNet

Deletes NSG

Deletes Public IP

Deletes ACR

Deletes Everything
```

This may take several minutes.

---

#### Alternative (Azure CLI)

If you're using Azure CLI, you can delete the Resource Group with:

```bash
az group delete --name week3-rg --yes --no-wait
```

#### What does this command mean?

```text
az group delete
```

Delete a Resource Group.

```text
--name week3-rg
```

Specify which Resource Group to delete.

```text
--yes
```

Automatically answer "Yes" to the confirmation prompt.

```text
--no-wait
```

Start the deletion and return immediately instead of waiting for it to finish.

---

#### How Do You Know It's Deleted?

Go back to:

```text
Resource Groups
```

If you no longer see:

```text
week3-rg
```

or its status changes to **Deleting** and later disappears,

your deletion was successful.

---

#### Screenshot Required 📸

Take **one final screenshot** showing one of these:

#### Option 1 (Best)

```text
Resource Groups

↓

week3-rg

Status:

Deleting
```

This proves you initiated the deletion.

---

#### Option 2

After deletion finishes:

```text
Resource Groups

↓

week3-rg

Not Found
```

or the Resource Group is no longer listed.

---

#### Common Beginner Mistakes

#### ❌ Deleting only the VM

The VM is gone, but:

* Public IP
* Bastion
* ACR
* AKS
* Disks
* Other resources

may still exist and could continue to incur charges.

---

#### ❌ Forgetting Managed Disks

If you delete individual VMs manually, check whether the managed disks were also deleted.

Deleting the **Resource Group** avoids this problem because everything inside is removed together.

---

#### ❌ Deleting the Wrong Resource Group

Always double-check the Resource Group name before confirming.

---

#### Easy Memory Trick

```text
One Resource Group

↓

One Delete

↓

Everything Removed
```

---

#### Assignment Answer (Short Version)

> After completing all the labs and taking the required screenshots, I deleted the entire Resource Group that contained all the Azure resources. This removed the Virtual Machine, AKS cluster, Azure Bastion, Azure Container Registry, Virtual Network, Network Security Group, Public IP, and all related resources, helping avoid unnecessary Azure charges.

---
