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

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/e16b8130-23ed-4124-9e39-966977b610b9" />


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

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/014fca1d-230d-4f3c-abdf-7ca99c05c6be" />


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

## Hands-on Demonstration

<img width="997" height="1127" alt="image" src="https://github.com/user-attachments/assets/52cfa51b-c75c-4ad8-b8f3-5e5392430edb" />
<img width="1147" height="96" alt="image" src="https://github.com/user-attachments/assets/855328ef-3d89-4bab-bdc6-ab3b39aeca74" />
<img width="1257" height="381" alt="image" src="https://github.com/user-attachments/assets/e704d0ad-76bb-40bc-8a11-9bee8111573c" />


### Step 1: Create a Dockerfile

```dockerfile
FROM ubuntu:22.04

RUN apt-get update

RUN apt-get install -y nginx

COPY index.html /var/www/html/index.html

CMD ["nginx", "-g", "daemon off;"]
```

<img width="1692" height="1262" alt="image" src="https://github.com/user-attachments/assets/8a7d2d26-300c-4836-8a94-e7d9389dfd93" />


Build the image:

```bash
docker build -t docker-layer-demo:v1 .
```

<img width="2187" height="1242" alt="image" src="https://github.com/user-attachments/assets/3781e79e-89d4-4507-84ab-297761f6b3cb" />


Docker executes the instructions one by one:

```text
[1/4] FROM ubuntu:22.04
[2/4] RUN apt-get update
[3/4] RUN apt-get install -y nginx
[4/4] COPY index.html /var/www/html/index.html
```

This creates the image **docker-layer-demo:v1**.

<img width="1122" height="1402" alt="image" src="https://github.com/user-attachments/assets/ce4d1de6-8b35-47f5-a5f4-c343774bfb20" />


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

<img width="1535" height="387" alt="image" src="https://github.com/user-attachments/assets/6d2321cd-0398-483f-82ff-9e555fd5cd47" />


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

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/4a27bbc6-6c7e-4831-82b8-a1a1f5a880b4" />


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

<img width="2185" height="762" alt="image" src="https://github.com/user-attachments/assets/277c5e4b-58d6-4d39-a5e8-63b2e04de54f" />


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

<img width="2211" height="586" alt="image" src="https://github.com/user-attachments/assets/545708b5-5c31-4d34-bf4d-28dd45bdee5d" />


### Observation

Combining multiple `RUN` commands:

* Reduces the number of image layers.
* Removes unnecessary package cache files.
* Produces a smaller and more efficient Docker image.


<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/4cad66e9-721d-4936-94d6-9d180a9e5e8a" />


---

### Q4.
Write the Docker commands to perform the following tasks:

- Search for the `httpd` image
- Download the image
- Run it as a container named `web1`
- Enter the running container's shell
- Delete the container

### Answer

### 1. Search for the `httpd` image

```bash
docker search httpd
```

**Purpose:** Searches Docker Hub for images related to `httpd`.

**Sample Output**

```text
NAME      DESCRIPTION                          STARS   OFFICIAL
httpd     The Apache HTTP Server Project       4933    [OK]
```

<img width="1422" height="735" alt="image" src="https://github.com/user-attachments/assets/adbfdb01-429f-4758-ac82-efd9ee46fa4d" />


**Explanation:**

- Docker searches **Docker Hub** (Docker's online image repository).
- It displays images related to `httpd`.
- The image marked **[OK]** is the **Official Docker Image** maintained by the Apache HTTP Server Project and Docker.
- Official images are trusted, well-documented, and regularly updated.



### 2. Download the `httpd` image

```bash
docker pull httpd
```

**Purpose:** Downloads the latest `httpd` image from Docker Hub to your local system.

**Output**

```text
Using default tag: latest
latest: Pulling from library/httpd
4f4fb700ef54: Pull complete
69b5b831a361: Pull complete
062e450697fa: Pull complete
010f7d7e175f: Pull complete
ebd81352b960: Pull complete
39d55e966aeb: Pull complete
507729664175: Download complete
c72742279dc1: Download complete
Digest: sha256:305fd8326a27a137fedb8900f26375699ab233cc37793f35cf5d7c65671fb252
Status: Downloaded newer image for httpd:latest
docker.io/library/httpd:latest
```

<img width="1447" height="510" alt="image" src="https://github.com/user-attachments/assets/3a7d396d-176d-4f23-9ad7-dca988276415" />


**Explanation:**

- Docker downloads the image layers from Docker Hub.
- Since no tag is specified, Docker automatically downloads the **latest** version (`httpd:latest`).
- The **Digest** is a SHA-256 checksum that uniquely identifies the downloaded image.

**Verify the downloaded image**

```bash
docker images
```

**Output**

```text
IMAGE                  ID             DISK USAGE   CONTENT SIZE
httpd:latest           305fd8326a27   177MB        47.6MB
```

This confirms that the image has been successfully downloaded to the local machine.



### 3. Run the image as a container named `web1`

```bash
docker run -d --name web1 httpd
```

**Purpose:**

- `docker run` → Creates and starts a new container.
- `-d` → Runs the container in detached (background) mode.
- `--name web1` → Assigns the container the name `web1`.
- `httpd` → Uses the `httpd:latest` image.

**Output**

```text
8c1e46e89ba1ec9c1d3c62da5523328072d6b92c85a89bed8f154612140c2eeb
```

The output is the **Container ID**.

**Verify the running container**

```bash
docker ps
```

**Output**

```text
CONTAINER ID   IMAGE    COMMAND              STATUS         PORTS   NAMES
8c1e46e89ba1   httpd    "httpd-foreground"   Up 14 seconds  80/tcp  web1
```

<img width="1514" height="141" alt="image" src="https://github.com/user-attachments/assets/3852e4b3-9631-4401-8a79-e77e73ef1d2a" />


**Explanation:**

- The container is running successfully.
- Apache HTTP Server is running using the `httpd-foreground` command.
- The container exposes **port 80**, but it is **not accessible from the host** because no port mapping (`-p`) was specified.



### 4. Enter the running container's shell

```bash
docker exec -it web1 /bin/bash
```

**Purpose:**

- `docker exec` → Executes a command inside a running container.
- `-i` → Keeps standard input open.
- `-t` → Allocates an interactive terminal.
- `web1` → Name of the running container.
- `/bin/bash` → Opens the Bash shell inside the container.

> **Note:** If Bash is unavailable, use:

```bash
docker exec -it web1 /bin/sh
```

**Inside the container**

```bash
root@8c1e46e89ba1:/usr/local/apache2# pwd
/usr/local/apache2

root@8c1e46e89ba1:/usr/local/apache2# ls
bin  build  cgi-bin  conf  error  htdocs  icons  include  logs  modules

root@8c1e46e89ba1:/usr/local/apache2# whoami
root
```

**Explanation:**

- `pwd` shows the current working directory.
- `ls` lists the Apache installation directories.
- `whoami` confirms that the current user is `root`.

> **Note:** Running `ps -ef` may display:

```text
bash: ps: command not found
```

This is normal because the official `httpd` image is a minimal image and does not include the `procps` package that provides the `ps` command.

<img width="1527" height="602" alt="image" src="https://github.com/user-attachments/assets/b5bf8a18-78ae-42f9-94bb-7965e660a90f" />


### 5. Inspect the container

```bash
docker inspect web1
```

**Purpose:** Displays detailed information about the container in JSON format.

The output includes:

- Container ID
- Current status
- Image used
- Environment variables
- Working directory
- Network configuration
- Container IP address
- Mounted volumes
- Port information

For example:

```json
"Status": "running",
"IPAddress": "172.17.0.2",
"WorkingDir": "/usr/local/apache2"
```



### 6. Delete the container

First, stop the container:

```bash
docker stop web1
```

**Output**

```text
web1
```

Verify that it has stopped:

```bash
docker ps
```

`web1` will no longer appear because `docker ps` shows only running containers.

To see all containers:

```bash
docker ps -a
```

**Output**

```text
CONTAINER ID   IMAGE    STATUS                 NAMES
8c1e46e89ba1   httpd    Exited (0)             web1
```

Remove the stopped container:

```bash
docker rm web1
```

**Output**

```text
web1
```

Verify that it has been removed:

```bash
docker ps -a
```

**Output**

```text
CONTAINER ID   IMAGE                  STATUS
66078872c80f   kindest/node:v1.32.0   Exited (128)
154a0c7221a4   nginx:alpine           Restarting (1)
```

The `web1` container is no longer listed, confirming it has been deleted.

> Alternatively, stop and remove the container in a single command:

```bash
docker rm -f web1
```

<img width="1613" height="1246" alt="image" src="https://github.com/user-attachments/assets/3a08d21d-8e4a-4069-929b-dd00f3adee75" />


## Summary of Commands

| Task | Command |
|------|---------|
| Search image | `docker search httpd` |
| Download image | `docker pull httpd` |
| Verify downloaded image | `docker images` |
| Run container | `docker run -d --name web1 httpd` |
| View running containers | `docker ps` |
| Inspect container | `docker inspect web1` |
| Enter container | `docker exec -it web1 /bin/bash` *(or `/bin/sh` if Bash is unavailable)* |
| Stop container | `docker stop web1` |
| View all containers | `docker ps -a` |
| Delete container | `docker rm web1` *(or `docker rm -f web1`)* |

---

## Key Points

- `docker search` searches Docker Hub for available images.
- `docker pull` downloads an image to the local machine.
- `docker images` lists all locally stored Docker images.
- `docker run` creates and starts a new container from an image.
- `docker ps` displays only running containers.
- `docker ps -a` displays both running and stopped containers.
- `docker inspect` provides detailed information about a Docker container.
- `docker exec` runs commands inside a running container.
- `docker stop` stops a running container.
- `docker rm` removes a stopped container.
- `docker rm -f` forcefully stops and removes a container in a single command.

> **Note:** `docker run` creates a new container every time it is executed. If the container already exists but is stopped, use `docker start web1` instead of `docker run`.

> **Note:** Removing a container with `docker rm` does **not** remove the Docker image. To remove the image, use `docker rmi httpd`.


---

### Q5.
Explain the purpose of the following Docker commands with one example each:
- `docker ps`
- `docker images`
- `docker exec`
- `docker logs`
- `docker rmi`

### Answer


Docker provides several commands to manage images and containers. The following commands are commonly used to view, access, troubleshoot, and remove Docker resources.

---

## 1. `docker ps`

### Purpose

The `docker ps` command displays a list of **currently running containers**.

### Syntax

```bash
docker ps
```

### Example

```bash
docker ps
```

### Output

```text
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS     NAMES
bf16c2669ee0   httpd          "httpd-foreground"       50 seconds ago   Up 50 seconds   80/tcp    web1
154a0c7221a4   nginx:alpine   "/docker-entrypoint.…"   8 days ago       Restarting (1)  broken-app
```

<img width="1532" height="112" alt="image" src="https://github.com/user-attachments/assets/9a2b5b87-bfb9-447c-9634-2e302c1d407f" />


### Explanation

- **CONTAINER ID** → Unique ID of the running container.
- **IMAGE** → Image used to create the container.
- **COMMAND** → Command executed when the container starts.
- **STATUS** → Current state of the container.
- **PORTS** → Exposed ports of the container.
- **NAMES** → Name assigned to the container.

---

## 2. `docker images`

### Purpose

The `docker images` command lists all Docker images available on the local machine.

### Syntax

```bash
docker images
```

### Example

```bash
docker images
```

### Output

```text
IMAGE                  ID             DISK USAGE   CONTENT SIZE
docker-layer-demo:v1   28258becdac8   330MB        106MB
docker-layer-demo:v2   ccad89b5b1f4   330MB        106MB
docker-layer-demo:v3   92dfa1c709a4   199MB        52.9MB
httpd:latest           305fd8326a27   177MB        47.6MB
kindest/node           c48c62eac5da   1.51GB       440MB
nginx:alpine           54f2a904c251   93.3MB       26.9MB
```

### Explanation

- **IMAGE** → Repository name and tag.
- **ID** → Unique identifier of the image.
- **DISK USAGE** → Space occupied by the image.
- **CONTENT SIZE** → Actual size of the image content.

<img width="1406" height="197" alt="image" src="https://github.com/user-attachments/assets/26336411-0840-467c-8e0c-89a73542b18c" />


---

## 3. `docker exec`

### Purpose

The `docker exec` command executes a command inside a **running container**.

### Syntax

```bash
docker exec [OPTIONS] CONTAINER COMMAND
```

### Example

```bash
docker exec -it web1 /bin/bash
```

If Bash is unavailable:

```bash
docker exec -it web1 /bin/sh
```

### Explanation

- `-i` → Keeps standard input open.
- `-t` → Opens an interactive terminal.
- `web1` → Name of the running container.
- `/bin/bash` → Opens the Bash shell inside the container.

### Commands Executed Inside the Container

```bash
pwd
ls
whoami
```

### Output

```text
/usr/local/apache2

bin  build  cgi-bin  conf  error  htdocs  icons  include  logs  modules

root
```

### Explanation

- `pwd` displays the current working directory.
- `ls` lists the files and directories inside the Apache installation.
- `whoami` displays the current user (`root`).

> **Note:** Some minimal Docker images may not contain commands like `ps` because the required package (`procps`) is not installed.

<img width="1515" height="197" alt="image" src="https://github.com/user-attachments/assets/d4a2d365-757b-4333-8436-a883208013a6" />


---

## 4. `docker logs`

### Purpose

The `docker logs` command displays the logs generated by a container.

It is mainly used for monitoring and troubleshooting applications.

### Syntax

```bash
docker logs CONTAINER_NAME
```

### Example

```bash
docker logs web1
```

<img width="1565" height="112" alt="image" src="https://github.com/user-attachments/assets/f507ce0b-3f95-44b5-85ee-36c4a67d145e" />


### Output

```text
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message

[Wed Jul 15 05:52:06.132262 2026] [mpm_event:notice] [pid 1:tid 1] AH00489: Apache/2.4.68 (Unix) configured -- resuming normal operations

[Wed Jul 15 05:52:06.143796 2026] [core:notice] [pid 1:tid 1] AH00094: Command line: 'httpd -D FOREGROUND'
```

### Explanation

The logs show:

- Apache HTTP Server has started successfully.
- The warning about the server name is normal for a default container.
- The server is running in foreground mode (`httpd -D FOREGROUND`).

To continuously monitor logs:

```bash
docker logs -f web1
```

Press **Ctrl + C** to stop following the logs.

---

## 5. `docker rmi`

### Purpose

The `docker rmi` command removes a Docker image from the local system.

### Syntax

```bash
docker rmi IMAGE_NAME
```

### Example

First stop and remove the container:

```bash
docker stop web1
docker rm web1
```

Then remove the image:

```bash
docker rmi httpd
```

<img width="1430" height="289" alt="image" src="https://github.com/user-attachments/assets/394b03ee-7615-4e3a-8055-9e8355fee8c6" />


### Output

```text
Untagged: httpd:latest
Deleted: sha256:305fd8326a27a137fedb8900f26375699ab233cc37793f35cf5d7c65671fb252
```

### Verify

```bash
docker images
```

### Output

```text
IMAGE                  ID             DISK USAGE
docker-layer-demo:v1   28258becdac8   330MB
docker-layer-demo:v2   ccad89b5b1f4   330MB
docker-layer-demo:v3   92dfa1c709a4   199MB
kindest/node           c48c62eac5da   1.51GB
nginx:alpine           54f2a904c251   93.3MB
```

The `httpd` image no longer appears, confirming it has been successfully removed.

---

## Common Errors

| Error | Reason | Solution |
|--------|--------|----------|
| `docker exec: executable file not found` | Bash is not installed | Use `/bin/sh` instead of `/bin/bash` |
| `No such container` | Container name is incorrect or removed | Check with `docker ps -a` |
| `docker rmi` fails | Image is in use by a container | Stop and remove the container before deleting the image |
| `docker logs` shows no output | Application has not generated logs yet | Wait for the application to start or generate activity |

---

## Summary

| Command | Purpose | Example |
|---------|---------|---------|
| `docker ps` | Lists running containers | `docker ps` |
| `docker images` | Lists local Docker images | `docker images` |
| `docker exec` | Executes commands inside a running container | `docker exec -it web1 /bin/bash` |
| `docker logs` | Displays container logs | `docker logs web1` |
| `docker rmi` | Removes a Docker image | `docker rmi httpd` |

---

## Key Points

- `docker ps` displays only running containers.
- `docker images` lists all images stored locally.
- `docker exec` executes commands inside a running container.
- `docker logs` helps monitor and troubleshoot applications by displaying their output.
- `docker rmi` removes a Docker image only after no container is using it.


---

### Q6.
Write a Dockerfile for a simple static website served by nginx and explain each instruction.

### Answer

A **Dockerfile** is a text file that contains a set of instructions used by Docker to automatically build a Docker image.

In this example, a simple static website is created and served using the **Nginx** web server.

### Project Structure

```text
Static-Website/
├── Dockerfile
└── index.html
```

---

## Step 1: Create `index.html`

Create a file named **index.html**.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Docker Website</title>
</head>
<body>
    <h1>Welcome to My Docker Website!</h1>
    <p>This website is served using Nginx inside a Docker container.</p>
</body>
</html>
```

Verify the file:

```bash
cat index.html
```

**Output**

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Docker Website</title>
</head>
<body>
    <h1>Welcome to My Docker Website!</h1>
    <p>This website is served using Nginx inside a Docker container.</p>
</body>
</html>
```

<img width="1326" height="406" alt="image" src="https://github.com/user-attachments/assets/1a420962-3fdd-46a1-81f9-06f5a3972155" />


---

## Step 2: Create the Dockerfile

Create a file named **Dockerfile** (without any extension).

```dockerfile
FROM nginx:latest

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Verify the Dockerfile:

```bash
cat Dockerfile
```

**Output**

```dockerfile
FROM nginx:latest

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

<img width="1310" height="250" alt="image" src="https://github.com/user-attachments/assets/3c922839-f7dd-4519-a2b4-9d6ce80efb1e" />


---

## Explanation of Each Instruction

### 1. `FROM nginx:latest`

```dockerfile
FROM nginx:latest
```

**Purpose:**

- Uses the official **Nginx** image as the base image.
- If it is not available locally, Docker downloads it from Docker Hub.

---

### 2. `COPY index.html /usr/share/nginx/html/index.html`

```dockerfile
COPY index.html /usr/share/nginx/html/index.html
```

**Purpose:**

- Copies the local `index.html` file into the Nginx web root.
- Nginx serves web pages from `/usr/share/nginx/html/` by default.

---

### 3. `EXPOSE 80`

```dockerfile
EXPOSE 80
```

**Purpose:**

- Documents that the container listens on **port 80**.
- It does **not** publish the port to the host machine.
- Port publishing is done using the `-p` option with `docker run`.

---

### 4. `CMD ["nginx", "-g", "daemon off;"]`

```dockerfile
CMD ["nginx", "-g", "daemon off;"]
```

**Purpose:**

- Starts the Nginx web server when the container starts.
- `daemon off;` keeps Nginx running in the foreground so the container remains running.

> **Note:** `CMD` specifies the default command that runs when a container starts.

---

## How the Docker Image is Built

```text
Dockerfile
      │
      ▼
FROM nginx:latest
      │
      ▼
COPY index.html
      │
      ▼
EXPOSE 80
      │
      ▼
CMD starts Nginx
      │
      ▼
Docker Image
```

<img width="1717" height="977" alt="image" src="https://github.com/user-attachments/assets/0f42e574-7d40-4928-ac39-a93959fa7dee" />


---

# Hands-on Practice

## Step 1: Create a project folder

```bash
mkdir Static-Website
cd Static-Website
```

Verify:

```bash
pwd
```

**Output**

```text
/home/malathi/projects/CBC-Ban-DevOps-Internship/interns/Malathi-Shetty/week-2/PracticeProjects/Dockerfiles/Static-Website
```

<img width="1326" height="406" alt="image" src="https://github.com/user-attachments/assets/ff748b0e-3ad2-4325-a7bd-9fe08b0584b1" />


---

## Step 2: Verify the project files

```bash
ls
```

**Output**

```text
Dockerfile
index.html
```

<img width="1310" height="250" alt="image" src="https://github.com/user-attachments/assets/14ead9e3-7713-46bd-9430-9dc9b15c38e6" />


---

## Step 3: Build the Docker image

```bash
docker build -t my-nginx-site .
```

### Purpose

- `docker build` builds a Docker image.
- `-t my-nginx-site` assigns the image name.
- `.` uses the current directory as the build context.

**Output (last few lines)**

```text
...
=> naming to docker.io/library/my-nginx-site:latest
=> unpacking to docker.io/library/my-nginx-site:latest
```

Verify:

```bash
docker images
```

**Output**

```text
IMAGE                  ID             SIZE
my-nginx-site:latest   086d399669c2   238MB
```

<img width="1717" height="977" alt="image" src="https://github.com/user-attachments/assets/87f920de-cd2e-4b62-90be-afb294a34a81" />


---

## Step 4: Run the Docker container

```bash
docker run -d --name website -p 8080:80 my-nginx-site
```

### Purpose

- `-d` runs the container in detached mode.
- `--name website` names the container.
- `-p 8080:80` maps host port **8080** to container port **80**.
- `my-nginx-site` is the image name.

Verify:

```bash
docker ps
```

**Output**

```text
CONTAINER ID   IMAGE           STATUS         PORTS                                     NAMES
b3b6f698dc0e   my-nginx-site   Up 10 seconds  0.0.0.0:8080->80/tcp                      website
```

<img width="1667" height="437" alt="image" src="https://github.com/user-attachments/assets/2a737489-ffba-428c-962c-5cebf484c6f9" />


---

## Step 5: Open the website

Open a web browser and visit:

```text
http://localhost:8080
```

**Output**

```text
Welcome to My Docker Website!

This website is served using Nginx inside a Docker container.
```

**Screenshot to attach:** Browser displaying the webpage.

---

## Step 6: View container logs

```bash
docker logs -f website
```

**Sample Output**

```text
Configuration complete; ready for start up
nginx/1.31.2
start worker processes
GET / HTTP/1.1" 200
GET /favicon.ico HTTP/1.1" 404
```

Press **Ctrl + C** to stop following the logs.

**Screenshot to attach:** Output of `docker logs -f website`

---

## Step 7: Stop and remove the container

Stop the container:

```bash
docker stop website
```

Output:

```text
website
```

Remove the container:

```bash
docker rm website
```

Output:

```text
website
```

Verify:

```bash
docker ps -a
```

The `website` container should no longer appear.

<img width="2187" height="1102" alt="image" src="https://github.com/user-attachments/assets/f4c46ecc-5554-42e9-a8ef-196dbdd94686" />


---

## Common Errors

| Error | Reason | Solution |
|--------|--------|----------|
| `COPY failed: file not found` | `index.html` is missing | Place `index.html` in the same folder as the Dockerfile |
| `docker build` fails | Wrong directory | Run `pwd` and verify you are inside the project folder |
| Website not opening | Port not mapped | Run the container with `-p 8080:80` |
| `docker: Error response from daemon. Conflict...` | Container name already exists | Remove the existing container or use a different name |

---

## Summary

| Task | Command |
|------|---------|
| Create project folder | `mkdir Static-Website && cd Static-Website` |
| Build image | `docker build -t my-nginx-site .` |
| List images | `docker images` |
| Run container | `docker run -d --name website -p 8080:80 my-nginx-site` |
| View running containers | `docker ps` |
| View logs | `docker logs -f website` |
| Stop container | `docker stop website` |
| Remove container | `docker rm website` |

---

## Key Points

- A **Dockerfile** contains instructions to build a Docker image.
- `FROM` specifies the base image.
- `COPY` copies files into the image.
- `EXPOSE` documents the port the application listens on.
- `CMD` defines the default command that runs when the container starts.
- `docker build` creates the Docker image.
- `docker run` creates and starts a container from the image.
- `docker logs` displays the application's log output for monitoring and troubleshooting.

---

### Note

**Question:** Why do we use `EXPOSE 80` if we still have to use `-p 8080:80`?

**Answer:**

- `EXPOSE 80` tells users and Docker that the application listens on **port 80** inside the container.
- It does **not** make the application accessible from the host.
- `-p 8080:80` publishes the container's port **80** to the host's port **8080**, allowing you to access the website at:

```text
http://localhost:8080
```



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
