# 01 — Prerequisites

This is where we started the FlavorForge project.

Before creating the application, we checked that the required tools were available on the machine.

## Step 1 — Go to the FlavorForge project

We opened the project directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone
````

We checked that we were inside the correct project:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Check Git

We checked whether Git was installed:

```bash
git --version
```

Git was available on the machine.

---

## Step 3 — Check Node.js

We checked Node.js:

```bash
node --version
```

Node.js was available.

We also checked npm:

```bash
npm --version
```

npm was available.

---

## Step 4 — Check Docker

We checked Docker:

```bash
docker --version
```

Docker was available.

We also checked that Docker was running:

```bash
docker ps
```

Docker returned the running containers/list without an error.

---

## Step 5 — Check Azure CLI

We checked Azure CLI:

```bash
az version
```

Azure CLI was available.

---

## Step 6 — Check kubectl

We checked Kubernetes CLI:

```bash
kubectl version --client
```

kubectl was available.

---

## Step 7 — Check the project

Finally, we checked the FlavorForge project structure:

```bash
tree -L 2
```

This confirmed that the project contained the main application and deployment directories.

### Result

The required tools were available and we were ready to start building FlavorForge.

