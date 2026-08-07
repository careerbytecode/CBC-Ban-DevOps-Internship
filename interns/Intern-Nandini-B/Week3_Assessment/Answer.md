Q: Why do we group Azure resources into a Resource Group? What advantage does this give you at the end of a lab?

Ans: Grouping Azure resources into a Resource Group is done for organization, management, and lifecycle control.

Advantages of grouping resources into resource group

Simplified Management:
You can manage all resources together — apply policies, monitor usage, or assign permissions at the group level instead of individually.

Unified Deployment and Deletion:
At the end of a lab or project, you can delete the entire Resource Group to remove all associated resources in one action. This prevents leftover resources from consuming cost or cluttering your subscription.

Consistent Access Control:
Role‑based access control (RBAC) can be applied to the group, ensuring consistent permissions for all resources inside.

Organized Billing and Monitoring:
Resource Groups help track costs and performance per project or environment (e.g., dev, test, prod).

Q; Why does a Virtual Network need an address range like 10.0.0.0/16? What would go wrong if two VNets you wanted to connect used the same range?

Ans: A Virtual Network (VNet) needs an address range (like 10.0.0.0/16) because it defines the pool of private IP addresses that Azure can assign to resources (VMs, containers, services) inside that network. Think of it as the "boundary" of your network — every subnet and resource IP must fit inside that range.

Address Range is matter because of 1.It ensures unique IP allocation for resources in the VNet.

2.Subnets are carved out of this range (e.g., 10.0.1.0/24, 10.0.2.0/24).

3.Without a defined range, Azure wouldn’t know what IPs to assign or how to route traffic internally.

If two vnet's using the same address range then

1.IP conflicts: Two different resources could end up with the same IP address in different VNets. Azure wouldn’t know which one to route traffic to.

2.Routing failures: Packets may get dropped or misrouted because the system can’t distinguish between identical address spaces.

3.Peering blocked: Azure will actually prevent you from creating a peering between VNets with overlapping ranges to avoid these conflicts.

Q: Create a VNet and a subnet, then create a VM inside that subnet. Attach screenshots of your configuration.

Have created a Vnet, subnet and a VM inside that subnet. Added screenshots of this task in the screenshots folders.

Q: Your VM is Running and has a public IP, but SSH fails. Explain step by step how you would diagnose this. What is the actual cause?

Ans: When your VM has a public IP but SSH fails, the issue is almost always network security configuration rather than the VM itself.

Troubleshooting: 1.Verify VM Status Ensure the VM is actually running and healthy and vm has assigned public ip

Check SSH Client Ensure you’re using the correct username

Verify your private key matches the VM’s public key

3.Inspect Network Security Group (NSG)

Confirm there’s a rule allowing TCP port 22

Source should be Any or your IP

Priority must not be overridden by a Deny rule

Check Firewall Inside VM The VM’s OS firewall may block SSH.

If possible, use Azure Serial Console to log in

Run sudo ufw status (Ubuntu) or check firewalld (CentOS)

Ensure port 22 is allowed

5.Validate Routing Make sure traffic can reach the VM.

Confirm the VM’s NIC is associated with the correct subnet

Verify no conflicting route tables block internet traffic

6.Test Connectivity Confirm the port is open externally.

Run: telnet 22 or nc -zv 22

If connection fails, NSG or firewall is blocking

If connection succeeds but SSH still fails, check credentials

Q: Why does Azure deny all inbound internet traffic by default instead of allowing it? Explain the security thinking behind this.

Ans: Azure denies all inbound internet traffic by default because of a security‑first design principle:

1.Principle of Least Privilege:

By default, nothing is exposed. You only open what you explicitly need.

This minimizes the attack surface — fewer open ports mean fewer opportunities for attackers.

2.Defense in Depth:

Azure assumes that workloads should be protected at multiple layers.

Blocking inbound traffic at the NSG level ensures that even if a VM is misconfigured, it isn’t automatically exposed to the internet.

3.Preventing Accidental Exposure:

Many users spin up test VMs or labs. If inbound traffic were allowed by default, those machines could be immediately reachable (and vulnerable) from the public internet.

Denying by default forces you to consciously configure access, reducing the risk of missteps.

4.Compliance and Governance:

Enterprises often have strict security policies. A deny‑by‑default stance aligns with industry standards (ISO, NIST, CIS benchmarks) and helps organizations stay compliant.

Q: You installed nginx and curl http://localhost works inside the VM, but the browser shows nothing. Why does this prove the problem is the network and not the application?

Ans:

This situation proves the application (Nginx) is fine, and the problem lies in the network path between your browser and the VM

Inside the VM:

Running curl http://localhost succeeds.

That means Nginx is installed, running, and serving pages correctly on port 80.

2.From your browser (outside the VM):

You try http:// and get nothing.

Since the app works locally, the failure must be in the network path between the internet and the VM.

3.Where the network can block traffic:

NSG inbound rules: Port 80 may not be allowed.

Firewall inside VM: The VM’s OS firewall could be blocking external requests.

Routing/NAT: The public IP may not be correctly mapped to the NIC.

So, The actual cause is that port 80 isn’t open to external traffic — usually missing or misconfigured NSG inbound rule. Once you allow TCP port 80 in the NSG (and check the VM firewall), the browser will display the Nginx welcome page.

Q: Open ports 22, 80 and 443, and get the nginx page loading in your browser. Attach screenshots of the NSG rules and the working page.

Ans: Have created NSG and made ports 22,80,443 are open . And I am able to access the nginx page in the browser by using the public ip of the vm. Have attached the screenshots of this task in the screenshots folder.

Q: Why is setting the NSG source to Any acceptable for port 80 but dangerous for port 22? What should you use instead for SSH?

Ans:

Port 80 (HTTP) Setting Source = Any is acceptable because HTTP traffic is meant to be publicly accessible.

Anyone on the internet should be able to reach your web server, so allowing all sources makes sense.

The risk is low because HTTP only serves web content — it doesn’t give direct system access.

Port 22 (SSH) Allowing Source = Any here is dangerous because SSH provides direct administrative access to your VM.

If open to the entire internet, attackers can attempt brute‑force logins, scan for vulnerabilities, or exploit weak credentials.

This is one of the most common attack vectors against cloud VMs.

Whenever the authorized people need access to the VM then open port 22 and give access in the way JIT means it allows the authorized persons to access the VM only for the limited time. In the way, we can reduce the risk and exposure.

Q: Your company requires that a database subnet must never reach the internet. Explain how you would achieve this with a route table, then build it and prove it works. Attach screenshots.

Ans: have achieve this by following the below steps:

created vnet with the 3 subnets. 1 for private vm which blocks the dbsubnet, 2 for another test private vm to prove communication happens internally without the dbsubnet, 3 for dbsubnet
Created route table create a route 0.0.0.0/0 to block the database subnet Associate the Route table to dbsubnet
Created bastion to connect the private vm to run test commands
created 2 private vm's 1 vm created under dbsubnet which doesn't allow traffic 2 vm created in appsubnet to get the private ip address of it for testing purpose
Connected private vm which created under dbsubnet using bastion and ran the below commands ping 8.8.8.8 curl http;//example.com the above are not reachable which proves vm under dbsubnet is not allow the traffic ping this command is reached that proves internal communication between the 2 vm's are happening.
Finally relevant screenshots are added in the screenshots folder

Q: Why is exposing port 22 on a public IP considered bad practice in a real company? Explain what Azure Bastion solves.

Ans: Exposing port 22 (SSH) on a public IP is considered bad practice because it gives attackers a direct doorway into your VM.

Brute‑force attacks: Automated bots constantly scan the internet for open SSH ports and try millions of username/password combinations.

Exploits: If your SSH daemon has a vulnerability, an exposed port makes it immediately reachable.

Credential theft: Even strong passwords can be targeted; attackers may attempt phishing or key‑logging to gain access.

Compliance issues: Many companies have strict rules against exposing management ports to the public internet.

Azure Bastion provides secure RDP/SSH connectivity directly through the Azure portal without exposing your VM to the internet.

No public IP needed: Your VM can stay private inside the VNet.

Browser‑based access: You connect via the Azure portal over SSL, not by opening port 22 to the world.

Isolation: Bastion itself has a public IP, but it acts as a managed gateway. The VM only needs a private IP.

Reduced attack surface: Since port 22 isn’t open externally, bots and attackers can’t even see your VM.

Enterprise compliance: Fits into Zero Trust and defense‑in‑depth models by keeping management traffic internal.

Q: Create a VM with no public IP and connect to it using Bastion. Explain what you had to enable to make copy/paste work. Attach screenshots. Ans: Have created a vm with no public ip and accessed it using bastion with bastion. And have enabled the option copy & paste in bastion configuration under setting to allow the copy & paste from local machine to azure vm. Finally added all necessary screenshots in the screenshots folder.

Q: Why do organisations use Microsoft Entra ID instead of just sharing a VM password among the team?

Ans:

Organisations use Microsoft Entra ID (Azure Active Directory) instead of just sharing a single VM password because identity management is about security, accountability, and scalability:

Problems with a Shared VM Password No accountability: Everyone logs in with the same credentials, so you can’t track who did what.

High risk: If the password leaks, the entire VM is compromised.

Operational pain: Changing the password means notifying the whole team, which is error‑prone.

No role separation: Everyone gets the same level of access, even if they don’t need it.

Entra ID Solves

1.Individual Identities:

Each team member has their own account. Actions are logged per user, so you know exactly who accessed the VM.

2.Role‑Based Access Control (RBAC):

You can assign fine‑grained permissions (e.g., one person can restart VMs, another can only view logs). Prevents over‑privileged access.

3.Centralized Security Policies:

Enforce MFA (multi‑factor authentication), conditional access, password policies, etc.

Stronger protection than a single shared password.

4.Auditing & Compliance:

Logs show who accessed resources and when. This is critical for audits and regulatory compliance.

5.Scalability:

Easy to onboard/offboard users. When someone leaves, you disable their account — no need to rotate a shared password.

Q: A new engineer joins your team and needs the same access as everyone else. Explain why assigning them to a group is better than assigning five individual roles.

Ans: Assigning the new engineer to a security group instead of giving them five separate role assignments is better because it’s more efficient, consistent, and scalable:

🔹 Advantages of Group Assignment Consistency of Access
Everyone in the group automatically inherits the same roles. This ensures the new engineer gets identical permissions as the rest of the team without risk of missing or misconfiguring one of the five roles.

Simplified Management: Instead of managing multiple role assignments per user, you only manage the group. Adding or removing users becomes a single step, saving time and reducing administrative overhead.

Reduced Risk of Errors:
Assigning roles individually increases the chance of mistakes (e.g., forgetting one role or assigning the wrong scope). Groups eliminate that risk by standardizing access.

Scalability:
As more engineers join, you don’t need to repeat five assignments for each person. You simply add them to the group, and they inherit all necessary permissions instantly.

Audit and Compliance:
It’s easier to review and track access when permissions are tied to groups. Auditors can see that the “DevOps Engineers” group has specific roles, rather than checking each individual user's assignment.

Q: Create an Entra ID user and security group, add the user to the group, and grant the group access to your resource group. Attach screenshots of all steps. Ans: Have created a entra ID user, Security group and added user to the security group and attached a role to the group. And attached screenshots of this task in to the screenshots folder.

Q: A user logs into the Azure Portal successfully but sees an empty dashboard with no resources. Why does this happen and how would you fix it?

Ans: The user signed in successfully but he/she not able to see the resources due to the following causes

May be user account not linked to any subscription.
May be resources are created in different azure tenant 3.Mayy be no role (contributor, reader, owner ..) attached to the user.
We can fix this issue by sorting out the above causes by adding the user to the Azure subscription or required role to the user and checking resources in the correct Azure tenant.

Q: Why would a company choose AKS instead of running Kubernetes on their own servers? Give at least five reasons.

Ans: A company would choose Azure Kubernetes Service (AKS) over self‑managed Kubernetes because AKS reduces operational burden, lowers costs, improves security, and integrates seamlessly with Azure’s ecosystem. It’s a managed service that lets teams focus on applications instead of cluster maintenance.

1.Simplified Operations
Azure manages the control plane, backups, certificate rotation, and HA setup. Teams only manage workloads and worker nodes. This removes the steep learning curve of Kubernetes internals.

2.Automatic Upgrades & Security
AKS provides streamlined upgrades and patches, reducing downtime and ensuring compliance with standards like SOC, ISO, PCI DSS, and HIPAA.

3.Lower Costs
The AKS control plane is free. In contrast, a self‑managed HA cluster requires at least three VMs for the control plane, which adds significant monthly costs without running workloads.

4.Enterprise‑Grade Security
AKS integrates with Azure AD for RBAC, supports private clusters, and offers built‑in monitoring with Microsoft Defender for Containers. Achieving this in self‑managed Kubernetes requires extensive manual configuration.

5.Seamless Scaling
AKS supports autoscaling at both node and pod levels, plus burst capacity with Azure Container Instances. Self‑managed clusters require manual scaling scripts or provisioning.

Q: Ans: When Azure says you have insufficient quota while creating an AKS cluster, it’s referring to the resource limits assigned to your subscription.

Quota is equal to Resource limits set by Azure for each subscription (e.g., number of vCPUs, number of public IPs, number of cores per region).

It exists to:

Prevent accidental or malicious over‑consumption of resources.

Ensure fair usage across customers in a region.

Help organizations control costs and capacity planning.

We can fix it by raising a request about quota increase for the specific resource type (e.g., vCPUs) in the region where you’re deploying AKS.

Q: Create an AKS cluster, connect kubectl, and deploy any application to it. Attach screenshots showing your running pods.

Ans: Have created AKS cluster and connected it to the kubectl. And successfully deployed an application and attached screenshots of this task in to the screenshots folder.

Q: Your pipeline needs to push an image to ACR, but a pipeline has no human to type a password. Explain how a service connection solves this, then create one.

Ans: 1.A Service Connection in Azure DevOps securely stores authentication details (like a service principal or managed identity).

2.When the pipeline runs, it uses this connection to log in to Azure Container Registry (ACR) without manual passwords.

3.This ensures secure, automated access to ACR for pushing Docker images. The relevant screenshots for the above task are added to the screenshots folder.

Q: Your pipeline is stuck at "queued" and never starts. Explain the likely cause and how agents work. Then build a working CI pipeline that pushes an image to ACR. Create a GitHub repository named week3-azure-pipeline containing:

azure-pipelines.yml Application code and Dockerfile A README.md explaining the scenario you solved At least five Git commits Screenshots of the successful pipeline run and the image in ACR

Ans: pipeline is stuck at “queued” because no agent has picked up the job. Pipelines always need an agent (hosted or self‑hosted) to execute tasks, and if the pool is misconfigured, empty, or blocked by limits, jobs remain queued indefinitely.

Pipeline mostly stucked because of below causes: 1.No available agent in the pool 2.Wrong pool selection 3.Self‑hosted agent offline 4.Parallel job limits 5.Service health issues

How Agents Work:

An agent is a worker machine (VM or physical) that runs pipeline jobs. An agent pool is a logical grouping of agents. Pipelines reference pools to request jobs. Every time whenever we run the pipeline, it matches the job aganist the agent capabilities. If it matches then agent picks it up and executes task.

The relevant screenshots for the above task are added to the screenshots folder.


