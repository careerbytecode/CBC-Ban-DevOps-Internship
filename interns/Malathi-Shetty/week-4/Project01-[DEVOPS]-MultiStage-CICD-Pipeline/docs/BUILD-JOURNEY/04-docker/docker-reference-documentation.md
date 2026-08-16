# 📚 Docker Reference Documentation & Learning Resources

This document provides additional reference material for understanding,
building, running, securing, and troubleshooting Docker containers.

The FlavorForge project uses Docker to containerize the frontend and backend
applications before publishing the images to Azure Container Registry (ACR)
and deploying them to Kubernetes.

> **Recommended approach:** Start with the official Docker documentation,
> then use the guides, examples, and videos for practical understanding.

---

## 1. Official Docker Documentation

### Docker Documentation

[Docker Official Documentation](https://docs.docker.com/)

Primary reference for Docker concepts, installation, CLI commands,
images, containers, networking, storage, Dockerfiles, Compose, and security.

---

## 2. Docker Get Started

[Docker Get Started Guide](https://docs.docker.com/get-started/)

Covers:

- Containers
- Images
- Docker Hub
- Building images
- Running containers
- Publishing images
- Docker Compose

**Recommended for:** Beginners.

---

## 3. Docker CLI Reference

[Docker CLI Reference](https://docs.docker.com/reference/cli/docker/)

Useful commands include:

```bash
docker build
docker images
docker run
docker ps
docker stop
docker rm
docker rmi
docker exec
docker logs
docker inspect
docker tag
docker push
docker pull
````

---

## 4. Dockerfile Reference

[Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)

Important instructions include:

* FROM
* WORKDIR
* COPY
* RUN
* ENV
* EXPOSE
* CMD
* ENTRYPOINT

This is particularly relevant to the FlavorForge Dockerfiles.

---

## 5. Multi-Stage Builds

[Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

FlavorForge uses multi-stage Docker builds to separate the build environment
from the runtime environment.

Conceptually:

```text
Source Code
     |
     v
Build Stage
     |
     | compile / npm build
     v
Runtime Stage
     |
     v
Smaller Production Image
```

Multi-stage builds help reduce the final image size and keep unnecessary
build dependencies out of the production image.

---

## 6. Docker Build

[Docker Build Documentation](https://docs.docker.com/build/)

Covers:

* Docker Build
* Build context
* Build cache
* Build arguments
* Build secrets
* BuildKit
* Multi-platform builds

---

## 7. Docker Networking

[Docker Networking](https://docs.docker.com/engine/network/)

Useful for understanding how containers communicate with each other and
with external services.

---

## 8. Docker Storage

[Docker Storage](https://docs.docker.com/engine/storage/)

Covers:

* Volumes
* Bind mounts
* Temporary storage
* Persistent data

---

## 9. Docker Compose

[Docker Compose Documentation](https://docs.docker.com/compose/)

Useful for learning how multiple containers can be defined and managed
together.

---

## 10. Docker Registry and Image Publishing

[Docker Image Push](https://docs.docker.com/reference/cli/docker/image/push/)

Important concepts:

```text
Dockerfile
    |
    v
docker build
    |
    v
Docker Image
    |
    v
docker tag
    |
    v
Container Registry
```

For FlavorForge, the production registry is Azure Container Registry (ACR).

---

## 11. Docker Security

[Docker Security](https://docs.docker.com/engine/security/)

Useful topics include:

* Running containers securely
* Least privilege
* Image security
* Secrets
* Rootless containers
* Docker daemon security

FlavorForge additionally uses **Trivy** to scan container images for
vulnerabilities.

---

## 12. Docker Best Practices

[Docker Build Best Practices](https://docs.docker.com/build/building/best-practices/)

Recommended topics:

* Small images
* Efficient Dockerfiles
* Layer caching
* `.dockerignore`
* Multi-stage builds
* Non-root users
* Reproducible builds

---

## 13. Official Docker GitHub

[Docker GitHub Organization](https://github.com/docker)

Useful for:

* Source code
* Docker projects
* Examples
* Issues
* Releases
* Community development

---

# 🎥 14. Docker Videos

## Docker Official YouTube

[Docker Official YouTube Channel](https://www.youtube.com/@DockerInc)

Useful for:

* Docker fundamentals
* Containers
* Docker Build
* Docker Compose
* Docker security
* New Docker features

> Use official Docker videos for product-specific information and
> third-party tutorials for additional practical demonstrations.

---

# 🎥 15. Docker Getting Started Videos

Docker's official learning material can also be used alongside the
documentation:

[Docker Learning Resources](https://www.docker.com/get-started/)

Recommended learning sequence:

```text
Docker Fundamentals
        ↓
Images
        ↓
Containers
        ↓
Dockerfile
        ↓
Build
        ↓
Run
        ↓
Tag
        ↓
Push
        ↓
Container Registry
```

---

# 16. Docker and FlavorForge

The FlavorForge implementation follows this general flow:

```text
React / Node.js Application
          |
          v
      Dockerfile
          |
          v
   Docker Multi-Stage Build
          |
          v
      Docker Image
          |
          v
     Trivy Scan
          |
          v
     Image Tagging
          |
          v
 Azure Container Registry
          |
          v
       AKS
          |
          v
   Running Application
```

The project-specific Docker implementation should remain the primary
reference for the exact commands and configuration used by FlavorForge.

---

# 17. Recommended Reference Order

| Order | Resource                 | Purpose                 |
| ----: | ------------------------ | ----------------------- |
|     1 | Docker Documentation     | Core concepts           |
|     2 | Get Started              | Beginner introduction   |
|     3 | Docker CLI               | Commands                |
|     4 | Dockerfile Reference     | Image construction      |
|     5 | Multi-stage Builds       | Production images       |
|     6 | Build Documentation      | Build optimization      |
|     7 | Networking               | Container communication |
|     8 | Storage                  | Persistent data         |
|     9 | Security                 | Secure containers       |
|    10 | Best Practices           | Production guidance     |
|    11 | Docker GitHub            | Source and examples     |
|    12 | Docker Videos            | Visual learning         |
|    13 | FlavorForge Docker Guide | Project implementation  |

---

## Important

> **Official Docker documentation should be treated as the source of truth.**
> Videos and third-party tutorials are supplementary learning resources
> and may become outdated as Docker evolves.

