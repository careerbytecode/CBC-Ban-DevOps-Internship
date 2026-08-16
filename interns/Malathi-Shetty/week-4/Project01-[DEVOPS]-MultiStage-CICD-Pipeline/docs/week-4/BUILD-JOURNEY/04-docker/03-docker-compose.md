# 03 — Docker Compose

After building and testing the backend and frontend Docker images separately, we used Docker Compose to run both FlavorForge containers together.

The goal was to start:

* FlavorForge backend
* FlavorForge frontend
* A shared Docker network
* Backend health checking
* Frontend waiting for the backend to become healthy

---

## Step 1 — Go to the FlavorForge project

We opened the project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check that we are in the correct directory:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Check the Docker Compose file

We already had the `docker-compose.yml` file in the project root.

Check it:

```bash
ls -l docker-compose.yml
```

Then open it:

```bash
cat docker-compose.yml
```

The file contains two services:

```text
backend
frontend
```

---

## Step 3 — Configure the backend service

In `docker-compose.yml`, we configured the backend service.

The backend uses the image:

```yaml
image: flavorforge-backend:1.0
```

The image is built from:

```yaml
build:
  context: ./backend
```

This means Docker uses the `backend` directory as the build context.

The container name is:

```yaml
container_name: flavorforge-backend
```

The backend port is:

```yaml
ports:
  - "3000:3000"
```

This means:

```text
Host port 3000
      ↓
Container port 3000
```

So the backend can be accessed from the machine on:

```text
http://localhost:3000
```

---

## Step 4 — Configure the backend environment

The backend service contains:

```yaml
environment:
  NODE_ENV: production
  CORS_ORIGIN: http://localhost:8080
```

The backend therefore runs in production mode.

The frontend is expected to be available through port `8080`.

---

## Step 5 — Add the backend health check

We added a health check for the backend:

```yaml
healthcheck:
  test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/api/health"]
  interval: 10s
  timeout: 5s
  retries: 5
  start_period: 10s
```

The health check calls:

```text
http://localhost:3000/api/health
```

Docker checks the backend every 10 seconds.

The backend gets up to 5 retries if the health check does not initially succeed.

---

## Step 6 — Configure the frontend service

The second service in the Compose file is the frontend.

It uses:

```yaml
image: flavorforge-frontend:1.0
```

The build context is:

```yaml
build:
  context: ./frontend
```

The container name is:

```yaml
container_name: flavorforge-frontend
```

---

## Step 7 — Configure the frontend port

The frontend has:

```yaml
ports:
  - "8080:80"
```

This means:

```text
Host port 8080
      ↓
Container port 80
```

The frontend can therefore be opened at:

```text
http://localhost:8080
```

The frontend is served by Nginx inside the container on port `80`.

---

## Step 8 — Make the frontend wait for the backend

We configured:

```yaml
depends_on:
  backend:
    condition: service_healthy
```

This means the frontend should wait for the backend to become healthy before starting.

The flow is:

```text
Docker Compose starts
        ↓
Backend starts
        ↓
Backend health check runs
        ↓
Backend becomes healthy
        ↓
Frontend starts
```

---

## Step 9 — Create a shared Docker network

Both services use:

```yaml
networks:
  - flavorforge-network
```

At the bottom of the file we configured:

```yaml
networks:
  flavorforge-network:
    driver: bridge
```

This creates a Docker bridge network named:

```text
flavorforge-network
```

Both containers are connected to this network.

---

## Step 10 — Start FlavorForge with Docker Compose

From the project root, we ran:

```bash
docker compose up -d
```

The `-d` option starts the containers in detached mode, so the terminal is returned to us.

Docker Compose builds/starts the services defined in:

```text
docker-compose.yml
```

---

## Step 11 — Check the running containers

We checked the containers:

```bash
docker compose ps
```

We expected to see:

```text
flavorforge-backend
flavorforge-frontend
```

The backend should become healthy before the frontend starts.

We could also check with:

```bash
docker ps
```

---

## Step 12 — Check the Docker images

We checked that the FlavorForge images were available:

```bash
docker images
```

We expected to see:

```text
flavorforge-backend
flavorforge-frontend
```

with the configured tag:

```text
1.0
```

---

## Step 13 — Check the backend health

We tested the backend health endpoint:

```bash
curl http://localhost:3000/api/health
```

The backend health endpoint responded successfully.

This confirmed that the backend container was running and responding on port `3000`.

---

## Step 14 — Open the frontend

We opened the frontend in a browser:

```text
http://localhost:8080
```

The FlavorForge frontend was displayed.

The request flow was:

```text
Browser
   ↓
localhost:8080
   ↓
FlavorForge Frontend Container
   ↓
Nginx
```

---

## Step 15 — Check the Compose logs

We checked the logs of both services:

```bash
docker compose logs
```

To continuously watch the logs:

```bash
docker compose logs -f
```

Press:

```text
Ctrl + C
```

to stop following the logs.

---

## Step 16 — Check the Docker network

We checked the Docker networks:

```bash
docker network ls
```

We expected the FlavorForge network:

```text
flavorforge-network
```

We could inspect it with:

```bash
docker network inspect flavorforge-network
```

This confirmed that the FlavorForge containers were connected to the shared network.

---

## Step 17 — Stop the application

When we finished testing, Docker Compose could stop the application with:

```bash
docker compose down
```

This stops and removes the containers created by Docker Compose.

The Docker images are not removed by this command.

---

## Result

Docker Compose successfully brought the FlavorForge application together as a multi-container application:

```text
                    FlavorForge
                         │
              Docker Compose
                    │        │
                    ↓        ↓
              Backend      Frontend
              :3000         :8080
                 │             │
                 └──────┬──────┘
                        ↓
              flavorforge-network
```

The final local application endpoints were:

```text
Backend:
http://localhost:3000

Backend health:
http://localhost:3000/api/health

Frontend:
http://localhost:8080
```

➡️ **Next:** Continue to the Azure setup and deployment steps.
