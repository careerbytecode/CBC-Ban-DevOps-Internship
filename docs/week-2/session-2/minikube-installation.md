# Minikube Installation on Linux (Docker Driver)

This guide explains how to install **Minikube** and **kubectl**, configure Docker permissions, and create a local Kubernetes cluster with **3 worker nodes** using Docker as the driver.

---

# Prerequisites

Before installing Minikube, ensure the following are installed:

- Linux (Ubuntu/CentOS/RHEL)
- Docker
- curl
- Internet connection
- User with sudo privileges

Verify Docker installation:

```bash
docker --version
```

---

# Step 1: Allow Current User to Run Docker

By default, Docker requires root privileges.

Add your current user to the Docker group:

```bash
sudo usermod -aG docker $USER
```

Apply the new group immediately without logging out:

```bash
newgrp docker
```

Verify Docker works without sudo:

```bash
docker ps
```

---

# Step 2: Install Minikube

Download the latest Minikube binary:

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

Install it:

```bash
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Remove the downloaded file:

```bash
rm minikube-linux-amd64
```

Verify installation:

```bash
minikube version
```

Expected output:

```text
minikube version: v1.xx.x
```

---

# Step 3: Install kubectl

Download the latest stable version:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Install kubectl:

```bash
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Remove the downloaded binary:

```bash
rm kubectl
```

Verify installation:

```bash
kubectl version --client
```

Expected output:

```text
Client Version: v1.xx.x
```

---

# Step 4: Start a Minikube Cluster

Create a Kubernetes cluster using Docker with **3 nodes**:

```bash
minikube start --driver=docker --nodes 3
```

This command will:

- Create one control plane node
- Create two worker nodes
- Use Docker containers as Kubernetes nodes

---

# Step 5: Verify the Cluster

Check the cluster status:

```bash
minikube status
```

Expected output:

```text
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

---

# Step 6: Verify Kubernetes Nodes

List all nodes:

```bash
kubectl get nodes
```

Example output:

```text
NAME           STATUS   ROLES           AGE   VERSION
minikube       Ready    control-plane   2m    v1.xx.x
minikube-m02   Ready    <none>          2m    v1.xx.x
minikube-m03   Ready    <none>          2m    v1.xx.x
```

---

# Useful Minikube Commands

Check Minikube version:

```bash
minikube version
```

Check cluster status:

```bash
minikube status
```

List nodes:

```bash
kubectl get nodes
```

View cluster information:

```bash
kubectl cluster-info
```

SSH into Minikube node:

```bash
minikube ssh
```

Open Kubernetes Dashboard:

```bash
minikube dashboard
```

Stop the cluster:

```bash
minikube stop
```

Start the cluster again:

```bash
minikube start
```

Delete the cluster:

```bash
minikube delete
```

---

# Troubleshooting

### Docker permission denied

Run:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

or log out and log back in.

---

### Verify Docker Driver

```bash
docker ps
```

If Docker containers are running, the Docker driver is working correctly.

---

### Check Kubernetes Components

```bash
kubectl get pods -A
```

---

### View Minikube Logs

```bash
minikube logs
```

---

# What You've Achieved

After completing this guide, you will have:

- Installed Docker permissions for the current user
- Installed Minikube
- Installed kubectl
- Created a 3-node Kubernetes cluster
- Verified the Kubernetes cluster
- Learned essential Minikube management commands
