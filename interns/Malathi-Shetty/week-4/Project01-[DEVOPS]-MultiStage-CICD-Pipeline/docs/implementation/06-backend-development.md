# 🚀 Backend Development

> This document explains how the FlavorForge backend was designed, implemented, tested, and prepared for containerized deployment.

---

# 📖 Introduction

The backend is responsible for handling all business logic and exposing REST APIs consumed by the React frontend.

FlavorForge uses a lightweight Node.js and Express.js backend that demonstrates how enterprise APIs are structured using controllers, services, routes, configuration management, and automated testing.

The backend was intentionally kept modular so that new APIs and features can be added without major code changes.

---

# Why Node.js?

Several backend technologies were considered.

| Technology | Decision |
|------------|----------|
| Node.js + Express | ✅ Selected |
| Spring Boot | Too heavy for this capstone |
| Django | Different technology stack |
| ASP.NET Core | Good option but outside the learning goals |

Node.js was selected because it:

- Uses JavaScript across frontend and backend
- Has a lightweight runtime
- Provides excellent Express framework support
- Integrates easily with Docker and Kubernetes
- Is widely adopted for REST API development

---

# Why Express?

Express was chosen because it provides a simple and flexible framework for building REST APIs.

Benefits include:

- Minimal setup
- Middleware support
- Easy route management
- Large ecosystem
- Production-ready architecture

---

# How Backend Development Started

The backend was created after planning the frontend requirements.

The first objective was to expose APIs that the frontend could consume during local development.

Development progressed in small phases.

---

# Phase 1 — Project Initialization

Create the backend project.

```bash
mkdir backend

cd backend

npm init -y
```

---

# Phase 2 — Install Dependencies

Install the required runtime packages.

```bash
npm install express cors dotenv
```

Development dependencies:

```bash
npm install --save-dev nodemon jest supertest
```

---

# Phase 3 — Organize the Project

Instead of writing everything inside one file, the backend was organized into separate layers.

```
backend/

src/

config/

controllers/

routes/

services/

middleware/

models/

tests/
```

This structure improves readability and makes future enhancements easier.

---

# Layered Architecture

The backend follows a layered design.

```
HTTP Request

↓

Route

↓

Controller

↓

Service

↓

Response
```

Each layer has a single responsibility.

### Routes

Receive incoming requests and forward them to controllers.

---

### Controllers

Validate requests and coordinate the application flow.

---

### Services

Contain the business logic.

Keeping business logic separate from controllers makes testing easier and keeps controllers lightweight.

---

# REST APIs

The backend exposes REST endpoints used by the frontend.

Current APIs include:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | Application health |
| GET | /api/recipes | Retrieve recipes |

These endpoints provide enough functionality to demonstrate frontend-backend communication.

---

# Configuration Management

Configuration values are stored outside the application code.

Examples include:

- Port number
- Environment
- Application version
- Build version
- CORS origin

Using configuration files and environment variables allows the same application to run in multiple environments without modifying the source code.

---

# CORS Configuration

Because the frontend and backend run on different ports during development, Cross-Origin Resource Sharing (CORS) was required.

The backend was configured to allow requests from the frontend.

Without proper CORS configuration, browsers block requests for security reasons.

---

# Error Handling

Basic error handling was implemented to improve API reliability.

Examples include:

- Invalid routes
- Internal server errors
- API failures
- Unexpected exceptions

Meaningful responses make debugging easier during development.

---

# Unit Testing

Automated tests were added using Jest and Supertest.

The project includes tests for:

- Application startup
- Controllers
- Services

Benefits include:

- Early bug detection
- Safer code changes
- Better CI integration

---

# Backend and Frontend Integration

Once the APIs were available, the frontend was updated to consume them.

The communication flow is:

```
Browser

↓

React Frontend

↓

REST API

↓

Express Backend

↓

JSON Response
```

This separation keeps the frontend independent from backend implementation details.

---

# Preparing for Docker

After local development was complete, the backend was prepared for containerization.

Preparation included:

- Dockerfile creation
- Environment variable support
- Production start command
- Dependency optimization

This allowed the backend to run consistently across local, CI, and Kubernetes environments.

---

# Challenges Faced

During backend development several issues were encountered.

Examples include:

- CORS configuration problems
- API route validation
- Environment variable loading
- Test configuration
- Docker networking
- Health endpoint verification

Each issue was resolved before moving to the next implementation stage.

---

# My Learning Journey

Before starting this backend, I had experience working with APIs from a testing perspective but limited experience building REST APIs.

This project helped me understand:

- How requests travel through an Express application
- Why layered architecture is preferred
- How configuration should be externalized
- How automated testing improves confidence
- Why backend services are containerized before deployment

Building the backend from scratch also made it much easier to understand the later Kubernetes and CI/CD stages.

---

# Screenshots to Capture

Capture screenshots of:

- Backend folder structure
- npm install
- Running backend server
- Health API in browser/Postman
- Recipe API response
- Jest test execution
- Coverage report
- Successful backend startup

---

# Key Takeaways

After completing this module I understood:

- How REST APIs are developed
- Layered backend architecture
- Express project organization
- Configuration management
- Automated testing
- API integration with React
- Preparing services for containerization

---

# Next Step

The next document explains how both the frontend and backend were containerized using Docker, including multi-stage builds, Docker Compose, and image optimization.

Continue with:

**07-dockerization.md**