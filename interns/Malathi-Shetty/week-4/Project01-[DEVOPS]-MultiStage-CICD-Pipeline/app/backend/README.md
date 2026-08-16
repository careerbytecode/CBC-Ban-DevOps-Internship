# 🍽️ FlavorForge Backend

The **FlavorForge Backend** is a RESTful API built using **Node.js** and **Express.js**. It serves as the backend service for the FlavorForge Azure DevSecOps Capstone Project by handling client requests, providing recipe data, exposing health monitoring endpoints, and supporting communication with the frontend application.

The application follows a modular and layered architecture to improve maintainability, scalability, and code organization. The current implementation uses sample in-memory data and is structured to support future enhancements such as database integration, authentication, logging, and monitoring.

---

# 🎯 Purpose

The backend is responsible for:

- Exposing REST API endpoints
- Processing client requests
- Providing recipe data
- Monitoring application health
- Managing application configuration
- Supporting frontend communication
- Serving as the business logic layer of the FlavorForge application

---

# 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| dotenv | Environment variable management |
| JavaScript (ES6+) | Backend application logic |
| REST API | Communication between frontend and backend |
| Nodemon | Automatic server restart during development |
| Jest | Unit testing |
| Supertest | API endpoint testing |

---

# 📂 Project Structure

```text
backend/
│
├── Dockerfile
├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── config
│   │   └── app.config.js
│   ├── controllers
│   │   ├── health.controller.js
│   │   └── recipe.controller.js
│   ├── database
│   ├── middleware
│   ├── models
│   ├── routes
│   │   ├── health.routes.js
│   │   └── recipe.routes.js
│   ├── server.js
│   ├── services
│   │   ├── health.service.js
│   │   └── recipe.service.js
│   └── utils
└── tests
    ├── app.test.js
    ├── controllers.test.js
    └── services.test.js
```

> **Note:** The `database`, `middleware`, `models`, and `utils` directories are intentionally included as placeholders to support future enhancements such as database integration, authentication, request validation, reusable utilities, and middleware components. This structure follows common enterprise backend organization practices.

---

# ✨ Features

The FlavorForge Backend provides a lightweight and modular REST API designed for frontend integration and future scalability.

## Application Features

- RESTful API architecture
- Express-based HTTP server
- Health monitoring endpoint
- Recipe API endpoint
- Environment-based configuration
- Layered Controller → Service architecture
- Modular project structure
- JSON-based API responses
- CORS support for frontend communication
- Production-ready backend organization

---

# 🏛️ Backend Architecture

The backend follows a layered architecture where each layer has a single responsibility.

```text
Client Request
      │
      ▼
Express Server
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Business Logic
      │
      ▼
JSON Response
```

### Controller Layer

The controller layer is responsible for:

- Receiving client requests
- Calling the appropriate service
- Processing request data
- Returning HTTP responses

Current controller:

- Health Controller

---

### Service Layer

The service layer contains the application's business logic.

Responsibilities include:

- Processing application data
- Preparing API responses
- Keeping controllers lightweight
- Supporting future database integration

Current service:

- Health Service

---

### Configuration Layer

Application configuration is centralized in:

```text
src/config/app.config.js
```

Current configuration includes:

- Application Name
- Application Version
- Environment
- Port
- Build Version

This approach allows different configurations for Development, QA, and Production environments without changing the application source code.

---

# 🌐 REST API Endpoints

The backend exposes REST APIs that are consumed by the React frontend.

| Method | Endpoint       | Description                       |
| ------ | -------------- | --------------------------------- |
| GET    | `/api/health`  | Returns application health status |
| GET    | `/api/recipes` | Returns available recipes         |

---

## Sample Health Response

```json
{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.3",
  "environment": "development",
  "timestamp": "2026-07-30T10:00:00.000Z"
}
```

---

## Sample Recipe Response

```json
[
  {
    "id": 1,
    "name": "Paneer Butter Masala",
    "category": "Indian"
  }
]
```

> **Note:** Recipe data is currently stored in memory and is intended for demonstration purposes. The project structure supports future integration with a persistent database.

---

# ⚙️ Environment Configuration

The backend uses **dotenv** to load configuration values from environment variables.

Create a `.env` file in the backend directory.

```env
PORT=3000
NODE_ENV=development
APP_NAME=FlavorForge Backend
APP_VERSION=1.3
BUILD_VERSION=1.3
```

The application configuration is loaded through:

```text
src/config/app.config.js
```

Using environment variables makes it easier to deploy the application across multiple environments while keeping configuration separate from the application code.

---

# ▶️ Running the Application

## Prerequisites

Before running the backend, ensure the following software is installed:

- Node.js (v18 or later)
- npm
- Git

The frontend application can be started separately to consume the backend APIs.

---

## Install Dependencies

Navigate to the backend directory and install the required packages.

```bash
cd backend
npm install
```

---

## Start the Development Server

Run the backend using Nodemon.

```bash
npm run dev
```

The backend will be available at:

```text
http://localhost:3000
```

---

## Start the Production Server

Run the application in production mode.

```bash
npm start
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server using Nodemon |
| `npm start` | Start the production server |
| `npm test` | Execute backend unit tests |
| `npm run test:coverage` | Generate code coverage report *(if configured)* |

---

# 🧪 Testing the API

Verify that the backend is running successfully.

### Browser

Open the following URL:

```text
http://localhost:3000/api/health
```

---

### Using cURL

```bash
curl http://localhost:3000/api/health
```

---

### Expected Response

```json
{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.3",
  "environment": "development"
}
```

A successful response confirms that:

- Express server is running
- Routing is working correctly
- Controllers are responding
- Services are executing successfully
- JSON responses are returned correctly

---

# 🧹 Cleaning Local Artifacts

Remove generated files to restore the project to a clean state.

```bash
rm -rf node_modules
rm -rf coverage
```

Reinstall dependencies when required.

```bash
npm install
```

---

# ✅ Code Quality

The backend follows modular coding practices to improve readability, maintainability, and scalability.

Current verification status:

- ✅ REST APIs verified
- ✅ Health endpoint tested
- ✅ Recipe endpoint tested
- ✅ Environment configuration validated
- ✅ Modular Controller-Service architecture implemented

---

# 🧪 Testing

The backend uses **Jest** and **Supertest** for automated testing.

## Run Tests

```bash
npm test
```

The test suite generates a coverage report in the `coverage/` directory.

Current tests verify:

- Backend server startup
- Health API endpoint
- Recipe API endpoint
- HTTP response status
- JSON response format

---

# 📦 Project Dependencies

## Production Dependencies

| Package | Purpose |
|---------|---------|
| express | REST API framework |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment variable management |

## Development Dependencies

| Package | Purpose |
|---------|---------|
| nodemon | Automatic server restart during development |
| jest | Unit testing framework |
| supertest | HTTP endpoint testing |
| jest-junit | JUnit test report generation |

---

# 🔒 Security

The backend follows basic security practices suitable for development and production-ready expansion.

Current implementation includes:

- Environment variables managed with `.env`
- CORS configuration for frontend communication
- Centralized application configuration
- Separation of application logic from configuration

Future improvements may include:

- Helmet.js
- Rate limiting
- JWT authentication
- Input validation
- Azure Key Vault integration

---

# 🐳 Containerization

The backend includes a Dockerfile and is designed for containerized deployments.

Containerization enables:

- Consistent runtime environments
- Easier deployment
- Kubernetes compatibility
- CI/CD automation

To build the Docker image:

```bash
docker build -t flavorforge-backend .
```

To run the container:

```bash
docker run -p 3000:3000 flavorforge-backend
```

---

# ☸️ Kubernetes Deployment

The backend is deployed to Azure Kubernetes Service (AKS) using Kubernetes manifests.

Deployment resources include:

- Deployment
- Service
- ConfigMap
- Secret
- Horizontal Pod Autoscaler (HPA)
- Ingress

Environment-specific configurations are managed using **Kustomize overlays** for:

- Development
- QA
- Production

---

# 🚀 CI/CD Integration

The backend is integrated into an Azure DevSecOps pipeline.

Pipeline stages include:

1. Source checkout
2. Dependency installation
3. Unit testing
4. SonarCloud code quality analysis
5. Docker image build
6. Trivy vulnerability scan
7. Push image to Azure Container Registry (ACR)
8. Deploy to Azure Kubernetes Service (AKS)
9. GitOps synchronization using Argo CD

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Project README](../README.md) | Project overview |
| [Implementation Guide](../docs/implementation/README.md) | Backend implementation |
| [API Documentation](../docs/api/backend-api.md) | Backend API reference |
| [Pipeline Documentation](../docs/pipeline/README.md) | Azure DevOps pipeline |
| [Troubleshooting Guide](../docs/troubleshooting/README.md) | Backend troubleshooting |


---

# 📚 Learning Outcomes

This backend demonstrates practical experience with:

- Node.js
- Express.js
- REST API development
- Layered application architecture
- Controller-Service pattern
- Environment configuration
- API testing with Jest and Supertest
- Docker containerization
- Kubernetes deployments
- Azure DevSecOps CI/CD pipelines
- GitOps using Argo CD

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

Built as part of the CBC DevSecOps Internship to demonstrate modern backend development, containerization, Kubernetes orchestration, Azure DevOps CI/CD, and GitOps deployment practices.