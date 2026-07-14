# 🚀 CareerByteCode DevOps Internship

# Week 2 Assignment

## Instructions

- Answer all questions in your own words.
- Execute the commands wherever applicable.
- Include screenshots for practical questions.
- Submit your work in PDF or Markdown format.
- Upload your Dockerfiles, YAML manifests, and scripts to your GitHub repository.

---

## Questions

### Q1.
What is the difference between **Docker** and a **traditional Virtual Machine**? Mention at least five differences.

### Answer:

Both **Docker** and **Virtual Machines (VMs)** are used to run applications in isolated environments. However, they work in different ways.

### Simple Architecture

```
Traditional Virtual Machine

+----------------------+
| Application          |
+----------------------+
| Guest Operating Sys. |
+----------------------+
| Hypervisor           |
+----------------------+
| Host Operating Sys.  |
+----------------------+
| Physical Hardware    |
+----------------------+
```

```
Docker

+----------------------+
| Application          |
+----------------------+
| Docker Container     |
+----------------------+
| Docker Engine        |
+----------------------+
| Host Operating Sys.  |
+----------------------+
| Physical Hardware    |
+----------------------+
```

In Docker, containers **share the host operating system kernel**.

In a Virtual Machine, **each VM has its own complete operating system**.

---

## Differences Between Docker and Virtual Machine

| Docker                                          | Virtual Machine                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| Uses **container virtualization**               | Uses **hardware virtualization**                                 |
| Shares the host operating system kernel         | Each VM has its own guest operating system                       |
| Starts in a few seconds                         | Takes longer to boot because it loads a full operating system    |
| Uses less CPU, RAM, and disk space              | Uses more CPU, RAM, and disk space                               |
| Image size is usually smaller (MBs)             | VM image size is usually larger (GBs)                            |
| High performance because there is less overhead | Slightly slower because each VM runs a complete operating system |
| Best for packaging and deploying applications   | Best for running different operating systems on one machine      |

---

## Real Example

Suppose you want to run an Nginx web server.

### Using Docker

```
Host OS
   │
Docker Engine
   │
Nginx Container
```

* Starts in a few seconds
* Uses little memory
* Shares the host Linux kernel

---

### Using a Virtual Machine

```
Host OS
   │
Hypervisor
   │
Ubuntu VM
   │
Nginx
```

* First boots Ubuntu
* Then starts Nginx
* Uses more RAM and storage

---

## When to Use Docker

Use Docker when:

* Developing applications
* Testing software
* Running microservices
* Creating portable applications
* Fast deployment

---

## When to Use Virtual Machines

Use Virtual Machines when:

* Running different operating systems (Windows, Linux, etc.)
* Strong operating system isolation is required
* Testing complete operating systems
* Running legacy software that needs a full OS

---

## Key Points to Remember

* Docker containers **share the host operating system kernel**.
* Virtual Machines **run a complete guest operating system**.
* Docker is lightweight and starts quickly.
* Virtual Machines are heavier because each includes its own OS.
* Docker is mainly used for application deployment, while VMs are often used for running complete operating systems.

---

Remember:

**Docker = CARS**

* **C** = Containers
* **A** = Application packaging
* **R** = Resource efficient
* **S** = Shares host kernel

**Virtual Machine = GOOS**

* **G** = Guest OS
* **O** = Own operating system
* **O** = More Overhead
* **S** = Strong isolation

---



### Q2.
Explain what an **image** and a **container** are, and clearly describe the difference between them.

### Answer

A **Docker Image** is a **read-only template** that contains everything needed to run an application. It includes the application code, required libraries, dependencies, configuration files, and runtime.

A **Docker Container** is a **running instance of a Docker image**. It is created from an image and provides an isolated environment where the application runs.

### How They Work

```text
                Docker Image
          (Read-only template)
                   │
        docker run image_name
                   │
                   ▼
            Docker Container
        (Running application)
```

A single Docker image can be used to create multiple containers.

```text
          Docker Image
               │
      ┌────────┼────────┐
      │        │        │
      ▼        ▼        ▼
 Container1 Container2 Container3
```

### Docker Image

A Docker image:

- Is a read-only template.
- Contains the application and all required files.
- Cannot run by itself.
- Is used to create containers.
- Can be stored in image registries such as Docker Hub.

**Example:**

```bash
docker pull nginx
```

This command downloads the **nginx** Docker image.

---

### Docker Container

A Docker container:

- Is a running instance of a Docker image.
- Can start, stop, restart, or be deleted.
- Has its own isolated filesystem, processes, and network.
- Uses the host operating system kernel.
- Can be modified while it is running.

**Example:**

```bash
docker run -d --name web1 nginx
```

This command creates and starts a container named **web1** from the **nginx** image.

### Difference Between Image and Container

| Docker Image | Docker Container |
|--------------|------------------|
| Read-only template | Running instance of an image |
| Used to create containers | Created from an image |
| Does not execute applications | Executes the application |
| Cannot be started directly without creating a container | Can be started, stopped, restarted, and deleted |
| Same image can create many containers | Each container is an independent running instance |

### Real Example

Suppose you download the **nginx** image.

```bash
docker pull nginx
```

Now create two containers using the same image.

```bash
docker run -d --name web1 nginx

docker run -d --name web2 nginx
```

Result:

```text
          nginx Image
               │
      ┌────────┴────────┐
      ▼                 ▼
    web1              web2
 (Container)       (Container)
```

Both **web1** and **web2** are separate containers created from the same **nginx** image.

### Key Points

- A Docker image is a **read-only template**.
- A Docker container is a **running instance** of an image.
- One image can create multiple containers.
- Images store application files and dependencies.
- Containers run applications in isolated environments.

### Mnemonic

**IMAGE = BUILD**

- **B** = Blueprint (template)
- **U** = Used to create containers
- **I** = Includes application and dependencies
- **L** = Loaded from Docker Hub
- **D** = Does not run by itself

**CONTAINER = RUN**

- **R** = Running instance
- **U** = Uses an image
- **N** = New isolated environment

---

### Q3.
What is a Docker **image layer**? Explain how layering makes Docker images efficient.

### Answer

A **Docker image layer** is a **read-only layer** that stores a specific change made while building a Docker image.

Each instruction in a **Dockerfile** (such as `FROM`, `RUN`, `COPY`, or `ADD`) creates a new image layer. Docker stacks these layers on top of each other to build the final image.

When a container is created, Docker adds one **writable layer** on top of all the read-only image layers. Any changes made while the container is running are stored only in this writable layer.

### How Docker Image Layers Work

```text
          Running Container
        +-------------------+
        | Writable Layer    |  ← Stores new changes
        +-------------------+
        | Image Layer 4     |
        +-------------------+
        | Image Layer 3     |
        +-------------------+
        | Image Layer 2     |
        +-------------------+
        | Image Layer 1     |
        +-------------------+
```

- **Image layers** are read-only.
- **Container layer** is writable.

### Example Dockerfile

```dockerfile
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y nginx
COPY index.html /var/www/html/
CMD ["nginx", "-g", "daemon off;"]
```

### Layers Created

| Dockerfile Instruction | Layer Created |
|-------------------------|---------------|
| `FROM ubuntu:22.04` | Base operating system layer |
| `RUN apt-get update` | Package update layer |
| `RUN apt-get install -y nginx` | Nginx installation layer |
| `COPY index.html /var/www/html/` | Website file layer |
| `CMD ["nginx", "-g", "daemon off;"]` | Sets the default command (stores image metadata; typically does **not** create a filesystem layer) |


> Note: Most Dockerfile instructions like FROM, RUN, COPY, and ADD create read-only filesystem layers because they add or modify files. CMD only defines the default command that runs when the container starts. It stores image metadata and does not create a new filesystem layer.

### How Layering Makes Docker Efficient

#### 1. Reuses Existing Layers

If two images use the same base image, Docker downloads that layer only once.

```text
           Ubuntu Layer
                │
      ┌─────────┴─────────┐
      ▼                   ▼
  Image A             Image B
```

This saves disk space.

---

#### 2. Faster Image Builds

Docker stores previously built layers in a cache.

If only one instruction changes, Docker rebuilds only that layer and the layers after it.

Example:

Original Dockerfile

```dockerfile
FROM ubuntu
RUN apt-get update
COPY app.py /app/
```

If only `app.py` changes, Docker reuses:

- `FROM ubuntu`
- `RUN apt-get update`

Only the `COPY` step is rebuilt.

This makes image building much faster.

---

#### 3. Faster Downloads

When pulling an updated image, Docker downloads only the new or changed layers.

Existing layers are reused.

This reduces download time and network usage.

---

#### 4. Saves Storage Space

Common layers are shared between multiple images.

```text
               Ubuntu Layer
              /            \
             /              \
      Nginx Image      Python Image
```

The shared Ubuntu layer is stored only once on the system.

### Real Example

Suppose you have two Docker images.

Image 1

```dockerfile
FROM ubuntu
RUN apt-get install -y nginx
```

Image 2

```dockerfile
FROM ubuntu
RUN apt-get install -y python3
```

Both images share the same **Ubuntu base layer**.

Docker stores the Ubuntu layer only once, reducing storage usage.

### Advantages of Docker Image Layers

- Saves disk space by sharing common layers.
- Speeds up image building using layer caching.
- Reduces download time by downloading only changed layers.
- Makes Docker images modular and reusable.
- Allows multiple images to share the same base layers.

### Key Points

- A Docker image is made of multiple **read-only layers**.
- Most Dockerfile instructions create a new layer.
- A container adds one **writable layer** on top of the image.
- Docker reuses unchanged layers to improve performance.
- Layering saves storage, speeds up builds, and reduces download time.
- CMD sets image metadata (the default command) and usually does not create a new filesystem layer, unlike RUN, COPY, or ADD.

### Mnemonic

**LAYER = SHARE**

- **S** = Saves storage
- **H** = Helps caching
- **A** = Adds only changed layers
- **R** = Reuses existing layers
- **E** = Efficient image building



## Hands-on Demonstration

### Step 1: Create a Dockerfile

```dockerfile
FROM ubuntu:22.04

RUN apt-get update

RUN apt-get install -y nginx

COPY index.html /var/www/html/index.html

CMD ["nginx", "-g", "daemon off;"]
```

Build the image:

```bash
docker build -t docker-layer-demo:v1 .
```

Docker executes the instructions one by one:

```text
[1/4] FROM ubuntu:22.04
[2/4] RUN apt-get update
[3/4] RUN apt-get install -y nginx
[4/4] COPY index.html /var/www/html/index.html
```

This creates the image **docker-layer-demo:v1**.

---

### Step 2: Verify the Image

List the available images.

```bash
docker images
```

Example:

```text
REPOSITORY            TAG
docker-layer-demo     v1
```

---

### Step 3: Inspect Image Layers

Use the following command to inspect the layers:

```bash
docker history docker-layer-demo:v1
```

Example output:

```text
IMAGE          CREATED BY                                SIZE
CMD ["nginx"...]                             0B
COPY index.html /var/www/html/index.html     20.5kB
RUN apt-get install -y nginx                 58.6MB
RUN apt-get update                           78MB
Ubuntu Base Layer                            87.7MB
```

**Observation:**

* `FROM` creates the Ubuntu base layer.
* `RUN apt-get update` creates a package update layer.
* `RUN apt-get install -y nginx` creates the Nginx installation layer.
* `COPY` creates a layer containing the HTML file.
* `CMD` stores image metadata and does not create a filesystem layer.

> **Note:** In Docker BuildKit, some entries may appear as `<missing>`. This is normal because BuildKit hides intermediate image IDs. The layers still exist.

---

### Step 4: Demonstrate Layer Caching

Modify only the `index.html` file.

For example, change:

```html
<h1>Hello Docker Layers!</h1>
```

to

```html
<h1>Hello Docker Layer Caching!</h1>
```

Rebuild the image:

```bash
docker build -t docker-layer-demo:v2 .
```

Output:

```text
CACHED [2/4] RUN apt-get update
CACHED [3/4] RUN apt-get install -y nginx
[4/4] COPY index.html /var/www/html/index.html
```

### Observation

Docker reused the cached layers for:

* `FROM ubuntu:22.04`
* `RUN apt-get update`
* `RUN apt-get install -y nginx`

Only the `COPY` instruction was rebuilt because `index.html` changed.

This significantly reduced the build time.

---

### Step 5: Optimize the Dockerfile

Instead of writing multiple `RUN` instructions:

```dockerfile
RUN apt-get update

RUN apt-get install -y nginx
```

Combine them into a single instruction:

```dockerfile
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*
```

Build the optimized image:

```bash
docker build -t docker-layer-demo:v3 .
```

Build output:

```text
[1/3] FROM ubuntu:22.04
[2/3] RUN apt-get update && apt-get install -y nginx ...
[3/3] COPY index.html
```

### Observation

Combining multiple `RUN` commands:

* Reduces the number of image layers.
* Removes unnecessary package cache files.
* Produces a smaller and more efficient Docker image.




---

### Q4.
Write the Docker commands to perform the following tasks:
- Search for the `httpd` image
- Download the image
- Run it as a container named `web1`
- Enter the running container's shell
- Delete the container

### Answer

#### 1. Search for the `httpd` image

```bash
docker search httpd
```

**Purpose:** Searches Docker Hub for images related to `httpd`.

**Output of `docker search httpd`**
```bash
NAME                     DESCRIPTION                                     STARS     OFFICIAL
httpd                    The Apache HTTP Server Project                  4933      [OK]
```

- Docker searched Docker Hub (Docker's online image repository).
- It displayed all images related to httpd.
- The image marked [OK] is the official image maintained by the Apache HTTP Server Project and Docker.
- [OK] indicates that the image is an **Official Docker Image**. Official images are maintained by Docker or the software maintainers, are trusted, well-documented, and regularly updated.

---

#### 2. Download the `httpd` image

```bash
docker pull httpd
```

**Purpose:** Downloads the latest `httpd` image from Docker Hub to your local system.

**Output of `docker pull httpd`**

---

#### 3. Run the image as a container named `web1`

```bash
docker run -d --name web1 httpd
```

**Purpose:**

- `docker run` → Creates and starts a new container.
- `-d` → Runs the container in detached (background) mode.
- `--name web1` → Assigns the name `web1` to the container.
- `httpd` → Specifies the image to use.

**Output of `docker ps`**

---

#### 4. Enter the running container's shell

```bash
docker exec -it web1 /bin/bash
```

**Purpose:**

- `docker exec` → Runs a command inside a running container.
- `-i` → Keeps standard input open.
- `-t` → Allocates a terminal.
- `web1` → Name of the running container.
- `/bin/bash` → Opens the Bash shell inside the container.

> **Note:** If Bash is not available, use:

```bash
docker exec -it web1 /bin/sh
```

**Terminal showing you are inside the container.**

---

#### 5. Delete the container

First, stop the container:

```bash
docker stop web1
```

Then, delete it:

```bash
docker rm web1
```

Or stop and delete it in one command:

```bash
docker rm -f web1
```

**Purpose:**

- `docker stop` → Stops the running container.
- `docker rm` → Removes the stopped container.
- `docker rm -f` → Forcefully stops and removes the container in one command.

**Output of `docker ps -a` showing the container has been removed.**

### Summary of Commands

| Task | Command |
|------|---------|
| Search image | `docker search httpd` |
| Download image | `docker pull httpd` |
| Run container | `docker run -d --name web1 httpd` |
| Enter container | `docker exec -it web1 /bin/bash` *(or `/bin/sh` if Bash is unavailable)* |
| Stop container | `docker stop web1` |
| Delete container | `docker rm web1` *(or `docker rm -f web1`)* |

### Key Points

- `docker search` searches images on Docker Hub.
- `docker pull` downloads an image.
- `docker run` creates and starts a container.
- `docker exec` runs commands inside a running container.
- `docker rm` removes a container after it is stopped.
- `docker rm -f` forcefully stops and removes a container.


> Note: docker run creates and starts a container. If the container already exists but is stopped, use docker start web1 instead of docker run.




---

### Q5.
Explain the purpose of the following Docker commands with one example each:
- `docker ps`
- `docker images`
- `docker exec`
- `docker logs`
- `docker rmi`

### Answer



---

### Q6.
Write a Dockerfile for a simple static website served by nginx and explain each instruction.

### Answer



---

### Q7.
Explain the difference between a **Docker Volume** and a **Bind Mount**, and give one use case for each.

### Answer



---

### Q8.
What is the difference between the **Bridge network** and the **Host network** in Docker?

### Answer



---

### Q9.
Research any **three Docker commands** not covered during the training and explain their purpose.

### Answer



---

### Q10.
Explain the difference between **Docker** and **Kubernetes**. Why do we need Kubernetes if we already have Docker?

### Answer



---

### Q11.
Explain the Kubernetes architecture with a neat diagram, describing the Control Plane and Worker Node components.

### Answer



---

### Q12.
What is the difference between a **Pod**, a **ReplicaSet**, and a **Deployment**?

### Answer



---

### Q13.
Write a Pod manifest that runs a `redis` container and write the `kubectl` command to create it and check its status.

### Answer



---

### Q14.
Explain the difference between the three Service types — **ClusterIP**, **NodePort**, and **LoadBalancer**.

### Answer



---

### Q15.
What is the difference between a **ConfigMap** and a **Secret**? Explain when you would use each.

### Answer



---

### Q16.
What is the difference between a **Deployment** and a **StatefulSet**? Give one example of an application suited to each.

### Answer



---

### Q17.
Install **Minikube** and write the commands to start the cluster, list nodes, deploy a pod, and delete the cluster. (Attach screenshots.)

### Answer



---

### Q18.
Explain the difference between **scaling manually** (`kubectl scale`) and **autoscaling** with an HPA.

### Answer



---

### Q19.
Research any **two monitoring tools** (such as Prometheus and Grafana) and explain how they help in observing a Kubernetes cluster.

### Answer



---

### Q20.
Create a GitHub repository named **docker-k8s-week2** and upload:
- A Dockerfile
- A Pod and a Deployment YAML manifest
- A `README.md` describing the difference between what you built
- At least five Git commits
- Screenshots of the executed commands

### Answer



---

---

## 🎥 Q21. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering the following:

- Introduce yourself.
- What did you learn during Week 2?
- Which topic did you enjoy the most?
- Which topic did you find difficult?
- What additional concept did you explore beyond the training?
- What are your learning goals for the upcoming weeks?






---

**Best of Luck! 🚀**
**CareerByteCode DevOps Internship**
