# Create a User and Security Group in Microsoft Entra ID

## Step 1: Sign in to Azure Portal

1. Open **https://portal.azure.com**
2. Sign in with your Azure Administrator account.
<img width="1354" alt="Step 1: Sign in to Azure Portal" src="images/01-sign-in-to-azure-portal.png" />


---

## Step 2: Open Microsoft Entra ID

1. In the search bar, type **Microsoft Entra ID**.
2. Click **Microsoft Entra ID** from the search results.
<img width="1354" alt="Step 2: Open Microsoft Entra ID" src="images/02-open-microsoft-entra-id.png" />


---

# Part 1: Create a New User

## Step 3: Navigate to Users

1. In the left menu, click **Users**.
2. Select **All users**.
3. Click **+ New user**.
4. Select **Create new user**.
<img width="1361" alt="Step 3: Navigate to Users" src="images/03-navigate-to-users.png" />


---

## Step 4: Enter User Details

Fill in the required information.

| Field | Example |
|--------|---------|
| User principal name | devuser01@yourtenant.onmicrosoft.com |
| Display name | Dev User 01 |
| Password | Auto-generate Password Check Box (Recommended) |
| Account Enabled | Select Chec Box |

Click **Review + Create**.

<img width="1361" alt="Step 4: Enter User Details" src="images/04-enter-user-details.png" />


---

## Step 5: Create the User

1. Review the entered information.
2. Click **Create**.
3. Wait until the deployment completes.

<img width="1361" alt="Step 5: Create the User" src="images/05-create-the-user.png" />


---

## Step 6: Verify the User

1. Go to **Users** → **All users**.
2. Search for the newly created user.
3. Verify that the user status is **Enabled**.
   
<img width="1356" alt="Step 6: Verify the User" src="images/06-verify-the-user.png" />


---

# Part 2: Create a Group

## Step 7: Navigate to Groups

1. In Microsoft Entra ID, click **Groups**.
2. Click **All groups**.
3. Click **+ New group**.
   
<img width="1353" alt="Step 7: Navigate to Groups" src="images/07-navigate-to-groups.png" />


---

## Step 8: Configure the Group

Provide the following details.

| Field | Example |
|--------|---------|
| Group type | Security |
| Group name | DevOps-Team |
| Group description | DevOps Security Group |
| Membership type | Assigned |

Click **Create**.

<img width="1352" alt="Step 8: Configure the Group" src="images/08-configure-the-group.png" />


---

## Step 9: Verify the Group

1. Go to **Groups** → **All groups**.
2. Search for **DevOps-Team**.
3. Open the group to verify it was created successfully.

<img width="1353" alt="Step 9: Verify the Group" src="images/09-verify-the-group.png" />


---

# Part 3: Add the User to the Group

## Step 10: Open the Group

1. Navigate to **Groups**.
2. Open the **DevOps-Team** group.

---

## Step 11: Add Members

1. Click **Members**.
2. Click **+ Add members**.
3. Search for the user you created (e.g., **Dev User 01**).
4. Select the user.
5. Click **Select**.
<img width="1352" alt="Step 11: Add Members" src="images/10-add-members.png" />

---

## Step 12: Verify Group Membership

1. Stay on the **Members** page.
2. Confirm that the user appears in the members list.
   
<img width="1354" alt="Step 12: Verify Group Membership" src="images/11-verify-group-membership.png" />


---

# Verification

## Verify the User

- Microsoft Entra ID → Users → All users
- Confirm the user is listed and enabled.
<img width="1346" alt="Verify the User" src="images/12-verify-the-user.png" />

## Verify the Group

- Microsoft Entra ID → Groups → All groups
- Confirm the group exists.
<img width="1347" alt="Verify the Group" src="images/13-verify-the-group.png" />

## Verify Membership

- Open the group.
- Go to **Members**.
- Confirm the created user is a member of the group.
<img width="1353" alt="Verify Membership" src="images/14-verify-membership.png" />

---
# Part 4: Create a Basic Azure Virtual Machine

In this section, you will create a basic Windows Virtual Machine that will later be accessed using the Microsoft Entra ID user.

---

## Step 13: Open Virtual Machines

1. Sign in to the Azure Portal.
2. In the search bar, type **Virtual Machines**.
3. Click **Virtual Machines**.
   
<img width="1353" alt="Step 13: Open Virtual Machines" src="images/15-open-virtual-machines.png" />

---

## Step 14: Create a New Virtual Machine

1. Click **+ Create**.
2. Select **Azure Virtual Machine**.

<img width="1356" alt="Step 14: Create a New Virtual Machine" src="images/16-create-a-new-virtual-machine.png" />

---

## Step 15: Configure the Basics Tab

Enter the following details.

| Field | Example |
|--------|---------|
| Subscription | Azure Subscription |
| Resource Group | cbc-intrenship-program |
| Virtual Machine Name | cbc-vm |
| Region | East US (or your preferred region) |
| Availability Options | No infrastructure redundancy required |
| Security Type | Standard |
| Image | Ubuntu Server 24.04 LTS - x64 Gen2 |
| VM Architecture | x64 |
| Size | Standard_B1s - 1 cpu, 1 Gi memory |
| Authentication Type | Password |
| Username | learning |
| Password | Redhat@12345 |
| Confirm Password | Redhat@12345 |
| Public Inbound Ports | Allow selected ports |
| Select Inbound Ports | 22, 443, 80 |

Click **Next: Disks**.

<img width="892" alt="Step 15: Configure the Basics Tab" src="images/17-configure-the-basics-tab.png" />
<img width="827" alt="Step 15: Configure the Basics Tab" src="images/18-configure-the-basics-tab.png" />
<img width="870" alt="Step 15: Configure the Basics Tab" src="images/19-configure-the-basics-tab.png" />
<img width="954" alt="Step 15: Configure the Basics Tab" src="images/20-configure-the-basics-tab.png" />


---

## Step 16: Configure the Disks Tab

| Field | Value |
|--------|-------|
| OS Disk Type | Standard HDD |

Leave the remaining settings as default.

Click **Next: Networking**.

<img width="883" alt="Step 16: Configure the Disks Tab" src="images/21-configure-the-disks-tab.png" />

---

## Step 17: Configure the Networking Tab

Configure the following settings.

| Field | Example |
|--------|---------|
| Virtual Network | Create new or Select existing or leave it |
| Subnet | Default or leave it |
| Public IP | Create new or leave it |
| NIC Network Security Group | Basic |
| Public Inbound Ports | Allow selected ports |
| Select Inbound Ports | 80, 443, 22 |
| Delete public IP and NIC when VM is deleted | Select Check Box |

Leave all other settings as default.

Click **Next** until you reach **Review + Create**.

<img width="822" alt="Step 17: Configure the Networking Tab" src="images/22-configure-the-networking-tab.png" />
<img width="795" alt="Step 17: Configure the Networking Tab" src="images/23-configure-the-networking-tab.png" />
<img width="924" alt="Step 17: Configure the Networking Tab" src="images/24-configure-the-networking-tab.png" />

---

## Step 18: Review and Create the Virtual Machine

1. Review all the configuration details.
2. Click **Create**.
3. Wait for the deployment to complete.
<img width="1360" alt="Step 18: Review and Create the Virtual Machine" src="images/25-review-and-create-the-virtual-machine.png" />

---

## Step 19: Verify the Virtual Machine

1. Navigate to **Virtual Machines**.
2. Open **demo-vm**.
3. Verify the VM status is **Running**.

---

# Part 5: Assign the Virtual Machine Access 

## Step 20: Open the Resource Group

1. Navigate to **Resourse Group**.
2. Select **cbc-intrenship-program**.
<img width="1354" alt="Step 20: Open the Resource Group" src="images/26-open-the-resource-group.png" />

---

## Step 21: Open Access Control (IAM)

1. In the left menu, click **Access control (IAM)**.
2. Click **+ Add**.
3. Select **Add role assignment**.
   
<img width="1337" alt="Step 21: Open Access Control (IAM)" src="images/27-open-access-control-iam.png" />

---

## Step 22: Select the Virtual Machine Role

Choose the following role.

| Role | Description |
|--------|------------|
| Virtual Machine User Login | Allows users to sign in to the VM using Microsoft Entra ID |
| Network Contributer | Allows users to sign in as an administrator using Microsoft Entra ID |


Click **Next**.

<img width="1345" alt="Step 22: Select the Virtual Machine Role" src="images/28-select-the-virtual-machine-role.png" />

<img width="1287" alt="Step 22: Select the Virtual Machine Role" src="images/29-select-the-virtual-machine-role.png" />


---

## Step 23: Assign the Security Group

1. Under **Assign access to**, select **User, group, or service principal**.
2. Click **+ Select members**.
3. Search for **DevOps-Team**.
4. Select the group.
5. Click **Select**.
6. Click **Review + Assign**.
7. Click **Assign**.

<img width="1360" alt="Step 23: Assign the Security Group" src="images/30-assign-the-security-group.png" />
<img width="1353" alt="Step 23: Assign the Security Group" src="images/31-assign-the-security-group.png" />



---

## Step 24: Verify the Role Assignment

1. Open **Access control (IAM)**.
2. Click **Role assignments**.
3. Verify the following entry exists.

| Principal | Role |
|------------|------|
| DevOps-Team | Virtual Machine Administrator Login |

<img width="1345" alt="Step 24: Verify the Role Assignment" src="images/32-verify-the-role-assignment.png" />


---

# Part 6: Login Using the Microsoft Entra ID User

## Step 25: Sign Out of the Administrator Account

1. Click your profile icon.
2. Click **Sign out**.

<img width="535" alt="Step 25: Sign Out of the Administrator Account" src="images/33-sign-out-of-the-administrator-account.png" />


---

## Step 26: Sign in Using the Created User

1. Open **https://portal.azure.com**
2. Login using the Microsoft Entra ID user.

| Field | Example |
|--------|---------|
| Username | devuser01@yourtenant.onmicrosoft.com |
| Password | User Password |
<img width="459" alt="Step 26: Sign in Using the Created User" src="images/34-sign-in-using-the-created-user.png" />
<img width="464" alt="Step 26: Sign in Using the Created User" src="images/35-sign-in-using-the-created-user.png" />

If prompted, change the temporary password.
<img width="458" alt="Step 26: Sign in Using the Created User" src="images/36-sign-in-using-the-created-user.png" />
<img width="466" alt="Step 26: Sign in Using the Created User" src="images/37-sign-in-using-the-created-user.png" />
<img width="451" alt="Step 26: Sign in Using the Created User" src="images/38-sign-in-using-the-created-user.png" />
<img width="468" alt="Step 26: Sign in Using the Created User" src="images/39-sign-in-using-the-created-user.png" />
<img width="454" alt="Step 26: Sign in Using the Created User" src="images/40-sign-in-using-the-created-user.png" />
<img width="456" alt="Step 26: Sign in Using the Created User" src="images/41-sign-in-using-the-created-user.png" />
<img width="450" alt="Step 26: Sign in Using the Created User" src="images/42-sign-in-using-the-created-user.png" />
<img width="1347" alt="Step 26: Sign in Using the Created User" src="images/43-sign-in-using-the-created-user.png" />

---

## Step 27: Verify the Virtual Machine

1. Search for **Virtual Machines**.
2. Open **cbc-vm**.
   
<img width="1342" alt="Step 27: Verify the Virtual Machine" src="images/44-verify-the-virtual-machine.png" />
<img width="1350" alt="Step 27: Verify the Virtual Machine" src="images/45-verify-the-virtual-machine.png" />

Since the user is a member of the **DevOps-Team** Security Group and the group has been assigned the **Virtual Machine Administrator Login** role, the VM will be visible to the user.

---

## Step 28: Connect to the Virtual Machine

1. Open **Mobaextrem or ubuntu wsl**
<img width="1071" alt="Step 28: Connect to the Virtual Machine" src="images/46-connect-to-the-virtual-machine.png" />
2. Open the URL in browser.
<img width="563" alt="Step 28: Connect to the Virtual Machine" src="images/47-connect-to-the-virtual-machine.png" />
3. Enter the token given in mobaterm or ubuntu.
<img width="363" alt="Step 28: Connect to the Virtual Machine" src="images/48-connect-to-the-virtual-machine.png" />
4. Select the user, if it not present click on user another acount add your entra ID User.
<img width="467" alt="Step 28: Connect to the Virtual Machine" src="images/49-connect-to-the-virtual-machine.png" />
5. click on continue
<img width="525" alt="Step 28: Connect to the Virtual Machine" src="images/50-connect-to-the-virtual-machine.png" />
6. Chec in CLI your user is logedin.
<img width="552" alt="Step 28: Connect to the Virtual Machine" src="images/51-connect-to-the-virtual-machine.png" />
7. Now run the az commad to connect the vm.
   az ssh vm --resource-group cbc-intrenship-program --name cbc-vm

<img width="1071" alt="Step 28: Connect to the Virtual Machine" src="images/52-connect-to-the-virtual-machine.png" />


---

# Verification

## Verify the Virtual Machine

- Virtual Machine is deployed successfully.
- VM status is **Running**.

## Verify Role Assignment

- Virtual Machine → Access Control (IAM)
- Confirm **DevOps-Team** is assigned the **Virtual Machine Administrator Login** role.

## Verify User Access

- Login using the Microsoft Entra ID user.
- Open **Virtual Machines**.
- Verify **demo-vm** is visible.
- Connect to the Virtual Machine successfully.

---

# Implementation Completed

You have successfully:

- Created a basic Azure Virtual Machine.
- Created a Microsoft Entra ID user.
- Created a Security Group.
- Added the user to the Security Group.
- Assigned the **Virtual Machine Administrator Login** role to the Security Group.
- Logged in using the Microsoft Entra ID user.
- Verified that the user can view and access the Virtual Machine through group-based Azure RBAC.
