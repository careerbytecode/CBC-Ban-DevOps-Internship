# Microsoft Entra ID — Users, Security Groups and Azure RBAC

**Week 3 · Session 2 · Hands-on lab**

You will create an identity in Microsoft Entra ID, place it in a security group, deploy a
virtual machine, grant the **group** a role on the resource group, and then prove the whole
chain works by signing in as that user and connecting to the VM.

> **About the diagrams in this document**
> Every figure is an original schematic wireframe generated for this repository — it shows the
> blade layout, the navigation path, the exact fields to fill and the click order. They are
> deliberately drawn as diagrams rather than screenshots: the Azure portal changes its UI
> regularly, and a diagram that shows *structure* stays correct far longer than a screenshot
> that shows *pixels*. All files live in `images/` inside this repo, so they render in forks,
> clones, private repos, offline and in PDF exports.

---

## What you are building

```mermaid
flowchart LR
    subgraph ENTRA["Microsoft Entra ID - identity plane"]
        U["Dev User 01<br/>devuser01@tenant"]
        G["DevOps-Team<br/>Security group"]
    end

    subgraph ARM["Azure Resource Manager - resource plane"]
        RG["cbc-internship-program<br/>Resource group"]
        VM["cbc-vm<br/>Ubuntu 24.04 LTS"]
    end

    RA["Role assignment<br/>Virtual Machine User Login"]

    U -->|"member of (Part 3)"| G
    G -->|"principal of"| RA
    RA -->|"scoped to (Part 5)"| RG
    RG -->|"inherited by"| VM

    style ENTRA fill:#eef5fb,stroke:#0f6cbd
    style ARM fill:#edf7f1,stroke:#107c41
    style RA fill:#fbede6,stroke:#c8501e,stroke-width:2px
```

A role assignment is always the same three things: **who** (principal) gets **what**
(role definition) **where** (scope). Break any one link and access disappears — which is
exactly what makes this model auditable.

| Part | What you do | Plane |
|---|---|---|
| 1 | Create a user | Identity |
| 2 | Create a security group | Identity |
| 3 | Add the user to the group | Identity |
| 4 | Deploy a virtual machine | Resource |
| 5 | Assign a role to the group, scoped to the resource group | Authorization |
| 6 | Sign in as the user and connect to the VM | Verification |

---

## Prerequisites

| Requirement | Detail |
|---|---|
| Azure subscription | Any subscription where you can create resources |
| Directory role | **User Administrator** or **Global Administrator** (to create users and groups) |
| Azure role | **Owner** or **User Access Administrator** on the subscription or resource group (to create role assignments) |
| Local tools | Azure CLI with the `ssh` extension, plus WSL / MobaXterm / any terminal |
| Time | ~60 minutes |

> ⚠️ **Cost:** the VM, its managed disk and its public IP all bill while they exist.
> Delete the resource group when you finish — see [Cleanup](#cleanup).

---

## Step 1 — Sign in to the Azure portal

1. Open **https://portal.azure.com**
2. Enter the **user principal name** of your administrator account.
3. Click **Next**, then complete the password and MFA prompts.

<img width="1180" alt="Step 1 — Sign in to the Azure portal: browser at portal.azure.com showing the Microsoft sign-in card with the account field and Next button" src="images/01-sign-in-to-azure-portal.svg" />

---

## Step 2 — Open Microsoft Entra ID

1. Click the global **search bar** at the top of the portal and type `Microsoft Entra ID`.
2. Select **Microsoft Entra ID** under **Services**.

<img width="1180" alt="Step 2 — Open Microsoft Entra ID: portal search bar with the services dropdown, Microsoft Entra ID highlighted as the first result" src="images/02-open-microsoft-entra-id.svg" />

---

# Part 1 — Create a user

## Step 3 — Navigate to Users

1. In the left menu, click **Users**.
2. Make sure the **All users** tab is selected.
3. Click **+ New user** on the command bar.
4. Choose **Create new user**.

<img width="1180" alt="Step 3 — Navigate to Users: Entra ID Users blade with the left navigation, command bar, All users tab and the New user dropdown menu open" src="images/03-navigate-to-users.svg" />

---

## Step 4 — Enter the user details

| Field | Value to use |
|---|---|
| User principal name | `devuser01` @ *yourtenant*.onmicrosoft.com |
| Display name | `Dev User 01` |
| Password | **Auto-generate password** (recommended) |
| Account enabled | ✅ Selected |

Then click **Review + create**.

<img width="1180" alt="Step 4 — Basics tab of Create new user showing the user principal name, display name, auto-generate password checkbox and account enabled checkbox" src="images/04-enter-user-details.svg" />

---

## Step 5 — Create the user

1. Confirm **Validation passed**.
2. Review the summary.
3. Click **Create**.

<img width="1180" alt="Step 5 — Review and create screen with a validation passed banner, the summary of user properties and the Create button" src="images/05-create-the-user.svg" />

> 🔐 **Copy the temporary password now.** The portal shows it once. The user must change it
> at first sign-in (Step 26).

---

## Step 6 — Verify the user

1. Go to **Users → All users**.
2. Search for `devuser01`.
3. Confirm the **Status** column reads **Enabled**.

<img width="1180" alt="Step 6 — All users list filtered to devuser01, showing the new user row with an Enabled status pill" src="images/06-verify-the-user.svg" />

---

# Part 2 — Create a security group

## Step 7 — Navigate to Groups

1. In Microsoft Entra ID, click **Groups**.
2. Select **All groups**.
3. Click **+ New group**.

<img width="1180" alt="Step 7 — Entra ID Groups blade with the All groups tab and the New group command highlighted" src="images/07-navigate-to-groups.svg" />

---

## Step 8 — Configure the group

| Field | Value to use |
|---|---|
| Group type | `Security` |
| Group name | `DevOps-Team` |
| Group description | `DevOps Security Group` |
| Entra roles can be assigned | `No` |
| Membership type | `Assigned` |

Click **Create**.

<img width="1180" alt="Step 8 — New Group form showing group type Security, name DevOps-Team, description, and membership type Assigned" src="images/08-configure-the-group.svg" />

> **Security vs Microsoft 365 group:** only a **Security** group can be used as an Azure RBAC
> principal. A Microsoft 365 group adds a mailbox, calendar and Teams team — useful for
> collaboration, wrong for access control.

---

## Step 9 — Verify the group

1. Go to **Groups → All groups**.
2. Search for `DevOps-Team`.
3. Note the **Object Id** — role assignments reference this, not the display name.

<img width="1180" alt="Step 9 — All groups list filtered to DevOps-Team showing its object id, group type and membership type" src="images/09-verify-the-group.svg" />

---

# Part 3 — Add the user to the group

## Step 10 — Open the group

1. From **All groups**, click **DevOps-Team**.
2. Note that **Members** currently reads **0**.

<img width="1180" alt="Step 10 — DevOps-Team group Overview blade showing membership type, source, object id and a member count of zero" src="images/10-open-the-group.svg" />

---

## Step 11 — Add members

1. In the group's left menu, click **Members**.
2. Click **+ Add members**.
3. Search for `Dev User 01`.
4. Click the user to select it.
5. Click **Select**.

<img width="1180" alt="Step 11 — Members blade with the Add members panel open, Dev User 01 searched and selected, and the Select button" src="images/11-add-members.svg" />

---

## Step 12 — Verify group membership

Confirm the user now appears in the members list.

<img width="1180" alt="Step 12 — Group members list showing Dev User 01 as a direct member of DevOps-Team" src="images/12-verify-group-membership.svg" />

✅ **Identity plane complete.** The user is in the group — and still has access to nothing.

---

# Part 4 — Create the virtual machine

## Step 13 — Open Virtual machines

Search for `Virtual machines` in the global search bar and open the service.

<img width="1180" alt="Step 13 — Portal search for Virtual machines with the service highlighted in the results dropdown" src="images/13-open-virtual-machines.svg" />

---

## Step 14 — Create a new virtual machine

1. Click **+ Create**.
2. Choose **Azure virtual machine**.

<img width="1180" alt="Step 14 — Virtual machines blade with the Create menu open and Azure virtual machine highlighted" src="images/14-create-a-new-virtual-machine.svg" />

---

## Step 15 — Basics tab

**Project and instance details**

| Field | Value to use |
|---|---|
| Subscription | Your Azure subscription |
| Resource group | `cbc-internship-program` *(create new if needed)* |
| Virtual machine name | `cbc-vm` |
| Region | `(US) East US` — or your nearest region |
| Availability options | `No infrastructure redundancy required` |
| Security type | `Standard` |
| Image | `Ubuntu Server 24.04 LTS – x64 Gen2` |
| VM architecture | `x64` |
| Size | `Standard_B1s` — 1 vcpu, 1 GiB memory |

<img width="1180" alt="Step 15a — Create a virtual machine Basics tab showing subscription, resource group, VM name, region, image and size fields" src="images/15-vm-basics-project-and-instance.svg" />

**Administrator account and inbound ports**

| Field | Value to use |
|---|---|
| Authentication type | `Password` |
| Username | `learning` |
| Password / Confirm password | A strong password you control |
| Public inbound ports | `Allow selected ports` |
| Select inbound ports | `SSH (22)`, `HTTP (80)`, `HTTPS (443)` |

Click **Next: Disks >**.

<img width="1180" alt="Step 15b — Basics tab administrator account section with password authentication, username, and inbound port rules for SSH, HTTP and HTTPS" src="images/16-vm-basics-admin-and-ports.svg" />

> ⚠️ **Lab settings, not production settings.** A local password plus port 22 open to the
> internet is fine for a classroom exercise and unacceptable in a real environment. Production
> uses SSH keys, a source IP restriction, and Azure Bastion or a private endpoint.

---

## Step 16 — Disks tab

| Field | Value to use |
|---|---|
| OS disk type | `Standard HDD (locally-redundant storage)` |

Leave everything else at its default and click **Next: Networking >**.

<img width="1180" alt="Step 16 — Disks tab with OS disk type set to Standard HDD and the remaining options at their defaults" src="images/17-vm-disks-tab.svg" />

---

## Step 17 — Networking tab

| Field | Value to use |
|---|---|
| Virtual network | Create new, or leave the default |
| Subnet | `default` |
| Public IP | Create new, or leave the default |
| NIC network security group | `Basic` |
| Public inbound ports | `Allow selected ports` |
| Select inbound ports | `22`, `80`, `443` |
| Delete public IP and NIC when VM is deleted | ✅ Selected |

Click through to **Review + create**.

<img width="1180" alt="Step 17 — Networking tab showing virtual network, subnet, public IP, NSG basic option and the inbound port selection" src="images/18-vm-networking-tab.svg" />

---

## Step 18 — Review + create

1. Confirm **Validation passed**.
2. Review the summary and the estimated cost.
3. Click **Create** and wait for the deployment to finish.

<img width="1180" alt="Step 18 — Review and create tab for the virtual machine with a validation passed banner and the configuration summary" src="images/19-vm-review-and-create.svg" />

---

## Step 19 — Verify the virtual machine

Open **Virtual machines** and confirm `cbc-vm` shows **Running**.

<img width="1180" alt="Step 19 — Virtual machines list showing cbc-vm in the cbc-internship-program resource group with a Running status pill" src="images/20-verify-the-virtual-machine.svg" />

### Enable Entra ID login on the VM

`az ssh vm` in Step 28 needs the Entra ID login extension on the guest OS. If you did not tick
**Login with Microsoft Entra ID** during creation, add it now from Cloud Shell:

```bash
az vm extension set \
  --resource-group cbc-internship-program \
  --vm-name cbc-vm \
  --name AADSSHLoginForLinux \
  --publisher Microsoft.Azure.ActiveDirectory
```

---

# Part 5 — Assign access with Azure RBAC

## Step 20 — Open the resource group

Navigate to **Resource groups** and open **cbc-internship-program**. This resource group is the
**scope** of the assignment you are about to create.

<img width="1180" alt="Step 20 — Resource groups list with cbc-internship-program highlighted" src="images/21-open-the-resource-group.svg" />

```mermaid
flowchart TD
    MG["Management group"] --> SUB["Subscription"]
    SUB --> RG["Resource group<br/>cbc-internship-program"]
    RG --> VM["Resource<br/>cbc-vm"]
    RG -.->|"an assignment made here<br/>is inherited downward"| VM

    style RG fill:#fbede6,stroke:#c8501e,stroke-width:2px
```

Assign at the **narrowest scope that still does the job**. A role granted on the subscription
reaches everything in it — usually far more than intended.

---

## Step 21 — Open Access control (IAM)

1. In the resource group's left menu, click **Access control (IAM)**.
2. Click **+ Add**.
3. Choose **Add role assignment**.

<img width="1180" alt="Step 21 — Resource group Access control IAM blade with the Add menu open and Add role assignment highlighted" src="images/22-open-access-control-iam.svg" />

---

## Step 22 — Select the role

Search for `virtual machine` and pick the role you need.

| Role | What it grants |
|---|---|
| **Virtual Machine User Login** | See the VM and sign in with an Entra ID identity as a **standard user** |
| **Virtual Machine Administrator Login** | The same, plus **root / local administrator** rights inside the guest OS |
| Virtual Machine Contributor | Manage the VM resource — but *not* the VNet, and *not* the OS inside it |
| Network Contributor | Manage networking resources (VNet, NSG, public IP) |

**Use `Virtual Machine User Login` for this lab.** Click **Next**.

<img width="1180" alt="Step 22 — Add role assignment Role tab with a search for virtual machine and the four candidate roles listed" src="images/23-select-the-role.svg" />

> These two login roles carry **dataActions** — they authorize the sign-in itself, which is why
> the `AADSSHLoginForLinux` extension has to be present on the VM.

---

## Step 23 — Assign the role to the group

1. On the **Members** tab, leave **User, group, or service principal** selected.
2. Click **+ Select members**.
3. Search for `DevOps-Team`.
4. Select the **group** — not the user.
5. Click **Select**.
6. Click **Review + assign**, then **Assign**.

<img width="1180" alt="Step 23 — Members tab of Add role assignment with the DevOps-Team security group selected as the principal" src="images/24-assign-the-security-group.svg" />

> **Never assign to the user directly.** Assigning to the group means onboarding and
> offboarding become membership changes: no permission edits, no drift, one place to audit.

---

## Step 24 — Verify the role assignment

1. Open **Access control (IAM) → Role assignments**.
2. Filter for `DevOps`.
3. Confirm the entry below exists.

| Principal | Type | Role | Scope |
|---|---|---|---|
| DevOps-Team | Group | Virtual Machine User Login | This resource |

<img width="1180" alt="Step 24 — Role assignments tab showing DevOps-Team with the Virtual Machine User Login role scoped to this resource" src="images/25-verify-the-role-assignment.svg" />

The **Scope** column is the one to read when troubleshooting: *This resource* means the
assignment lives here, *Inherited* means it comes from a parent scope you would have to edit
somewhere else.

---

# Part 6 — Verify as the end user

## Step 25 — Sign out of the administrator account

Click the profile icon in the top-right corner, then **Sign out**.

<img width="900" alt="Step 25 — Portal account flyout with the Sign out link highlighted" src="images/26-sign-out-of-the-administrator-account.svg" />

> 💡 Faster alternative: open **https://portal.azure.com** in a **private / incognito window**
> and keep both sessions alive at once.

---

## Step 26 — Sign in as the Entra ID user

| Field | Value |
|---|---|
| Username | `devuser01@yourtenant.onmicrosoft.com` |
| Password | The temporary password from Step 5 |

You will be asked to set a permanent password on first sign-in.

<img width="1180" alt="Step 26 — Three sign-in cards in sequence: enter the user principal name, enter the temporary password, then set a permanent password" src="images/27-sign-in-using-the-created-user.svg" />

Depending on tenant policy you may also see MFA registration and a "Stay signed in?" prompt.

<img width="1000" alt="Step 26 continued — first-run prompts for multifactor authentication registration and the stay signed in question" src="images/28-first-run-prompts.svg" />

---

## Step 27 — Confirm what the user can see

Search for **Virtual machines**. `cbc-vm` is visible — because of the group membership, not
because anything was granted to the user directly.

<img width="1180" alt="Step 27 — Virtual machines list as seen by Dev User 01, showing cbc-vm is visible through inherited group access" src="images/29-user-view-of-the-virtual-machine.svg" />

```mermaid
sequenceDiagram
    autonumber
    participant U as Dev User 01
    participant E as Microsoft Entra ID
    participant A as Azure Resource Manager
    participant V as cbc-vm

    U->>E: Sign in (username, password, MFA)
    E-->>U: Token containing group membership claims
    U->>A: List virtual machines (token attached)
    A->>A: Evaluate role assignments for principal and scope
    Note over A: DevOps-Team -> Virtual Machine User Login -> resource group
    A-->>U: cbc-vm returned (read permitted)
    U->>V: az ssh vm
    V->>E: Validate the Entra ID certificate
    E-->>V: Identity confirmed, standard-user mapping
    V-->>U: Shell session opened
```

---

## Step 28 — Connect to the virtual machine

**a. Authenticate the CLI as the Entra ID user**

Open WSL, MobaXterm or any terminal and run:

```bash
az login --use-device-code
```

1. The terminal prints a URL and a device code.
2. Open **https://microsoft.com/devicelogin** in a browser and enter the code.
3. Pick **Dev User 01** — or choose *Use another account* and sign in explicitly.
4. Confirm the "Are you trying to sign in to Microsoft Azure CLI?" prompt.
5. Verify the CLI identity with `az account show --query user.name -o tsv`.

<img width="1160" alt="Step 28a — Device code sign-in: terminal showing the code, the devicelogin page, the account picker and the CLI identity confirmation" src="images/30-device-code-sign-in.svg" />

**b. Open the SSH session**

```bash
az ssh vm \
  --resource-group cbc-internship-program \
  --name cbc-vm
```

<img width="1160" alt="Step 28b — Terminal running az ssh vm, connecting to Ubuntu, whoami returning the Entra ID user, and sudo being refused" src="images/31-az-ssh-vm.svg" />

Azure mints a **short-lived SSH certificate** from the Entra ID token. No key sits on the VM
and no password is shared, so revoking access is a group-membership removal rather than a key
rotation exercise.

`sudo` is refused — and that is the correct result. **Virtual Machine User Login** maps to a
standard OS user; **Virtual Machine Administrator Login** is the role that maps to root.
Seeing the refusal is your proof that least privilege is working end to end.

---

# Verification checklist

| # | Check | Where | Expected |
|---|---|---|---|
| 1 | User exists and is enabled | Entra ID → Users | `Dev User 01` · Enabled |
| 2 | Security group exists | Entra ID → Groups | `DevOps-Team` · Security · Assigned |
| 3 | User is a member | Group → Members | `Dev User 01` listed |
| 4 | VM is deployed | Virtual machines | `cbc-vm` · Running |
| 5 | Role assignment exists | Resource group → IAM → Role assignments | `DevOps-Team` · Virtual Machine User Login · This resource |
| 6 | Check access agrees | Resource group → IAM → Check access → `Dev User 01` | Role shown as inherited from the group |
| 7 | User can see the VM | Portal as `devuser01` | `cbc-vm` visible |
| 8 | User can connect | `az ssh vm` | Shell opens; `sudo` refused |

---

# Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| User sees an empty subscription list | Token predates the role assignment | Sign out and back in, or wait a few minutes for propagation |
| VM not visible to the user | Assignment made at the wrong scope, or made to the user instead of the group | Check the **Scope** column in Role assignments |
| `az ssh vm` → *extension not found* | `AADSSHLoginForLinux` missing on the VM | Run the `az vm extension set` command in Step 19 |
| `az ssh vm` → *permission denied* | Role lacks the login **dataAction** | Use Virtual Machine User Login or Administrator Login — Contributor is not enough |
| Connection times out | Port 22 blocked by the NSG | Check the inbound rules on the NIC network security group |
| CLI still acting as the admin | Old CLI session cached | `az logout`, then `az login --use-device-code` |
| `sudo` refused | Working as designed for User Login | Assign Virtual Machine **Administrator** Login only if root is genuinely required |

---

# Cleanup

Delete the whole resource group when you are finished — the VM, disk, NIC, public IP and NSG
go with it:

```bash
az group delete --name cbc-internship-program --yes --no-wait
```

Then remove the identity objects in Entra ID: delete the `DevOps-Team` group and the
`Dev User 01` user.

---

# What you learned

- A **user** authenticates; it does not authorize. Access comes from a role assignment.
- A **security group** is the right RBAC principal — assign once, manage membership forever.
- A **role assignment** is *principal + role definition + scope*, and scope is inherited downward.
- **Least privilege** is a decision you make at the role-selection screen, and `sudo` being
  refused is what success looks like.
- **Entra ID SSH** replaces shared keys and passwords with short-lived, revocable certificates.

---

<div align="center">

**CareerByteCode** · *Learning Made Simple*

[www.careerbytecode.com](https://www.careerbytecode.com) · careerbytec@gmail.com · +32 471 40 89 08

*Bangalore Cloud & DevOps Internship — Week 3, Session 2*

</div>
