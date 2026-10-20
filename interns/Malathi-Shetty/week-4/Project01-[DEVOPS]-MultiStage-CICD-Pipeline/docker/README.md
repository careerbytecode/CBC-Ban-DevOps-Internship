# 🐳 FlavorForge Docker

This directory contains the Docker resources used to containerize the **FlavorForge Azure DevSecOps Capstone** application.

The project uses separate Docker images for the frontend and backend, enabling consistent deployments across development, testing, and production environments.

Containerization ensures that the application runs with the same dependencies and configuration regardless of the host operating system.

---

# 🚀 Technologies Used

| Technology | Purpose |
|------------|---------|
| Docker | Containerization platform |
| Docker Compose | Multi-container local development |
| Node.js | Backend runtime |
| React | Frontend application |
| Vite | Frontend build tool |
| Nginx | Production web server for frontend |

---

# 📂 Project Structure

```text
docker/
└── README.md

frontend/
└── Dockerfile

backend/
└── Dockerfile

docker-compose.yml
```

---

# 🏗️ Container Architecture

```text
                Docker Compose
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
Frontend Container           Backend Container
(Nginx + React)             (Node.js + Express)
        │                           │
        └─────────────┬─────────────┘
                      │
                 Docker Network
```

---

# 📦 Backend Container

The backend is packaged as a Docker image using the `backend/Dockerfile`.

The container includes:

- Node.js runtime
- Express.js application
- Production dependencies
- REST API server

Build the backend image:

```bash
docker build -t flavorforge-backend ./backend
```

Run the backend container:

```bash
docker run -d \
  --name flavorforge-backend \
  -p 3000:3000 \
  flavorforge-backend
```

Verify:

```bash
docker ps

curl http://localhost:3000/api/health
```

---

# 🌐 Frontend Container

The frontend is packaged using the `frontend/Dockerfile`.

The Docker image uses a multi-stage build:

1. Build the React application using Vite.
2. Serve the production build using Nginx.

This approach reduces the final image size and improves performance.

Build the frontend image:

```bash
docker build -t flavorforge-frontend ./frontend
```

Run the frontend container:

```bash
docker run -d \
  --name flavorforge-frontend \
  -p 8080:80 \
  flavorforge-frontend
```

Verify:

Open a browser:

```text
http://localhost:8080
```

---

# 🧩 Docker Compose

The project includes a `docker-compose.yml` file for local development.

Docker Compose starts both containers together and creates a shared Docker network for communication.

Start the application:

```bash
docker compose up -d
```

View running containers:

```bash
docker ps
```

View container logs:

```bash
docker compose logs
```

Stop the application:

```bash
docker compose down
```

Docker Compose simplifies local testing by managing multiple containers with a single command.

---

# 🔍 Image Verification

After building the Docker images, verify that they were created successfully.

List Docker images:

```bash
docker images
```

Example output:

```text
REPOSITORY               TAG       IMAGE ID
flavorforge-frontend     latest    xxxxxxxxxxxx
flavorforge-backend      latest    yyyyyyyyyyyy
```

List running containers:

```bash
docker ps
```

Inspect a container:

```bash
docker inspect flavorforge-backend
```

View logs:

```bash
docker logs flavorforge-backend

docker logs flavorforge-frontend
```

---

# ☁️ Azure Container Registry (ACR)

The Azure DevOps pipeline builds the Docker images and pushes them to **Azure Container Registry (ACR)**.

Deployment workflow:

```text
Source Code
      │
      ▼
Azure DevOps Pipeline
      │
      ▼
Docker Build
      │
      ▼
Trivy Image Scan
      │
      ▼
Azure Container Registry (ACR)
      │
      ▼
Azure Kubernetes Service (AKS)
```

Typical pipeline stages include:

1. Build Docker images
2. Scan images for vulnerabilities
3. Push images to Azure Container Registry
4. Deploy updated images to Azure Kubernetes Service

---

# 🔐 Image Security

Before deployment, Docker images are scanned using **Trivy** to identify known security vulnerabilities.

The scan checks for:

- Operating system vulnerabilities
- Application dependency vulnerabilities
- Misconfigurations
- Known CVEs

Integrating image scanning into the CI/CD pipeline helps ensure that only secure container images are deployed.

---

# 🚀 CI/CD Integration

Docker is integrated into the Azure DevOps CI/CD pipeline.

The pipeline performs the following steps:

- Install project dependencies
- Execute unit tests
- Run SonarCloud code analysis
- Build Docker images
- Scan images using Trivy
- Push images to Azure Container Registry
- Deploy the application to Azure Kubernetes Service
- Trigger GitOps synchronization using Argo CD

This automated workflow enables consistent, repeatable, and production-ready deployments.

---

# 🔒 Security Best Practices

The Docker images follow several container security best practices:

- Multi-stage builds to reduce image size
- Lightweight production images
- Non-sensitive configuration externalized using environment variables
- Application configuration managed through Kubernetes ConfigMaps
- Sensitive values managed using Kubernetes Secrets
- Images scanned during the Azure DevOps pipeline
- Container images stored securely in Azure Container Registry (ACR)

These practices help improve portability, maintainability, and deployment security.

---

# 🚀 Azure DevSecOps Integration

The Docker images are integrated into the Azure DevSecOps CI/CD pipeline.

Deployment workflow:

```text
GitHub Repository
        │
        ▼
Azure DevOps Pipeline
        │
        ▼
Install Dependencies
        │
        ▼
Run Tests
        │
        ▼
SonarCloud Code Analysis
        │
        ▼
Build Docker Images
        │
        ▼
Trivy Vulnerability Scan
        │
        ▼
Push Images to Azure Container Registry
        │
        ▼
Deploy to Azure Kubernetes Service
        │
        ▼
Argo CD GitOps Synchronization
```

This automated workflow ensures every image is validated before deployment.

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Project README](../README.md) | Project overview |
| [Implementation Guide](../docs/implementation/README.md) | Complete implementation guide |
| [Pipeline Documentation](../docs/pipeline/README.md) | Azure DevOps pipeline |
| [Kubernetes Documentation](../kubernetes/README.md) | Kubernetes deployment |
| [Troubleshooting Guide](../docs/troubleshooting/README.md) | Docker troubleshooting |


---

# 📚 Learning Outcomes

This Docker implementation demonstrates practical experience with:

- Docker image creation
- Multi-stage Docker builds
- Containerizing Node.js applications
- Containerizing React applications
- Nginx as a frontend web server
- Docker Compose orchestration
- Environment variable management
- Azure Container Registry (ACR)
- Container image optimization
- DevSecOps container workflows
- Production-ready container deployment

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

This Docker implementation was built as part of a hands-on learning journey to understand modern containerization, cloud-native application deployment, Azure DevSecOps, Kubernetes, and GitOps practices using production-style workflows.
