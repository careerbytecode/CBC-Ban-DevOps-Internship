
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

Docker provides two common ways to store data outside a container: **Docker Volumes** and **Bind Mounts**. Both allow data to persist even if a container is stopped or removed, but they differ in how the storage is managed.

- **Docker Volume** → Managed by Docker.
- **Bind Mount** → Uses a file or directory from the host machine.

---

# Docker Volume

A **Docker Volume** is a storage area that Docker creates and manages automatically. It is stored in Docker's default storage location and is independent of the container's lifecycle.

Even if the container is deleted, the data stored in the volume remains available.

### Architecture

```text
+-------------------+
| Docker Container  |
+-------------------+
          │
          ▼
+-------------------+
| Docker Volume     |
| (Managed by       |
| Docker)           |
+-------------------+
```

### Features

- Managed automatically by Docker.
- Data persists even after the container is removed.
- Can be shared between multiple containers.
- Stored in Docker's default storage location.
- Recommended for production applications and databases.

### Use Case

A **MySQL** or **PostgreSQL** database stores its data in a Docker volume so that database files are preserved even if the container is recreated.

---

# Bind Mount

A **Bind Mount** maps an existing file or directory from the host machine into a container.

Any changes made on the host machine are immediately reflected inside the container, and changes inside the container are reflected on the host.

### Architecture

```text
Host Machine
+----------------------+
| /home/user/project   |
+----------------------+
          │
          ▼
+----------------------+
| Docker Container     |
| /usr/share/nginx/html|
+----------------------+
```

### Features

- Uses an existing host file or directory.
- Managed by the host operating system, not Docker.
- Changes are synchronized instantly.
- Very useful during development.
- Makes editing application files easy without rebuilding the image.

### Use Case

A web developer edits HTML, CSS, or JavaScript files on the host machine, and the changes appear immediately inside the running container without rebuilding the Docker image.

---

# Difference Between Docker Volume and Bind Mount

| Docker Volume | Bind Mount |
|---------------|------------|
| Managed by Docker | Managed by the host operating system |
| Docker creates and manages the storage | Uses an existing host directory or file |
| Stored in Docker's storage location | Stored in a user-specified host path |
| Easy to back up and migrate using Docker commands | Backup is managed manually |
| Best suited for production workloads and databases | Best suited for development and testing |

---

# Hands-on Practice

## Practice 1: Docker Volume

### Step 1: Create a Docker volume

```bash
docker volume create mydata
```

### Verify the volume

```bash
docker volume ls
```

Expected Output

```text
DRIVER    VOLUME NAME
local     mydata
```

<img width="1311" height="387" alt="image" src="https://github.com/user-attachments/assets/6a495735-0ef3-4d2d-a013-00e1a96bd48b" />


---

### Step 2: Run an Nginx container using the volume

```bash
docker run -d --name web1 -v mydata:/usr/share/nginx/html nginx
```

### Explanation

- `mydata` → Docker-managed volume.
- `/usr/share/nginx/html` → Directory inside the container where the volume is mounted.

<img width="1610" height="143" alt="image" src="https://github.com/user-attachments/assets/f91573ee-6883-4f6f-b171-1d644e3b9c7f" />


---

### Step 3: Verify the mount

```bash
docker inspect web1
```

Look for the **Mounts** section:

```text
"Mounts": [
  {
    "Type": "volume",
    "Name": "mydata",
    "Source": "/var/lib/docker/volumes/mydata/_data",
    "Destination": "/usr/share/nginx/html"
  }
]
```

This confirms that Docker has mounted the **mydata** volume inside the container.

<img width="1281" height="846" alt="image" src="https://github.com/user-attachments/assets/6807758a-81ce-47e7-8c2b-f44fdd4536ee" />


---

### Step 4: Inspect the volume

```bash
docker volume inspect mydata
```

Expected Output

```text
[
  {
    "Name": "mydata",
    "Driver": "local",
    "Mountpoint": "/var/lib/docker/volumes/mydata/_data"
  }
]
```

This shows where Docker stores the volume on the host machine.

<img width="1291" height="274" alt="image" src="https://github.com/user-attachments/assets/e6c834ec-a5c5-44bb-b86a-86534b6c32d3" />


---

### Step 5: Stop and remove the container

```bash
docker stop web1
docker rm web1
```

The **mydata** volume still exists because Docker volumes persist independently of containers.

Verify:

```bash
docker volume ls
```

---

# Practice 2: Bind Mount

### Step 1: Create a project folder

```bash
mkdir Bind-Mount-Demo
cd Bind-Mount-Demo
```

Create an `index.html` file.

Example:

```html
<h1>Hello from Bind Mount!</h1>
```




---

### Step 2: Run an Nginx container using a bind mount

**Linux/macOS**

```bash
docker run -d --name web2 -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx
```

**Windows (PowerShell)**

```powershell
docker run -d --name web2 -p 8080:80 -v ${PWD}:/usr/share/nginx/html nginx
```

### Explanation

- `$(pwd)` (Linux/macOS) or `${PWD}` (Windows) represents the current directory on the host.
- `/usr/share/nginx/html` is the folder inside the container.
- Files edited in the host directory are immediately available inside the container.

---

### Step 3: Verify in the browser

Open:

```text
http://localhost:8080
```

Expected Output

```text
Hello from Bind Mount!
```

Edit the `index.html` file on your host machine and refresh the browser.

The updated content appears immediately without rebuilding the Docker image.

<img width="1342" height="547" alt="image" src="https://github.com/user-attachments/assets/52a2f9cf-3c49-4a97-9432-062dfea1f76c" />

---

### Step 4: Verify the bind mount

```bash
docker inspect web2
```

Look for the **Mounts** section:

```text
"Mounts": [
  {
    "Type": "bind",
    "Source": "/home/.../Bind-Mount-Demo",
    "Destination": "/usr/share/nginx/html"
  }
]
```

This confirms that Docker is using a **bind mount** instead of a Docker volume.

<img width="1422" height="320" alt="image" src="https://github.com/user-attachments/assets/f17989a8-9e60-4cc0-b419-a1970211f31e" />


---

### Step 5: Stop and remove the container

```bash
docker stop web2
docker rm web2
```

The files remain on the host machine because they are stored outside the container.

<img width="1345" height="87" alt="image" src="https://github.com/user-attachments/assets/fac91e38-4568-4301-abb4-57e0e2a89f3c" />


---

# Common Errors

| Error | Reason | Solution |
|--------|--------|----------|
| `No such volume` | Volume does not exist | Create it using `docker volume create mydata` |
| Website does not update | Incorrect bind mount path | Verify the host path used with `-v` |
| `docker run` fails | Container name already exists | Remove the existing container or use a different name |
| Permission denied | Host directory permissions are restricted | Grant read/write permissions to the directory |

---

# Summary

| Task | Command |
|------|---------|
| Create a Docker volume | `docker volume create mydata` |
| List volumes | `docker volume ls` |
| Inspect a volume | `docker volume inspect mydata` |
| Run a container with a volume | `docker run -d --name web1 -v mydata:/usr/share/nginx/html nginx` |
| Run a container with a bind mount | `docker run -d --name web2 -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx` |
| Inspect a container | `docker inspect web1` / `docker inspect web2` |
| Stop a container | `docker stop web1` / `docker stop web2` |
| Remove a container | `docker rm web1` / `docker rm web2` |

---

# Key Points

- Docker Volumes are managed by Docker.
- Bind Mounts use existing files or directories from the host machine.
- Volumes are ideal for databases and production environments.
- Bind mounts are ideal for development because file changes are reflected immediately.
- Both methods store data outside the container, allowing data to persist after the container is removed.

---

# Note:

- **Docker Volume** → Docker manages the storage. Best for databases and production.
- **Bind Mount** → You manage the storage on the host. Best for development and live code editing.





---

### Q8.
What is the difference between the **Bridge network** and the **Host network** in Docker?

### Answer



Docker provides different networking modes that determine how containers communicate with each other and with the host machine.

The two commonly used network modes are:

- **Bridge Network** (default)
- **Host Network**

The main difference is how the container connects to the host's network.

- In a **Bridge Network**, Docker creates a virtual network and assigns the container its **own private IP address**.
- In a **Host Network**, the container **shares the host machine's network stack**, so it does **not** receive a separate IP address.

---

## Bridge Network

A **Bridge Network** is Docker's **default networking mode**.

Containers connected to the bridge network receive their own private IP addresses and communicate through Docker's virtual bridge (`docker0`).

### Architecture

```text
                 Host Machine
+--------------------------------------+
| Docker Bridge Network (docker0)      |
|                                      |
|  +-------------+   +-------------+   |
|  | Container 1 |   | Container 2 |   |
|  |172.17.0.2   |   |172.17.0.3   |   |
|  +-------------+   +-------------+   |
+--------------------------------------+
```

### Features

- Default Docker network.
- Each container gets its own private IP.
- Containers communicate through the Docker bridge.
- Requires **port mapping (`-p`)** to access services from the host.
- Provides better network isolation.

### Example

```bash
docker run -d --name web1 -p 8080:80 nginx
```

Access the application:

```text
http://localhost:8080
```

Docker forwards traffic as shown below:

```text
Host:8080
    │
    ▼
Container:80
```

---

## Host Network

In **Host Network** mode, the container shares the host machine's network directly.

The container does **not** receive a separate IP address and uses the host's network interfaces.

### Architecture

```text
             Host Machine
+----------------------------------+
| Host Network                     |
|                                  |
| +------------------------------+ |
| | Docker Container             | |
| | Uses Host Network Directly   | |
| +------------------------------+ |
+----------------------------------+
```

### Features

- Shares the host machine's network.
- No separate IP address.
- Port mapping (`-p`) is **not required**.
- Better network performance because there is no network translation.
- Provides less network isolation.

### Example

```bash
docker run -d --network host --name web2 nginx
```

Access the application:

```text
http://localhost
```

The container directly uses the host's port **80**.

> **Note:** Host Network mode works on **Linux**. Docker Desktop on Windows and macOS does not support it in the same way because Docker runs inside a virtual machine.

---

## Difference Between Bridge Network and Host Network

| Bridge Network | Host Network |
|----------------|--------------|
| Default Docker network | Shares the host machine's network |
| Container gets its own private IP address | Container uses the host's network |
| Requires port mapping (`-p`) | Does not require port mapping |
| Better network isolation | Less network isolation |
| Slightly more networking overhead | Better network performance |
| Best for most applications | Best for high-performance networking |

---

## Real Example

### Bridge Network

Run an Nginx container:

```bash
docker run -d --name web1 -p 8080:80 nginx
```

Open:

```text
http://localhost:8080
```

Traffic flow:

```text
Host:8080
     │
     ▼
Container:80
```

---

### Host Network (Linux)

Run an Nginx container:

```bash
docker run -d --network host --name web2 nginx
```

Open:

```text
http://localhost
```

The container directly uses the host's port **80**.

---

# Hands-on Practice

## Practice 1: Bridge Network

### Step 1: Run a container

```bash
docker run -d --name bridge-nginx -p 8080:80 nginx
```

### Step 2: Verify the container

```bash
docker ps
```

Expected output:

```text
CONTAINER ID   IMAGE   STATUS   PORTS                  NAMES
xxxxxxxxxxxx   nginx   Up       0.0.0.0:8080->80/tcp   bridge-nginx
```

<img width="1552" height="141" alt="image" src="https://github.com/user-attachments/assets/32f62d69-e59b-4489-8bf1-3eab52b6022c" />


### Step 3: Inspect the container

```bash
docker inspect bridge-nginx
```

Verify:

```text
NetworkMode: bridge
IPAddress: 172.17.x.x
```

<img width="1376" height="1195" alt="image" src="https://github.com/user-attachments/assets/45e892f5-1291-41ec-8660-d01815d6270a" />


### Step 4: Inspect the Bridge network

```bash
docker network inspect bridge
```

Verify:

- Network driver is `bridge`
- Container appears in the `Containers` section
- Assigned private IP (for example `172.17.0.2`)

<img width="1342" height="1257" alt="image" src="https://github.com/user-attachments/assets/fc5b81e1-452e-4170-ad68-8fad62d03fd0" />


### Step 5: Open the website

Visit:

```text
http://localhost:8080
```

You should see the **Nginx Welcome Page**.

<img width="1227" height="131" alt="image" src="https://github.com/user-attachments/assets/268c609d-55e3-45d0-8094-cc8a9bf1b602" />


---

## Practice 2: Host Network (Linux Only)

### Step 1: Make sure port 80 is free

If another web server (such as host Nginx or Apache) is using port 80, stop it first.

Example:

```bash
sudo systemctl stop nginx
```

### Step 2: Run a container

```bash
docker run -d --network host --name host-nginx nginx
```

### Step 3: Verify the container

```bash
docker ps
```

You will notice there is **no PORTS column mapping** because Host Network mode does not use `-p`.

### Step 4: Inspect the container

```bash
docker inspect host-nginx
```

Verify:

```text
NetworkMode: host
```

Notice that there is **no container IP address**.

### Step 5: Inspect the Host network

```bash
docker network inspect host
```

Notice:

- Driver is `host`
- No IP addresses are assigned to containers

### Step 6: Open the website

Visit:

```text
http://localhost
```

You should see the **Nginx Welcome Page**.

### Screenshots to attach

<img width="1510" height="161" alt="image" src="https://github.com/user-attachments/assets/c411a5ba-a575-48ca-95ed-b271d94c2376" />
<img width="1962" height="510" alt="image" src="https://github.com/user-attachments/assets/32e91f27-0845-40eb-b5b1-f04132922e7a" />
<img width="1421" height="592" alt="image" src="https://github.com/user-attachments/assets/9842de83-a2aa-4c30-b4cc-9a5d30c56015" />
<img width="1327" height="392" alt="image" src="https://github.com/user-attachments/assets/7b95f828-a0ea-4f76-ae2b-2b207181d1b1" />
<img width="1317" height="836" alt="image" src="https://github.com/user-attachments/assets/12f283d8-fd4a-4ecd-92d5-8a88b38f6f1f" />


> **Note:** If you receive `bind() to 0.0.0.0:80 failed (98: Address already in use)`, another application is already using port **80**. Stop that application before running the Host Network container.

---

## Common Errors

| Error | Reason | Solution |
|--------|--------|----------|
| Website not opening in Bridge mode | Port not mapped | Use `-p host_port:container_port` |
| `Address already in use` | Port 80 is already occupied | Stop the application using port 80 |
| Host Network container exits immediately | Another process is using port 80 | Free port 80 and run the container again |
| Host Network not working | Using Docker Desktop on Windows/macOS | Test on a Linux machine |

---

## Summary

| Task | Command |
|------|---------|
| Run container using Bridge Network | `docker run -d --name bridge-nginx -p 8080:80 nginx` |
| Inspect Bridge container | `docker inspect bridge-nginx` |
| Inspect Bridge network | `docker network inspect bridge` |
| Run container using Host Network | `docker run -d --network host --name host-nginx nginx` |
| Inspect Host container | `docker inspect host-nginx` |
| Inspect Host network | `docker network inspect host` |
| List running containers | `docker ps` |

---

## Key Points

- **Bridge Network** is Docker's default networking mode.
- Containers on the Bridge Network receive their own private IP addresses.
- Bridge Network requires **port mapping (`-p`)**.
- **Host Network** shares the host machine's network.
- Host Network does not require **port mapping**.
- Host Network offers better performance but less isolation.
- Host Network is mainly supported on **Linux**.

---


> **Note:**
> Use a **Bridge Network** for most applications because it provides network isolation and flexibility. Use a **Host Network** when you need maximum network performance and can safely share the host's network, such as in Linux-based production environments.

<img width="1254" height="1254" alt="image" src="https://github.com/user-attachments/assets/060062cf-9f1a-4f92-8263-4fa1d6315373" />
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/8b2868d5-bb37-4756-8f6d-23c2abf80a9f" />
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/1886d82d-43ed-4328-802f-6c59aa7a7b44" />
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/1e0ee9a2-a058-407f-9c4e-31a48591de1e" />


---

### Q9.
Research any **three Docker commands** not covered during the training and explain their purpose.

### Answer


### Docker Commands (Not Covered During Training)

---

# 1. `docker stats`

## Purpose

The `docker stats` command displays the **live resource usage** of one or more running containers.

It shows:

* CPU usage
* Memory usage
* Network I/O
* Block (Disk) I/O
* Number of running processes

---

## Syntax

```bash
docker stats [CONTAINER]
```

---

## Example

```bash
docker stats bridge-nginx
```

---

## Expected Output

```text
CONTAINER ID   NAME           CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O         PIDS
3bbe80016643   bridge-nginx   0.00%     7.996MiB / 5.788GiB   0.13%     3.06kB / 126B   13.3MB / 12.3kB   5
```

<img width="1707" height="308" alt="image" src="https://github.com/user-attachments/assets/1cf5cc57-11be-4802-92c9-9a90875a2c8b" />


---

## Explanation

Docker continuously displays the CPU, memory, network, and disk usage of the running container in real time.

Press **Ctrl + C** to stop monitoring.

---

## Use Case

Monitor whether a container is consuming too much CPU or memory.

---

# 2. `docker cp`

## Purpose

The `docker cp` command copies files or directories between the host machine and a Docker container.

---

## Syntax

Copy from host to container

```bash
docker cp SOURCE CONTAINER:DESTINATION
```

Copy from container to host

```bash
docker cp CONTAINER:SOURCE DESTINATION
```




---

## Example

Copy an HTML file into the Nginx container.

```bash
docker cp index.html bridge-nginx:/usr/share/nginx/html/
```

<img width="1797" height="321" alt="image" src="https://github.com/user-attachments/assets/6cda69b5-8ce0-4fd8-9c22-84028016f29c" />


---

## Expected Output

```text
Successfully copied 26B (transferred 2.05kB) to bridge-nginx:/usr/share/nginx/html/
```

Verify the updated webpage:

```bash
curl http://localhost:8080
```

Output

```html
<h1>Q.9 Hello Docker</h1>
```

---

## Explanation

Docker copies the specified file into the running container without rebuilding the image or restarting the container.

---

## Use Case

Copy configuration files, logs, or application files into or out of a running container.

---

# 3. `docker system prune`

## Purpose

The `docker system prune` command removes unused Docker resources to free disk space.

It removes:

* Stopped containers
* Unused networks
* Dangling images
* Build cache

---

## Syntax

```bash
docker system prune
```

Skip confirmation:

```bash
docker system prune -f
```

---

## Example

```bash
docker system prune
```

<img width="1815" height="1244" alt="image" src="https://github.com/user-attachments/assets/d8141741-aea6-44d9-aa9b-b7af35cb7e55" />


---

## Expected Output

```text
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - unused build cache

Deleted Containers:
bfc12a25b079...

Deleted build cache objects:
...

Total reclaimed space: 118.8kB
```

---

## Explanation

Docker removes unused resources and frees disk space.

Running containers are **not affected**.

---

## Use Case

Clean up a development machine after testing multiple containers.

---

# 4. `docker top`

## Purpose

The `docker top` command displays the processes currently running inside a container.

---

## Syntax

```bash
docker top CONTAINER
```

---

## Example

```bash
docker top bridge-nginx
```

<img width="1691" height="157" alt="image" src="https://github.com/user-attachments/assets/172bd3e4-ea1b-4628-92a3-7be0065580e9" />


---

## Expected Output

```text
UID         PID     PPID    CMD
root        15076   15043   nginx: master process nginx -g daemon off;
message+    15168   15076   nginx: worker process
message+    15169   15076   nginx: worker process
message+    15170   15076   nginx: worker process
message+    15171   15076   nginx: worker process
```

---

## Explanation

It works like the Linux `ps` command and displays all processes running inside the container.

---

## Use Case

Check which application or processes are running inside a container.

---

# 5. `docker rename`

## Purpose

The `docker rename` command changes the name of an existing container.

---

## Syntax

```bash
docker rename OLD_NAME NEW_NAME
```

---

## Example

Rename the container:

```bash
docker rename bridge-nginx web-server
```

Verify:

```bash
docker ps
```

Rename it back:

```bash
docker rename web-server bridge-nginx
```

<img width="1772" height="386" alt="image" src="https://github.com/user-attachments/assets/8ce58fa0-c728-4ed5-a992-dfd8ad173683" />


---

## Explanation

Only the container name changes.

The container ID, image, volumes, and data remain unchanged.

---

## Use Case

Rename a container to a more meaningful or standardized name.

---

# 6. `docker pause`

## Purpose

The `docker pause` command temporarily suspends all processes inside a running container.

---

## Syntax

```bash
docker pause CONTAINER
```

---

## Example

```bash
docker pause bridge-nginx
```

---

## Expected Output

```text
bridge-nginx
```

Verify:

```bash
docker ps
```

Output:

```text
STATUS
Up 38 minutes (Paused)
```

<img width="1752" height="272" alt="image" src="https://github.com/user-attachments/assets/fa083061-e44c-4923-b157-eb343c63c321" />


---

## Explanation

The container remains in memory but all running processes are frozen until resumed.

---

## Use Case

Temporarily stop a running application without shutting down the container.

---

# 7. `docker unpause`

## Purpose

The `docker unpause` command resumes a paused container.

---

## Syntax

```bash
docker unpause CONTAINER
```

---

## Example

```bash
docker unpause bridge-nginx
```

---

## Expected Output

```text
bridge-nginx
```

Verify:

```bash
docker ps
```

Output:

```text
STATUS
Up 55 minutes
```

<img width="1751" height="272" alt="image" src="https://github.com/user-attachments/assets/fe8fa074-bc71-4250-a04f-abbded0721f8" />


---

## Explanation

Docker resumes all processes from where they were paused.

---

## Use Case

Continue running a container after temporarily suspending it.

---

# 8. `docker diff`

## Purpose

The `docker diff` command shows changes made to a container's filesystem after it was created.

---

## Syntax

```bash
docker diff CONTAINER
```

---

## Example

Create a new file inside the container:

```bash
docker exec bridge-nginx touch /tmp/test.txt
```

View the filesystem changes:

```bash
docker diff bridge-nginx
```

---

## Expected Output

```text
A /tmp/test.txt
C /usr/share/nginx/html/index.html
C /etc/nginx/conf.d/default.conf
A /run/nginx.pid
```

<img width="1677" height="947" alt="image" src="https://github.com/user-attachments/assets/f0db7b26-205d-42b9-9c1f-4b23f1742da1" />


---

## Explanation

Docker compares the container's current filesystem with the original image.

The letters indicate:

* **A** → Added
* **C** → Changed
* **D** → Deleted

---

## Use Case

Identify files that were added, modified, or deleted while the container was running.

---

# 9. `docker export`

## Purpose

The `docker export` command exports a container's filesystem into a `.tar` archive.

---

## Syntax

```bash
docker export CONTAINER > FILE.tar
```

---

## Example

```bash
docker export bridge-nginx > bridge-nginx.tar
```

Verify:

```bash
ls -lh bridge-nginx.tar
```

---

## Expected Output

```text
-rw-r--r-- 1 malathi malathi 156M Jul 16 06:30 bridge-nginx.tar
```

<img width="1717" height="112" alt="image" src="https://github.com/user-attachments/assets/43816e96-9eed-4b67-8b57-0022770ed029" />


---

## Explanation

Docker saves the container's filesystem into a tar archive.

The exported archive contains only the filesystem and does **not** include image history or metadata.

---

## Use Case

Back up a container's filesystem or transfer it to another system.

---

# 10. `docker import`

## Purpose

The `docker import` command creates a new Docker image from a tar archive.

---

## Syntax

```bash
docker import FILE.tar IMAGE_NAME:TAG
```

---

## Example

```bash
docker import bridge-nginx.tar my-nginx:1.0
```

Verify:

```bash
docker images
```

---

## Expected Output

```text
REPOSITORY    TAG    IMAGE ID        SIZE
my-nginx      1.0    48fc28e5831b    236MB
```

<img width="1847" height="512" alt="image" src="https://github.com/user-attachments/assets/6faa1d9f-c60f-4dcb-9950-d92dd6049d55" />


---

## Explanation

Docker creates a new image using the filesystem stored inside the exported tar archive.

Unlike `docker commit`, the imported image does not preserve image history or metadata.

---

## Use Case

Create a Docker image from a previously exported container.

---

# Summary

| Command               | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `docker stats`        | Monitor CPU, memory, network, and disk usage of running containers |
| `docker cp`           | Copy files between the host machine and a container                |
| `docker system prune` | Remove unused Docker resources and reclaim disk space              |
| `docker top`          | Display running processes inside a container                       |
| `docker rename`       | Change the name of an existing container                           |
| `docker pause`        | Temporarily suspend a running container                            |
| `docker unpause`      | Resume a paused container                                          |
| `docker diff`         | Show filesystem changes made inside a container                    |
| `docker export`       | Export a container's filesystem to a tar archive                   |
| `docker import`       | Create a Docker image from a tar archive                           |



---

### Q10.
Explain the difference between **Docker** and **Kubernetes**. Why do we need Kubernetes if we already have Docker?

### Answer

Docker and Kubernetes are both used in container-based applications, but they solve different problems.

* **Docker** is used to **build, package, and run containers**.
* **Kubernetes** is used to **manage and orchestrate containers across multiple servers**.

Think of it like this:

```text
Docker      → Builds and runs containers
Kubernetes  → Manages containers at scale
```

---

# Docker

Docker is a **containerization platform** that packages an application along with all its dependencies into a container.

## What Docker Does

* Builds Docker images
* Runs containers
* Stops and removes containers
* Creates Docker networks and volumes
* Packages applications with their dependencies

## Example

```bash
docker run -d --name web1 nginx
```

This command creates and starts a single Nginx container.




---

# Kubernetes

Kubernetes (also called **K8s**) is a **container orchestration platform**.

Instead of creating containers, Kubernetes manages and automates container deployment across multiple machines.

## What Kubernetes Does

* Deploys containers across multiple servers
* Automatically restarts failed containers (Self-Healing)
* Scales applications up or down automatically
* Distributes traffic between containers (Load Balancing)
* Performs rolling updates without downtime
* Manages networking and storage for containers

## Example

```bash
kubectl apply -f deployment.yaml
```

This command deploys an application described in a Kubernetes YAML file.

---

# Architecture Comparison

## Docker Architecture

```text
          Developer
               │
        docker build
               │
        Docker Image
               │
         docker run
               │
          +-----------+
          | Container |
          +-----------+
```

Docker focuses on creating and running containers.

<img width="1620" height="971" alt="image" src="https://github.com/user-attachments/assets/4ad4795c-3870-4604-83d5-c742d766e629" />


---

## Kubernetes Architecture

```text
            Developer
                 │
           Docker Image
                 │
        Kubernetes Cluster
                 │
      +----------+----------+
      │          │          │
   +------+   +------+   +------+
   | Pod1 |   | Pod2 |   | Pod3 |
   +------+   +------+   +------+
```


Kubernetes manages multiple copies of an application across one or more servers.

<img width="1647" height="936" alt="image" src="https://github.com/user-attachments/assets/001c64bf-6e14-4cfc-9b6d-33b89bbbf459" />

---

# Difference Between Docker and Kubernetes

| Docker                                     | Kubernetes                                |
| ------------------------------------------ | ----------------------------------------- |
| Creates and runs containers                | Manages and orchestrates containers       |
| Runs on a single machine or server         | Runs across multiple servers (cluster)    |
| Manual scaling                             | Automatic scaling                         |
| Manual recovery if a container fails       | Automatic self-healing                    |
| Simple networking                          | Advanced service networking               |
| Focuses on container runtime               | Focuses on container orchestration        |
| Good for development and small deployments | Good for production and large deployments |

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/2ae943e6-7e16-463a-a8e3-803a6ef9b0ae" />
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/fb6400d4-4d5e-4f13-a417-b300d1aa0807" />


---

# Why Docker Alone Is Not Enough

Docker works well when you have only a few containers.

However, large production applications may have:

* Hundreds of containers
* Multiple servers
* High traffic
* Frequent application updates
* Failures that require automatic recovery

Imagine a company running:

* 50 microservices
* 100 containers
* 5 servers

```text
Server 1 → 20 Containers
Server 2 → 20 Containers
Server 3 → 20 Containers
Server 4 → 20 Containers
Server 5 → 20 Containers
```

With only Docker, an administrator must manually:

* Start containers
* Restart failed containers
* Scale containers
* Update containers
* Distribute containers across servers
* Balance traffic

Managing all of this manually becomes difficult and error-prone.

---

# How Kubernetes Solves This Problem

Kubernetes continuously monitors the cluster and ensures that the desired number of containers are always running.

Suppose an application should always have **3 running Pods**.

```text
Desired State

+------+   +------+   +------+
| Pod1 |   | Pod2 |   | Pod3 |
+------+   +------+   +------+
```

If one Pod crashes:

```text
Before Failure

+------+   +------+   +------+
| Pod1 |   | Pod2 |   | Pod3 |
+------+   +------+   +------+

        Pod2 Fails

+------+   +------+   +------+
| Pod1 |   |  X   |   | Pod3 |
+------+   +------+   +------+
```

Kubernetes automatically creates a replacement Pod.

```text
After Self-Healing

+------+   +------+   +------+
| Pod1 |   | Pod4 |   | Pod3 |
+------+   +------+   +------+
```

This feature is called **Self-Healing**.

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/dcaefb34-4055-4f7e-9704-4dc7785760d8" />


---

# Other Features Provided by Kubernetes

## 1. Automatic Scaling

Increase or decrease the number of Pods depending on traffic.

```text
Low Traffic

+------+   +------+
| Pod1 |   | Pod2 |
+------+   +------+

        ↓

High Traffic

+------+ +------+ +------+ +------+
| Pod1 | | Pod2 | | Pod3 | | Pod4 |
+------+ +------+ +------+ +------+
```

---

## 2. Load Balancing

Distributes incoming requests evenly across Pods.

```text
             Users
               │
               ▼
        +---------------+
        | Load Balancer |
        +---------------+
          │     │     │
          ▼     ▼     ▼
       +------+ +------+ +------+
       | Pod1 | | Pod2 | | Pod3 |
       +------+ +------+ +------+
```

<img width="1254" height="1254" alt="image" src="https://github.com/user-attachments/assets/d5e95073-e56f-4556-bc66-96559615624e" />


---

## 3. Rolling Updates

Deploy a new application version without downtime.

```text
Version 1
Pod1  Pod2  Pod3

        ↓

Version 2

Pod1(v2) Pod2(v2) Pod3(v2)
```

Users continue accessing the application while the update happens.

<img width="1122" height="1402" alt="image" src="https://github.com/user-attachments/assets/dd07af13-4a28-44d8-bebf-39c0a362b7c2" />
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/30a8abe2-676a-48a7-a196-3709b0e223d0" />


---

# Real Example

## Using Docker

```bash
docker run -d nginx
docker run -d nginx
docker run -d nginx
```

You must manage all three containers yourself.

---

## Using Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment

spec:
  replicas: 3
```

Kubernetes ensures that **3 Pods** are always running.

If one Pod crashes, Kubernetes automatically creates another Pod.

---

# Relationship Between Docker and Kubernetes

Docker and Kubernetes work **together**, not against each other.

Docker packages the application into an image, and Kubernetes uses that image to run containers.

```text
             Developer
                 │
          docker build
                 │
          Docker Image
                 │
        Push to Registry
                 │
      Kubernetes Deployment
                 │
      +----------------------+
      | Kubernetes Cluster   |
      +----------------------+
          │        │        │
          ▼        ▼        ▼
      +------+ +------+ +------+
      | Pod1 | | Pod2 | | Pod3 |
      +------+ +------+ +------+
          │        │        │
      Container Container Container
```

Workflow:

1. Developer builds the Docker image.
2. The image is pushed to a container registry.
3. Kubernetes pulls the image.
4. Kubernetes creates Pods.
5. Each Pod runs one or more containers.

---

# When to Use Docker

Use Docker when:

* Developing applications locally
* Testing applications
* Running a small number of containers
* Learning containerization

---

# When to Use Kubernetes

Use Kubernetes when:

* Running applications in production
* Managing many containers
* Deploying across multiple servers
* Scaling applications automatically
* Ensuring high availability
* Performing rolling updates without downtime

---

# Key Points

* Docker builds, packages, and runs containers.
* Kubernetes manages and orchestrates containers.
* Docker handles **containerization**.
* Kubernetes handles **container orchestration**.
* Docker is ideal for development and small deployments.
* Kubernetes is ideal for production environments.
* Kubernetes provides automatic scaling, self-healing, load balancing, and rolling updates.
* Large production applications commonly use **Docker + Kubernetes together**.



Yes, but **not in the same way as Docker**.

Docker is easy to practice because you can directly run commands like `docker run`, `docker ps`, etc.

For Kubernetes, the hands-on is mostly about creating resources (Pods, Deployments, Services) and observing how Kubernetes manages them. Since you're learning Docker first, I'd recommend a few simple Kubernetes exercises that clearly demonstrate **why Kubernetes exists**.

---

# Hands-on 1: Create a Pod

### Step 1: Create a Pod

```bash
kubectl run nginx-pod --image=nginx
```

### Step 2: Verify

```bash
kubectl get pods
```

Expected Output

```text
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          15s
```

<img width="1391" height="187" alt="image" src="https://github.com/user-attachments/assets/6d1d846c-3dae-4d39-ac55-c85e69da0b5a" />


### Step 3: Describe the Pod

```bash
kubectl describe pod nginx-pod
```

Observe:

* Pod name
* Node
* IP Address
* Events

<img width="1596" height="1107" alt="image" src="https://github.com/user-attachments/assets/9e5f0f93-115c-4460-9fcd-0fb9b3745644" />
<img width="1160" height="380" alt="image" src="https://github.com/user-attachments/assets/21ef3df5-12fa-4771-8101-b39604b979eb" />


---

# Hands-on 2: Create a Deployment

Instead of running one container manually like Docker:

```bash
docker run -d nginx
```

Create a Deployment.

```bash
kubectl create deployment nginx-deploy --image=nginx
```

Verify

```bash
kubectl get deployments
```

```bash
kubectl get pods
```

Expected

```text
NAME            READY
nginx-deploy    1/1
```

<img width="1497" height="246" alt="image" src="https://github.com/user-attachments/assets/6527a772-c763-47c6-89ba-914d6f0680c2" />


---

# Hands-on 3: Scale the Application

Increase replicas.

```bash
kubectl scale deployment nginx-deploy --replicas=3
```

Verify

```bash
kubectl get pods
```

Expected

```text
NAME
nginx-deploy-xxxxx
nginx-deploy-yyyyy
nginx-deploy-zzzzz
```

This demonstrates **automatic scaling**.

<img width="1497" height="246" alt="image" src="https://github.com/user-attachments/assets/5772636c-de1d-40d9-9836-5c9acc509644" />
<img width="1190" height="1322" alt="image" src="https://github.com/user-attachments/assets/8df3c8df-f788-4278-b24f-0c77799fe595" />


---

# Hands-on 4: Self-Healing

Delete one Pod.

```bash
kubectl delete pod <pod-name>
```

Immediately check:

```bash
kubectl get pods
```

You'll notice:

```text
Old Pod → Deleted

New Pod → Created Automatically
```

This demonstrates **Self-Healing**.

<img width="1521" height="442" alt="image" src="https://github.com/user-attachments/assets/1c98db8a-3ae2-41be-9001-93bd9b27fd35" />


---

# Hands-on 5: Expose the Deployment

Expose the Deployment as a Service.

```bash
kubectl expose deployment nginx-deploy \
--type=NodePort \
--port=80
```

Verify

```bash
kubectl get svc
```

Observe:

* Service Name
* Cluster IP
* NodePort

<img width="1406" height="247" alt="image" src="https://github.com/user-attachments/assets/39898283-5df7-46e6-ae17-de1288a0170d" />



---

# Hands-on 6: Rolling Update

Update the image.

```bash
kubectl set image deployment/nginx-deploy nginx=nginx:alpine
```

Watch the rollout.

```bash
kubectl rollout status deployment/nginx-deploy
```

Verify

```bash
kubectl get pods
```

Notice that Pods are updated **one at a time**, so there is no downtime.

<img width="1570" height="666" alt="image" src="https://github.com/user-attachments/assets/6eb0a367-0e6e-4263-b3f5-7e7e74b63db1" />


---

# Hands-on 7: Roll Back

View rollout history.

```bash
kubectl rollout history deployment/nginx-deploy
```

Undo the update.

```bash
kubectl rollout undo deployment/nginx-deploy
```

Verify

```bash
kubectl get pods
```

<img width="1440" height="797" alt="image" src="https://github.com/user-attachments/assets/9f58bbd1-20a2-48af-9c90-1fd04e7b8603" />


---

# Hands-on 8: View Cluster Resources

```bash
kubectl get nodes
```

```bash
kubectl get pods
```

```bash
kubectl get deployments
```

```bash
kubectl get services
```

This helps you understand the cluster's current state.

<img width="1422" height="451" alt="image" src="https://github.com/user-attachments/assets/53ee0507-1c13-48fc-84f0-57930aa8be91" />


---

# Hands-on 9: Delete Everything

Delete the Service.

```bash
kubectl delete service nginx-deploy
```

Delete the Deployment.

```bash
kubectl delete deployment nginx-deploy
```

Verify.

```bash
kubectl get all
```

---

## Mapping the Hands-ons to Kubernetes Concepts

| Hands-on          | Concept Demonstrated               |
| ----------------- | ---------------------------------- |
| Create Pod        | Basic container execution          |
| Create Deployment | Declarative application management |
| Scale Deployment  | Auto/manual scaling                |
| Delete a Pod      | Self-healing                       |
| Expose Deployment | Service & networking               |
| Update Image      | Rolling updates                    |
| Rollback          | Deployment rollback                |
| Get Resources     | Cluster inspection                 |
| Delete Resources  | Resource cleanup                   |

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/ac5170bb-6a66-4dcf-b8ea-fbb3f1d81e72" />
<img width="1402" height="1122" alt="image" src="https://github.com/user-attachments/assets/745a9dba-299e-4a34-aecf-e209b484bbf2" />


---

### Q11.
Explain the Kubernetes architecture with a neat diagram, describing the Control Plane and Worker Node components.

### Answer


Kubernetes follows a **cluster architecture**.

A **Kubernetes Cluster** is a group of machines (**nodes**) that work together to deploy, manage, and run containerized applications.

A Kubernetes cluster has two main parts:

1. **Control Plane** – Manages the entire cluster.
2. **Worker Nodes** – Run the application Pods.

---

## Kubernetes Architecture

<img width="1647" height="936" alt="image" src="https://github.com/user-attachments/assets/ac00b4ff-a260-4179-8cb1-ab9a38cb4927" />


---

## How Kubernetes Works

When a user deploys an application, Kubernetes follows these steps:

```text
Developer
     │
kubectl apply -f deployment.yaml
     │
     ▼
API Server
     │
     ▼
etcd stores cluster information
     │
     ▼
Scheduler selects the best Worker Node
     │
     ▼
Kubelet receives the instruction
     │
     ▼
Container Runtime starts the container
     │
     ▼
Pod becomes Running
     │
     ▼
kube-proxy routes traffic to the Pod
```
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/547e759a-e196-43c0-b5cb-5f616692f684" />

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/7d3f8bba-106d-4ecd-b932-ba5f14f62d40" />
<img width="887" height="1774" alt="image" src="https://github.com/user-attachments/assets/aee01930-16c8-4cae-b27a-f01392406ac9" />


---

# Control Plane

The **Control Plane** is the **brain of Kubernetes**.

It manages the cluster, makes scheduling decisions, monitors the cluster, and stores cluster information.

The Control Plane does **not** run application containers.

---

## Components of the Control Plane

### 1. API Server

#### Purpose

The **API Server** is the main entry point of Kubernetes.

All commands from users, scripts, and tools are sent to the API Server.

#### Example

```bash
kubectl get pods
kubectl apply -f deployment.yaml
kubectl delete pod nginx
```

All these commands first reach the **API Server**.

---

### 2. etcd

#### Purpose

**etcd** is Kubernetes' distributed **key-value database**.

It stores the current state and configuration of the cluster.

It stores information such as:

- Pods
- Deployments
- Services
- ConfigMaps
- Secrets
- Nodes

#### Example

When you create a Deployment, its configuration is saved in **etcd**.

---

### 3. Scheduler

#### Purpose

The **Scheduler** decides which Worker Node should run a newly created Pod.

It checks:

- Available CPU
- Available Memory
- Node Health
- Scheduling Rules

#### Example

```text
Worker Node 1 → Busy

Worker Node 2 → Busy

Worker Node 3 → Free
```

The Scheduler places the new Pod on **Worker Node 3**.

---

### 4. Controller Manager

#### Purpose

The **Controller Manager** continuously checks whether the cluster matches the desired state.

If something changes unexpectedly, it automatically corrects it.

#### Example

Desired State

```text
3 Pods
```

Current State

```text
2 Pods
```

The Controller Manager automatically creates one new Pod so the cluster again has **3 Pods**.

---

### 5. Cloud Controller Manager

#### Purpose

The **Cloud Controller Manager** connects Kubernetes with cloud platforms.

Examples:

- AWS
- Microsoft Azure
- Google Cloud Platform (GCP)

It manages cloud resources such as:

- Load Balancers
- Storage Volumes
- Cloud Routes

> **Note:** When using **Minikube**, this component is usually not used because Minikube runs on your local machine instead of a cloud provider.

---

# Worker Node

A **Worker Node** is the machine where application Pods actually run.

A Kubernetes cluster can have one or many Worker Nodes.

---

## Components of a Worker Node

### 1. Kubelet

#### Purpose

The **Kubelet** is an agent that runs on every Worker Node.

It receives instructions from the API Server and ensures that Pods are running correctly.

#### Example

```text
Start Pod
Stop Pod
Restart Pod
```

The Kubelet performs these actions on the Worker Node.

---

### 2. kube-proxy

#### Purpose

The **kube-proxy** manages networking on each Worker Node.

It forwards network traffic from Services to the correct Pods.

#### Example

```text
User
  │
  ▼
Service
  │
  ▼
Pod
```

---

### 3. Container Runtime (CRI)

#### Purpose

The **Container Runtime** is responsible for starting and running containers inside Pods.

Common runtimes include:

- containerd
- CRI-O

> Earlier Kubernetes commonly used Docker as the runtime, but modern Kubernetes usually uses **containerd**, which is CRI-compatible.

#### Example

The Container Runtime starts an **Nginx container** inside a Pod.

---

### 4. Pods

#### Purpose

A **Pod** is the smallest deployable unit in Kubernetes.

A Pod contains one or more containers.

#### Example

```text
Pod
│
├── nginx container
└── log sidecar container
```

The application actually runs inside the Pod.

---

## Control Plane vs Worker Node

| Control Plane | Worker Node |
|---------------|-------------|
| Manages the Kubernetes cluster | Runs application Pods |
| Receives API requests | Executes containers |
| Makes scheduling decisions | Runs Kubelet and kube-proxy |
| Stores cluster state in etcd | Runs Container Runtime |
| Monitors cluster health | Hosts Pods |

---

## Real Example

Suppose you deploy an Nginx application.

### Step 1

Run the Deployment.

```bash
kubectl apply -f nginx-deployment.yaml
```

### Step 2

The **API Server** receives the request.

### Step 3

The deployment information is stored in **etcd**.

### Step 4

The **Scheduler** selects the best Worker Node.

### Step 5

The **Kubelet** receives the instruction.

### Step 6

The **Container Runtime** starts the Nginx container inside a Pod.

### Step 7

The **kube-proxy** routes network traffic to the running Pod.

The application is now available to users.

---

## Hands-on Practice

### Step 1: Start Minikube

```bash

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube


minikube version

minikube start
```

Output showing the cluster has started successfully.

<img width="1821" height="577" alt="image" src="https://github.com/user-attachments/assets/0007a0f4-a8c6-4745-884e-d312b51123a1" />


---

### Step 2: View Cluster Nodes

```bash
kubectl get nodes
```

**Expected Output**

```text
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   5m    v1.xx.x
```

<img width="1202" height="67" alt="image" src="https://github.com/user-attachments/assets/a697e203-25ba-40d0-992f-bf24549c6808" />


---

### Step 3: View Control Plane Pods

```bash
kubectl get pods -n kube-system
```

**Expected Output**

```text
NAME                                   READY   STATUS
etcd-minikube                          1/1     Running
kube-apiserver-minikube                1/1     Running
kube-controller-manager-minikube       1/1     Running
kube-scheduler-minikube                1/1     Running
coredns-xxxxxxxx                       1/1     Running
```

These Pods represent important Kubernetes system components.

<img width="1300" height="201" alt="image" src="https://github.com/user-attachments/assets/ade71c5c-05ec-4efc-93e9-f6acb3885409" />


---

## Key Points

- A Kubernetes Cluster consists of a **Control Plane** and one or more **Worker Nodes**.
- The **API Server** is the entry point for all Kubernetes requests.
- **etcd** stores the cluster's configuration and current state.
- The **Scheduler** chooses the best Worker Node for new Pods.
- The **Controller Manager** keeps the cluster in the desired state.
- The **Cloud Controller Manager** manages cloud resources when Kubernetes runs in cloud environments.
- The **Kubelet** ensures Pods are running correctly on each Worker Node.
- The **Container Runtime (CRI)** starts and manages containers.
- **kube-proxy** handles networking between Services and Pods.
- **Pods** are the smallest deployable units where applications run.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/6962d91a-1481-44ca-8187-280068a1c745" />


---

### Q12.
What is the difference between a **Pod**, a **ReplicaSet**, and a **Deployment**?

### Answer



**Pod**, **ReplicaSet**, and **Deployment** are Kubernetes objects that work together to run and manage applications.

- A **Pod** runs one or more containers.
- A **ReplicaSet** ensures that the required number of Pods are always running.
- A **Deployment** manages ReplicaSets and provides features like rolling updates and rollbacks.

---

## Relationship Between Pod, ReplicaSet, and Deployment

```text
Deployment
     │
     ▼
ReplicaSet
     │
     ▼
+---------+   +---------+   +---------+
|  Pod 1  |   |  Pod 2  |   |  Pod 3  |
+---------+   +---------+   +---------+
     │             │             │
 Containers    Containers    Containers
```

<img width="1254" height="1254" alt="image" src="https://github.com/user-attachments/assets/2d5f0694-da7d-4dc7-ae01-2cce1d77a9ba" />


---

## How They Work Together

```text
Developer
     │
kubectl apply -f deployment.yaml
     │
     ▼
Deployment
     │
Creates and manages
     ▼
ReplicaSet
     │
Creates and maintains
     ▼
Pods
     │
Run
     ▼
Containers
```

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/feee3127-c73a-4821-8141-9a9a225739ba" />


---

# 1. Pod

### Purpose

A **Pod** is the **smallest deployable unit** in Kubernetes.

It contains one or more containers that share:

- Network
- Storage
- IP Address

Usually, one Pod contains one main application container.

### Example

```text
Pod
│
├── nginx container
└── log sidecar container
```

### Example Command

Create a Pod:

```bash
kubectl run nginx --image=nginx
```

Check the Pod:

```bash
kubectl get pods
```

### Use Case

Run a single application, such as an Nginx web server.

---

# 2. ReplicaSet

### Purpose

A **ReplicaSet** ensures that the desired number of identical Pods are always running.

If a Pod crashes or is deleted, the ReplicaSet automatically creates a new one.

### Example

Desired Pods:

```text
3 Pods
```

Current Pods:

```text
2 Pods
```

ReplicaSet creates:

```text
1 New Pod
```

Result:

```text
3 Pods Running
```

### Example Command

View ReplicaSets:

```bash
kubectl get replicasets
```

or

```bash
kubectl get rs
```

### Use Case

Keep multiple copies of an application running for high availability.

---

# 3. Deployment

### Purpose

A **Deployment** manages ReplicaSets and provides advanced features for application deployment.

A Deployment can:

- Create ReplicaSets
- Scale applications
- Perform rolling updates
- Roll back to a previous version

### Example

Current version:

```text
nginx:1.25
```

Update to:

```text
nginx:1.26
```

Deployment updates Pods one by one without stopping the application.

### Example Command

Create a Deployment:

```bash
kubectl create deployment web --image=nginx
```

View Deployments:

```bash
kubectl get deployments
```

### Use Case

Deploy and manage production applications with zero or minimal downtime.

---

## Comparison Table

| Feature | Pod | ReplicaSet | Deployment |
|---------|-----|------------|------------|
| Purpose | Runs containers | Maintains the required number of Pods | Manages ReplicaSets and application updates |
| Creates Pods | Yes | Yes | Yes (through ReplicaSet) |
| Self-healing | No | Yes | Yes |
| Scaling | No | Yes | Yes |
| Rolling Updates | No | No | Yes |
| Rollback Support | No | No | Yes |
| Recommended for Production | No | Rarely | Yes |

---

## Real Example

Suppose you want to run an Nginx web application.

### Only Pod

```text
Pod
 │
 ▼
Nginx
```

If the Pod crashes, it is **not** recreated automatically.

---

### ReplicaSet

```text
ReplicaSet
     │
     ├── Pod 1
     ├── Pod 2
     └── Pod 3
```

If **Pod 2** crashes:

```text
ReplicaSet
     │
     ├── Pod 1
     ├── Pod 2 (New)
     └── Pod 3
```

The ReplicaSet creates a replacement Pod automatically.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/d69726c8-f1b8-4fa8-8940-ce49564ffbb2" />


---

### Deployment

```text
Deployment
      │
      ▼
ReplicaSet
      │
      ▼
Pod 1
Pod 2
Pod 3
```

If you update the application:

```text
Nginx 1.25
      │
      ▼
Nginx 1.26
```

The Deployment updates the Pods one by one without stopping the application.


---

## Difference Between Pod, ReplicaSet, and Deployment

| Feature | Pod | ReplicaSet | Deployment |
|---------|-----|------------|------------|
| Definition | Smallest deployable unit in Kubernetes that runs one or more containers | Kubernetes object that ensures a specified number of Pods are always running | Kubernetes object that manages ReplicaSets and application deployments |
| Main Purpose | Runs the application | Maintains the desired number of Pods | Manages application deployment, scaling, and updates |
| Manages | Containers | Pods | ReplicaSets and Pods |
| Creates Pods | No (it is the Pod itself) | Yes | Yes (through a ReplicaSet) |
| Self-Healing | No | Yes, recreates failed Pods | Yes, through the ReplicaSet |
| Scaling | Cannot scale automatically | Can maintain multiple Pod replicas | Can scale applications easily |
| Rolling Updates | Not supported | Not supported | Supported |
| Rollback | Not supported | Not supported | Supported |
| Used In | Testing or simple applications | Maintaining Pod availability | Production applications |
| Example | One Nginx Pod | Keep 3 Nginx Pods running | Deploy and update an Nginx application without downtime |



### Simple Summary

```text
Pod
│
Runs one or more containers
```

```text
ReplicaSet
│
Keeps the required number of Pods running
```

```text
Deployment
│
Manages ReplicaSets and provides updates, scaling, and rollbacks
```

---

## Hands-on Practice

### Step 1: Create a Deployment

```bash
kubectl create deployment nginx-app --image=nginx
```

**Output**

```text
deployment.apps/nginx-app created
```

<img width="1490" height="52" alt="image" src="https://github.com/user-attachments/assets/012c4743-ba40-4b51-8252-d12e8ce725bd" />


---

### Step 2: View the Deployment

```bash
kubectl get deployments
```

Initially:

```text
NAME        READY   UP-TO-DATE   AVAILABLE   AGE
nginx-app   0/1     1            0           15s
```

After a few seconds:

```text
NAME        READY   UP-TO-DATE   AVAILABLE   AGE
nginx-app   1/1     1            1           103s
```

**Explanation**

- Kubernetes first creates the Pod.
- Once the Pod becomes **Running**, the Deployment shows **READY = 1/1**.

<img width="1232" height="75" alt="image" src="https://github.com/user-attachments/assets/2164fc05-7006-41c7-9503-37d5f74f2cc0" />


---

### Step 3: View the ReplicaSet

```bash
kubectl get rs
```

**Output**

```text
NAME                   DESIRED   CURRENT   READY   AGE
nginx-app-574b8c4d9c   1         1         1       2m49s
```

**Explanation**

The Deployment automatically created a ReplicaSet, which created one Pod.

<img width="1155" height="67" alt="image" src="https://github.com/user-attachments/assets/54ab264e-8834-4e2f-97f6-5a55db943eff" />


---

### Step 4: View the Pod

```bash
kubectl get pods
```

**Output**

```text
NAME                         READY   STATUS    RESTARTS   AGE
nginx-app-574b8c4d9c-mx2xj   1/1     Running   0          3m39s
```

**Explanation**

The Pod is now running the Nginx container.

<img width="1171" height="71" alt="image" src="https://github.com/user-attachments/assets/e47a9550-383d-4f54-a006-c16b3b0caf9c" />


---

### Step 5: Scale the Deployment

Increase replicas to 3.

```bash
kubectl scale deployment nginx-app --replicas=3
```

**Output**

```text
deployment.apps/nginx-app scaled
```

Verify:

```bash
kubectl get pods
```

Output after all Pods become ready:

```text
NAME                         READY   STATUS    RESTARTS   AGE
nginx-app-574b8c4d9c-brnjz   1/1     Running   0          8s
nginx-app-574b8c4d9c-g5wtq   1/1     Running   0          9s
nginx-app-574b8c4d9c-mx2xj   1/1     Running   0          3m39s
```

**Explanation**

The ReplicaSet created two additional Pods to satisfy the desired replica count.

<img width="1542" height="266" alt="image" src="https://github.com/user-attachments/assets/66049b0a-d2f8-4015-a19a-408febcbb828" />


---

### Step 6: Delete One Pod (Self-Healing)

Delete one Pod.

```bash
kubectl delete pod nginx-app-574b8c4d9c-brnjz
```

Output:

```text
pod "nginx-app-574b8c4d9c-brnjz" deleted
```

Immediately check Pods.

```bash
kubectl get pods
```

Output:

```text
NAME                         READY   STATUS              RESTARTS   AGE
nginx-app-574b8c4d9c-8phpc   0/1     ContainerCreating   0          2s
nginx-app-574b8c4d9c-g5wtq   1/1     Running             0          108s
nginx-app-574b8c4d9c-mx2xj   1/1     Running             0          5m18s
```

After a few seconds:

```text
NAME                         READY   STATUS    RESTARTS   AGE
nginx-app-574b8c4d9c-8phpc   1/1     Running   0          5s
nginx-app-574b8c4d9c-g5wtq   1/1     Running   0          111s
nginx-app-574b8c4d9c-mx2xj   1/1     Running   0          5m21s
```

**Explanation**

The ReplicaSet detected that only **2 Pods** were running and automatically created a replacement Pod.

This feature is called **Self-Healing**.

<img width="1397" height="45" alt="image" src="https://github.com/user-attachments/assets/211f3290-ad10-4f51-9764-54014696b443" />


---

### Step 7: Perform a Rolling Update

Update the Deployment image.

```bash
kubectl set image deployment/nginx-app nginx=nginx:latest
```

Output:

```text
deployment.apps/nginx-app image updated
```

Check rollout status.

```bash
kubectl rollout status deployment/nginx-app
```

Output:

```text
Waiting for deployment "nginx-app" rollout to finish...
deployment "nginx-app" successfully rolled out
```

Verify Pods.

```bash
kubectl get pods
```

Output:

```text
NAME                        READY   STATUS    RESTARTS   AGE
nginx-app-5d665df68-mjnvd   1/1     Running   0          41s
nginx-app-5d665df68-pr9p4   1/1     Running   0          38s
nginx-app-5d665df68-pvbhr   1/1     Running   0          45s
```

**Explanation**

A new ReplicaSet was created, and the Pods were replaced one by one without downtime.

<img width="1602" height="442" alt="image" src="https://github.com/user-attachments/assets/8647202d-2f0a-4952-8c69-5dbdda6d72cb" />

---

### Step 8: View Rollout History

```bash
kubectl rollout history deployment/nginx-app
```

Output

```text
deployment.apps/nginx-app

REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```

**Explanation**

Kubernetes keeps a history of Deployment revisions.

<img width="1436" height="132" alt="image" src="https://github.com/user-attachments/assets/142b1ff7-c281-467f-a82b-32f06cc85e8b" />


---

### Step 9: Roll Back the Deployment

```bash
kubectl rollout undo deployment/nginx-app
```

Output

```text
deployment.apps/nginx-app rolled back
```

Check Pods.

```bash
kubectl get pods
```

Output:

```text
NAME                         READY   STATUS    RESTARTS   AGE
nginx-app-574b8c4d9c-r9vfx   1/1     Running
nginx-app-574b8c4d9c-smh9z   1/1     Running
nginx-app-574b8c4d9c-z7ll2   1/1     Running
```

**Explanation**

Kubernetes restored the previous ReplicaSet and recreated the earlier version of the Pods.

<img width="1417" height="292" alt="image" src="https://github.com/user-attachments/assets/8d9a462a-6f15-4f1a-9076-6bd932f322cb" />


---

### Step 10: Delete the Deployment

```bash
kubectl delete deployment nginx-app
```

Output

```text
deployment.apps "nginx-app" deleted
```

**Explanation**

Deleting the Deployment also removes the associated ReplicaSet and Pods.

Verify:

```bash
kubectl get all
```

No resources related to `nginx-app` should remain.

<img width="1397" height="45" alt="image" src="https://github.com/user-attachments/assets/c50f59ed-ef23-4199-8597-c9cf4ea1b214" />



---

## Key Points

- A **Pod** is the smallest unit that runs one or more containers.
- A **ReplicaSet** ensures the required number of Pods are always running.
- A **Deployment** manages ReplicaSets and supports scaling, rolling updates, and rollbacks.
- In production, applications are usually deployed using **Deployments** instead of creating Pods directly.
- Deployment → ReplicaSet → Pods is the standard hierarchy in Kubernetes.

---


Remember:

```text
Deployment
      ↓
ReplicaSet
      ↓
Pods
      ↓
Containers
```

---

### Q13.
Write a Pod manifest that runs a `redis` container and write the `kubectl` command to create it and check its status.

### Answer


A **Pod manifest** is a YAML file that tells Kubernetes **what to create** and **how to run it**.

Think of it like this:

- **YAML file** = Recipe 
- **Kubernetes** = Chef 
- **Pod** = Lunch box 
- **Container** = Food  (Redis)

When we give Kubernetes the YAML file, it reads the instructions and creates the Pod automatically.

---

# What We Are Going to Do

```text
Step 1
Write a YAML file
        │
        ▼
Step 2
kubectl apply -f redis-pod.yaml
        │
        ▼
Step 3
Kubernetes creates the Pod
        │
        ▼
Step 4
Check whether the Pod is running
        │
        ▼
Step 5
View Pod details and logs
        │
        ▼
Step 6
Delete the Pod
```

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/d3986dd8-00bc-48fa-aca2-0cb098145514" />


---

# Kubernetes Workflow

```text
redis-pod.yaml
        │
        ▼
kubectl apply -f redis-pod.yaml
        │
        ▼
Kubernetes API Server
        │
Stores the Pod request
        │
        ▼
Scheduler
        │
Chooses a Node
        │
        ▼
Kubelet
        │
Pulls Redis Image
        │
Creates Container
        │
        ▼
Redis Pod Running
```

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/84ec0778-5c7b-4b8f-8c2d-b897b2ba8b08" />


---

# Pod Manifest

Create a file named **redis-pod.yaml**

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: redis-pod
  labels:
    app: redis

spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```
<img width="1122" height="1402" alt="image" src="https://github.com/user-attachments/assets/ad68caaa-cb2e-4e05-99ca-a1c3a990f2e6" />


---

# Understanding Every Line

## 1. apiVersion

```yaml
apiVersion: v1
```

Tells Kubernetes which API version understands this object.

Think of it as:

> "Use Kubernetes API version v1."

---

## 2. kind

```yaml
kind: Pod
```

Tells Kubernetes what to create.

Here we are creating a **Pod**.

---

## 3. metadata

```yaml
metadata:
  name: redis-pod
```

Gives the Pod its name.

Later we can use:

```bash
kubectl get pod redis-pod
```

because the Pod's name is **redis-pod**.

---

## 4. labels

```yaml
labels:
  app: redis
```

Labels are like stickers.

Example:

```text
Pod
┌────────────┐
│ redis-pod  │
│ app=redis  │
└────────────┘
```

Later Services or Deployments can find Pods using these labels.

---

## 5. spec

```yaml
spec:
```

This is the instruction section.

Think:

> "How should Kubernetes run this Pod?"

---

## 6. containers

```yaml
containers:
```

Lists all containers inside the Pod.

Usually there is one container.

---

## 7. name

```yaml
name: redis
```

Container name.

This is **not** the Pod name.

Pod name:

```text
redis-pod
```

Container name:

```text
redis
```

---

## 8. image

```yaml
image: redis:latest
```

Kubernetes downloads the Redis image from Docker Hub.

```text
Docker Hub
      │
      ▼
redis:latest
      │
      ▼
Container Created
```

---

## 9. containerPort

```yaml
containerPort: 6379
```

Redis listens on port **6379**.

This tells Kubernetes:

> "This application uses port 6379."

> **Note:** It does **not** expose Redis outside the cluster.

<img width="1402" height="1122" alt="image" src="https://github.com/user-attachments/assets/7be1c9e5-4ccc-4b04-aa6d-06aa9387a7f0" />


---

# Complete Architecture

```text
redis-pod.yaml
        │
        ▼
Pod
│
└──────────────┐
               │
        Redis Container
               │
         Port 6379
```

---

# Hands-on Practice

## Step 1: Create the YAML File

```bash
nano redis-pod.yaml
```

Paste the YAML content and save it.



---

## Step 2: Apply the YAML

```bash
kubectl apply -f redis-pod.yaml
```

### Output

```text
pod/redis-pod created
```

This means Kubernetes successfully created the Pod.

<img width="1295" height="75" alt="image" src="https://github.com/user-attachments/assets/68d47062-e44d-47a1-b0fd-1b59651f028b" />


---

## Step 3: Check Pod Status

```bash
kubectl get pods
```

### Your Output

```text
NAME        READY   STATUS    RESTARTS   AGE
redis-pod   1/1     Running   0          86s
```

### Meaning

```text
READY
1/1
│
└── One container exists
    and it is running.

STATUS
Running
│
└── Redis container started successfully.

RESTARTS
0
│
└── Container has never crashed.

AGE
86s
│
└── Pod was created 86 seconds ago.
```

<img width="1262" height="65" alt="image" src="https://github.com/user-attachments/assets/c299b826-34e2-4d28-826c-95c8924340fe" />


---

## Step 4: Describe the Pod

```bash
kubectl describe pod redis-pod
```

### Important Things You Saw

#### Pod Name

```text
Name: redis-pod
```

The Pod name.

---

#### Node

```text
Node: minikube
```

The node where the Pod is running.

---

#### Pod IP

```text
IP: 10.244.0.15
```

Internal IP assigned to the Pod.

---

#### Image

```text
Image: redis:latest
```

Confirms which Docker image Kubernetes downloaded.

---

#### State

```text
State: Running
```

The Redis container is currently running.

---

#### Ready

```text
Ready: True
```

The container is healthy and ready.

---

#### Events

At the bottom you saw:

```text
Scheduled
↓

Pulling Image
↓

Pulled Image
↓

Created Container
↓

Started Container
```

This is exactly what Kubernetes did behind the scenes.

```text
Scheduler
     │
     ▼
Pull Image
     │
     ▼
Create Container
     │
     ▼
Start Container
     │
     ▼
Running
```

<img width="1690" height="1167" alt="image" src="https://github.com/user-attachments/assets/bc5588c2-49d9-4678-b2d5-50df59cca34f" />


---

## Step 5: View Container Logs

```bash
kubectl logs redis-pod
```

### Your Output Started With

```text
Starting Redis Server

Redis is starting

Running mode=standalone

Ready to accept connections
```

These are the startup messages from the Redis container.

The most important line is:

```text
Ready to accept connections
```

It means Redis started successfully and is ready to receive client requests.

<img width="2185" height="1261" alt="image" src="https://github.com/user-attachments/assets/935c69c9-e26d-46b9-8cb6-58b62b00feee" />


---

## Step 6: Delete the Pod

```bash
kubectl delete pod redis-pod
```

### Your Output

```text
pod "redis-pod" deleted from default namespace
```

Kubernetes removed the Pod from the cluster.

<img width="1227" height="46" alt="image" src="https://github.com/user-attachments/assets/08562241-56a9-43e3-a486-725eaceb6be6" />


---

# What Happened Behind the Scenes?

```text
You
 │
 │ Write redis-pod.yaml
 ▼
Kubernetes
 │
 │ Reads YAML
 ▼
Creates Pod
 │
 │ Pulls Redis Image
 ▼
Creates Container
 │
 │ Starts Redis
 ▼
Pod Running
 │
 │ You check logs
 ▼
Delete Pod
 │
 ▼
Pod Removed
```

<img width="1254" height="1254" alt="image" src="https://github.com/user-attachments/assets/4c5f7954-cebd-4e63-a198-5910a1a09f3f" />


---

# Summary of Commands

| Task | Command |
|------|---------|
| Create YAML file | `nano redis-pod.yaml` |
| Create Pod | `kubectl apply -f redis-pod.yaml` |
| Check Pod | `kubectl get pods` |
| View Pod details | `kubectl describe pod redis-pod` |
| View logs | `kubectl logs redis-pod` |
| Delete Pod | `kubectl delete pod redis-pod` |

---

# Real-Life Example

Suppose you want to run a Redis database for your application.

```text
Write YAML
      │
      ▼
kubectl apply
      │
      ▼
Pod Created
      │
      ▼
Redis Container Started
      │
      ▼
Application connects to Redis
      │
      ▼
When finished
      │
      ▼
kubectl delete pod redis-pod
```

---

# Key Points

- A **Pod Manifest** is a YAML file that tells Kubernetes what to create.
- `apiVersion` specifies the Kubernetes API version.
- `kind` specifies the type of Kubernetes resource.
- `metadata` contains the Pod name and labels.
- `spec` describes how the Pod should run.
- `containers` lists the container(s) inside the Pod.
- `image` specifies the Docker image to run.
- `containerPort` documents the port used by the container.
- `kubectl apply -f` creates resources from a YAML file.
- `kubectl get pods` checks whether the Pod is running.
- `kubectl describe pod` shows detailed information and events.
- `kubectl logs` displays the container's output.
- `kubectl delete pod` removes the Pod from the cluster.

---

Remember the flow:

```text
Write YAML
     │
     ▼
Apply
     │
     ▼
Pod Created
     │
     ▼
Check Status
     │
     ▼
View Details
     │
     ▼
View Logs
     │
     ▼
Delete Pod
```


---

### Q14.
Explain the difference between the three Service types — **ClusterIP**, **NodePort**, and **LoadBalancer**.

### Answer

A **Service** in Kubernetes is like a **permanent address or reception desk** for Pods.

Think of a Kubernetes cluster as a **school**.

* Pods are **classrooms**.
* Applications are **students** inside the classrooms.

The problem is that classrooms can change because Pods can be deleted and recreated. Their IP addresses also change.

Instead of remembering the classroom number (Pod IP), everyone goes to the **reception desk (Service)**.

The Service always knows where the correct Pod is and forwards the request.

Kubernetes provides three common Service types:

1. **ClusterIP**
2. **NodePort**
3. **LoadBalancer**

---

# How a Service Works

```text
User Request
      │
      ▼
Kubernetes Service
      │
      ▼
+---------+  +---------+  +---------+
|  Pod 1  |  |  Pod 2  |  |  Pod 3  |
+---------+  +---------+  +---------+
```

The Service automatically sends the request to one of the available Pods.

---

# 1. ClusterIP

## Purpose

**ClusterIP** is the **default Service type** in Kubernetes.

It allows communication **only inside the Kubernetes cluster**.

Think of it as a classroom door **inside the school**.

Only teachers and students inside the school can use it.

People outside the school cannot enter.

---

## Architecture

```text
Inside Kubernetes Cluster

Application
      │
      ▼
ClusterIP Service
      │
      ▼
Pods
```

---

## Example Use Cases

* Backend API
* MySQL Database
* Redis Database
* Internal Microservices

---

## Example YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis-service
spec:
  selector:
    app: redis
  ports:
    - port: 6379
      targetPort: 6379
  type: ClusterIP
```

---

# 2. NodePort

## Purpose

A **NodePort** Service exposes an application through a fixed port on every Worker Node.

Users can access it using:

```text
<Node-IP>:<NodePort>
```

The NodePort range is usually

```text
30000 – 32767
```

Think of NodePort as the **main gate of the school**.

Visitors can enter using the gate number.

---

## Architecture

```text
Browser
     │
     ▼
Node IP:30904
     │
     ▼
NodePort Service
     │
     ▼
Pods
```

---

## Example Use Cases

* Development
* Testing
* Minikube
* Local Kubernetes clusters

---

## Example YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
  type: NodePort
```

Example URL

```text
http://192.168.49.2:30080
```

---

# 3. LoadBalancer

## Purpose

A **LoadBalancer** Service exposes an application to users on the Internet.

Instead of users directly accessing a node, a **Load Balancer** receives requests and distributes them to the Pods.

Think of it as the **security guard at the school gate**.

Everyone first meets the security guard, and the guard sends them to the correct classroom.

---

## Architecture

```text
Internet
     │
     ▼
Load Balancer
     │
     ▼
Kubernetes Service
     │
     ▼
+---------+  +---------+  +---------+
|  Pod 1  |  |  Pod 2  |  |  Pod 3  |
+---------+  +---------+  +---------+
```

---

## Example Use Cases

* Public Websites
* Production Applications
* APIs
* Cloud Deployments

---

## Example YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
  type: LoadBalancer
```

> **Note:** LoadBalancer works on cloud providers such as AWS, Azure, and GCP. In Minikube, we use `minikube tunnel` to simulate a cloud LoadBalancer.

---

# Difference Between ClusterIP, NodePort, and LoadBalancer

| Feature                  | ClusterIP              | NodePort              | LoadBalancer            |
| ------------------------ | ---------------------- | --------------------- | ----------------------- |
| Accessible from outside? | ❌ No                   | ✅ Yes                 | ✅ Yes                   |
| Default Service Type     | ✅ Yes                  | ❌ No                  | ❌ No                    |
| Used inside cluster      | ✅ Yes                  | ✅ Yes                 | ✅ Yes                   |
| Used outside cluster     | ❌ No                   | ✅ Yes                 | ✅ Yes                   |
| Access Method            | Cluster IP             | Node IP + NodePort    | External IP             |
| Best Use Case            | Internal communication | Development & Testing | Production Applications |

---

# Real Example

Suppose an Nginx application is running inside Kubernetes.

## ClusterIP

```text
Frontend Pod
      │
      ▼
ClusterIP Service
      │
      ▼
Backend Pods
```

Only applications inside the cluster can access the backend.

---

## NodePort

```text
Browser
      │
      ▼
192.168.49.2:30904
      │
      ▼
NodePort Service
      │
      ▼
Nginx Pod
```

Anyone who knows the Node IP and NodePort can access the application.

---

## LoadBalancer

```text
Internet
      │
      ▼
Load Balancer
      │
      ▼
Nginx Service
      │
      ▼
Nginx Pods
```

The Load Balancer distributes traffic to the Pods.

---

# Hands-on Practice (Minikube)

## Step 1: Create an Nginx Deployment

```bash
kubectl create deployment nginx --image=nginx
```

Expected Output

```text
deployment.apps/nginx created
```

**Screenshot to attach:** Deployment created.

---

## Step 2: Create a ClusterIP Service

```bash
kubectl expose deployment nginx \
--port=80 \
--target-port=80 \
--type=ClusterIP
```

Check the Service

```bash
kubectl get services
```

Expected Output

```text
NAME         TYPE        CLUSTER-IP
nginx        ClusterIP   10.x.x.x
```

Notice:

```text
EXTERNAL-IP = <none>
```

This means the Service is accessible **only inside the cluster**.

**Screenshot to attach:** Output of `kubectl get services`.

---

## Step 3: Create a NodePort Service

```bash
kubectl expose deployment nginx \
--name=nginx-nodeport \
--port=80 \
--target-port=80 \
--type=NodePort
```

Check the Service

```bash
kubectl get services
```

Example Output

```text
NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)
nginx-nodeport   NodePort   10.102.16.105   <none>        80:30904/TCP
```

Open the Service

```bash
minikube service nginx-nodeport
```

Minikube displays a URL similar to:

```text
http://192.168.49.2:30904
```

or

```text
http://127.0.0.1:35801
```

The browser should display:

```text
Welcome to nginx!
```

This confirms that the NodePort Service is working correctly.

**Screenshot to attach:** Browser showing the Nginx welcome page.

---

## Step 4: Create a LoadBalancer Service

```bash
kubectl expose deployment nginx \
--name=nginx-lb \
--port=80 \
--target-port=80 \
--type=LoadBalancer
```

Check the Service

```bash
kubectl get services
```

Initially

```text
EXTERNAL-IP
<pending>
```

This is normal in Minikube.

---

## Step 5: Start the Minikube Tunnel

Open another terminal and run

```bash
minikube tunnel
```

Enter your sudo password if prompted.

Now check the Service again

```bash
kubectl get services
```

Output

```text
NAME       TYPE           EXTERNAL-IP
nginx-lb   LoadBalancer   127.0.0.1
```

Open

```text
http://127.0.0.1
```

The browser displays

```text
Welcome to nginx!
```

This confirms that the LoadBalancer Service is working.

**Screenshot to attach:** Browser showing the Nginx welcome page.

---

# Clean Up

Delete the ClusterIP Service

```bash
kubectl delete service nginx
```

Delete the NodePort Service

```bash
kubectl delete service nginx-nodeport
```

Delete the LoadBalancer Service

```bash
kubectl delete service nginx-lb
```

Delete the Deployment

```bash
kubectl delete deployment nginx
```

Verify that everything is removed

```bash
kubectl get all
```

Expected Output

```text
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP
```

Only the default Kubernetes Service should remain.

---

# Key Points

* A **Service** provides a stable network endpoint for Pods.
* Pods may change, but the Service address remains the same.
* **ClusterIP** is the default Service type and works only inside the cluster.
* **NodePort** exposes the application using **Node IP + NodePort**.
* **LoadBalancer** exposes the application to the Internet using a cloud load balancer (or `minikube tunnel` in Minikube).

---

Easy way to remember:

```text
ClusterIP
      │
Inside Cluster Only

NodePort
      │
Node IP + Port

LoadBalancer
      │
Internet
      │
Load Balancer
      │
Pods
```


---

### Q15.
What is the difference between a **ConfigMap** and a **Secret**? Explain when you would use each.

### Answer

## Q15. What is the difference between a **ConfigMap** and a **Secret**? Explain when you would use each.

### Answer

Both **ConfigMap** and **Secret** are Kubernetes objects used to store configuration data that applications running inside Pods need.

The main difference is:

* **ConfigMap** stores **non-sensitive (public) configuration data**.
* **Secret** stores **sensitive (private) information** such as passwords, API keys, and tokens.

Keeping configuration separate from the application code makes applications easier to manage and update.

---

# Simple Diagram

```text
                  Kubernetes
                       │
          ┌────────────┴────────────┐
          │                         │
     ConfigMap                  Secret
          │                         │
   Public Information        Private Information
          │                         │
          └────────────┬────────────┘
                       │
                      Pod
                       │
                Application Reads Data
```

---

# What is a ConfigMap?

A **ConfigMap** stores **non-confidential configuration values**.

These values are safe to share and can be changed without modifying the application code.

### Examples

* Application name
* Port number
* Environment (dev, test, production)
* Logging level
* Feature flags

---

## Example ConfigMap YAML

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config

data:
  APP_NAME: MyApp
  APP_PORT: "8080"
```

---

## When to Use ConfigMap

Use a ConfigMap when storing information that is **safe for everyone to read**, such as:

* Application name
* Server port
* Environment
* Logging level

---

# What is a Secret?

A **Secret** stores **confidential information**.

Secrets help keep passwords, API keys, and tokens separate from application code.

### Examples

* Database username
* Database password
* API keys
* Access tokens
* SSL certificates

---

## Example Secret YAML

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret

type: Opaque

stringData:
  username: admin
  password: MyPassword123
```

> **Note:** Kubernetes stores Secret values as **Base64-encoded** data. Base64 is **encoding, not encryption**, so anyone with the required permissions can decode the values.

---

# ConfigMap vs Secret

| Feature     | ConfigMap                   | Secret                         |
| ----------- | --------------------------- | ------------------------------ |
| Stores      | Non-sensitive configuration | Sensitive information          |
| Examples    | App name, port, environment | Passwords, API keys, tokens    |
| Data Format | Plain text                  | Base64-encoded values          |
| Security    | Public configuration        | Private credentials            |
| Used For    | Application settings        | Authentication and credentials |

---

# How Pods Use Them

A Pod can read data from both ConfigMaps and Secrets.

```text
                Pod
                 │
        ┌────────┴────────┐
        │                 │
   ConfigMap          Secret
        │                 │
 APP_NAME          DB_PASSWORD
 APP_PORT          API_KEY
 ENVIRONMENT       TOKEN
```

Applications can access these values as:

* Environment variables
* Mounted files inside the container

---

# Real Example

Suppose you deploy an online shopping application.

### ConfigMap stores

```text
APP_NAME=ShoppingApp
APP_PORT=8080
ENVIRONMENT=production
```

### Secret stores

```text
DB_USERNAME=admin
DB_PASSWORD=MyPassword123
API_KEY=abcd12345
```

The application reads both, but sensitive information remains in the Secret.

---

# Hands-on Practice (Performed on Minikube)

## Step 1: Create a ConfigMap

Run the following command:

```bash
kubectl create configmap app-config \
  --from-literal=APP_NAME=MyApp \
  --from-literal=APP_PORT=8080
```

**Output**

```text
configmap/app-config created
```

**Purpose:** Creates a ConfigMap named **app-config** containing two configuration values.

**Screenshot to attach:** Output of the create command.

---

## Step 2: Verify the ConfigMap

List all ConfigMaps:

```bash
kubectl get configmap
```

**Output**

```text
NAME               DATA   AGE
app-config         2      9s
kube-root-ca.crt   1      13h
```

View complete details:

```bash
kubectl describe configmap app-config
```

**Output**

```text
Name:         app-config
Namespace:    default

Data
====
APP_NAME:
----
MyApp

APP_PORT:
----
8080
```

**Purpose:** Displays the values stored in the ConfigMap.

**Screenshot to attach:** Output of `kubectl describe configmap app-config`.

---

## Step 3: Create a Secret

Run:

```bash
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=MyPassword123
```

**Output**

```text
secret/db-secret created
```

**Purpose:** Creates a Secret containing the database username and password.

**Screenshot to attach:** Output of the create command.

---

## Step 4: Verify the Secret

List all Secrets:

```bash
kubectl get secrets
```

**Output**

```text
NAME        TYPE     DATA   AGE
db-secret   Opaque   2      31s
```

View Secret details:

```bash
kubectl describe secret db-secret
```

**Output**

```text
Name:         db-secret
Namespace:    default

Type:  Opaque

Data
====
password:  13 bytes
username:  5 bytes
```

Notice that Kubernetes shows **only the size of the data**, not the actual values.

**Screenshot to attach:** Output of `kubectl describe secret db-secret`.

---

## Step 5: View the Secret in YAML Format

Run:

```bash
kubectl get secret db-secret -o yaml
```

**Output**

```yaml
apiVersion: v1
data:
  password: TXlQYXNzd29yZDEyMw==
  username: YWRtaW4=
kind: Secret
metadata:
  name: db-secret
type: Opaque
```

The username and password are stored as **Base64-encoded** values.

**Screenshot to attach:** Output of the YAML.

---

## Step 6: Decode the Secret Values

Decode the username:

```bash
echo "YWRtaW4=" | base64 --decode
```

**Output**

```text
admin
```

Decode the password:

```bash
echo "TXlQYXNzd29yZDEyMw==" | base64 --decode
```

**Output**

```text
MyPassword123
```

**Purpose:** Demonstrates that Base64 encoding can be decoded back to the original value.

**Screenshot to attach:** Output of both decode commands.

---

## Step 7: Delete the Resources (Cleanup)

Delete the ConfigMap:

```bash
kubectl delete configmap app-config
```

**Output**

```text
configmap "app-config" deleted from default namespace
```

Delete the Secret:

```bash
kubectl delete secret db-secret
```

**Output**

```text
secret "db-secret" deleted from default namespace
```

Verify that they have been deleted:

```bash
kubectl get configmap
```

**Output**

```text
NAME               DATA   AGE
kube-root-ca.crt   1      13h
```

```bash
kubectl get secrets
```

**Output**

```text
No resources found in default namespace.
```

**Screenshot to attach:** Output after deleting the ConfigMap and Secret.

---

# Summary

| Kubernetes Object | Stores                      | Example                     |
| ----------------- | --------------------------- | --------------------------- |
| ConfigMap         | Non-sensitive configuration | App name, port, environment |
| Secret            | Sensitive information       | Passwords, API keys, tokens |

---

# Key Points

* A **ConfigMap** stores non-sensitive configuration data.
* A **Secret** stores sensitive information such as passwords and API keys.
* Both can be used by Pods as **environment variables** or **mounted files**.
* Secret values are **Base64-encoded**, not encrypted by default.
* Separating configuration from application code makes applications easier to maintain and update.

---



| Feature      | ConfigMap                                 | Secret                                                           |
| ------------ | ----------------------------------------- | ---------------------------------------------------------------- |
| Purpose      | Stores non-sensitive configuration data   | Stores sensitive or confidential data                            |
| Examples     | App name, port, environment, log level    | Passwords, API keys, tokens, certificates                        |
| Data Format  | Plain text                                | Base64-encoded values                                            |
| Security     | Not intended for confidential information | Intended for confidential information                            |
| Visibility   | Values can be viewed directly             | Values are hidden in `kubectl describe`; shown as Base64 in YAML |
| Used By Pods | Environment variables or mounted files    | Environment variables or mounted files                           |
| Typical Use  | Application configuration                 | Authentication credentials and secrets                           |

### Remember:

| ConfigMap         | Secret                      |
| ----------------- | --------------------------- |
| **Configuration** | **Sensitive Information**   |
| Public settings   | Private credentials         |
| Plain text        | Base64 encoded              |
| App configuration | Passwords, API keys, tokens |





```text
ConfigMap → Public Settings

Secret → Private Information
```


---

### Q16.
What is the difference between a **Deployment** and a **StatefulSet**? Give one example of an application suited to each.

### Answer


Both **Deployment** and **StatefulSet** are Kubernetes controllers used to manage Pods.

The main difference is:

* A **Deployment** is used for **stateless applications**, where every Pod is identical and any Pod can replace another.
* A **StatefulSet** is used for **stateful applications**, where each Pod has its own identity and persistent storage.

---



Let's understand this with a simple story.

## Deployment = School Uniform 👕

Imagine a school where every student wears the **same uniform**.

If one student goes home, another student wearing the same uniform takes their place.

Nobody notices the difference because everyone looks the same.

This is exactly how a **Deployment** works.

```text
Deployment

Student A
Student B
Student C

↓

Student B leaves

↓

New Student joins

↓

No problem!
```

Every Pod is identical.

---

## StatefulSet = Roll Number 📝

Now imagine an exam hall.

Every student has:

* Their own Roll Number
* Their own Seat
* Their own Answer Sheet

If Roll Number 5 goes outside and comes back,

they **must get the same seat and same answer sheet**.

You cannot give Roll Number 5's paper to Roll Number 8.

This is how a **StatefulSet** works.

```text
StatefulSet

Roll No.1
Roll No.2
Roll No.3

↓

Roll No.2 Restarts

↓

Still Roll No.2

Same Seat

Same Answer Sheet
```

---

# What is a Deployment?

A **Deployment** manages **stateless applications**.

All Pods are identical.

If one Pod crashes, Kubernetes creates another Pod automatically.

The new Pod may have a different name, but it works the same way.

### Features

* Used for stateless applications
* Pods are identical
* Supports rolling updates
* Easy to scale up and down
* Automatically replaces failed Pods

### Examples

* Nginx
* React
* Node.js API
* Apache Web Server

---

# What is a StatefulSet?

A **StatefulSet** manages **stateful applications**.

Each Pod has:

* A unique name
* A stable network identity
* Its own persistent storage

If a Pod restarts, it keeps the same name and data.

### Features

* Used for stateful applications
* Stable Pod names
* Persistent storage
* Ordered Pod creation
* Ordered Pod deletion

### Examples

* MySQL
* PostgreSQL
* MongoDB
* Redis Cluster
* Apache Kafka

---

# Simple ASCII Diagram

```text
                 Kubernetes
                      │
        ┌─────────────┴─────────────┐
        │                           │
   Deployment                 StatefulSet
        │                           │
        ▼                           ▼

 nginx-abc123                 mysql-0
 nginx-def456                 mysql-1
 nginx-ghi789                 mysql-2

 All Pods Same          Every Pod is Unique
```

---

# Another Diagram

## Deployment

```text
Deployment

        │

        ▼

+---------+
| Pod A   |
+---------+

+---------+
| Pod B   |
+---------+

+---------+
| Pod C   |
+---------+

All Pods are identical.
```

---

## StatefulSet

```text
StatefulSet

         │

         ▼

+-------------+
| mysql-0     |
| Disk-0      |
+-------------+

+-------------+
| mysql-1     |
| Disk-1      |
+-------------+

+-------------+
| mysql-2     |
| Disk-2      |
+-------------+

Each Pod has its own storage.
```

---

# What Happens If a Pod Crashes?

## Deployment

```text
Pod-A

↓

Crash

↓

Deleted

↓

New Pod Created

↓

Different Name

↓

Application Continues
```

---

## StatefulSet

```text
mysql-1

↓

Crash

↓

Restart

↓

Still mysql-1

↓

Same Storage

↓

Database Continues
```

---

# Deployment vs StatefulSet

| Feature          | Deployment                  | StatefulSet                       |
| ---------------- | --------------------------- | --------------------------------- |
| Application Type | Stateless                   | Stateful                          |
| Pod Identity     | Not important               | Unique and stable                 |
| Pod Name         | Can change after recreation | Remains the same                  |
| Storage          | Temporary or shared         | Persistent for each Pod           |
| Pod Creation     | Any order                   | Created one by one                |
| Pod Deletion     | Any order                   | Deleted in reverse order          |
| Scaling          | Fast and simple             | Ordered scaling                   |
| Best For         | Web servers, APIs           | Databases and distributed systems |

---

# Real-Life Example

## Deployment Example

Suppose you deploy an Nginx website.

```text
Deployment

        │

        ▼

nginx Pod
nginx Pod
nginx Pod
```

If one Pod crashes:

```text
Old Pod

↓

Deleted

↓

New Pod Created

↓

New Pod Name

↓

Website Still Works
```

The application continues because all Pods are identical.

---

## StatefulSet Example

Suppose you deploy a MySQL database.

```text
mysql-0

mysql-1

mysql-2
```

Each Pod stores its own database files.

If `mysql-1` crashes:

```text
mysql-1

↓

Restart

↓

Same Name

↓

Same Storage

↓

Database Continues
```

---

# Hands-on Practice (Minikube)

## Step 1: Create a Deployment

Create an Nginx Deployment.

```bash
kubectl create deployment nginx-app --image=nginx
```

**Output**

```text
deployment.apps/nginx-app created
```

📸 **Screenshot to attach:** Output showing the Deployment was created.

---

## Step 2: Verify the Deployment

Check the Deployment.

```bash
kubectl get deployments
```

**Output**

```text
NAME        READY   UP-TO-DATE   AVAILABLE   AGE
nginx-app   1/1     1            1           70s
```

Check the Pod.

```bash
kubectl get pods
```

**Output**

```text
NAME                         READY   STATUS    RESTARTS   AGE
nginx-app-574b8c4d9c-m8jm2   1/1     Running   0          100s
```

📸 **Screenshot to attach:** `kubectl get deployments` and `kubectl get pods`.

---

## Step 3: Scale the Deployment

Increase the number of Pods from 1 to 3.

```bash
kubectl scale deployment nginx-app --replicas=3
```

**Output**

```text
deployment.apps/nginx-app scaled
```

---

## Step 4: Verify the Pods

```bash
kubectl get pods
```

**Output**

```text
NAME                         READY   STATUS    RESTARTS   AGE
nginx-app-574b8c4d9c-49nbw   1/1     Running   0          16s
nginx-app-574b8c4d9c-d8xzl   1/1     Running   0          16s
nginx-app-574b8c4d9c-m8jm2   1/1     Running   0          2m27s
```

Notice:

* Three Pods are running.
* Pod names are different.
* All Pods run the same Nginx application.

📸 **Screenshot to attach:** `kubectl get pods`

---

## Step 5: Verify the Deployment

```bash
kubectl get deployments
```

**Output**

```text
NAME        READY   UP-TO-DATE   AVAILABLE   AGE
nginx-app   3/3     3            3           2m38s
```

This shows:

* Desired Pods = 3
* Running Pods = 3
* Available Pods = 3

📸 **Screenshot to attach:** `kubectl get deployments`

---

## Step 6: Check StatefulSets

Run:

```bash
kubectl get statefulsets
```

or

```bash
kubectl get sts
```

**Output**

```text
No resources found in default namespace.
```

This is expected because we have not created any StatefulSet yet.

> **Note:** Creating a StatefulSet requires a **Headless Service** and **Persistent Volumes**, which is beyond the scope of this assignment.

📸 **Screenshot to attach:** `kubectl get statefulsets`

---

## Step 7: View All Kubernetes Resources

```bash
kubectl get all
```

**Output**

```text
NAME                             READY   STATUS    RESTARTS   AGE
pod/nginx-app-574b8c4d9c-49nbw   1/1     Running   0          54s
pod/nginx-app-574b8c4d9c-d8xzl   1/1     Running   0          54s
pod/nginx-app-574b8c4d9c-m8jm2   1/1     Running   0          3m5s

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-app   3/3     3            3           3m6s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-app-574b8c4d9c   3         3         3       3m5s
```

📸 **Screenshot to attach:** `kubectl get all`

---

## Step 8: Clean Up

Delete the Deployment.

```bash
kubectl delete deployment nginx-app
```

**Output**

```text
deployment.apps "nginx-app" deleted
```

Verify cleanup.

```bash
kubectl get all
```

**Output**

```text
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP    13h
```

Only the default Kubernetes Service remains.

📸 **Screenshot to attach:** `kubectl get all`

---

# Summary

| Kubernetes Object | Used For               | Example Applications       |
| ----------------- | ---------------------- | -------------------------- |
| Deployment        | Stateless applications | Nginx, React, Node.js      |
| StatefulSet       | Stateful applications  | MySQL, PostgreSQL, MongoDB |

---

# Key Points

* A **Deployment** manages **stateless applications**.
* A **StatefulSet** manages **stateful applications**.
* Deployment Pods are interchangeable and can be recreated with different names.
* StatefulSet Pods always keep the same name and persistent storage.
* Deployments are commonly used for web applications and APIs.
* StatefulSets are commonly used for databases and distributed systems.

---

Here's a clean comparison table you can copy into your assignment.

### Deployment vs StatefulSet

| Feature              | Deployment                                 | StatefulSet                                    |
| -------------------- | ------------------------------------------ | ---------------------------------------------- |
| Purpose              | Manages **stateless** applications         | Manages **stateful** applications              |
| Pod Identity         | All Pods are identical and interchangeable | Each Pod has a unique identity                 |
| Pod Name             | Changes when recreated                     | Remains the same after restart                 |
| Storage              | Usually temporary (ephemeral) or shared    | Each Pod gets its own Persistent Volume (PV)   |
| Data Persistence     | Data may be lost if the Pod is recreated   | Data is preserved across Pod restarts          |
| Pod Creation         | Pods can be created in any order           | Pods are created one by one (0 → 1 → 2)        |
| Pod Deletion         | Pods can be deleted in any order           | Pods are deleted in reverse order (2 → 1 → 0)  |
| Scaling              | Fast and parallel                          | Ordered and controlled                         |
| Rolling Updates      | Updates Pods in parallel                   | Updates Pods one at a time, maintaining order  |
| Network Identity     | Pod IP and name may change                 | Stable Pod name and network identity           |
| Best Suited For      | Web applications, APIs, microservices      | Databases, message queues, distributed systems |
| Example Applications | Nginx, Apache, React, Node.js              | MySQL, PostgreSQL, MongoDB, Kafka              |

---

### Quick Summary

| Deployment                | StatefulSet                    |
| ------------------------- | ------------------------------ |
| Stateless                 | Stateful                       |
| Pods are identical        | Pods are unique                |
| No permanent storage      | Permanent storage for each Pod |
| Easy to replace Pods      | Keeps Pod identity and data    |
| Best for web applications | Best for databases             |



```text
Deployment  →  Dynamic (Stateless)

StatefulSet → Stable + Storage
```



Remember:

```text
Deployment
↓

Stateless

↓

Any Pod can replace another

--------------------------------

StatefulSet

↓

Stateful

↓

Same Pod

Same Name

Same Storage
```


---

### Q17.
Install **Minikube** and write the commands to start the cluster, list nodes, deploy a pod, and delete the cluster. (Attach screenshots.)

### Answer

Yes! Since you performed all the commands successfully, here's a **clean assignment-ready answer** using **your actual outputs**. You can copy and paste it directly.

---

# Q17. Install Minikube and Write the Commands to Start the Cluster, List Nodes, Deploy a Pod, and Delete the Cluster

## What is Minikube?

Imagine you want to learn Kubernetes, but you don't have many computers.

**Minikube** creates a **small Kubernetes cluster** on your own computer so you can practice Kubernetes locally.

Think of it like this:

```text
             Your Computer
                   │
                   ▼
          +----------------+
          |   Minikube     |
          +----------------+
                   │
                   ▼
      Kubernetes Cluster (1 Node)
                   │
          +----------------+
          | Control Plane  |
          | + Worker Node  |
          +----------------+
                   │
                   ▼
                  Pods
```

Instead of using many servers, Minikube creates **one local Kubernetes cluster** that behaves like a real cluster.

---

# Before Starting

First, verify that Docker, kubectl, and Minikube are installed.

```bash
docker --version
kubectl version --client
minikube version
```

### Output

```text
Docker version 29.5.3
Client Version: v1.35.0
minikube version: v1.38.1
```

### What happens?

* Docker runs containers.
* kubectl communicates with Kubernetes.
* Minikube creates a local Kubernetes cluster.

📸 **Screenshot:** Output of the above commands.

---

# Step 1 – Start the Minikube Cluster

Start the Kubernetes cluster.

```bash
minikube start
```

### What happens?

Think of it like opening a school.

Before:

```text
Nothing is running.
```

After:

```text
Your Computer
      │
      ▼
+----------------+
|   Minikube     |
+----------------+
      │
      ▼
 Kubernetes Cluster
```

Minikube starts:

* Control Plane
* Worker Node
* Kubernetes API Server

Now the Kubernetes cluster is ready.

📸 **Screenshot:** `minikube start`

---

# Step 2 – Check the Cluster Status

Verify that the cluster is running.

```bash
minikube status
```

### Output

```text
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

This means everything is working correctly.

📸 **Screenshot:** `minikube status`

---

# Step 3 – List the Nodes

Display the nodes in the cluster.

```bash
kubectl get nodes
```

### Output

```text
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   17h   v1.35.1
```

### What happens?

A **Node** is a computer that runs Pods.

Since Minikube creates only one node, the output shows one node named **minikube**.

```text
Cluster
   │
   ▼
+-----------+
| minikube  |
+-----------+
```

📸 **Screenshot:** `kubectl get nodes`

---

# Step 4 – Deploy a Pod

Create an Nginx Pod.

```bash
kubectl run nginx-pod --image=nginx
```

### Output

```text
pod/nginx-pod created
```

### What happens?

Think of a Pod as a lunch box.

Inside the lunch box is the application (Nginx).

```text
Pod
+----------------------+
|     nginx            |
+----------------------+
```

Kubernetes downloads the Nginx image and starts the container.

📸 **Screenshot:** Pod creation message.

---

# Step 5 – Verify the Pod

Check whether the Pod is running.

```bash
kubectl get pods
```

### Output

```text
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          44s
```

### What does it mean?

* **READY = 1/1** → One container is running successfully.
* **STATUS = Running** → The Pod is working properly.
* **RESTARTS = 0** → The container has not restarted.
* **AGE = 44s** → The Pod was created 44 seconds ago.

```text
Node
│
└── nginx-pod
      │
      └── nginx Container
```

📸 **Screenshot:** `kubectl get pods`

---

# Step 6 – View Pod Details

Display detailed information about the Pod.

```bash
kubectl describe pod nginx-pod
```

### What happens?

This command acts like the Pod's report card.

It shows:

* Pod Name
* Namespace
* Node Name
* IP Address
* Container Image
* Status
* Events

This command is very useful for troubleshooting Pod issues.

📸 **Screenshot:** `kubectl describe pod nginx-pod`

---

# Step 7 – Delete the Pod

Delete the Pod.

```bash
kubectl delete pod nginx-pod
```

### Output

```text
pod "nginx-pod" deleted
```

Verify that the Pod has been removed.

```bash
kubectl get pods
```

### Output

```text
No resources found in default namespace.
```

### What happens?

Before:

```text
Node
│
└── nginx-pod
```

After:

```text
Node

(No Pods)
```

📸 **Screenshot:** `kubectl delete pod nginx-pod` and `kubectl get pods`

---

# Step 8 – Stop the Cluster (Optional)

Stop the Minikube cluster.

```bash
minikube stop
```

### What happens?

Stopping the cluster is like putting your laptop into sleep mode.

The cluster is turned off, but its data is preserved.

```text
Cluster

Sleeping 😴
```

The next time you run:

```bash
minikube start
```

the same cluster starts again.

📸 **Screenshot:** `minikube stop`

---

# Step 9 – Delete the Cluster

Delete the entire Minikube cluster.

```bash
minikube delete
```

### Output

```text
🔥 Deleting "minikube" ...
💀 Removed all traces of the "minikube" cluster.
```

### What happens?

Deleting the cluster removes everything permanently.

```text
Computer

(No Kubernetes Cluster)
```

To use Kubernetes again, you must create a new cluster using:

```bash
minikube start
```

📸 **Screenshot:** `minikube delete`

---

# Verification After Deleting the Cluster

Run:

```bash
kubectl get nodes
```

### Output

```text
The connection to the server localhost:8080 was refused.
```

This happens because the Kubernetes cluster has been deleted, so `kubectl` can no longer connect to it.

📸 **Screenshot:** `kubectl get nodes` after `minikube delete`

---

# Complete Workflow

```text
        Check Installations
               │
               ▼
        minikube start
               │
               ▼
      Kubernetes Cluster Starts
               │
               ▼
       kubectl get nodes
               │
               ▼
        One Node Available
               │
               ▼
kubectl run nginx-pod --image=nginx
               │
               ▼
          Pod Created
               │
               ▼
       kubectl get pods
               │
               ▼
        Pod is Running
               │
               ▼
kubectl describe pod nginx-pod
               │
               ▼
      View Pod Details
               │
               ▼
kubectl delete pod nginx-pod
               │
               ▼
         Pod Removed
               │
               ▼
       minikube stop
               │
               ▼
     Cluster Stopped (Saved)
               │
               ▼
      minikube delete
               │
               ▼
 Cluster Completely Deleted
```

---

# Difference Between `minikube stop` and `minikube delete`

| Feature       | `minikube stop`                    | `minikube delete`                                |
| ------------- | ---------------------------------- | ------------------------------------------------ |
| Purpose       | Stops the running cluster          | Deletes the entire cluster                       |
| Cluster Data  | Preserved                          | Removed permanently                              |
| Restart       | Can restart using `minikube start` | Must create a new cluster using `minikube start` |
| Time Required | Faster                             | Takes longer because it recreates everything     |
| Example       | Like putting a laptop to sleep     | Like uninstalling a program from your computer   |

---

# Screenshots to Attach

1. `docker --version`, `kubectl version --client`, `minikube version`
2. `minikube start`
3. `minikube status`
4. `kubectl get nodes`
5. `kubectl run nginx-pod --image=nginx`
6. `kubectl get pods`
7. `kubectl describe pod nginx-pod`
8. `kubectl delete pod nginx-pod`
9. `kubectl get pods` (No resources found)
10. `minikube stop`
11. `minikube delete`
12. `kubectl get nodes` after deleting the cluster

---


Remember it as:

**Verify → Start → Status → Nodes → Pod → Get → Describe → Remove → Stop → Delete**



---

### Q18.
Explain the difference between **scaling manually** (`kubectl scale`) and **autoscaling** with an HPA.

### Answer


## What is Scaling?

Scaling means **giving more resources to an application when the load increases** to handle changes in traffic or workload.

Suppose your website normally has **100 users**, but suddenly **10,000 users** visit it.

To handle this increased traffic, Kubernetes can scale the application in three different ways:

* Manual Scaling
* Horizontal Scaling (HPA)
* Vertical Scaling (VPA)

> Note: HPA stands for Horizontal Pod Autoscaler, so it performs horizontal scaling (adding/removing Pods). It is not vertical scaling.

---

# 1. Manual Scaling (kubectl scale)

In manual scaling, **the administrator decides how many Pods should run**.

Kubernetes will not increase or decrease Pods automatically.

### Example

Initially:

```text
Users
   │
   ▼
+-------+
| Pod-1 |
+-------+
```

You notice more users are visiting your website.

You manually run:

```bash
kubectl scale deployment nginx-app --replicas=4
```

Now Kubernetes creates more Pods.

```text
Users
   │
   ▼
+-------+  +-------+  +-------+  +-------+
| Pod-1 |  | Pod-2 |  | Pod-3 |  | Pod-4 |
+-------+  +-------+  +-------+  +-------+
```

The **load is now shared** among all four Pods.

**Important:** Kubernetes did **not** decide this. **You** decided to increase the replicas.

---

## Hands-on (Manual Scaling)

Create a Deployment:

```bash
kubectl create deployment nginx-app --image=nginx
```

Check the Deployment:

```bash
kubectl get deployments
```

Scale to 3 Pods:

```bash
kubectl scale deployment nginx-app --replicas=3
```

Verify:

```bash
kubectl get pods
```

Output:

```text
nginx-app-abc12   Running
nginx-app-def34   Running
nginx-app-ghi56   Running
```

Scale back to one Pod:

```bash
kubectl scale deployment nginx-app --replicas=1
```

---

# 2. Horizontal Scaling (HPA)

Horizontal scaling means **adding or removing Pods automatically** based on CPU or memory usage.

The number of Pods changes, but **each Pod keeps the same CPU and RAM**.

### Example

Initially:

```text
Users
   │
   ▼
+-------+
| Pod-1 |
+-------+
```

More users arrive.

CPU usage becomes high.

```text
CPU Usage = 85%
```

HPA detects that CPU usage is above the target (for example, 50%) and automatically creates more Pods.
Instead of making Pod-1 larger, Kubernetes creates more Pods.

```text
Users
        │
        ▼
+-------+   +-------+   +-------+   +-------+
| Pod-1 |   | Pod-2 |   | Pod-3 |   | Pod-4 |
+-------+   +-------+   +-------+   +-------+
```

Now the load is distributed across all Pods.

This is called **Horizontal Scaling** because we increase Pods **side by side**.

```
Pod-1  Pod-2  Pod-3  Pod-4
```

When traffic decreases, HPA automatically removes the extra Pods.

```text
Users
   │
   ▼
+-------+
| Pod-1 |
+-------+
```

HPA automatically removes the extra Pods.

---

## Hands-on (Horizontal Scaling using HPA)

### Step 1

Create a Deployment with CPU requests.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app

spec:
  replicas: 1

  selector:
    matchLabels:
      app: nginx-app

  template:
    metadata:
      labels:
        app: nginx-app

    spec:
      containers:
      - name: nginx
        image: nginx

        resources:
          requests:
            cpu: "100m"
          limits:
            cpu: "200m"
```

Apply it.

```bash
kubectl apply -f nginx-deployment.yaml
```

---

### Step 2

Create the HPA.

```bash
kubectl autoscale deployment nginx-app --cpu=50% --min=1 --max=5
```

Check:

```bash
kubectl get hpa
```

---

### Step 3

Generate load.

```bash
kubectl run load-generator -it --rm --image=busybox -- /bin/sh
```

Inside the Pod:

```sh
while true; do
  wget -q -O- http://nginx-app
done
```

Open another terminal.

Watch the Pods.

```bash
kubectl get pods -w
```

Watch the HPA.

```bash
kubectl get hpa -w
```

You should see something similar to:

```text
cpu: 72%/50%
Replicas: 2
```

Then:

```text
cpu: 84%/50%
Replicas: 3
```

When you stop the load generator:

```bash
exit
```

CPU usage falls.

```text
cpu: 20%/50%
Replicas: 1
```

HPA automatically removes the extra Pods.

---

# 3. Vertical Scaling (VPA)

Vertical scaling means **increasing the resources of the same Pod**.

The number of Pods **does not change**.

Instead, the Pod gets more CPU or more RAM.

### Example

Initially:

```text
+----------------------+
| Pod-1                |
| CPU : 1 Core         |
| RAM : 1 GB           |
+----------------------+
```

Load increases.

Instead of creating more Pods, Kubernetes gives the same Pod more resources.

```text
+----------------------+
| Pod-1                |
| CPU : 4 Cores        |
| RAM : 8 GB           |
+----------------------+
```

Notice:

There is still only **one Pod**.

Only CPU and memory increased.

This is called **Vertical Scaling** because the Pod grows **upward**.

---

## Hands-on (Vertical Scaling - Beginner)

Kubernetes does not include VPA by default, but we can simulate vertical scaling by updating the Deployment.

Suppose the Deployment currently has:

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"

  limits:
    cpu: "200m"
    memory: "256Mi"
```

Edit the Deployment and increase the resources.

```yaml
resources:
  requests:
    cpu: "500m"
    memory: "512Mi"

  limits:
    cpu: "1"
    memory: "1Gi"
```

Apply the changes.

```bash
kubectl apply -f nginx-deployment.yaml
```

Verify:

```bash
kubectl describe deployment nginx-app
```

You will see:

```text
Requests:
    cpu: 500m
    memory: 512Mi

Limits:
    cpu: 1
    memory: 1Gi
```

The Deployment performs a rolling update by replacing the old Pod with a new Pod that has the updated resources.

---

# Complete Comparison

| Feature         | Manual Scaling        | Horizontal Scaling (HPA)                   | Vertical Scaling (VPA)                                                   |
| --------------- | --------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| Who decides?    | Administrator         | Kubernetes                                 | Kubernetes (using VPA)                                                   |
| Number of Pods  | User changes manually | Automatically increases or decreases       | Stays the same                                                           |
| CPU/RAM per Pod | No change             | No change                                  | Increases or decreases                                                   |
| Trigger         | `kubectl scale`       | CPU/Memory usage                           | Resource recommendations and usage                                       |
| Best for        | Learning, testing     | Production workloads with changing traffic | Applications that need more CPU/RAM but cannot easily scale horizontally |

---


Imagine you own a restaurant.

### Manual Scaling

You hire **3 more chefs** yourself.

```
Chef-1
Chef-2
Chef-3
Chef-4
```

You made the decision.

---

### Horizontal Scaling (HPA)

More customers arrive.

The restaurant automatically hires more chefs.

```
Chef-1  Chef-2  Chef-3  Chef-4
```

More workers share the workload.

**Number of chefs increases.**

---

### Vertical Scaling (VPA)

Instead of hiring more chefs, you make **one chef stronger and faster** by giving them better equipment.

```
Chef-1
(Stronger, faster, better tools)
```

**Number of chefs stays the same.**

Only the capability of the existing chef increases.

---



* **Manual** → **You** decide the number of Pods.
* **Horizontal** → **More Pods** are added or removed automatically.
* **Vertical** → **Same Pod**, but **more CPU/RAM**.


---

### Q19.
Research any **two monitoring tools** (such as Prometheus and Grafana) and explain how they help in observing a Kubernetes cluster.

### Answer

Absolutely! Since you **actually explored Prometheus and Grafana**, here's a better answer that includes both the **theory** and your **hands-on experience**. This is interview-friendly and assignment-ready.

---

# Q19. Research any **two monitoring tools** (such as Prometheus and Grafana) and explain how they help in observing a Kubernetes cluster.

## Answer

Monitoring is the process of continuously checking the **health, performance, and resource usage** of a Kubernetes cluster. It helps administrators identify problems, monitor CPU and memory usage, and ensure applications are running correctly.

Two of the most popular Kubernetes monitoring tools are:

1. **Prometheus**
2. **Grafana**

---

# How Monitoring Works in Kubernetes

```text
          Kubernetes Cluster
                  │
        +---------+---------+
        |                   |
     Worker Node        Worker Node
        │                   │
      Pods                Pods
        │                   │
        +---------+---------+
                  │
          Metrics Exporters
 (Node Exporter, kube-state-metrics)
                  │
                  ▼
            Prometheus Server
          (Collects Metrics)
                  │
                  ▼
             Grafana
      (Displays Dashboards)
                  │
                  ▼
          Administrator/User
```

---

# 1. Prometheus

## What is Prometheus?

Prometheus is an open-source monitoring tool that collects and stores metrics from Kubernetes components in a **time-series database**.

It regularly collects (scrapes) data from different targets such as Nodes, Pods, and Kubernetes services.

### Prometheus collects metrics like:

* CPU usage
* Memory usage
* Disk usage
* Network traffic
* Pod status
* Node status
* Container performance

---

## How Prometheus Works

```text
Pods / Nodes
      │
      ▼
Node Exporter
kube-state-metrics
      │
      ▼
 Prometheus
      │
Stores Metrics
```

Prometheus continuously collects metrics every few seconds and stores them for analysis.

---

## Advantages

* Automatically collects metrics
* Stores historical data
* Supports alerting
* Integrates well with Kubernetes

---

# 2. Grafana

## What is Grafana?

Grafana is an open-source visualization tool used to display metrics collected by Prometheus.

Grafana does not collect data itself. Instead, it connects to Prometheus and displays the data as interactive dashboards.

---

## How Grafana Works

```text
Prometheus
      │
      ▼
 Grafana
      │
      ▼
 Dashboards
```

Example dashboard:

```text
+--------------------------------------+
| CPU Usage        ███████ 65%          |
| Memory Usage     █████ 45%            |
| Running Pods     5                    |
| Node Status      Healthy              |
+--------------------------------------+
```

Grafana makes it easy to monitor the Kubernetes cluster using graphs and charts.

---

# Prometheus and Grafana Together

```text
Kubernetes Cluster
        │
        ▼
Node Exporter & kube-state-metrics
        │
        ▼
   Prometheus
(Collects & Stores Metrics)
        │
        ▼
    Grafana
(Visualizes Metrics)
        │
        ▼
 Administrator
```

* **Prometheus** collects and stores metrics.
* **Grafana** displays those metrics using dashboards.

---

# Difference Between Prometheus and Grafana

| Feature     | Prometheus                  | Grafana                   |
| ----------- | --------------------------- | ------------------------- |
| Purpose     | Collects and stores metrics | Displays metrics visually |
| Stores Data | Yes                         | No                        |
| Dashboards  | Basic interface             | Advanced dashboards       |
| Alerting    | Yes                         | Yes                       |
| Main Role   | Monitoring                  | Visualization             |

---

# Hands-on Practice Performed

I installed a Kubernetes monitoring stack containing **Prometheus** and **Grafana**.

### I explored the monitoring components using:

```bash
kubectl get pods
```

Output included components such as:

* monitoring-grafana
* monitoring-kube-prometheus-operator
* monitoring-kube-state-metrics
* monitoring-prometheus-node-exporter
* Prometheus
* Alertmanager

---

I viewed the monitoring services:

```bash
kubectl get svc
```

This showed services like:

* monitoring-grafana
* monitoring-kube-prometheus-prometheus
* monitoring-kube-state-metrics
* monitoring-prometheus-node-exporter
* monitoring-kube-prometheus-alertmanager

---

I created sample applications for monitoring:

```bash
kubectl create deployment nginx --image=nginx
kubectl create deployment redis --image=redis
kubectl create deployment httpd --image=httpd
```

I exposed the Nginx deployment:

```bash
kubectl expose deployment nginx --port=80 --target-port=80
```

Then I generated continuous traffic using a BusyBox container:

```bash
kubectl run load-generator --image=busybox --restart=Never -it -- sh
```

Inside the container:

```sh
while true
do
  wget -q -O- http://nginx
done
```

This continuously sent requests to the Nginx application.

I also monitored resource usage using:

```bash
kubectl top pods
```

As the traffic increased, CPU usage for the Nginx pod increased.

Finally, I opened Grafana using port forwarding:

```bash
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80
```

and accessed it in the browser:

```text
http://localhost:3000
```

From Grafana dashboards, I observed CPU, memory, and other metrics collected by Prometheus.

---

# Summary

| Tool       | Purpose                           | Example Use                                         |
| ---------- | --------------------------------- | --------------------------------------------------- |
| Prometheus | Collects and stores metrics       | Monitor CPU, memory, Pods, Nodes, and network usage |
| Grafana    | Displays metrics using dashboards | Visualize cluster health and performance            |

---

# Key Points

* Monitoring helps keep Kubernetes clusters healthy and reliable.
* Prometheus collects and stores metrics from Kubernetes.
* Grafana displays those metrics using interactive dashboards.
* Prometheus and Grafana are commonly used together for monitoring Kubernetes clusters.
* Monitoring helps detect performance issues before they affect users.

---



**PrometheusGrafana= Protect & Graph**

* **Prometheus** → Pulls and stores **Performance metrics**
* **Grafana** → Displays **Graphs and Dashboards**



---

### Q20.
Create a GitHub repository named **docker-k8s-week2** and upload:
- A Dockerfile
- A Pod and a Deployment YAML manifest
- A `README.md` describing the difference between what you built
- At least five Git commits
- Screenshots of the executed commands

### Answer



In this task, I created a GitHub repository named **docker-k8s-week2** and uploaded all the required Docker and Kubernetes files. I also maintained multiple Git commits and practiced some additional Git commands that are commonly used in real-world software development.

Github Repo: https://github.com/shettymalathib/docker-k8s-week2.git

---

# Project Structure

```text
docker-k8s-week2/
│
├── Dockerfile
├── index.html
├── pod.yaml
├── deployment.yaml
├── README.md
├── .gitignore
└── screenshots/
    ├── docker-build.png
    ├── docker-run.png
    ├── kubectl-apply-pod.png
    ├── kubectl-apply-deployment.png
    ├── kubectl-get-pods.png
    ├── kubectl-get-deployments.png
    ├── git-log.png
    └── github-repository.png
```

---

# Step 1: Create a GitHub Repository

I created a new GitHub repository named:

```text
docker-k8s-week2
```

I did **not** initialize it with a README because I planned to upload my local project.

**Screenshot:** GitHub repository creation page.

---

# Step 2: Clone the Empty Repository

```bash
git clone https://github.com/shettymalathib/docker-k8s-week2.git
cd docker-k8s-week2
```

Verify the current directory:

```bash
pwd
```

Example:

```text
/home/malathi/projects/CBC-Ban-DevOps-Internship/interns/Malathi-Shetty/week-2/PracticeProjects/docker-k8s-week2
```

---

# Step 3: Create the Project Structure

Create the required files and folders.

```bash
mkdir screenshots

touch Dockerfile
touch pod.yaml
touch deployment.yaml
touch README.md
touch index.html
```

Verify:

```bash
ls
```

Expected Output

```text
Dockerfile
README.md
deployment.yaml
index.html
pod.yaml
screenshots
```

---

# Step 4: Copy Existing Files

Since these files were already created in previous exercises, I copied them into the new repository.

```bash
cp ../Dockerfiles/Static-Website/Dockerfile .
cp ../Minikube/nginx-deployment.yaml deployment.yaml
cp ../YAML/redis-pod.yaml pod.yaml
```

Verify:

```bash
ls -l
```

---

# Step 5: Add Website Files

Copy or create the required `index.html` file.

Verify:

```bash
cat Dockerfile
cat pod.yaml
cat deployment.yaml
```

---

# Step 6: Create README.md

The README explains:

* Dockerfile
* Pod Manifest
* Deployment Manifest
* Difference between Pod and Deployment
* Prerequisites
* Project Overview

---

# Step 7: Create Multiple Git Commits

Instead of making one large commit, I created several meaningful commits.

Example commit history:

```text
Add Dockerfile
Add Redis Pod manifest
Add Nginx Deployment manifest
Add project documentation
Add website files and screenshots folder
Add .gitignore
```

View commit history:

```bash
git log --oneline
```

Example Output

```text
1a74448 Add .gitignore
75d7c65 Add website files and screenshots folder
0ef8195 Add project documentation
e7a21d1 Add Nginx Deployment manifest
6f1d7cb Add Redis Pod manifest
a438beb Add Dockerfile
```

This satisfies the assignment requirement of **at least five Git commits**.

---

# Step 8: Push the Repository

Rename the branch (if required):

```bash
git branch -M main
```

Push the project:

```bash
git push -u origin main
```

---

# Step 9: Execute Kubernetes Manifests

Create the Redis Pod:

```bash
kubectl apply -f pod.yaml
```

Output

```text
pod/redis-pod created
```

Create the Deployment:

```bash
kubectl apply -f deployment.yaml
```

Output

```text
deployment.apps/nginx-app unchanged
```

Verify Pods:

```bash
kubectl get pods
```

Verify Deployments:

```bash
kubectl get deployments
```

Take screenshots of these commands and place them inside the `screenshots` folder.

---

# Step 10: Verify on GitHub

Open the repository on GitHub.

The repository should contain:

```text
Dockerfile
README.md
deployment.yaml
index.html
pod.yaml
.gitignore
screenshots/
```

---

# Sample README.md

```md
# Docker & Kubernetes Week 2

## Dockerfile

The Dockerfile builds a custom Nginx image that serves a static website.

## Pod Manifest

The Pod manifest creates a single Redis Pod.

## Deployment Manifest

The Deployment manages multiple Pod replicas and supports updates, scaling, and self-healing.

## Difference

- Dockerfile creates a Docker image.
- Pod YAML creates one Pod.
- Deployment YAML manages multiple Pods automatically.
```

---

# Bonus Learning (Beyond the Assignment)

These commands are not mandatory for the assignment but are commonly used in internships and real-world software development.

---

## 1. Create a `.gitignore` File

Create the file:

```bash
touch .gitignore
```

Example:

```text
*.log
*.tmp
node_modules/
.vscode/
```

### Why?

A `.gitignore` file prevents temporary files, log files, editor settings, and other unnecessary files from being tracked by Git.

---

## 2. Check Changes Before Committing

```bash
git diff
```

Purpose:

Displays all modifications made since the last commit.

Example:

```diff
- Hello World
+ Hello Docker
```

This helps review changes before creating a commit.

---

## 3. View Commit History as a Graph

```bash
git log --oneline --graph --all
```

Example Output

```text
* 1a74448 Add .gitignore
* 75d7c65 Add website files and screenshots folder
* 0ef8195 Add project documentation
* e7a21d1 Add Nginx Deployment manifest
* 6f1d7cb Add Redis Pod manifest
* a438beb Add Dockerfile
```

The graph provides a visual representation of the project's commit history.

---

## 4. Create a Git Tag

Create a version tag:

```bash
git tag v1.0
```

View tags:

```bash
git tag
```

Output

```text
v1.0
```

Push the tag to GitHub:

```bash
git push origin v1.0
```

Tags are commonly used to mark software releases such as:

```text
v1.0
v1.1
v2.0
```

---

## 5. Verify the Remote Repository

```bash
git remote -v
```

Output

```text
origin  https://github.com/shettymalathib/docker-k8s-week2.git (fetch)
origin  https://github.com/shettymalathib/docker-k8s-week2.git (push)
```

This confirms that the local repository is correctly connected to the GitHub repository.

---

# Summary

| Task             | Command                           |
| ---------------- | --------------------------------- |
| Clone Repository | `git clone <repository-url>`      |
| Check Status     | `git status`                      |
| Add Files        | `git add .`                       |
| Create Commit    | `git commit -m "message"`         |
| View History     | `git log --oneline`               |
| View Graph       | `git log --oneline --graph --all` |
| Check Changes    | `git diff`                        |
| Create Tag       | `git tag v1.0`                    |
| Push Tag         | `git push origin v1.0`            |
| Verify Remote    | `git remote -v`                   |
| Push to GitHub   | `git push -u origin main`         |

---

# Key Learning

* Git tracks changes made to project files.
* GitHub stores repositories online for collaboration and backup.
* Meaningful commit messages make project history easier to understand.
* A `README.md` explains the project and how to use it.
* A `.gitignore` file prevents unnecessary files from being committed.
* `git diff` helps review changes before committing.
* `git log --graph` provides a visual history of commits.
* Git tags help identify important project versions such as releases.




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
