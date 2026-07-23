# Create a User and Security Group in Microsoft Entra ID

## Step 1: Sign in to Azure Portal

1. Open **https://portal.azure.com**
2. Sign in with your Azure Administrator account.
<img width="1354" height="603" alt="image" src="https://github.com/user-attachments/assets/a742d761-af69-42e8-bd07-a07dba22e46b" />


---

## Step 2: Open Microsoft Entra ID

1. In the search bar, type **Microsoft Entra ID**.
2. Click **Microsoft Entra ID** from the search results.
<img width="1354" height="218" alt="image" src="https://github.com/user-attachments/assets/37249b1a-9f12-4a8a-89ac-ff0c279977b3" />


---

# Part 1: Create a New User

## Step 3: Navigate to Users

1. In the left menu, click **Users**.
2. Select **All users**.
3. Click **+ New user**.
4. Select **Create new user**.
<img width="1361" height="520" alt="image" src="https://github.com/user-attachments/assets/d58b6410-4b6d-43ca-90f5-eaf38b9ba34a" />


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

<img width="1361" height="605" alt="image" src="https://github.com/user-attachments/assets/e77653cd-f4c5-42e7-9fd5-49b1af7d6669" />


---

## Step 5: Create the User

1. Review the entered information.
2. Click **Create**.
3. Wait until the deployment completes.

<img width="1361" height="607" alt="image" src="https://github.com/user-attachments/assets/e6de1d63-2a5f-4a49-a952-70707391d801" />


---

## Step 6: Verify the User

1. Go to **Users** → **All users**.
2. Search for the newly created user.
3. Verify that the user status is **Enabled**.
   
<img width="1356" height="602" alt="image" src="https://github.com/user-attachments/assets/bf9c47ec-82e1-44f1-bfab-64bfe49c960e" />


---

# Part 2: Create a Group

## Step 7: Navigate to Groups

1. In Microsoft Entra ID, click **Groups**.
2. Click **All groups**.
3. Click **+ New group**.
   
<img width="1353" height="606" alt="image" src="https://github.com/user-attachments/assets/b97096d3-8eda-4049-b42d-34923c438cac" />


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

<img width="1352" height="596" alt="image" src="https://github.com/user-attachments/assets/95ef9725-fe21-48fd-979b-d7da94a0c99d" />


---

## Step 9: Verify the Group

1. Go to **Groups** → **All groups**.
2. Search for **DevOps-Team**.
3. Open the group to verify it was created successfully.

<img width="1353" height="560" alt="image" src="https://github.com/user-attachments/assets/ff0df46f-317b-4443-9804-8319e459e879" />


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
<img width="1352" height="603" alt="image" src="https://github.com/user-attachments/assets/e7c0c355-d888-4a30-add5-534f2e030da3" />

---

## Step 12: Verify Group Membership

1. Stay on the **Members** page.
2. Confirm that the user appears in the members list.
   
<img width="1354" height="597" alt="image" src="https://github.com/user-attachments/assets/95324534-851f-4fb9-81a0-17f5f750bb62" />


---

# Verification

## Verify the User

- Microsoft Entra ID → Users → All users
- Confirm the user is listed and enabled.
<img width="1346" height="596" alt="image" src="https://github.com/user-attachments/assets/77e0b66b-2803-4498-add7-d2bdd3a86a90" />

## Verify the Group

- Microsoft Entra ID → Groups → All groups
- Confirm the group exists.
<img width="1347" height="601" alt="image" src="https://github.com/user-attachments/assets/089d7126-d6e2-4c34-a839-bd8f3f9c10f8" />

## Verify Membership

- Open the group.
- Go to **Members**.
- Confirm the created user is a member of the group.
<img width="1353" height="600" alt="image" src="https://github.com/user-attachments/assets/ce83a9be-1c24-4bff-83bc-41cdbb8677f1" />

---
# Part 4: Create a Basic Azure Virtual Machine

In this section, you will create a basic Windows Virtual Machine that will later be accessed using the Microsoft Entra ID user.

---

## Step 13: Open Virtual Machines

1. Sign in to the Azure Portal.
2. In the search bar, type **Virtual Machines**.
3. Click **Virtual Machines**.
   
<img width="1353" height="593" alt="image" src="https://github.com/user-attachments/assets/6e8a8ad6-5cfa-4007-a6eb-8a6948ebd122" />

---

## Step 14: Create a New Virtual Machine

1. Click **+ Create**.
2. Select **Azure Virtual Machine**.

<img width="1356" height="602" alt="image" src="https://github.com/user-attachments/assets/1d7f7a11-2b78-41fc-8414-92d38b12d72b" />

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

<img width="892" height="561" alt="image" src="https://github.com/user-attachments/assets/bd4e1f26-510d-463b-bae7-edc80893000b" />
<img width="827" height="456" alt="image" src="https://github.com/user-attachments/assets/20fca4e7-4a92-4f47-847c-b14e4e2d60cf" />
<img width="870" height="448" alt="image" src="https://github.com/user-attachments/assets/fb25500c-540d-4142-a3c6-16b9b5599ad1" />
<img width="954" height="443" alt="image" src="https://github.com/user-attachments/assets/9ccb7eea-e921-46a6-bf2f-ddd69189f31a" />


---

## Step 16: Configure the Disks Tab

| Field | Value |
|--------|-------|
| OS Disk Type | Standard HDD |

Leave the remaining settings as default.

Click **Next: Networking**.

<img width="883" height="455" alt="image" src="https://github.com/user-attachments/assets/2e8fb695-36fe-4a3e-927a-a89cf18656b0" />

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

<img width="822" height="443" alt="image" src="https://github.com/user-attachments/assets/0cdf665e-d9d2-4f48-a5c2-57beed70e7dd" />
<img width="795" height="444" alt="image" src="https://github.com/user-attachments/assets/9f708b47-2e02-4e28-8916-3d1798762fea" />
<img width="924" height="548" alt="image" src="https://github.com/user-attachments/assets/db863005-0e73-4540-bc30-29ee831e49db" />

---

## Step 18: Review and Create the Virtual Machine

1. Review all the configuration details.
2. Click **Create**.
3. Wait for the deployment to complete.
<img width="1360" height="603" alt="image" src="https://github.com/user-attachments/assets/f90a9a74-adc0-4aac-ac58-ab4e5364d3a1" />

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
<img width="1354" height="426" alt="image" src="https://github.com/user-attachments/assets/438fd66c-c0ee-4e58-a07e-7a169bbfba09" />

---

## Step 21: Open Access Control (IAM)

1. In the left menu, click **Access control (IAM)**.
2. Click **+ Add**.
3. Select **Add role assignment**.
   
<img width="1337" height="389" alt="image" src="https://github.com/user-attachments/assets/00eeda19-be21-47ab-9c4b-b11d94cfdbbc" />

---

## Step 22: Select the Virtual Machine Role

Choose the following role.

| Role | Description |
|--------|------------|
| Virtual Machine User Login | Allows users to sign in to the VM using Microsoft Entra ID |
| Network Contributer | Allows users to sign in as an administrator using Microsoft Entra ID |


Click **Next**.

<img width="1345" height="494" alt="image" src="https://github.com/user-attachments/assets/b3fbb575-cb31-48e8-b7d6-86505db95817" />

<img width="1287" height="432" alt="image" src="https://github.com/user-attachments/assets/aa3f46bc-2c55-42f0-aee1-02a26f6302a7" />


---

## Step 23: Assign the Security Group

1. Under **Assign access to**, select **User, group, or service principal**.
2. Click **+ Select members**.
3. Search for **DevOps-Team**.
4. Select the group.
5. Click **Select**.
6. Click **Review + Assign**.
7. Click **Assign**.

<img width="1360" height="600" alt="image" src="https://github.com/user-attachments/assets/89096f4f-70f2-4031-86e7-fd678c9745ed" />
<img width="1353" height="585" alt="image" src="https://github.com/user-attachments/assets/32993a02-7fc2-46a6-8e9a-efc99c9c013f" />



---

## Step 24: Verify the Role Assignment

1. Open **Access control (IAM)**.
2. Click **Role assignments**.
3. Verify the following entry exists.

| Principal | Role |
|------------|------|
| DevOps-Team | Virtual Machine Administrator Login |

<img width="1345" height="584" alt="image" src="https://github.com/user-attachments/assets/acf5f51b-c4ff-42fa-a0ee-32a0970012ce" />


---

# Part 6: Login Using the Microsoft Entra ID User

## Step 25: Sign Out of the Administrator Account

1. Click your profile icon.
2. Click **Sign out**.

<img width="535" height="390" alt="image" src="https://github.com/user-attachments/assets/489ffb45-442e-439d-a757-b293a21f8752" />


---

## Step 26: Sign in Using the Created User

1. Open **https://portal.azure.com**
2. Login using the Microsoft Entra ID user.

| Field | Example |
|--------|---------|
| Username | devuser01@yourtenant.onmicrosoft.com |
| Password | User Password |
<img width="459" height="370" alt="image" src="https://github.com/user-attachments/assets/89fc3438-0a23-4390-b3f7-ca5ada55ad4f" />
<img width="464" height="362" alt="image" src="https://github.com/user-attachments/assets/ccb7380a-c91a-41ae-8484-7d53652fd18f" />

If prompted, change the temporary password.
<img width="458" height="496" alt="image" src="https://github.com/user-attachments/assets/e3df2d26-5d8a-4804-b39e-b52a66f41ccd" />
<img width="466" height="419" alt="image" src="https://github.com/user-attachments/assets/97831f38-9203-40a7-96a7-8fb2d1e25e2c" />
<img width="451" height="579" alt="image" src="https://github.com/user-attachments/assets/aede6036-ef3c-4aef-87ef-1009569f22e3" />
<img width="468" height="502" alt="image" src="https://github.com/user-attachments/assets/12b94208-b7c8-47d3-b40e-5639e1cc3618" />
<img width="454" height="543" alt="image" src="https://github.com/user-attachments/assets/d42235f1-8c5c-4f7e-bf25-3f7925ee9dc5" />
<img width="456" height="511" alt="image" src="https://github.com/user-attachments/assets/195ef935-db5e-441a-942c-f7ff6bf25bf0" />
<img width="450" height="506" alt="image" src="https://github.com/user-attachments/assets/7c6f88ae-dc03-4531-9340-73ab135113f8" />
<img width="1347" height="345" alt="image" src="https://github.com/user-attachments/assets/6a702973-f34b-4302-a880-3ae8484fae55" />

---

## Step 27: Verify the Virtual Machine

1. Search for **Virtual Machines**.
2. Open **cbc-vm**.
   
<img width="1342" height="183" alt="image" src="https://github.com/user-attachments/assets/8c397208-28b2-452c-9fa2-9da6dd1b55e1" />
<img width="1350" height="401" alt="image" src="https://github.com/user-attachments/assets/6f6fc252-0a43-4bf6-95bd-fed37f581e62" />

Since the user is a member of the **DevOps-Team** Security Group and the group has been assigned the **Virtual Machine Administrator Login** role, the VM will be visible to the user.

---

## Step 28: Connect to the Virtual Machine

1. Open **Mobaextrem or ubuntu wsl**
<img width="1071" height="125" alt="image" src="https://github.com/user-attachments/assets/bd9dbb19-c48d-400d-b320-e179632c013c" />
2. Open the URL in browser.
<img width="563" height="435" alt="image" src="https://github.com/user-attachments/assets/5d0bf0ed-a450-4d3b-a998-e9be07e7f2c9" />
3. Enter the token given in mobaterm or ubuntu.
<img width="363" height="22" alt="image" src="https://github.com/user-attachments/assets/428f67c1-89a2-4d3f-8e4d-7130a914c4ef" />
4. Select the user, if it not present click on user another acount add your entra ID User.
<img width="467" height="645" alt="image" src="https://github.com/user-attachments/assets/3592d7ed-a935-41a8-bf79-1740e22ae77d" />
5. click on continue
<img width="525" height="380" alt="image" src="https://github.com/user-attachments/assets/2fc724f5-5c58-4fa9-9ea2-2d754bdd0e98" />
6. Chec in CLI your user is logedin.
<img width="552" height="210" alt="image" src="https://github.com/user-attachments/assets/113fc730-c226-409f-b6ec-fe96241fc892" />
7. Now run the az commad to connect the vm.
   az ssh vm --resource-group cbc-intrenship-program --name cbc-vm

<img width="1071" height="125" alt="image" src="https://github.com/user-attachments/assets/dccb26ce-6b61-429a-8b28-dd6f7db9535b" />


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
