# Week 3 · Session 2 — Identity, Access and Secure Connectivity

Three documents, meant to be read in this order.

| # | Document | What it covers |
|---|---|---|
| 1 | [Entra ID & RBAC — concepts](entra-id-rbac-concepts.md) | Authentication vs authorization, why you assign roles to groups, the scope hierarchy, built-in roles |
| 2 | [Entra ID — hands-on walkthrough](entra-id-user-group-rbac.md) | Click-by-click lab: create a user and security group, deploy a VM, assign a role, verify as the end user |
| 3 | [Azure Bastion](bastion-host.md) | Reaching a VM with no public IP, browser-based login, enabling copy/paste |

## Learning outcomes

By the end of this session you should be able to:

- Explain the difference between an identity that **authenticates** and a role assignment that **authorizes**.
- Describe a role assignment as *principal + role definition + scope*, and predict what inheritance does.
- Create users and security groups in Microsoft Entra ID, and justify why the group is the right RBAC principal.
- Choose between **Virtual Machine User Login** and **Virtual Machine Administrator Login** on least-privilege grounds.
- Connect to a Linux VM with an Entra ID identity instead of a shared key or password.

## Lab assets

Diagrams for the walkthrough live in [`images/`](images/) — 31 original SVG schematics stored
inside the repo so they render in forks, clones, private repos and offline exports. See
[`images/README.md`](images/README.md) for the palette and editing notes.

## Before you start

- An Azure subscription where you can create resources.
- **User Administrator** or **Global Administrator** in the tenant.
- **Owner** or **User Access Administrator** on the subscription or resource group.
- Azure CLI with the `ssh` extension installed locally.

> ⚠️ Everything you deploy in this session bills while it exists. Each document ends with a
> cleanup command — run it.

---

**CareerByteCode** · *Learning Made Simple* ·
[www.careerbytecode.com](https://www.careerbytecode.com)
