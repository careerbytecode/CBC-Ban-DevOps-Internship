# 04 — Docker

## 02 — Run the FlavorForge Backend Container

After creating the backend Docker image, we ran the image as a Docker container and verified that the backend application was working.

---

## Step 1 — Go to the FlavorForge project

We went to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

We checked the current location:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Check the backend Docker image

We checked whether the backend Docker image was available:

```bash
docker images
```

The FlavorForge backend image was available.

---

## Step 3 — Run the backend container

We ran the backend Docker image as a container:

```bash
docker run -p 3000:3000 flavorforge-backend
```

The `-p 3000:3000` option connects:

```text
Your machine port 3000
        ↓
Container port 3000
```

The backend application listens on port `3000`.

This is also defined in the backend Dockerfile:

```dockerfile
EXPOSE 3000
```

The backend application itself uses port `3000`.

---

## Step 4 — Check the running container

We opened another terminal and checked the running containers:

```bash
docker ps
```

The FlavorForge backend container was running.

### Screenshot

![Backend container running](/screenshots/docker/7-backend-container-running.png)

---

## Step 5 — Check the backend health endpoint

We verified that the backend application was responding:

```bash
curl http://localhost:3000/api/health
```

The health endpoint responded successfully.

### Screenshot

![Backend health endpoint successful](/screenshots/docker/8-backend-health-success.png)

---

## Step 6 — Check the recipes API

We then checked the recipes API:

```bash
curl http://localhost:3000/api/recipes
```

The recipes API responded successfully.

### Screenshot

![Backend recipes API successful](/screenshots/docker/9-backend-recipes-success.png)

An additional verification was also captured:

![Backend recipes API additional verification](/screenshots/docker/9-1-backend-recipes-success.png)

---

## Step 7 — Verify the backend from the browser

The backend was also accessible through:

```text
http://localhost:3000
```

The backend project documentation confirms the application uses port `3000`.

---

## Result

The FlavorForge backend was successfully running inside a Docker container.

We verified:

```text
Docker image
     ↓
Docker container
     ↓
Port 3000
     ↓
/api/health
     ↓
/api/recipes
```

The backend container and its APIs were working successfully.

➡️ **Next: 04-Docker → 03 — Run Frontend + Backend with Docker Compose**
