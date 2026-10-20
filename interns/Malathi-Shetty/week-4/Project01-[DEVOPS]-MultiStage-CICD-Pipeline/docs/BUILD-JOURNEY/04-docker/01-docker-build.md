# 04 — Docker

## 01 — Build the FlavorForge Docker Images

After the frontend and backend application were working, the next step was to containerize the application using Docker.

We first worked with the backend and then verified the Docker image and container.

---

## Step 1 — Go to the FlavorForge project

We went to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

We checked that we were in the correct directory:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Check Docker

Before building anything, we checked that Docker was available:

```bash
docker --version
```

We also checked that Docker was running:

```bash
docker ps
```

Docker responded without an error.

---

## Step 3 — Go to the backend

We moved into the backend directory:

```bash
cd backend
```

We checked the backend files:

```bash
ls -la
```

We verified that the backend contained the Dockerfile:

```text
Dockerfile
```

---

## Step 4 — Check the Dockerfile

We checked the Dockerfile:

```bash
cat Dockerfile
```

This Dockerfile contains the instructions used by Docker to build the FlavorForge backend image.

---

## Step 5 — Create the Docker ignore file

Before building the image, we created the Docker ignore file so that unnecessary files would not be sent to Docker as part of the build context.

From the backend directory:

```bash
nano .dockerignore
```

The `.dockerignore` file was created.

We verified that it existed:

```bash
ls -la
```

### Screenshot

![Dockerignore created](/screenshots/docker/2-dockerignore-created.png)

---

## Step 6 — Check the Docker build context

We checked the files that were being used for the Docker build.

The purpose was to avoid sending unnecessary files into the Docker build context.

The build context was optimized before creating the image.

### Screenshot

![Docker build context optimized](/screenshots/docker/3-build-context-optimized.png)

---

## Step 7 — Build the backend Docker image

We returned to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

We built the backend Docker image.

```bash
docker build -t flavorforge-backend ./backend
```

Docker read the Dockerfile and created the backend image.

The build completed successfully.

### Screenshot

![Docker build successful](/screenshots/docker/6-backend-build-success.png)

---

## Step 8 — Check the Docker image

After the build completed, we checked the Docker images:

```bash
docker images
```

We verified that the FlavorForge backend image was present.

### Screenshot

![Docker images](/screenshots/docker/4-docker-images.png)

---

## Step 9 — Run the backend container

After creating the image, we started a container from the image.

```bash
docker run -d --name flavorforge-backend -p 5000:5000 flavorforge-backend
```

Docker started the backend container in detached mode.

---

## Step 10 — Check the running container

We checked the running containers:

```bash
docker ps
```

The `flavorforge-backend` container was running.

### Screenshot

![Backend container running](/screenshots/docker/7-backend-container-running.png)

---

## Step 11 — Verify the backend health endpoint

We checked whether the backend application inside the container was responding.

```bash
curl http://localhost:5000/api/health
```

The backend health endpoint responded successfully.

### Screenshot

![Backend health check successful](/screenshots/docker/8-backend-health-success.png)

---

## Step 12 — Verify the recipes API

We then checked the recipes endpoint:

```bash
curl http://localhost:5000/api/recipes
```

The recipes API responded successfully.

### Screenshot

![Backend recipes API successful](/screenshots/docker/9-backend-recipes-success.png)

An additional verification screenshot was also captured:

![Backend recipes API additional verification](/screenshots/docker/9-1-backend-recipes-success.png)

---

## Result

The FlavorForge backend was successfully containerized.

At this point we had:

```text
FlavorForge Backend
       ↓
Dockerfile
       ↓
Docker Image
       ↓
Docker Container
       ↓
Health API
       ↓
Recipes API
```

The backend Docker image was created, the container was running, and the application endpoints were verified successfully.

➡️ **Next: 04-Docker → 02 — Run and verify the complete Docker application**
