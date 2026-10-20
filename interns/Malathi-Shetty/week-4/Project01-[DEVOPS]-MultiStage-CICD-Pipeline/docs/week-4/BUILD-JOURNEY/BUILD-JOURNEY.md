# FlavorForge Build Journey

## 1. Purpose

This document provides the complete chronological journey for rebuilding the FlavorForge Azure DevSecOps Capstone project from an empty Git repository.

Unlike the implementation guides, this document focuses on the order in which the project was designed, built, verified, and deployed. Every phase documents the objectives, prerequisites, implementation steps, verification process, supporting evidence, common issues, and completion criteria required before progressing to the next phase.

The goal is to ensure that the project can be recreated consistently months or years later without relying on memory or external notes.

---

## 2. Intended Audience

This document is intended for:

- Developers rebuilding the project from scratch.
- Students learning Azure DevSecOps implementation.
- Reviewers and interviewers who want to understand the complete engineering journey.
- Future maintenance of the FlavorForge project.

---

## 3. Project Overview

FlavorForge is a cloud-native recipe discovery application built using a modern DevSecOps workflow.

The application consists of a React frontend, a Node.js and Express backend, Docker containers, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Kubernetes manifests, Azure DevOps CI/CD pipelines, SonarCloud quality analysis, Trivy security scanning, and Argo CD GitOps deployment.

The project demonstrates the complete lifecycle of designing, building, testing, securing, deploying, and maintaining a cloud-native application using Microsoft Azure and Kubernetes.

---

## 4. Build Strategy

The project is rebuilt in the same sequence in which it was originally developed.

Each phase depends on the successful completion of the previous phase. Verification is performed before moving to the next stage to ensure that every component is functioning correctly.

The build sequence is summarized below.

```text
Project Planning
        │
        ▼
Repository Setup
        │
        ▼
Frontend Development
        │
        ▼
Backend Development
        │
        ▼
Application Integration
        │
        ▼
Dockerization
        │
        ▼
Azure Infrastructure
        │
        ▼
Azure Container Registry (ACR)
        │
        ▼
Azure Kubernetes Service (AKS)
        │
        ▼
Kubernetes Manifests
        │
        ▼
Ingress Controller
        │
        ▼
Horizontal Pod Autoscaler
        │
        ▼
Azure DevOps Pipeline
        │
        ▼
SonarCloud
        │
        ▼
Trivy Security Scanning
        │
        ▼
Argo CD GitOps
        │
        ▼
Monitoring
        │
        ▼
Documentation
        │
        ▼
Demo Preparation
        │
        ▼
Final Verification
```

---

# Phase 1 — Project Planning

## Goal

Define the project vision, technology stack, architecture, development approach, and expected deliverables before writing any code.

Proper planning reduces rework, establishes a clear implementation roadmap, and ensures that every subsequent phase follows a well-defined architecture.

---

## Why This Phase Comes First

Every software project begins with planning.

Before creating a repository or writing code, the project requirements, architecture, technologies, and deployment strategy must be identified.

Planning first ensures that development decisions remain consistent throughout the project lifecycle.

---

## Concept

Building a software project is similar to constructing a house.

A house is not built by purchasing bricks first. The land is surveyed, the requirements are gathered, the architecture is designed, and a construction plan is approved before construction begins.

Similarly, FlavorForge is planned before any source code, infrastructure, or deployment resources are created.

---

## Technical Explanation

During this phase, the overall architecture of the application is defined, the technology stack is selected, and the complete DevSecOps workflow is planned.

No application code or cloud resources are created during this phase.

Instead, this phase establishes the blueprint that guides every remaining stage of the project.

---

## Prerequisites

None.

This is the starting point for rebuilding the project.

---

## Files Created

No project files are created during this phase.

The planning process produces design decisions that will be implemented during the following phases.

---

## Files Modified

None.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Runtime | Node.js |
| Containerization | Docker |
| Container Registry | Azure Container Registry (ACR) |
| Orchestration | Kubernetes |
| Managed Kubernetes | Azure Kubernetes Service (AKS) |
| CI/CD | Azure DevOps Pipelines |
| Code Quality | SonarCloud |
| Security Scanning | Trivy |
| GitOps | Argo CD |
| Version Control | Git and GitHub |

---

## Project Objectives

The project should:

- Build a modern React frontend.
- Develop a RESTful backend using Node.js and Express.
- Containerize both applications using Docker.
- Store container images in Azure Container Registry.
- Deploy workloads to Azure Kubernetes Service.
- Manage Kubernetes resources using Kustomize overlays.
- Automate CI/CD using Azure DevOps.
- Perform code quality analysis using SonarCloud.
- Scan container images using Trivy.
- Implement GitOps deployments using Argo CD.
- Produce comprehensive engineering documentation.
- Demonstrate the complete DevSecOps lifecycle.

---

## Step-by-Step Tasks

1. Define the application idea.
2. Identify project requirements.
3. Select the frontend framework.
4. Select the backend framework.
5. Select the cloud platform.
6. Select the container platform.
7. Select the CI/CD platform.
8. Define the deployment strategy.
9. Define the documentation strategy.
10. Define the project directory structure.

No implementation commands are executed during this phase.

---

## Verification

Planning is complete when:

- Project objectives are clearly documented.
- Technology stack has been finalized.
- Overall architecture has been identified.
- Build sequence has been established.
- Development roadmap has been approved.

---

## Evidence

Use the following architecture diagrams from the repository.

![Enterprise Cloud Architecture](/docs/diagrams/flavorforge-enterprise-cloud-architecture.png)

*Figure 1.1 – Overall enterprise cloud architecture.*



![Application Architecture](/docs/diagrams/flavorforge-application-architecture.png)

*Figure 1.2 – FlavorForge application architecture.*

![DevSecOps Lifecycle](/docs/diagrams/flavorforge-devsecops-lifecycle-infographic.png)

*Figure 1.3 – FlavorForge DevSecOps lifecycle.*

---

## Common Mistakes

- Beginning development before defining the architecture.
- Choosing technologies without understanding how they integrate.
- Building infrastructure before designing the deployment workflow.
- Creating project folders without a planned repository structure.
- Failing to define verification criteria before implementation begins.

---

## Before Moving to Phase 2

Verify that:

- Project vision is finalized.
- Technology stack has been selected.
- Build sequence has been documented.
- Overall architecture is understood.
- Development roadmap is complete.

Only after these activities are completed should the repository be created.

---

## References

- React Documentation: https://react.dev
- Vite Documentation: https://vite.dev
- Node.js Documentation: https://nodejs.org/docs
- Docker Documentation: https://docs.docker.com
- Kubernetes Documentation: https://kubernetes.io/docs
- Microsoft Learn – Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Argo CD Documentation: https://argo-cd.readthedocs.io/
- SonarCloud Documentation: https://docs.sonarcloud.io/
- Trivy Documentation: https://trivy.dev/latest/docs/

---



# Phase 2 — Development Environment Setup

## Goal

Prepare a development workstation with all required software, command-line tools, and editors needed to build, test, containerize, deploy, and maintain the FlavorForge application.

A correctly configured development environment ensures that every subsequent phase can be completed without missing dependencies or compatibility issues.

---

## Why This Phase Comes Now

Before creating a repository or writing application code, the development environment must be prepared.

Installing all required tools at the beginning prevents interruptions during later phases and ensures that the same environment is used throughout the project lifecycle.

---

## Concept

Building a software project requires more than writing code.

A developer also needs the correct tools to create source code, manage versions, build containers, communicate with Azure, deploy Kubernetes resources, and automate deployments.

This phase prepares the workstation so that it is capable of performing every task required throughout the project.

---

## Technical Explanation

The FlavorForge project depends on several development tools, including Git, Node.js, Docker, Azure CLI, Kubernetes CLI utilities, and Visual Studio Code.

Each tool has a specific responsibility during development.

Installing and verifying these tools before beginning development reduces configuration issues and simplifies troubleshooting.

---

## Prerequisites

- Completion of Phase 1 – Project Planning.
- Internet connectivity.
- Administrative or sudo privileges on the development machine.

---

## Files Created

No project source files are created during this phase.

The software required for development is installed on the local workstation.

---

## Files Modified

None.

---

## Required Software

| Software | Purpose |
|-----------|---------|
| Git | Version control |
| GitHub Account | Source code hosting |
| Visual Studio Code | Source code editor |
| Node.js LTS | JavaScript runtime |
| npm | Package management |
| Docker | Containerization |
| Azure CLI | Azure resource management |
| kubectl | Kubernetes management |
| Kustomize | Kubernetes environment overlays |
| Google Chrome | Application testing |

---

## Step-by-Step Tasks

### Step 1 — Verify Git Installation

```bash
git --version
```

Expected output:

```text
git version 2.x.x
```

---

### Step 2 — Verify Node.js

```bash
node --version
```

Expected output:

```text
v22.x.x
```

---

### Step 3 — Verify npm

```bash
npm --version
```

---

### Step 4 — Verify Docker

```bash
docker --version
```

---

### Step 5 — Verify Docker Compose

```bash
docker compose version
```

---

### Step 6 — Verify Azure CLI

```bash
az version
```

---

### Step 7 — Verify Kubernetes CLI

```bash
kubectl version --client
```

---

### Step 8 — Verify Kustomize

```bash
kubectl kustomize --help
```

---

### Step 9 — Verify Visual Studio Code

```bash
code --version
```

---

## Verification

The development environment is ready when:

- Git is installed.
- Node.js and npm are installed.
- Docker is running.
- Azure CLI is installed.
- kubectl is installed.
- Kustomize is available.
- Visual Studio Code launches successfully.

---

## Learning Outcome

After completing this phase, you should understand:

- The purpose of every development tool.
- How to verify software installations.
- Which tools are required throughout the project lifecycle.
- Why development environment consistency is important.

---

## Estimated Completion Time

Approximately 20–30 minutes.

---

## Evidence

Use the following screenshot.

![Node.js Installation](/screenshots/backend/07-node24-installation.png)

*Figure 2.1 – Development environment with Node.js installed.*

---

## Common Mistakes

- Installing an unsupported Node.js version.
- Forgetting to start the Docker daemon.
- Installing Azure CLI without verifying authentication later.
- Using an outdated version of Git.
- Skipping tool verification after installation.

---

## Before Moving to Phase 3

Verify that:

- All required software has been installed.
- Every verification command executes successfully.
- Docker is running.
- The Azure CLI is accessible.
- Visual Studio Code is ready for development.

Only after completing these checks should the project repository be created.

---

## References

- Git: https://git-scm.com/doc
- Node.js: https://nodejs.org
- Docker: https://docs.docker.com
- Azure CLI: https://learn.microsoft.com/cli/azure/
- kubectl: https://kubernetes.io/docs/reference/kubectl/
- Visual Studio Code: https://code.visualstudio.com/docs


---

# Phase 3 — Repository Setup

## Goal

Create the FlavorForge source code repository structure, initialize version control, define project organization, and prepare the repository for application development and DevSecOps implementation.

The repository acts as the single source of truth for application code, infrastructure definitions, automation pipelines, documentation, and deployment configuration.

---

## Why This Phase Comes Now

After preparing the development environment, the next step is creating a controlled location where all project assets will be maintained.

Application development, Docker configuration, Kubernetes manifests, Azure DevOps pipelines, GitOps configuration, and documentation all depend on a properly structured repository.

Creating the repository before development ensures:

- Version history is maintained from the beginning.
- Team collaboration is possible.
- CI/CD automation can be connected later.
- Infrastructure and application code remain organized.

---

## Concept

A repository can be considered the central workspace for the entire project.

Instead of keeping frontend code, backend code, deployment files, and documentation in different locations, everything is maintained together with version control.

This allows developers and automation tools to always work with the same approved version of the project.

---

## Technical Explanation

FlavorForge uses Git as the version control system and GitHub as the remote repository platform.

The repository follows a monorepo approach where frontend, backend, infrastructure, automation, and documentation are stored within a single repository.

The monorepo structure provides:

- Centralized project management.
- Easier CI/CD pipeline configuration.
- Consistent version tracking.
- Simplified deployment automation.

---

## Prerequisites

Before starting this phase:

- Git must be installed.
- GitHub account must be available.
- Development environment setup must be completed.
- Project architecture must be finalized.

---

# Repository Creation

## Step 1 — Create Project Directory

Create the local project directory.

```bash
mkdir flavorforge-azure-devsecops-capstone

cd flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Initialize Git Repository

Initialize Git version control.

```bash
git init
```

Expected output:

```text
Initialized empty Git repository
```

---

## Step 3 — Configure Git Identity

Configure the developer identity used for commits.

```bash
git config --global user.name "Your Name"

git config --global user.email "your-email@example.com"
```

Verify:

```bash
git config --list
```

---

# Initial Repository Structure

## Step 4 — Create Main Project Directories

Create the initial project structure.

```bash
mkdir frontend
mkdir backend
mkdir docker
mkdir kubernetes
mkdir argocd
mkdir scripts
mkdir docs
mkdir screenshots
```

---

## Step 5 — Create Documentation Structure

Create documentation folders.

```bash
mkdir -p docs/architecture
mkdir -p docs/implementation
mkdir -p docs/pipeline
mkdir -p docs/troubleshooting
mkdir -p docs/project
mkdir -p docs/api
mkdir -p docs/adr
mkdir -p docs/cleanup
mkdir -p docs/presentation
mkdir -p docs/diagrams
```

---

## Step 6 — Create Supporting Files

Create repository-level files.

```bash
touch README.md
touch LICENSE
touch CHANGELOG.md
touch CONTRIBUTING.md
touch CODE_OF_CONDUCT.md
touch SECURITY.md
touch .gitignore
```

---

# Repository Structure Explanation

The final repository organization is:

```text
flavorforge-azure-devsecops-capstone

├── frontend
│   └── React application

├── backend
│   └── Node.js Express API

├── docker
│   └── Container documentation

├── kubernetes
│   └── Kubernetes manifests and Kustomize overlays

├── argocd
│   └── GitOps deployment configuration

├── scripts
│   └── Automation and utility scripts

├── docs
│   ├── architecture
│   ├── implementation
│   ├── pipeline
│   ├── troubleshooting
│   ├── api
│   ├── adr
│   ├── cleanup
│   ├── presentation
│   └── diagrams

├── screenshots
│   └── Evidence captured during implementation

├── azure-pipelines.yml
│   └── Azure DevOps CI/CD pipeline

└── README.md
```

---

# Step 7 — Create Initial Commit

Check repository status.

```bash
git status
```

Add files.

```bash
git add .
```

Create the first commit.

```bash
git commit -m "Initial FlavorForge repository structure"
```

---

# Step 8 — Create GitHub Repository

Create a new repository on GitHub:

Repository name:

```text
flavorforge-azure-devsecops-capstone
```

Recommended settings:

- Visibility: Public (for portfolio demonstration)
- Initialize README: Disabled
- Add .gitignore: Disabled
- Add license: Disabled

These files already exist locally.

---

# Step 9 — Connect Local Repository With GitHub

Add remote repository.

```bash
git remote add origin https://github.com/<username>/flavorforge-azure-devsecops-capstone.git
```

Verify:

```bash
git remote -v
```

---

## Step 10 — Push Initial Repository

Rename branch.

```bash
git branch -M main
```

Push code.

```bash
git push -u origin main
```

---

# Files Created

Initial files:

```text
README.md

LICENSE

CHANGELOG.md

CONTRIBUTING.md

CODE_OF_CONDUCT.md

SECURITY.md

.gitignore
```

Initial directories:

```text
frontend/

backend/

docker/

kubernetes/

argocd/

scripts/

docs/

screenshots/
```

---

# Verification

Repository setup is complete when:

## Local Verification

Run:

```bash
tree -L 2
```

Expected:

```text
frontend
backend
docker
kubernetes
argocd
scripts
docs
screenshots
```

---

## Git Verification

Run:

```bash
git status
```

Expected:

```text
nothing to commit, working tree clean
```

---

## GitHub Verification

Confirm:

- Repository exists.
- Initial commit is visible.
- Folder structure is displayed correctly.
- README loads successfully.

---

# Evidence

Use the repository structure screenshots.

![Repository Structure](/screenshots/enterprise-azure-devops-release-simulation/20-tree-l-2.png)

*Figure 3.1 – FlavorForge repository structure.*

![Repository Files](/screenshots/enterprise-azure-devops-release-simulation/20-ls.png)

*Figure 3.2 – Initial repository files.*

---

# Common Mistakes

## Creating GitHub repository with automatic README

This creates conflicts when pushing the local repository.

Solution:

Create an empty GitHub repository.

---

## Forgetting to initialize Git

Error:

```text
fatal: not a git repository
```

Solution:

Run:

```bash
git init
```

---

## Incorrect branch name

Some systems create:

```text
master
```

instead of:

```text
main
```

Solution:

```bash
git branch -M main
```

---

## Committing large files accidentally

Avoid committing:

- node_modules
- Docker images
- Build output
- Temporary files

Ensure `.gitignore` is configured before development begins.

---

# Learning Outcome

After completing this phase, you understand:

- How to create a professional Git repository.
- How monorepo structures organize cloud-native applications.
- How source code, infrastructure, automation, and documentation are managed together.
- Why Git becomes the foundation for CI/CD and GitOps workflows.

---

# Estimated Completion Time

Approximately 30–45 minutes.

---

# Before Moving to Phase 4

Confirm:

- Git repository exists.
- GitHub remote is connected.
- Initial commit is pushed.
- Repository structure is created.
- Documentation folder exists.
- Development environment is ready.

The project is now ready for application development.

---

# References

- Git Documentation: https://git-scm.com/doc
- GitHub Documentation: https://docs.github.com
- GitHub Repository Management: https://docs.github.com/en/repositories

---

# Phase 4 — Frontend Development

## Goal

Develop the FlavorForge frontend application using React and Vite.

The objective of this phase is to create a production-ready user interface that can display recipe information, communicate with backend APIs, handle user navigation, and provide a foundation for containerization and deployment.

---

## Why This Phase Comes Now

The repository structure has been created, but the application does not yet contain any functionality.

The frontend is developed before the backend integration phase because the user interface defines the requirements for backend communication.

Building the frontend first establishes:

- Application screens.
- User interactions.
- Required API endpoints.
- Component structure.
- Frontend build requirements.

---

## Concept

A frontend application is the part of the system that users interact with directly.

For FlavorForge:

- React creates the user interface.
- Components represent reusable UI elements.
- Services communicate with backend APIs.
- Pages represent complete application views.

The frontend acts as the presentation layer of the application.

---

## Technical Explanation

FlavorForge frontend is implemented using React with Vite as the build tool.

React provides a component-based architecture where the application is divided into reusable pieces.

Vite provides:

- Fast development server.
- Modern JavaScript bundling.
- Production optimization.
- Efficient build process.

The frontend follows a structured architecture separating:

- Components.
- Pages.
- API clients.
- Services.
- Styling.
- Testing utilities.

---

# Prerequisites

Before starting this phase:

- Phase 3 repository setup must be completed.
- Node.js must be installed.
- npm must be available.
- Git repository must exist.

Verification:

```bash
node --version

npm --version
```

---

# Frontend Creation

## Step 1 — Navigate to Frontend Directory

Move into the frontend folder.

```bash
cd frontend
```

---

## Step 2 — Create React Application

Create a Vite React application.

```bash
npm create vite@latest .
```

Select:

```text
Framework:
React

Variant:
JavaScript
```

---

## Step 3 — Install Dependencies

Install project dependencies.

```bash
npm install
```

---

## Step 4 — Install Application Libraries

Install required frontend packages.

```bash
npm install react-router-dom
```

Purpose:

`react-router-dom` provides client-side routing between application pages.

---

# Frontend Application Structure

The completed frontend follows this structure:

```text
frontend/

├── src/

│   ├── api
│   │   └── apiClient.js
│
│   ├── components
│   │   ├── Header
│   │   ├── Footer
│   │   ├── RecipeCard
│   │   ├── SearchBar
│   │   ├── CategoryFilter
│   │   └── ErrorBoundary
│
│   ├── layouts
│   │   └── Layout.jsx
│
│   ├── pages
│   │   ├── HomePage.jsx
│   │   ├── RecipesPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│
│   ├── services
│   │   ├── healthService.js
│   │   └── recipeService.js
│
│   ├── styles
│   │   ├── global.css
│   │   └── variables.css
│
│   └── main.jsx
│
├── Dockerfile
├── nginx.conf.template
├── package.json
└── vite.config.js
```

---

# Step-by-Step Implementation

## Step 1 — Create Application Entry Point

The main application entry point is:

```text
src/main.jsx
```

Responsibilities:

- Mount React application.
- Configure routing.
- Load global styles.

---

## Step 2 — Create Application Routing

Routing allows users to navigate between pages.

Implemented pages:

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/recipes` | Recipe listing |
| `/about` | About page |
| `/contact` | Contact page |

---

## Step 3 — Create Reusable Components

Reusable components were created to avoid duplicate UI logic.

Examples:

```text
Header

Footer

RecipeCard

SearchBar

CategoryFilter

Loading

ErrorBoundary
```

Benefits:

- Easier maintenance.
- Consistent design.
- Improved code reuse.

---

## Step 4 — Create Service Layer

Frontend communication with backend APIs is separated into service files.

Created:

```text
src/services/

healthService.js

recipeService.js
```

Purpose:

- Keep API logic separate from UI components.
- Simplify future backend changes.

---

## Step 5 — Configure API Client

Created:

```text
src/api/apiClient.js
```

Purpose:

- Centralize backend communication.
- Manage API base URL.
- Provide reusable HTTP configuration.

---

## Step 6 — Implement Styling

Created:

```text
src/styles/

global.css

variables.css
```

Purpose:

- Maintain consistent design.
- Avoid duplicated styling.
- Support reusable UI patterns.

---

# Running Frontend Locally

Start development server:

```bash
npm run dev
```

Expected output:

```text
Local:
http://localhost:5173/
```

Open browser:

```text
http://localhost:5173
```

---

# Production Build Verification

Create production build:

```bash
npm run build
```

Expected output:

```text
dist folder created successfully
```

---

# Files Created

Important frontend files:

```text
frontend/package.json

frontend/vite.config.js

frontend/src/main.jsx

frontend/src/App.jsx

frontend/src/pages/

frontend/src/components/

frontend/src/services/

frontend/src/api/

frontend/src/styles/
```

---

# Verification

Frontend development is complete when:

## Application Verification

Run:

```bash
npm run dev
```

Confirm:

- Application loads successfully.
- Navigation works.
- Components render correctly.
- Pages display correctly.

---

## Build Verification

Run:

```bash
npm run build
```

Confirm:

- Production bundle is generated.
- No build errors occur.

---

# Evidence

Use the following screenshots.

![React Application Running](/screenshots/frontend/03-react-application-running.png)

*Figure 4.1 – React application running successfully.*

![Frontend Enterprise Structure](/screenshots/frontend/04-frontend-enterprise-structure.png)

*Figure 4.2 – Frontend enterprise folder structure.*

![Frontend Recipes Integrated](/screenshots/frontend/21-frontend-recipes-integrated.png)

*Figure 4.3 – Frontend integrated with application functionality.*

![Recipe Search Working](/screenshots/frontend/23-recipe-search-working.png)

*Figure 4.4 – Recipe search functionality working.*

---

# Common Mistakes

## Running npm commands from the wrong directory

Incorrect:

```bash
npm install
```

from repository root.

Correct:

```bash
cd frontend
npm install
```

---

## Hardcoding backend URLs

Avoid:

```javascript
http://localhost:3000
```

Use environment-based configuration.

---

## Creating large components

Avoid putting the entire application inside:

```text
App.jsx
```

Use reusable components.

---

## Forgetting production build testing

Development mode may work while production build fails.

Always verify:

```bash
npm run build
```

---

# Learning Outcome

After completing this phase, you understand:

- React application structure.
- Component-based frontend development.
- Client-side routing.
- API service separation.
- Production frontend builds.

---

# Estimated Completion Time

Approximately 2–3 hours.

---

# Before Moving to Phase 5

Confirm:

- React application runs locally.
- All pages load successfully.
- Components are reusable.
- API service layer exists.
- Production build succeeds.

The frontend is now ready for backend integration.

---

# References

- React Documentation: https://react.dev
- Vite Documentation: https://vite.dev
- React Router Documentation: https://reactrouter.com
- npm Documentation: https://docs.npmjs.com

---

# Phase 5 — Backend Development

## Goal

Develop the FlavorForge backend API using Node.js and Express.

The objective of this phase is to create a reliable backend service that provides application data, exposes REST APIs, supports frontend communication, and provides health monitoring endpoints required for containerized and Kubernetes deployments.

---

## Why This Phase Comes Now

The frontend application requires backend services to retrieve and process application data.

After creating the frontend structure, the backend is developed to provide:

- REST API endpoints.
- Business logic.
- Application services.
- Health monitoring.
- Backend testing.

The backend is implemented before Dockerization because container images must be created from a working application.

---

## Concept

The backend is the application layer responsible for processing requests and returning responses.

For FlavorForge:

- The frontend sends requests.
- The backend receives requests.
- Controllers handle incoming requests.
- Services contain application logic.
- Routes define API endpoints.

The backend acts as the communication layer between the user interface and application data.

---

## Technical Explanation

FlavorForge backend is implemented using Node.js with the Express framework.

The backend follows a layered architecture:

```text
Client Request

       │

       ▼

Routes Layer

       │

       ▼

Controller Layer

       │

       ▼

Service Layer

       │

       ▼

Response
```

This separation improves:

- Maintainability.
- Testing.
- Scalability.
- Code organization.

---

# Prerequisites

Before starting this phase:

- Phase 4 frontend development must be completed.
- Node.js must be installed.
- npm must be available.
- Backend directory must exist.

Verification:

```bash
node --version

npm --version
```

---

# Backend Creation

## Step 1 — Navigate to Backend Directory

```bash
cd backend
```

---

## Step 2 — Initialize Node.js Application

Create package configuration.

```bash
npm init -y
```

---

## Step 3 — Install Backend Dependencies

Install Express.

```bash
npm install express
```

Install development testing tools.

```bash
npm install --save-dev jest supertest nodemon
```

---

# Backend Project Structure

The backend follows a layered enterprise structure.

```text
backend/

src/

├── app.js
│
├── server.js
│
├── config
│   └── app.config.js
│
├── routes
│   ├── health.routes.js
│   └── recipe.routes.js
│
├── controllers
│   ├── health.controller.js
│   └── recipe.controller.js
│
├── services
│   ├── health.service.js
│   └── recipe.service.js
│
├── middleware
│
├── models
│
├── database
│
└── utils
```

---

# Step-by-Step Implementation

## Step 1 — Create Express Application

Create:

```text
src/app.js
```

Responsibilities:

- Initialize Express.
- Configure middleware.
- Register routes.
- Export application instance for testing.

---

## Step 2 — Create Server Entry Point

Create:

```text
src/server.js
```

Responsibilities:

- Start HTTP server.
- Load application configuration.
- Listen on configured port.

---

## Step 3 — Configure Application Settings

Create:

```text
src/config/app.config.js
```

Purpose:

Centralize:

- Port configuration.
- Environment values.
- Application settings.

---

# API Development

## Health API

Created:

```text
routes/health.routes.js
```

Controller:

```text
controllers/health.controller.js
```

Service:

```text
services/health.service.js
```

Endpoint:

```http
GET /api/health
```

Purpose:

- Kubernetes liveness checks.
- Application monitoring.
- Deployment verification.

Expected response:

```json
{
  "status": "healthy"
}
```

---

## Recipe API

Created:

```text
routes/recipe.routes.js
```

Controller:

```text
controllers/recipe.controller.js
```

Service:

```text
services/recipe.service.js
```

Purpose:

Provide recipe-related application functionality.

---

# Environment Configuration

The backend uses environment-based configuration.

Important variables:

```text
NODE_ENV

PORT

CORS_ORIGIN

APP_VERSION

BUILD_VERSION
```

Benefits:

- Environment separation.
- Easier deployment.
- Kubernetes compatibility.

---

# CORS Configuration

The backend allows frontend communication through CORS configuration.

Purpose:

Allow browser-based requests from the React application.

---

# Testing Implementation

Tests are created using Jest.

Test files:

```text
backend/tests/

app.test.js

controllers.test.js

services.test.js
```

Run tests:

```bash
npm test
```

Expected:

```text
Tests passed
```

---

# Running Backend Locally

Start development server:

```bash
npm run dev
```

or:

```bash
node src/server.js
```

Expected:

```text
Server running on port 3000
```

---

# API Verification

Test health endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{
 "status":"healthy"
}
```

---

# Files Created

Important backend files:

```text
backend/package.json

backend/src/app.js

backend/src/server.js

backend/src/config/app.config.js

backend/src/routes/

backend/src/controllers/

backend/src/services/

backend/tests/
```

---

# Verification

Backend development is complete when:

## Application Verification

Confirm:

- Server starts successfully.
- API endpoints respond.
- Environment variables load correctly.

---

## API Verification

Run:

```bash
curl http://localhost:3000/api/health
```

Confirm successful response.

---

## Test Verification

Run:

```bash
npm test
```

Confirm:

- Tests execute.
- Application logic passes.

---

# Evidence

Use the following screenshots.

![Backend Folder Structure](/screenshots/backend/01-backend-folder-structure.png)

*Figure 5.1 – Backend project structure.*

![Backend Health Endpoint](/screenshots/backend/02-backend-health-endpoint.png)

*Figure 5.2 – Backend health endpoint response.*

![Backend Server Running](/screenshots/backend/09-backend-server-running.png)

*Figure 5.3 – Backend server running successfully.*

![Recipes API Working](/screenshots/backend/12-recipes-api-working.png)

*Figure 5.4 – Recipe API endpoint working successfully.*

![Backend API](/screenshots/backend/13-backend-api.png)

*Figure 5.5 – Backend API verification.*

---

# Common Mistakes

## Mixing business logic with routes

Avoid putting application logic directly inside route files.

Use:

```text
Route
 ↓
Controller
 ↓
Service
```

---

## Missing health endpoint

Kubernetes requires health checks.

Always provide:

```text
/api/health
```

---

## Incorrect CORS configuration

Symptoms:

- Frontend cannot communicate with backend.
- Browser shows CORS errors.

Solution:

Configure allowed frontend origins.

---

## Not testing before Dockerization

Always verify:

```bash
npm test

npm start
```

before creating Docker images.

---

# Learning Outcome

After completing this phase, you understand:

- Node.js backend development.
- Express REST API design.
- Layered backend architecture.
- API testing.
- Health endpoint design for cloud deployments.

---

# Estimated Completion Time

Approximately 2–4 hours.

---

# Before Moving to Phase 6

Confirm:

- Backend server runs successfully.
- Health API works.
- Recipe API works.
- Tests pass.
- Frontend and backend requirements are understood.

The application is now ready for local integration.

---

# References

- Node.js Documentation: https://nodejs.org/docs
- Express Documentation: https://expressjs.com
- Jest Documentation: https://jestjs.io/docs
- REST API Design Guidelines: https://restfulapi.net

---

# Phase 6 — Local Frontend and Backend Integration

## Goal

Connect the FlavorForge React frontend application with the Node.js backend API and verify complete application functionality in a local development environment.

The objective of this phase is to ensure that:

- Frontend requests reach the backend.
- Backend APIs return expected responses.
- CORS configuration works correctly.
- Application functionality works before containerization.

---

## Why This Phase Comes Now

The frontend and backend were developed independently in previous phases.

Before creating Docker images, the complete application flow must be verified locally.

Containerizing an application that has not been tested end-to-end can make troubleshooting more difficult because failures may come from:

- Application code.
- Network configuration.
- Docker configuration.
- Container communication.

Therefore, local integration is completed before Dockerization.

---

## Concept

The frontend and backend are two separate applications.

The frontend is responsible for displaying information to users.

The backend is responsible for processing requests and returning data.

Integration connects both layers:

```text
User Browser

      │

      ▼

React Frontend

      │

      ▼

Node.js Backend API

      │

      ▼

Response Data
```

---

## Technical Explanation

The React application communicates with the Express backend through HTTP API requests.

The frontend uses an API service layer to send requests.

The backend exposes REST endpoints.

CORS is configured to allow communication between different local development servers.

Typical local setup:

```text
Frontend

http://localhost:5173


        ↓


Backend API

http://localhost:3000
```

---

# Prerequisites

Before starting this phase:

- Frontend development must be completed.
- Backend development must be completed.
- Both applications must run independently.

Verification:

Frontend:

```bash
cd frontend

npm run dev
```

Backend:

```bash
cd backend

npm run dev
```

---

# Step-by-Step Tasks

## Step 1 — Start Backend Server

Navigate to backend:

```bash
cd backend
```

Start application:

```bash
npm run dev
```

Expected:

```text
Server running on port 3000
```

---

## Step 2 — Verify Backend API

Test health endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{
 "status":"healthy"
}
```

---

## Step 3 — Configure Frontend API URL

The frontend must know where the backend API is running.

Development API URL:

```text
http://localhost:3000
```

The API URL is managed through frontend configuration rather than hardcoded values.

---

## Step 4 — Configure Backend CORS

The backend must allow requests from the frontend application.

Frontend origin:

```text
http://localhost:5173
```

Backend configuration:

```text
CORS_ORIGIN=http://localhost:5173
```

---

## Step 5 — Start Frontend Application

Navigate to frontend:

```bash
cd frontend
```

Start development server:

```bash
npm run dev
```

Expected:

```text
Local:
http://localhost:5173/
```

---

## Step 6 — Verify Application Communication

Open browser:

```text
http://localhost:5173
```

Verify:

- Frontend loads successfully.
- Backend data is displayed.
- API calls complete successfully.
- No browser CORS errors appear.

---

# Application Flow Verification

The completed request flow:

```text
Browser

  |

  ▼

React Component

  |

  ▼

Frontend Service Layer

  |

  ▼

Backend REST API

  |

  ▼

Controller

  |

  ▼

Service Layer

  |

  ▼

JSON Response

  |

  ▼

React UI Update
```

---

# Files Created or Modified

## Frontend

Modified:

```text
frontend/src/api/apiClient.js

frontend/src/services/

frontend/.env configuration
```

Purpose:

- Configure backend communication.
- Centralize API requests.

---

## Backend

Modified:

```text
backend/src/config/app.config.js

backend/src/app.js
```

Purpose:

- Configure CORS.
- Load application settings.

---

# Verification

Integration is successful when:

## Frontend Verification

Run:

```bash
cd frontend

npm run dev
```

Confirm:

- Website loads.
- Pages navigate correctly.

---

## Backend Verification

Run:

```bash
cd backend

npm run dev
```

Confirm:

- API server runs.
- Health endpoint responds.

---

## Browser Verification

Confirm:

- Recipe data loads.
- Search functionality works.
- Category filtering works.
- No CORS errors appear.

---

# Evidence

Use the following screenshots.

![Frontend Backend Connected](/screenshots/backend/10-cors-enabled-frontend-backend-connected.png)

*Figure 6.1 – Frontend and backend communication verified successfully.*

![Frontend Recipes Integrated](/screenshots/frontend/21-frontend-recipes-integrated.png)

*Figure 6.2 – Frontend displaying backend-provided recipe data.*

![Recipe Search Working](/screenshots/frontend/23-recipe-search-working.png)

*Figure 6.3 – Recipe search functionality verified.*

![Category Filtering Working](/screenshots/frontend/25-category-filtering-working.png)

*Figure 6.4 – Category filtering functionality verified.*

---

# Common Mistakes

## Incorrect backend URL

Problem:

Frontend sends requests to the wrong address.

Example:

```text
http://localhost:3001
```

when backend runs on:

```text
http://localhost:3000
```

Solution:

Verify environment configuration.

---

## CORS errors

Browser message:

```text
Blocked by CORS policy
```

Cause:

Backend does not allow frontend origin.

Solution:

Update backend CORS configuration.

---

## Testing only frontend

A frontend page loading does not mean integration is working.

Always verify:

- API calls.
- Backend responses.
- Browser network requests.

---

## Moving to Docker too early

Docker should package a working application.

First verify:

```text
Frontend works

+

Backend works

+

Integration works
```

---

# Learning Outcome

After completing this phase, you understand:

- Frontend and backend communication.
- REST API integration.
- CORS configuration.
- Local application testing.
- Importance of validating applications before containerization.

---

# Estimated Completion Time

Approximately 1–2 hours.

---

# Before Moving to Phase 7

Confirm:

- Frontend runs locally.
- Backend runs locally.
- Frontend communicates with backend.
- APIs return expected responses.
- Application works without errors.

The application is now ready for Docker containerization.

---

# References

- MDN HTTP Documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP
- Express CORS Middleware: https://expressjs.com/en/resources/middleware/cors.html
- React Documentation: https://react.dev

---

# Phase 7 — Dockerization

## Goal

Containerize the FlavorForge frontend and backend applications using Docker.

The objective of this phase is to package the application and its dependencies into portable Docker images that can run consistently across development, testing, and cloud environments.

---

## Why This Phase Comes Now

The application has been verified locally in the previous phase.

Before deploying to Azure, the application must be converted into containers.

Kubernetes does not run raw source code. It runs container images.

Therefore, Dockerization must be completed before:

- Azure Container Registry configuration.
- Azure Kubernetes Service deployment.
- Kubernetes workload creation.

---

## Concept

A Docker container is a packaged environment containing:

- Application code.
- Runtime dependencies.
- Configuration.
- Required libraries.

Instead of installing Node.js, npm packages, and application dependencies manually on every server, Docker creates a repeatable package that can run anywhere Docker is available.

A simple comparison:

Without Docker:

```text
Developer Machine

Install Node.js

Install Packages

Configure Environment

Run Application
```

With Docker:

```text
Docker Image

      |

      ▼

Same Application Environment Everywhere
```

---

## Technical Explanation

FlavorForge uses Docker to create separate images for:

1. Frontend application.
2. Backend API application.

The frontend uses a multi-stage Docker build:

```text
Stage 1

Node.js image

      |

      ▼

Build React application


Stage 2

NGINX image

      |

      ▼

Serve production static files
```

The backend uses a Node.js container:

```text
Node.js Runtime

      |

      ▼

Express API Application
```

Docker Compose is used locally to verify that both containers communicate correctly.

---

# Prerequisites

Before starting this phase:

- Frontend application must work locally.
- Backend application must work locally.
- Docker must be installed.
- Docker daemon must be running.

Verification:

```bash
docker --version

docker compose version
```

---

# Docker Architecture

The container flow:

```text
Frontend Source Code

        |

        ▼

Frontend Docker Image

        |

        ▼

NGINX Container


Backend Source Code

        |

        ▼

Backend Docker Image

        |

        ▼

Node.js Container


Both Containers

        |

        ▼

Docker Network

        |

        ▼

Application Running
```

---

# Step-by-Step Tasks

# Step 1 — Create Backend Dockerfile

Location:

```text
backend/Dockerfile
```

Purpose:

Define how the backend application image is created.

The backend container includes:

- Node.js runtime.
- Application dependencies.
- Express application.
- Required configuration.

---

# Step 2 — Build Backend Docker Image

Navigate:

```bash
cd backend
```

Build image:

```bash
docker build -t flavorforge-backend .
```

Verify image:

```bash
docker images
```

Expected:

```text
flavorforge-backend
```

---

# Step 3 — Run Backend Container

Start backend container:

```bash
docker run -d \
-p 3000:3000 \
--name flavorforge-backend \
flavorforge-backend
```

Verify:

```bash
docker ps
```

---

# Step 4 — Test Backend Container

Health verification:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{
 "status":"healthy"
}
```

---

# Step 5 — Create Frontend Dockerfile

Location:

```text
frontend/Dockerfile
```

The frontend uses a multi-stage build.

Purpose:

- Build React production files.
- Serve optimized files using NGINX.

---

# Step 6 — Build Frontend Docker Image

Navigate:

```bash
cd frontend
```

Build:

```bash
docker build -t flavorforge-frontend .
```

Verify:

```bash
docker images
```

Expected:

```text
flavorforge-frontend
```

---

# Step 7 — Create Docker Network

Create a network for container communication.

```bash
docker network create flavorforge-network
```

Verify:

```bash
docker network ls
```

---

# Step 8 — Connect Backend Container

Remove previous container if required:

```bash
docker rm -f flavorforge-backend
```

Run backend with network:

```bash
docker run -d \
--network flavorforge-network \
-p 3000:3000 \
--name flavorforge-backend \
flavorforge-backend
```

---

# Step 9 — Run Frontend Container

Start frontend:

```bash
docker run -d \
--network flavorforge-network \
-p 5173:80 \
--name flavorforge-frontend \
flavorforge-frontend
```

---

# Step 10 — Verify Running Containers

Run:

```bash
docker ps
```

Expected:

```text
flavorforge-frontend

flavorforge-backend
```

---

# Step 11 — Docker Compose Integration

Create:

```text
docker-compose.yml
```

Purpose:

Manage multiple containers together.

Docker Compose provides:

- Container creation.
- Network configuration.
- Environment configuration.
- Simplified startup.

Start application:

```bash
docker compose up
```

Run in background:

```bash
docker compose up -d
```

---

# Docker Verification

Application URL:

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000/api/health
```

Verify:

- Frontend loads.
- Backend responds.
- Containers communicate.
- Docker network works.

---

# Files Created or Modified

## Created

```text
backend/Dockerfile

frontend/Dockerfile

docker-compose.yml
```

---

## Modified

```text
frontend/nginx.conf.template

frontend environment configuration
```

---

# Verification

Dockerization is complete when:

## Image Verification

Run:

```bash
docker images
```

Confirm:

```text
flavorforge-frontend

flavorforge-backend
```

---

## Container Verification

Run:

```bash
docker ps
```

Confirm both containers are running.

---

## Application Verification

Open:

```text
http://localhost:5173
```

Verify:

- Website loads.
- Backend communication works.

---

# Evidence

Use the following screenshots.

![Docker Build Success](/screenshots/docker/1-docker-build-success.png)

*Figure 7.1 – Docker image build completed successfully.*

![Backend Container Running](/screenshots/docker/7-backend-container-running.png)

*Figure 7.2 – Backend container running successfully.*

![Docker Images](/screenshots/docker/4-docker-images.png)

*Figure 7.3 – Docker images created locally.*

![Docker Compose Running](/screenshots/docker/13-docker-compose-running.png)

*Figure 7.4 – Application containers running using Docker Compose.*

![Frontend Backend Containers Running](/screenshots/docker/10-frontend-backend-container-running.png)

*Figure 7.5 – Frontend and backend containers communicating.*

---

# Common Mistakes

## Docker daemon not running

Error:

```text
Cannot connect to Docker daemon
```

Solution:

Start Docker service.

---

## Wrong build directory

Incorrect:

```bash
docker build .
```

from repository root.

Correct:

```bash
cd frontend

docker build .
```

or:

```bash
cd backend

docker build .
```

---

## Port conflicts

Example:

```text
Port 3000 already in use
```

Check:

```bash
docker ps
```

Stop old containers:

```bash
docker stop <container-name>
```

---

## Frontend cannot reach backend

Possible causes:

- Incorrect API URL.
- Missing Docker network.
- Wrong container name.

Verify:

```bash
docker network inspect flavorforge-network
```

---

## Building images without testing locally

Always verify containers before pushing images to Azure.

---

# Learning Outcome

After completing this phase, you understand:

- Docker image creation.
- Multi-stage frontend builds.
- Container networking.
- Docker Compose.
- Running applications in isolated environments.

---

# Estimated Completion Time

Approximately 2–3 hours.

---

# Before Moving to Phase 8

Confirm:

- Frontend Docker image exists.
- Backend Docker image exists.
- Containers start successfully.
- Docker Compose works.
- Application runs using containers.

The application is now ready for Azure cloud deployment.

---

# References

- Docker Documentation: https://docs.docker.com
- Docker Compose Documentation: https://docs.docker.com/compose/
- Dockerfile Reference: https://docs.docker.com/reference/dockerfile/

---

# Phase 8 — Azure Cloud Infrastructure Setup

## Goal

Prepare the Microsoft Azure environment required for hosting the FlavorForge DevSecOps platform.

The objective of this phase is to create the Azure foundation where:

- Container images will be stored.
- Kubernetes workloads will run.
- Cloud resources will be managed securely.

---

## Why This Phase Comes Now

The application has been developed and containerized locally.

The next step is moving from local infrastructure to cloud infrastructure.

Azure resources must exist before:

- Docker images can be pushed to Azure Container Registry.
- Kubernetes clusters can be created.
- Application containers can be deployed.

The Azure foundation is created before ACR and AKS because these services depend on the resource group and cloud configuration.

---

# Concept

Imagine Azure as a large cloud data center where different services are available.

A resource group is like a project folder inside Azure.

For FlavorForge:

```text
Azure Subscription

        |

        ▼

Resource Group

        |

        ├── Azure Container Registry (ACR)

        |

        ├── Azure Kubernetes Service (AKS)

        |

        ├── Load Balancer

        |

        └── Networking Resources
```

All project resources are organized inside one resource group.

---

# Technical Explanation

Azure Resource Groups provide lifecycle management for related resources.

The FlavorForge project uses Azure CLI to automate infrastructure preparation.

Azure CLI allows developers to:

- Authenticate with Azure.
- Create resources.
- Configure services.
- Automate cloud operations.

---

# Prerequisites

Before starting this phase:

- Azure account must exist.
- Azure subscription must be active.
- Azure CLI must be installed.
- Docker images must already exist locally.

Verify Azure CLI:

```bash
az --version
```

Verify Docker:

```bash
docker --version
```

---

# Step-by-Step Tasks

# Step 1 — Login to Azure

Authenticate Azure CLI.

Command:

```bash
az login
```

A browser window opens for authentication.

Expected result:

```text
[
  {
    "cloudName": "AzureCloud",
    "isDefault": true
  }
]
```

---

# Step 2 — Verify Azure Account

Check active subscription.

```bash
az account show
```

Example output:

```json
{
 "name": "Azure Subscription",
 "state": "Enabled"
}
```

---

# Step 3 — List Available Subscriptions

If multiple subscriptions exist:

```bash
az account list
```

---

# Step 4 — Select Subscription

Set the required subscription:

```bash
az account set \
--subscription "<subscription-id>"
```

Verify:

```bash
az account show
```

---

# Step 5 — Create Resource Group

Create the main FlavorForge resource container.

Command:

```bash
az group create \
--name flavorforge-rg \
--location eastus
```

Explanation:

```text
flavorforge-rg

= Azure resource group name


eastus

= Azure deployment region
```

Expected response:

```json
{
 "provisioningState": "Succeeded"
}
```

---

# Step 6 — Verify Resource Group

List resource groups:

```bash
az group list -o table
```

Expected:

```text
flavorforge-rg
eastus
Succeeded
```

---

# Step 7 — Register Required Azure Providers

Azure services require registered providers before resource creation.

Register Container Registry provider:

```bash
az provider register \
--namespace Microsoft.ContainerRegistry
```

Register Container Service provider:

```bash
az provider register \
--namespace Microsoft.ContainerService
```

Verify:

```bash
az provider list \
--query "[?namespace=='Microsoft.ContainerRegistry']" \
-o table
```

---

# Azure Infrastructure Structure

After this phase:

```text
Azure Subscription

        |

        ▼

flavorforge-rg

        |

        ├── Ready for ACR

        |

        ├── Ready for AKS

        |

        └── Ready for networking resources
```

---

# Files Created or Modified

No application files are created in this phase.

Cloud resources created:

```text
Azure Resource Group

Azure Provider Registrations
```

---

# Verification

Azure setup is complete when:

## Login Verification

Run:

```bash
az account show
```

Confirm:

- Correct subscription.
- Authentication successful.

---

## Resource Group Verification

Run:

```bash
az group show \
--name flavorforge-rg
```

Confirm:

```text
provisioningState = Succeeded
```

---

## Provider Verification

Run:

```bash
az provider list -o table
```

Confirm:

```text
Microsoft.ContainerRegistry

Microsoft.ContainerService
```

are registered.

---

# Evidence

Use the following screenshots.

![Azure CLI Authentication](/screenshots/azure/01-azure-cli-authenticated.png)

*Figure 8.1 – Azure CLI authentication completed successfully.*

![Resource Group Created](/screenshots/azure/02-resource-group-created.png)

*Figure 8.2 – FlavorForge Azure resource group created.*

![Container Registry Provider Registration](/screenshots/azure/03-containerregistry-provider-registered.png)

*Figure 8.3 – Azure Container Registry provider registered.*

![Azure Resource Group Portal View](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

*Figure 8.4 – FlavorForge resource group visible in Azure Portal.*

---

# Common Mistakes

## Using the wrong subscription

Problem:

Resources are created in an unexpected Azure subscription.

Solution:

Check:

```bash
az account show
```

---

## Incorrect Azure region

Problem:

Some services may not be available or may have different pricing.

Solution:

Choose a supported region.

Example:

```text
eastus
```

---

## Creating resources without a resource group

Problem:

Resources become difficult to manage.

Solution:

Always organize project resources inside a dedicated resource group.

---

## Forgetting provider registration

Error:

```text
Resource provider not registered
```

Solution:

Register required providers:

```bash
az provider register
```

---

# Learning Outcome

After completing this phase, you understand:

- Azure CLI authentication.
- Subscription management.
- Resource groups.
- Azure provider registration.
- Cloud resource organization.

---

# Estimated Completion Time

Approximately 30–60 minutes.

---

# Before Moving to Phase 9

Confirm:

- Azure CLI login works.
- Correct subscription is selected.
- Resource group exists.
- Required providers are registered.

Azure foundation is now ready for container image storage.

---

# References

- Azure CLI Documentation: https://learn.microsoft.com/cli/azure/
- Azure Resource Groups Documentation: https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal
- Azure Provider Registration: https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types

---

# Phase 9 — Azure Container Registry (ACR) Setup

## Goal

Create and configure Azure Container Registry (ACR) to store FlavorForge Docker images securely in Azure.

The objective of this phase is to make application container images available for Azure Kubernetes Service (AKS) deployments.

---

## Why This Phase Comes Now

The application has been successfully containerized locally.

However, Kubernetes clusters cannot use images that exist only on a developer laptop.

The images must be stored in a cloud container registry that AKS can access.

Therefore, ACR is created before AKS deployment.

The deployment flow becomes:

```text
Developer Machine

        |

        ▼

Docker Build

        |

        ▼

Azure Container Registry

        |

        ▼

Azure Kubernetes Service

        |

        ▼

Running Application
```

---

# Concept

Imagine ACR is an online cupboard where Docker images are stored.

Instead of keeping application images only on your laptop, ACR stores them securely in Azure.

AKS opens this cupboard and downloads the required images when creating application containers.

Example:

```text
Local Computer

flavorforge-frontend:v1

flavorforge-backend:v1


          |

          ▼


Azure Container Registry

flavorforge.azurecr.io

          |

          ▼


AKS Cluster

Pulls images during deployment
```

---

# Technical Explanation

Azure Container Registry is a private Docker registry service provided by Azure.

It stores:

- Container images.
- Image versions.
- Image metadata.
- Repository information.

FlavorForge uses ACR as the private image repository for:

```text
Frontend Application

Backend API
```

AKS later authenticates with ACR to pull these images.

---

# Prerequisites

Before starting this phase:

- Azure resource group must exist.
- Docker images must be built locally.
- Azure CLI must be authenticated.

Verify:

```bash
az account show
```

Verify Docker images:

```bash
docker images
```

Expected:

```text
flavorforge-frontend

flavorforge-backend
```

---

# Step-by-Step Tasks

# Step 1 — Create Azure Container Registry

Create ACR inside the FlavorForge resource group.

Command:

```bash
az acr create \
--resource-group flavorforge-rg \
--name flavorforgeacr2026ms \
--sku Basic
```

Explanation:

```text
--resource-group

Azure resource group


--name

ACR name


--sku Basic

Development registry tier
```

---

# Step 2 — Verify ACR Creation

List registries:

```bash
az acr list -o table
```

Expected:

```text
flavorforgeacr2026ms
```

---

# Step 3 — Login to Azure Container Registry

Authenticate Docker with ACR.

Command:

```bash
az acr login \
--name flavorforgeacr2026ms
```

Expected:

```text
Login Succeeded
```

---

# Step 4 — Get ACR Login Server

Retrieve registry address.

Command:

```bash
az acr show \
--name flavorforgeacr2026ms \
--query loginServer \
-o tsv
```

Example:

```text
flavorforgeacr2026ms.azurecr.io
```

This address is required for Docker image tagging.

---

# Step 5 — View Local Docker Images

Verify available images:

```bash
docker images
```

Example:

```text
flavorforge-frontend

flavorforge-backend
```

---

# Step 6 — Tag Frontend Image

Docker images must be renamed using the ACR address.

Command:

```bash
docker tag \
flavorforge-frontend:latest \
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:v1
```

---

# Step 7 — Tag Backend Image

Command:

```bash
docker tag \
flavorforge-backend:latest \
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:v1
```

---

# Step 8 — Verify Tagged Images

Run:

```bash
docker images
```

Expected:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend

flavorforgeacr2026ms.azurecr.io/flavorforge-backend
```

---

# Step 9 — Push Frontend Image

Upload frontend image:

```bash
docker push \
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:v1
```

---

# Step 10 — Push Backend Image

Upload backend image:

```bash
docker push \
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:v1
```

---

# Step 11 — Verify Images in ACR

List repositories:

```bash
az acr repository list \
--name flavorforgeacr2026ms \
-o table
```

Expected:

```text
flavorforge-frontend

flavorforge-backend
```

---

# Step 12 — Verify Image Tags

Frontend:

```bash
az acr repository show-tags \
--name flavorforgeacr2026ms \
--repository flavorforge-frontend \
-o table
```

Backend:

```bash
az acr repository show-tags \
--name flavorforgeacr2026ms \
--repository flavorforge-backend \
-o table
```

Expected:

```text
v1
```

---

# ACR Architecture

After this phase:

```text
Azure Resource Group

        |

        ▼

Azure Container Registry

        |

        ├── flavorforge-frontend:v1

        |

        └── flavorforge-backend:v1
```

---

# Files Created or Modified

No source files are modified.

Azure resources created:

```text
Azure Container Registry

Docker image repositories
```

---

# Verification

ACR setup is complete when:

## Registry Verification

Run:

```bash
az acr list -o table
```

Confirm registry exists.

---

## Authentication Verification

Run:

```bash
az acr login --name flavorforgeacr2026ms
```

Expected:

```text
Login Succeeded
```

---

## Image Verification

Run:

```bash
az acr repository list \
--name flavorforgeacr2026ms
```

Confirm:

```text
flavorforge-frontend

flavorforge-backend
```

---

# Evidence

Use the following screenshots.

![ACR Created](/screenshots/azure/04-acr-created.png)

*Figure 9.1 – Azure Container Registry created successfully.*

![ACR Login Success](/screenshots/azure/06-az-acr-login-success.png)

*Figure 9.2 – Successful authentication with Azure Container Registry.*

![Docker Images](/screenshots/azure/07-docker-images.png)

*Figure 9.3 – Local Docker images available before pushing.*

![Tagged Images Verification](/screenshots/azure/08-tag-the-images-and-verify-in-docker-images.png)

*Figure 9.4 – Docker images tagged with ACR repository names.*

![Images Verified in ACR](/screenshots/azure/09-verify-images-in-acr.png)

*Figure 9.5 – Docker images available inside Azure Container Registry.*

![ACR Images Portal View](/screenshots/azure/25-acr-images.png)

*Figure 9.6 – Container images displayed in Azure Container Registry.*

---

# Common Mistakes

## Incorrect ACR naming

Azure Container Registry names must be globally unique.

Example:

Incorrect:

```text
flavorforge
```

if already used.

Solution:

Choose another unique name.

---

## Forgetting ACR login

Error:

```text
unauthorized
```

Solution:

Run:

```bash
az acr login --name <acr-name>
```

---

## Incorrect image tagging

Wrong:

```text
flavorforge-backend:v1
```

Correct:

```text
registry.azurecr.io/flavorforge-backend:v1
```

The registry address is required.

---

## Pushing before tagging

Docker push requires a registry-qualified image name.

Correct flow:

```text
Build

↓

Tag

↓

Push
```

---

## Using latest tags only

Using only:

```text
latest
```

makes deployments difficult to track.

Recommended:

```text
v1

v1.1

Build ID
```

---

# Learning Outcome

After completing this phase, you understand:

- Private container registries.
- Docker image tagging.
- Image publishing workflow.
- Cloud image management.
- How Kubernetes obtains application images.

---

# Estimated Completion Time

Approximately 1 hour.

---

# Before Moving to Phase 10

Confirm:

- ACR exists.
- Docker login succeeds.
- Frontend image is pushed.
- Backend image is pushed.
- Images are visible in ACR.

The container images are now ready for Kubernetes deployment.

---

# References

- Azure Container Registry Documentation: https://learn.microsoft.com/azure/container-registry/
- Azure CLI ACR Commands: https://learn.microsoft.com/cli/azure/acr
- Docker Image Tagging: https://docs.docker.com/reference/cli/docker/image/tag/

---

# Phase 10 — Azure Kubernetes Service (AKS) Creation and Configuration

## Goal

Create and configure an Azure Kubernetes Service (AKS) cluster that will host the FlavorForge application containers.

The objective of this phase is to prepare a managed Kubernetes environment capable of:

- Running frontend and backend containers.
- Managing application replicas.
- Performing rolling deployments.
- Integrating with Azure Container Registry.

---

## Why This Phase Comes Now

The Docker images have been created and stored in Azure Container Registry.

However, images alone cannot run the application.

A Kubernetes cluster is required to:

- Pull images from ACR.
- Create containers.
- Maintain application availability.
- Manage scaling and networking.

The deployment flow is:

```text
Application Code

        |

        ▼

Docker Images

        |

        ▼

Azure Container Registry

        |

        ▼

Azure Kubernetes Service

        |

        ▼

Running Application
```

---

# Concept

Imagine AKS as a managed computer system that runs containers.

Instead of manually starting containers:

```text
docker run frontend

docker run backend
```

Kubernetes automatically manages them:

```text
AKS Cluster

    |

    ├── Frontend Pods

    |

    ├── Backend Pods

    |

    ├── Services

    |

    └── Networking
```

---

# Technical Explanation

Azure Kubernetes Service is a managed Kubernetes platform.

Microsoft manages the Kubernetes control plane while developers manage workloads.

FlavorForge uses AKS for:

- Container orchestration.
- Application deployment.
- Replica management.
- Service discovery.
- Cloud scaling.

The AKS cluster is connected to ACR so Kubernetes can securely pull private images.

---

# Prerequisites

Before starting this phase:

- Azure resource group exists.
- ACR exists.
- Docker images are pushed to ACR.
- Azure CLI is authenticated.

Verify:

```bash
az account show
```

Verify ACR:

```bash
az acr repository list \
--name flavorforgeacr2026ms
```

---

# Step-by-Step Tasks

# Step 1 — Install Required Kubernetes Tools

Install kubectl:

```bash
az aks install-cli
```

Verify:

```bash
kubectl version --client
```

---

# Step 2 — Create AKS Cluster

Create Kubernetes cluster:

```bash
az aks create \
--resource-group flavorforge-rg \
--name flavorforge-aks \
--node-count 2 \
--enable-managed-identity \
--generate-ssh-keys
```

Explanation:

```text
--resource-group

Azure resource group


--name

AKS cluster name


--node-count

Number of Kubernetes worker nodes


--enable-managed-identity

Azure identity management


--generate-ssh-keys

Required cluster access keys
```

---

# Step 3 — Connect AKS With ACR

Attach Azure Container Registry.

Command:

```bash
az aks update \
--resource-group flavorforge-rg \
--name flavorforge-aks \
--attach-acr flavorforgeacr2026ms
```

Purpose:

Allows AKS nodes to pull private images from ACR.

---

# Step 4 — Download AKS Credentials

Connect local kubectl to AKS.

Command:

```bash
az aks get-credentials \
--resource-group flavorforge-rg \
--name flavorforge-aks
```

Expected:

```text
Merged "flavorforge-aks" as current context
```

---

# Step 5 — Verify Kubernetes Context

Run:

```bash
kubectl config current-context
```

Expected:

```text
flavorforge-aks
```

---

# Step 6 — Verify Cluster Nodes

Run:

```bash
kubectl get nodes
```

Expected:

```text
NAME

STATUS

Ready
```

Example:

```text
aks-nodepool1-xxxxx

Ready
```

---

# Step 7 — Verify Cluster Information

Run:

```bash
kubectl cluster-info
```

Expected:

```text
Kubernetes control plane running
```

---

# AKS Architecture

After this phase:

```text
Azure Subscription

        |

        ▼

flavorforge-rg

        |

        ├── Azure Container Registry

        |

        └── AKS Cluster

                |

                ├── Node 1

                |

                └── Node 2
```

---

# Files Created or Modified

No application files are modified.

Azure resources created:

```text
AKS Cluster

Managed Identity

Kubernetes Node Pool
```

Local configuration created:

```text
~/.kube/config
```

---

# Verification

AKS setup is complete when:

## Cluster Verification

Run:

```bash
kubectl get nodes
```

Confirm:

```text
STATUS = Ready
```

---

## Kubernetes Version Verification

Run:

```bash
kubectl version
```

Confirm client and server versions are displayed.

---

## Azure Verification

Run:

```bash
az aks show \
--resource-group flavorforge-rg \
--name flavorforge-aks
```

Confirm:

```text
provisioningState = Succeeded
```

---

# Evidence

Use the following screenshots.

![AKS Creation](/screenshots/azure/10-az-aks-create.png)

*Figure 10.1 – AKS cluster creation command executed.*

![Connect Local Machine to AKS](/screenshots/azure/11-connect-local-machine-to-aks.png)

*Figure 10.2 – Local kubectl connection configured with AKS.*

![AKS Cluster Running](/screenshots/azure/27-aks-cluster-running.png)

*Figure 10.3 – AKS cluster running successfully.*

![Kubectl Get Nodes](/screenshots/azure/28-kubectl-get-nodes.png)

*Figure 10.4 – Kubernetes nodes in Ready state.*

![Azure Version Verification](/screenshots/azure/29-azure-version.png)

*Figure 10.5 – Azure and Kubernetes tooling verification.*

---

# Common Mistakes

## Creating AKS before ACR

Problem:

Kubernetes cannot pull application images.

Correct order:

```text
ACR

↓

AKS

↓

Deployment
```

---

## Forgetting to attach ACR

Error:

```text
ImagePullBackOff
```

Cause:

AKS cannot authenticate with private registry.

Solution:

Run:

```bash
az aks update \
--attach-acr
```

---

## Wrong Kubernetes context

Problem:

kubectl commands target the wrong cluster.

Check:

```bash
kubectl config get-contexts
```

Switch:

```bash
kubectl config use-context flavorforge-aks
```

---

## Insufficient node resources

Symptoms:

- Pods remain Pending.
- Deployments fail.

Solution:

Check:

```bash
kubectl describe nodes
```

---

# Learning Outcome

After completing this phase, you understand:

- Managed Kubernetes on Azure.
- AKS cluster creation.
- Kubernetes CLI connectivity.
- Azure identity integration.
- Container registry integration.

---

# Estimated Completion Time

Approximately 1–2 hours.

---

# Before Moving to Phase 11

Confirm:

- AKS cluster exists.
- kubectl connects successfully.
- Nodes are Ready.
- AKS can access ACR.

The Kubernetes platform is now ready for application deployment.

---

# References

- Azure Kubernetes Service Documentation: https://learn.microsoft.com/azure/aks/
- kubectl Documentation: https://kubernetes.io/docs/reference/kubectl/
- AKS and ACR Integration: https://learn.microsoft.com/azure/aks/cluster-container-registry-integration

---

# Phase 11 — Kubernetes Manifests and Application Deployment

## Goal

Deploy the FlavorForge frontend and backend applications to Azure Kubernetes Service (AKS) using Kubernetes manifests and Kustomize.

The objective of this phase is to create a Kubernetes-managed application environment containing:

- Namespace isolation.
- Application deployments.
- Internal services.
- Configuration management.
- Environment-specific deployment overlays.

---

## Why This Phase Comes Now

The AKS cluster is now running and connected to Azure Container Registry.

However, AKS only provides the Kubernetes platform.

The application workloads still need to be defined.

Kubernetes requires configuration files describing:

- Which containers to run.
- Which images to use.
- How many replicas are required.
- How applications communicate.

Therefore, Kubernetes manifests are created after AKS setup.

---

# Concept

Kubernetes does not directly understand application source code.

It uses declarative YAML files that describe the desired state.

Example:

Instead of manually running:

```bash
docker run backend
```

Kubernetes receives:

```yaml
Run backend container

Create 2 replicas

Expose service

Restart if failure occurs
```

Kubernetes continuously works to maintain this desired state.

---

# Technical Explanation

FlavorForge uses Kubernetes manifests with Kustomize.

Kustomize allows maintaining common Kubernetes configuration while applying environment-specific changes.

Structure:

```text
Base Configuration

        |

        ▼

Environment Overlay

        |

        ▼

Deployment
```

Example:

```text
base/

Common application configuration


overlays/dev/

Development changes


overlays/qa/

Testing changes


overlays/prod/

Production changes
```

---

# Prerequisites

Before starting this phase:

- AKS cluster must be running.
- kubectl must connect successfully.
- ACR images must exist.

Verify:

```bash
kubectl get nodes
```

Expected:

```text
STATUS

Ready
```

Verify images:

```bash
az acr repository list \
--name flavorforgeacr2026ms
```

---

# Kubernetes Deployment Architecture

The deployment structure:

```text
AKS Cluster

        |

        ▼

Namespace

flavorforge

        |

        ├── Frontend Deployment

        |

        ├── Backend Deployment

        |

        ├── Frontend Service

        |

        ├── Backend Service

        |

        ├── ConfigMap

        |

        └── Secret
```

---

# Step-by-Step Tasks

# Step 1 — Create Kubernetes Namespace

File:

```text
kubernetes/base/namespace.yaml
```

Purpose:

Create an isolated environment for FlavorForge resources.

Apply:

```bash
kubectl apply \
-f kubernetes/base/namespace.yaml
```

Verify:

```bash
kubectl get namespaces
```

Expected:

```text
flavorforge
```

---

# Step 2 — Create Backend Configuration

File:

```text
kubernetes/base/config/backend-configmap.yaml
```

Purpose:

Store backend configuration values.

Example:

```text
NODE_ENV

PORT

APP_VERSION

BUILD_VERSION
```

Apply:

```bash
kubectl apply \
-f kubernetes/base/config/
```

Verify:

```bash
kubectl get configmap \
-n flavorforge
```

---

# Step 3 — Create Kubernetes Secrets

File:

```text
kubernetes/base/config/secret-template.yaml
```

Purpose:

Store sensitive configuration values.

Apply:

```bash
kubectl apply \
-f kubernetes/base/config/secret-template.yaml
```

Verify:

```bash
kubectl get secrets \
-n flavorforge
```

---

# Step 4 — Deploy Backend Application

Files:

```text
kubernetes/base/backend/

deployment.yaml

service.yaml
```

Backend Deployment responsibilities:

- Pull backend image from ACR.
- Create backend pods.
- Maintain replicas.
- Restart failed containers.

Apply:

```bash
kubectl apply \
-f kubernetes/base/backend/
```

---

# Step 5 — Deploy Frontend Application

Files:

```text
kubernetes/base/frontend/

deployment.yaml

service.yaml
```

Apply:

```bash
kubectl apply \
-f kubernetes/base/frontend/
```

---

# Step 6 — Verify Deployments

Run:

```bash
kubectl get deployments \
-n flavorforge
```

Expected:

```text
backend

frontend
```

---

# Step 7 — Verify Pods

Run:

```bash
kubectl get pods \
-n flavorforge
```

Expected:

```text
Running
```

Example:

```text
frontend-xxxxx

backend-xxxxx
```

---

# Step 8 — Verify Services

Run:

```bash
kubectl get services \
-n flavorforge
```

Expected:

```text
frontend-service

backend-service
```

---

# Step 9 — Deploy Using Kustomize

Instead of applying individual files, use:

```bash
kubectl apply \
-k kubernetes/overlays/dev
```

Kustomize automatically combines:

```text
base configuration

+

dev changes
```

---

# Environment Management

FlavorForge supports:

```text
Development

QA

Production
```

using:

```text
kubernetes/overlays/
```

Structure:

```text
overlays

├── dev

├── qa

└── prod
```

Each environment can customize:

- Replica count.
- Images.
- Configuration.
- Deployment settings.

---

# Files Created or Modified

Kubernetes files:

```text
kubernetes/base/

namespace.yaml

backend/

frontend/

config/

kustomization.yaml
```

Environment files:

```text
kubernetes/overlays/

dev/

qa/

prod/
```

---

# Verification

Deployment is successful when:

## Namespace Verification

```bash
kubectl get ns
```

Confirm:

```text
flavorforge
```

---

## Pod Verification

```bash
kubectl get pods -n flavorforge
```

Confirm:

```text
STATUS = Running
```

---

## Deployment Verification

```bash
kubectl get deployments -n flavorforge
```

Confirm:

```text
READY replicas available
```

---

## Application Verification

Backend:

```bash
kubectl get pods -n flavorforge
```

Frontend:

Open application URL after ingress configuration.

---

# Evidence

Use the following screenshots.

![ConfigMap Creation](/screenshots/kubernetes/1-configmap.png)

*Figure 11.1 – Backend configuration stored using Kubernetes ConfigMap.*

![Deployment Creation](/screenshots/kubernetes/2-deployment.png)

*Figure 11.2 – Kubernetes deployment resources created.*

![Environment Variables](/screenshots/kubernetes/3-environment-variables.png)

*Figure 11.3 – Application environment variables configured.*

![Health Endpoint](/screenshots/kubernetes/4-health-endpoint.png)

*Figure 11.4 – Backend health endpoint verified inside Kubernetes.*

![Pods Running](/screenshots/kubernetes/pods.png)

*Figure 11.5 – FlavorForge application pods running successfully.*

![All Kubernetes Resources](/screenshots/kubernetes/all-deployment.png)

*Figure 11.6 – Kubernetes workloads deployed.*

---

# Common Mistakes

## Wrong image name

Error:

```text
ImagePullBackOff
```

Cause:

Kubernetes cannot find image in ACR.

Solution:

Check deployment image:

```bash
kubectl describe pod <pod-name>
```

---

## Wrong namespace

Problem:

Resources appear missing.

Check:

```bash
kubectl get all -n flavorforge
```

---

## Applying files in wrong order

Recommended order:

```text
Namespace

↓

ConfigMap

↓

Secret

↓

Backend

↓

Frontend

↓

Services
```

---

## Forgetting Kustomize path

Wrong:

```bash
kubectl apply -f overlays/dev
```

Correct:

```bash
kubectl apply -k overlays/dev
```

---

# Learning Outcome

After completing this phase, you understand:

- Kubernetes declarative deployment.
- Pods and deployments.
- Services.
- ConfigMaps and Secrets.
- Kustomize environment management.

---

# Estimated Completion Time

Approximately 3–4 hours.

---

# Before Moving to Phase 12

Confirm:

- Namespace exists.
- Frontend pods are running.
- Backend pods are running.
- Services exist.
- Kustomize deployment works.

The application is now running inside AKS.

---

# References

- Kubernetes Documentation: https://kubernetes.io/docs/
- Kubernetes Deployments: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- Kustomize Documentation: https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/

---

# Phase 12 — Kubernetes Ingress and External Application Access

## Goal

Expose the FlavorForge application outside the AKS cluster using Kubernetes Ingress and an external Azure Load Balancer.

The objective of this phase is to provide external access to:

- Frontend web application.
- Backend API endpoints.

---

## Why This Phase Comes Now

At the end of the previous phase, the application was successfully running inside AKS.

However, Kubernetes Services were only accessible internally.

Users on the internet cannot directly access:

```text
Frontend Pod

Backend Pod
```

A routing layer is required.

Ingress provides:

- External access.
- URL routing.
- Traffic management.

Therefore, Ingress is configured after application deployments.

---

# Concept

Imagine Ingress as a receptionist at the entrance of a building.

Without Ingress:

```text
Visitor

    |

    ?

Which application?
```

With Ingress:

```text
Visitor

    |

    ▼

Reception Desk

    |

    ├── Frontend Request

    |

    └── Backend API Request
```

---

# Technical Explanation

Kubernetes Ingress manages external HTTP and HTTPS traffic.

FlavorForge uses:

```text
NGINX Ingress Controller
```

The traffic flow:

```text
Browser

   |

   ▼

Azure Public IP

   |

   ▼

Azure Load Balancer

   |

   ▼

NGINX Ingress Controller

   |

   ├── frontend-service

   |

   └── backend-service
```

---

# Prerequisites

Before starting this phase:

- AKS cluster must be running.
- Frontend deployment must exist.
- Backend deployment must exist.
- Kubernetes services must exist.

Verify:

```bash
kubectl get all -n flavorforge
```

---

# Step-by-Step Tasks

# Step 1 — Install NGINX Ingress Controller

Install using Helm:

```bash
helm repo add ingress-nginx \
https://kubernetes.github.io/ingress-nginx
```

Update repositories:

```bash
helm repo update
```

Install controller:

```bash
helm install ingress-nginx \
ingress-nginx/ingress-nginx \
--namespace ingress-nginx \
--create-namespace
```

---

# Step 2 — Verify Ingress Controller

Check pods:

```bash
kubectl get pods \
-n ingress-nginx
```

Expected:

```text
ingress-nginx-controller

Running
```

---

# Step 3 — Verify Azure Load Balancer

The ingress controller creates an Azure Load Balancer.

Run:

```bash
kubectl get services \
-n ingress-nginx
```

Expected:

```text
EXTERNAL-IP
```

Example:

```text
104.xx.xx.xx
```

---

# Step 4 — Change Application Services

The application services should become internal services.

Ingress handles external traffic.

Frontend:

```text
LoadBalancer

        ↓

ClusterIP
```

Backend:

```text
LoadBalancer

        ↓

ClusterIP
```

Update:

```text
kubernetes/base/frontend/service.yaml

kubernetes/base/backend/service.yaml
```

Service type:

```yaml
type: ClusterIP
```

Apply:

```bash
kubectl apply \
-k kubernetes/base
```

---

# Step 5 — Create Ingress Resource

File:

```text
kubernetes/base/ingress/ingress.yaml
```

Purpose:

Define routing rules.

Example:

```text
/

        →

frontend-service


/api

        →

backend-service
```

Apply:

```bash
kubectl apply \
-f kubernetes/base/ingress/
```

---

# Step 6 — Verify Ingress Resource

Run:

```bash
kubectl get ingress \
-n flavorforge
```

Expected:

```text
ADDRESS

External IP
```

---

# Step 7 — Get External Address

Command:

```bash
kubectl get service \
-n ingress-nginx
```

Copy:

```text
EXTERNAL-IP
```

Example:

```text
http://104.xx.xx.xx
```

---

# Step 8 — Test Frontend

Open:

```text
http://<external-ip>
```

Expected:

FlavorForge website loads.

---

# Step 9 — Test Backend API

Open:

```text
http://<external-ip>/api/health
```

Expected:

```json
{
 "status":"healthy"
}
```

---

# Ingress Architecture

After completion:

```text
Internet

   |

   ▼

Azure Public IP

   |

   ▼

Azure Load Balancer

   |

   ▼

NGINX Ingress Controller

   |

   ├───────────────┐
   |               |
   ▼               ▼

Frontend        Backend

Service         Service

   |               |

Frontend Pods   Backend Pods
```

---

# Files Created or Modified

Created:

```text
kubernetes/base/ingress/ingress.yaml
```

Modified:

```text
kubernetes/base/frontend/service.yaml

kubernetes/base/backend/service.yaml
```

---

# Verification

Ingress setup is complete when:

## Controller Verification

```bash
kubectl get pods \
-n ingress-nginx
```

Expected:

```text
Running
```

---

## External IP Verification

```bash
kubectl get svc \
-n ingress-nginx
```

Expected:

```text
EXTERNAL-IP assigned
```

---

## Application Verification

Frontend:

```text
http://<external-ip>
```

Backend:

```text
http://<external-ip>/api/health
```

---

# Evidence

Use the following screenshots.

![NGINX Installation](/screenshots/kubernetes/nginx-ingress/1-installation.png)

*Figure 12.1 – NGINX Ingress Controller installation.*

![Service Type Change](/screenshots/kubernetes/nginx-ingress/2-change-type-loadbalancer-to-clusterip.png)

*Figure 12.2 – Application services changed to ClusterIP.*

![Ingress External Address](/screenshots/kubernetes/nginx-ingress/3-ingress-external-address.png)

*Figure 12.3 – External address assigned to Ingress.*

![Frontend Access](/screenshots/kubernetes/nginx-ingress/4-frontend-http-4-157-77-48.png)

*Figure 12.4 – FlavorForge frontend accessible through Ingress.*

![Backend Access](/screenshots/kubernetes/nginx-ingress/5-backend.png)

*Figure 12.5 – Backend API accessible through Ingress.*

![API Health Verification](/screenshots/kubernetes/nginx-ingress/7-api-health.png)

*Figure 12.6 – Backend health endpoint verified externally.*

---

# Common Mistakes

## Exposing every service as LoadBalancer

Incorrect:

```text
Frontend Service → LoadBalancer

Backend Service → LoadBalancer
```

Problems:

- More public IPs.
- Higher cost.
- Poor architecture.

Correct:

```text
One LoadBalancer

↓

Ingress

↓

Internal Services
```

---

## Ingress controller not running

Check:

```bash
kubectl get pods -n ingress-nginx
```

---

## No external IP assigned

Check:

```bash
kubectl describe service \
ingress-nginx-controller \
-n ingress-nginx
```

---

## Wrong routing path

Verify:

```text
/api

/

```

match ingress rules.

---

# Learning Outcome

After completing this phase, you understand:

- Kubernetes Ingress.
- NGINX routing.
- Azure Load Balancer integration.
- External application exposure.
- Production-style Kubernetes networking.

---

# Estimated Completion Time

Approximately 2 hours.

---

# Before Moving to Phase 13

Confirm:

- NGINX Ingress controller is running.
- Azure Load Balancer has public IP.
- Frontend is accessible.
- Backend API is accessible.

FlavorForge is now publicly reachable from Azure.

---

# References

- Kubernetes Ingress Documentation: https://kubernetes.io/docs/concepts/services-networking/ingress/
- NGINX Ingress Controller Documentation: https://kubernetes.github.io/ingress-nginx/
- Azure Load Balancer Documentation: https://learn.microsoft.com/azure/load-balancer/

---

# Phase 13 — Kubernetes Horizontal Pod Autoscaler (HPA)

## Goal

Configure Kubernetes Horizontal Pod Autoscaler (HPA) to automatically scale FlavorForge application pods based on resource utilization.

The objective of this phase is to improve application availability and handle increased traffic automatically.

---

## Why This Phase Comes Now

The FlavorForge application is now:

- Running inside AKS.
- Accessible through Ingress.
- Managed by Kubernetes.

However, the application currently runs with a fixed number of replicas.

Example:

```text
Backend Deployment

Replica Count = 2
```

If traffic increases:

```text
More Users

     |

     ▼

Higher CPU Usage

     |

     ▼

Application Load Increases
```

Kubernetes needs a mechanism to automatically add more pods.

That mechanism is HPA.

---

# Concept

Imagine a restaurant kitchen.

Without autoscaling:

```text
10 customers

1 chef
```

The chef becomes overloaded.

With autoscaling:

```text
10 customers

1 chef


100 customers

5 chefs
```

HPA works similarly by increasing application pods when demand increases.

---

# Technical Explanation

Horizontal Pod Autoscaler automatically adjusts the number of pod replicas.

HPA monitors:

- CPU utilization.
- Memory utilization.
- Resource metrics.

FlavorForge uses HPA to scale backend workloads.

Example:

```text
Minimum replicas:

2


Maximum replicas:

5


Target CPU:

70%
```

Meaning:

```text
CPU < 70%

Keep replicas


CPU > 70%

Create more replicas
```

---

# Prerequisites

Before starting this phase:

- AKS cluster must be running.
- Metrics Server must be available.
- Backend deployment must exist.

Verify:

```bash
kubectl get deployments \
-n flavorforge
```

---

# Step-by-Step Tasks

# Step 1 — Verify Metrics Server

Kubernetes requires metrics collection before HPA can work.

Check:

```bash
kubectl top nodes
```

Expected:

```text
CPU

Memory
```

If metrics are available, the Metrics Server is working.

---

# Step 2 — Verify Pod Metrics

Run:

```bash
kubectl top pods \
-n flavorforge
```

Example:

```text
backend pod

CPU usage

Memory usage
```

---

# Step 3 — Create HPA Manifest

File:

```text
kubernetes/base/autoscaling/hpa.yaml
```

Purpose:

Define automatic scaling rules.

Example:

```yaml
minReplicas: 2

maxReplicas: 5

targetCPUUtilizationPercentage: 70
```

---

# Step 4 — Apply HPA Configuration

Apply:

```bash
kubectl apply \
-f kubernetes/base/autoscaling/hpa.yaml
```

---

# Step 5 — Verify HPA

Run:

```bash
kubectl get hpa \
-n flavorforge
```

Expected:

```text
NAME

REFERENCE

TARGETS

MINPODS

MAXPODS
```

Example:

```text
backend-hpa

70%

2

5
```

---

# Step 6 — Describe HPA

Detailed information:

```bash
kubectl describe hpa \
backend-hpa \
-n flavorforge
```

Verify:

- Target CPU.
- Current replicas.
- Scaling events.

---

# Step 7 — Verify Deployment Integration

Run:

```bash
kubectl get deployment \
-n flavorforge
```

Confirm backend deployment is controlled by HPA.

---

# HPA Architecture

After completion:

```text
                User Traffic

                     |

                     ▼

              NGINX Ingress

                     |

                     ▼

             Backend Service

                     |

                     ▼

             Backend Pods

                     |

                     ▼

             Metrics Server

                     |

                     ▼

                HPA Controller

                     |

                     ▼

        Increase / Decrease Replicas
```

---

# Files Created or Modified

Created:

```text
kubernetes/base/autoscaling/hpa.yaml
```

Modified:

```text
kubernetes/base/autoscaling/kustomization.yaml
```

---

# Verification

HPA setup is complete when:

## Metrics Verification

Run:

```bash
kubectl top pods \
-n flavorforge
```

Expected:

CPU and memory values displayed.

---

## HPA Verification

Run:

```bash
kubectl get hpa \
-n flavorforge
```

Expected:

```text
backend-hpa
```

exists.

---

## Configuration Verification

Run:

```bash
kubectl get hpa \
backend-hpa \
-n flavorforge \
-o yaml
```

Confirm:

```yaml
minReplicas: 2

maxReplicas: 5
```

---

# Evidence

Use the following screenshots.

![Metrics Server](/screenshots/kubernetes/hpa/1-metrics-server.png)

*Figure 13.1 – Kubernetes metrics server providing resource information.*

![HPA Configuration](/screenshots/kubernetes/hpa/2-autoscaling-configured-successfully.png)

*Figure 13.2 – Horizontal Pod Autoscaler configured successfully.*

![Deployments and Pods](/screenshots/kubernetes/hpa/3-deploymemts-pods.png)

*Figure 13.3 – Application deployments and pods available.*

![Backend Deployment Description](/screenshots/kubernetes/hpa/4-kubectl%20describe%20deployment%20backend%20-%20n-flavorforge.png)

*Figure 13.4 – Backend deployment resource configuration.*

![Pod Resource Usage](/screenshots/kubernetes/hpa/5-kubectl%20top%20pods%20-%20n-flavorforge.png)

*Figure 13.5 – Pod CPU and memory metrics.*

![HPA Status](/screenshots/kubernetes/hpa/6-kubectl-get-hpa.png)

*Figure 13.6 – HPA status showing scaling configuration.*

![HPA YAML Verification](/screenshots/kubernetes/hpa/7-kubectl-get-hpa-backend-hpa-n-flavorforge-o-yaml.png)

*Figure 13.7 – HPA configuration details in Kubernetes YAML output.*

---

# Common Mistakes

## HPA shows unknown metrics

Example:

```text
TARGETS unknown
```

Cause:

Metrics Server is unavailable.

Check:

```bash
kubectl top pods
```

---

## Missing resource requests

HPA requires CPU requests.

Example:

```yaml
resources:
 requests:
   cpu: 100m
```

Without requests, Kubernetes cannot calculate utilization.

---

## Scaling wrong deployment

Check:

```bash
kubectl get hpa -n flavorforge
```

Confirm:

```text
REFERENCE

backend deployment
```

---

## Setting unrealistic limits

Example:

```text
minimum replicas: 1

maximum replicas: 100
```

can create unexpected costs.

---

# Learning Outcome

After completing this phase, you understand:

- Kubernetes autoscaling.
- Metrics Server.
- Resource monitoring.
- Dynamic replica management.
- Production availability patterns.

---

# Estimated Completion Time

Approximately 1–2 hours.

---

# Before Moving to Phase 14

Confirm:

- Metrics Server works.
- HPA resource exists.
- Backend pods are monitored.
- Scaling rules are configured.

FlavorForge now has automatic workload scaling capability.

---

# References

- Kubernetes Horizontal Pod Autoscaler: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
- Kubernetes Metrics Server: https://github.com/kubernetes-sigs/metrics-server

---

# Phase 14 — Azure DevOps CI/CD Pipeline Setup

## Goal

Create an automated Azure DevOps CI/CD pipeline that builds, tests, secures, packages, and deploys the FlavorForge application.

The objective of this phase is to implement a complete DevSecOps lifecycle.

---

## Why This Phase Comes Now

The application is already:

- Developed.
- Containerized.
- Stored in ACR.
- Running on AKS.

However, deployments are still manual.

A production DevOps workflow requires automation.

The pipeline connects:

```text
Code Change

      |

      ▼

Continuous Integration

      |

      ▼

Security Validation

      |

      ▼

Container Build

      |

      ▼

Continuous Deployment

      |

      ▼

AKS Deployment
```

---

# Concept

Imagine a factory production line.

Without CI/CD:

```text
Developer

   |

Manual Build

   |

Manual Testing

   |

Manual Deployment
```

With CI/CD:

```text
Developer

   |

Automation Pipeline

   |

Quality Checks

   |

Production Deployment
```

Every code change follows the same reliable process.

---

# Technical Explanation

FlavorForge uses Azure DevOps YAML pipelines.

The pipeline is defined as:

```text
azure-pipelines.yml
```

The pipeline automates:

- Application installation.
- Frontend build.
- Backend tests.
- Code quality analysis.
- Docker image creation.
- Image security scanning.
- Image publishing.
- Kubernetes deployment.

---

# Prerequisites

Before creating the pipeline:

- Azure DevOps organization exists.
- GitHub repository is connected.
- Azure subscription is available.
- ACR exists.
- AKS exists.

Verify:

```bash
az account show
```

Verify files:

```bash
ls
```

Expected:

```text
azure-pipelines.yml

sonar-project.properties
```

---

# Pipeline Architecture

FlavorForge pipeline stages:

```text
Stage 1

Build

   |

   ▼

Stage 2

Test

   |

   ▼

Stage 3

Security

   |

   ▼

Stage 4

Code Quality

   |

   ▼

Stage 5

Docker Build

   |

   ▼

Stage 6

Publish to ACR

   |

   ▼

Stage 7

Trivy Scan

   |

   ▼

Stage 8

Deploy AKS
```

---

# Step-by-Step Tasks

# Step 1 — Create Azure DevOps Project

Open Azure DevOps:

https://dev.azure.com/

Create:

```text
Project Name:

FlavorForge
```

---

# Step 2 — Connect Repository

Connect GitHub repository:

```text
flavorforge-azure-devsecops-capstone
```

Verify source:

```text
GitHub

        |

        ▼

Azure DevOps Pipeline
```

---

# Step 3 — Create Azure Service Connection

Navigate:

```text
Project Settings

        ↓

Service Connections

        ↓

New Service Connection
```

Create:

```text
Azure Resource Manager
```

Purpose:

Allows pipeline to communicate with Azure resources.

---

# Step 4 — Configure Service Connection

Connect:

```text
Azure Subscription

        |

        ▼

FlavorForge Resource Group
```

Used for:

- ACR.
- AKS.
- Azure deployments.

---

# Step 5 — Create Pipeline

Navigate:

```text
Pipelines

        ↓

New Pipeline
```

Select:

```text
GitHub

        ↓

Existing YAML file
```

Select:

```text
azure-pipelines.yml
```

---

# Step 6 — Pipeline Variables

The pipeline uses variables:

Example:

```yaml
dockerRegistryServiceConnection

imageRepositoryBackend

imageRepositoryFrontend

containerRegistry

imageTag

aksResourceGroup

aksClusterName
```

These avoid hardcoding values.

---

# Step 7 — Build Stage

Purpose:

Install dependencies and compile applications.

Frontend:

```bash
npm install

npm run build
```

Backend:

```bash
npm install
```

---

# Step 8 — Test Stage

Backend tests:

```bash
npm test
```

Purpose:

Prevent broken code from reaching deployment.

---

# Step 9 — SonarCloud Integration

Configuration:

```text
sonar-project.properties
```

Purpose:

Analyze:

- Code quality.
- Bugs.
- Vulnerabilities.
- Code coverage.

Pipeline flow:

```text
Source Code

      |

      ▼

SonarCloud

      |

      ▼

Quality Report
```

---

# Step 10 — Docker Build Stage

Pipeline creates:

```text
flavorforge-frontend

flavorforge-backend
```

Equivalent commands:

```bash
docker build
```

---

# Step 11 — Push Images to ACR

Pipeline pushes:

```text
ACR

 |

 ├── frontend image

 |

 └── backend image
```

---

# Step 12 — Trivy Security Scan

Purpose:

Scan container images.

Checks:

- Vulnerabilities.
- Package issues.
- Security risks.

Flow:

```text
Docker Image

       |

       ▼

Trivy Scanner

       |

       ▼

Security Report
```

---

# Step 13 — Deploy to AKS

Pipeline uses Kubernetes deployment commands.

Example:

```bash
kubectl apply -k kubernetes/overlays/dev
```

Deployment target:

```text
Azure Kubernetes Service
```

---

# Files Created or Modified

Created:

```text
azure-pipelines.yml
```

Modified:

```text
sonar-project.properties
```

Azure DevOps resources:

```text
Service Connection

Pipeline

Variables
```

---

# Verification

Pipeline is successful when:

## Build

Application builds successfully.

---

## Test

Tests pass.

---

## Quality

SonarCloud analysis completes.

---

## Security

Trivy scan completes.

---

## Deployment

AKS workloads update successfully.

Verify:

```bash
kubectl get pods -n flavorforge
```

---

# Evidence

Use the following screenshots.

![Azure DevOps Organization](/screenshots/pipeline/1-azure-devops-organizations.png)

*Figure 14.1 – Azure DevOps organization created.*

![Service Connection](/screenshots/pipeline/2-service-connection.png)

*Figure 14.2 – Azure service connection configuration.*

![Azure Resource Manager Connection](/screenshots/pipeline/3-azure-resource-manager.png)

*Figure 14.3 – Azure Resource Manager service connection.*

![New Pipeline Creation](/screenshots/pipeline/5-click-new-pipeline.png)

*Figure 14.4 – Creating Azure DevOps YAML pipeline.*

![Pipeline Execution](/screenshots/pipeline/8-pipelines-run-pass.png)

*Figure 14.5 – Successful pipeline execution.*

![Advanced Pipeline Run](/screenshots/pipeline/9-advance-pipelines-run-pass.png)

*Figure 14.6 – Complete DevOps pipeline execution.*

![SonarCloud Extension](/screenshots/pipeline/15-Extensions-sonarcloud.png)

*Figure 14.7 – SonarCloud extension integration.*

![Code Coverage](/screenshots/pipeline/16-code%20coverage.png)

*Figure 14.8 – Test coverage report generated.*

---

# Common Mistakes

## Pipeline cannot access Azure

Cause:

Missing service connection.

Solution:

Create Azure Resource Manager service connection.

---

## Docker push fails

Cause:

ACR authentication missing.

Verify:

```text
ACR service connection
```

---

## Kubernetes deployment fails

Check:

```bash
kubectl get pods -n flavorforge
```

Common causes:

- Wrong image tag.
- Missing permissions.
- Incorrect namespace.

---

## SonarCloud failure

Check:

```text
sonar-project.properties
```

Verify:

- Project key.
- Organization.
- Source paths.

---

# Learning Outcome

After completing this phase, you understand:

- CI/CD automation.
- Azure DevOps YAML pipelines.
- Secure software delivery.
- Automated Kubernetes deployment.
- DevSecOps practices.

---

# Estimated Completion Time

Approximately 4–6 hours.

---

# Before Moving to Phase 15

Confirm:

- Pipeline executes successfully.
- Images are pushed to ACR.
- Security scans run.
- AKS deployment succeeds.

FlavorForge now has automated DevSecOps delivery.

---

# References

- Azure DevOps Pipelines Documentation: https://learn.microsoft.com/azure/devops/pipelines/
- Azure DevOps YAML Schema: https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/
- SonarCloud Documentation: https://docs.sonarcloud.io/
- Trivy Documentation: https://aquasecurity.github.io/trivy/

---

# Phase 15 — Multi-Environment Azure DevOps Release Simulation

## Goal

Implement an enterprise-style release workflow using Azure DevOps environments, approvals, variable groups, and deployment stages.

The objective of this phase is to simulate a real production delivery process:

```text
Developer Commit

        |

        ▼

Build & Validation

        |

        ▼

Development Environment

        |

        ▼

QA Environment

        |

        ▼

Production Environment
```

---

# Why This Phase Comes Now

The previous phase created a working CI/CD pipeline.

However, enterprise applications are not deployed directly from development into production.

A controlled release process is required.

Organizations normally use multiple environments:

```text
Development

    ↓

Quality Assurance

    ↓

Production
```

Each environment provides:

- Validation.
- Testing.
- Approval control.
- Deployment safety.

---

# Concept

Imagine releasing a new version of a mobile application.

You do not immediately publish it to millions of users.

The process is:

```text
Developer Testing

        ↓

Internal Testing

        ↓

User Testing

        ↓

Public Release
```

Azure DevOps environments provide the same controlled approach.

---

# Technical Explanation

FlavorForge uses Azure DevOps multi-stage YAML deployment.

The release flow contains:

```text
Build Stage

        |

        ▼

Deploy Dev

        |

        ▼

Deploy QA

        |

        ▼

Deploy Production
```

Each environment has:

- Deployment job.
- Kubernetes target.
- Approval checks.
- Environment variables.

---

# Prerequisites

Before starting:

- Azure DevOps pipeline works.
- AKS cluster exists.
- Kubernetes manifests exist.
- Azure service connection exists.

Verify:

```bash
kubectl get nodes
```

Expected:

```text
Ready
```

---

# Release Architecture

```text
                 Azure DevOps Pipeline


                         |

                         ▼


                  Build Stage


                         |

                         ▼


                  Dev Environment

                         |

                         ▼

                  QA Environment

                         |

                         ▼

              Production Environment


                         |

                         ▼


                    AKS Cluster
```

---

# Step-by-Step Tasks

# Step 1 — Create Azure DevOps Environments

Navigate:

```text
Azure DevOps

        ↓

Pipelines

        ↓

Environments
```

Create:

```text
flavorforge-dev

flavorforge-qa

flavorforge-prod
```

Purpose:

Each environment represents a deployment target.

---

# Step 2 — Configure Environment Approvals

Production deployments require approval.

Navigate:

```text
Environment

        ↓

Approvals and Checks
```

Configure:

```text
Manual Approval
```

Example:

```text
Developer

       |

       ▼

QA Validation

       |

       ▼

Production Approval
```

---

# Step 3 — Create Variable Groups

Navigate:

```text
Pipelines

        ↓

Library
```

Create:

```text
flavorforge-dev

flavorforge-qa

flavorforge-prod
```

Variables include:

```text
AKS Cluster Name

Resource Group

Namespace

Image Tag
```

---

# Step 4 — Configure Deployment Jobs

Azure Pipeline uses:

```yaml
deployment:
```

instead of only:

```yaml
job:
```

Deployment jobs provide:

- Environment tracking.
- Approval integration.
- Release history.

---

# Step 5 — Configure Development Deployment

Flow:

```text
Build

 ↓

Dev Deployment

 ↓

AKS Namespace

flavorforge-dev
```

Deploy:

```bash
kubectl apply -k kubernetes/overlays/dev
```

Verify:

```bash
kubectl get all \
-n flavorforge-dev
```

---

# Step 6 — Configure QA Deployment

Flow:

```text
Dev Success

       |

       ▼

QA Approval

       |

       ▼

QA Deployment
```

Deploy:

```bash
kubectl apply -k kubernetes/overlays/qa
```

Verify:

```bash
kubectl get all \
-n flavorforge-qa
```

---

# Step 7 — Configure Production Deployment

Flow:

```text
QA Validation

       |

       ▼

Production Approval

       |

       ▼

Production Deployment
```

Deploy:

```bash
kubectl apply -k kubernetes/overlays/prod
```

Verify:

```bash
kubectl get all \
-n flavorforge-prod
```

---

# Step 8 — Validate Production Ingress

Check:

```bash
kubectl get ingress \
-n flavorforge-prod
```

Verify:

```text
External Address Available
```

---

# Environment Structure

Final release structure:

```text
Azure DevOps


Environments

├── flavorforge-dev

│

├── flavorforge-qa

│

└── flavorforge-prod


Kubernetes

├── overlays/dev

├── overlays/qa

└── overlays/prod
```

---

# Files Created or Modified

Modified:

```text
azure-pipelines.yml
```

Kubernetes:

```text
kubernetes/overlays/dev

kubernetes/overlays/qa

kubernetes/overlays/prod
```

Azure DevOps resources:

```text
Environments

Variable Groups

Approvals
```

---

# Verification

## Environment Verification

Confirm:

```text
Dev

QA

Production
```

exist in Azure DevOps.

---

## Deployment Verification

Development:

```bash
kubectl get all \
-n flavorforge-dev
```

QA:

```bash
kubectl get all \
-n flavorforge-qa
```

Production:

```bash
kubectl get all \
-n flavorforge-prod
```

---

## Pipeline Verification

Confirm stages:

```text
Build

↓

Deploy Dev

↓

Deploy QA

↓

Deploy Prod
```

---

# Evidence

![Azure DevOps Environments](/screenshots/enterprise-azure-devops-release-simulation/1-azure-devops-environments.png)

*Figure 15.1 – Azure DevOps environments created.*

![Dev QA Prod Environments](/screenshots/enterprise-azure-devops-release-simulation/1-2-dev-qa-prod-azure-devops-environments.png)

*Figure 15.2 – Development, QA, and Production environments.*

![Variable Library](/screenshots/enterprise-azure-devops-release-simulation/2-library.png)

*Figure 15.3 – Pipeline variable groups.*

![Production Variables](/screenshots/enterprise-azure-devops-release-simulation/2-prod-variables.png)

*Figure 15.4 – Production environment variables.*

![Approvals Configuration](/screenshots/enterprise-azure-devops-release-simulation/3-approvals.png)

*Figure 15.5 – Deployment approval configuration.*

![Dev Deployment Verification](/screenshots/enterprise-azure-devops-release-simulation/6-kubectl-get-all-n-flavorforge-dev.png)

*Figure 15.6 – Development environment workloads running.*

![Kustomize Overlay Configuration](/screenshots/enterprise-azure-devops-release-simulation/7-overlay.png)

*Figure 15.7 – Environment overlay configuration.*

![Production Ingress](/screenshots/enterprise-azure-devops-release-simulation/11-production%20ingress.png)

*Figure 15.8 – Production ingress configuration.*

![Final Pipeline](/screenshots/Enterprise%20Azure%20DevSecOps%20Release%20Simulation/14-Final%20Azure%20Pipeline.png)

*Figure 15.9 – Final multi-stage Azure DevOps release pipeline.*

---

# Common Mistakes

## Deploying directly to production

Incorrect:

```text
Build

↓

Production
```

Correct:

```text
Build

↓

Dev

↓

QA

↓

Production
```

---

## Missing approvals

Problem:

Production can deploy automatically.

Solution:

Configure:

```text
Approvals and Checks
```

---

## Incorrect Kubernetes namespace

Problem:

Deployment goes to wrong environment.

Check:

```bash
kubectl get namespaces
```

---

## Variable mismatch

Example:

Pipeline variable:

```text
AKS_CLUSTER
```

YAML expects:

```text
aksClusterName
```

Ensure names match.

---

# Learning Outcome

After completing this phase, you understand:

- Enterprise release management.
- Azure DevOps environments.
- Manual approvals.
- Deployment jobs.
- Environment separation.
- Production release practices.

---

# Estimated Completion Time

Approximately 3–4 hours.

---

# Before Moving to Phase 16

Confirm:

- Dev deployment works.
- QA deployment works.
- Production deployment works.
- Approvals are configured.
- Pipeline tracks deployments.

FlavorForge now follows an enterprise release workflow.

---

# References

- Azure DevOps Environments: https://learn.microsoft.com/azure/devops/pipelines/process/environments
- Deployment Jobs: https://learn.microsoft.com/azure/devops/pipelines/process/deployment-jobs
- Approvals and Checks: https://learn.microsoft.com/azure/devops/pipelines/process/approvals

---

# Phase 16 — Argo CD GitOps Continuous Deployment

## Goal

Implement GitOps-based deployment using Argo CD to continuously synchronize Kubernetes workloads from the Git repository to the AKS cluster.

The objective of this phase is to make Git the single source of truth for Kubernetes deployments.

---

# Why This Phase Comes Now

The previous phase implemented Azure DevOps release pipelines.

However, traditional deployment works like this:

```text
Pipeline

    |

    ▼

kubectl apply

    |

    ▼

Kubernetes Cluster
```

The pipeline directly changes the cluster.

GitOps changes this approach.

The desired state is stored in Git:

```text
Git Repository

        |

        ▼

Argo CD

        |

        ▼

AKS Cluster
```

Argo CD continuously compares:

```text
Git Desired State

        VS

AKS Current State
```

and automatically corrects differences.

---

# Concept

Imagine a security guard checking a building blueprint.

Blueprint:

```text
Git Repository
```

Actual building:

```text
AKS Cluster
```

The guard:

```text
Argo CD
```

checks:

```text
Does the building match the blueprint?
```

If something changes:

```text
Restore the correct design
```

This is GitOps self-healing.

---

# Technical Explanation

Argo CD is a Kubernetes-native continuous delivery tool.

FlavorForge uses:

```text
Git Repository

        |

        ▼

Argo CD Application

        |

        ▼

Kubernetes Resources
```

Argo CD manages:

- Deployments.
- Services.
- ConfigMaps.
- Ingress.
- Replica configuration.

---

# Prerequisites

Before starting:

- AKS cluster must be running.
- Kubernetes manifests must exist.
- Git repository must contain Kubernetes configuration.

Verify:

```bash
kubectl get nodes
```

Expected:

```text
STATUS

Ready
```

Verify Kubernetes files:

```bash
ls kubernetes
```

Expected:

```text
base

overlays
```

---

# GitOps Architecture

Final architecture:

```text
                 Developer


                    |

                    ▼


             Git Repository


                    |

                    ▼


                 Argo CD


                    |

                    ▼


             Kubernetes API


                    |

                    ▼


                  AKS


                    |

                    ▼


              FlavorForge Pods
```

---

# Step-by-Step Tasks

# Step 1 — Install Argo CD Namespace

Create namespace:

```bash
kubectl create namespace argocd
```

---

# Step 2 — Install Argo CD Components

Apply official installation manifest:

```bash
kubectl apply \
-n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

---

# Step 3 — Verify Argo CD Pods

Run:

```bash
kubectl get pods \
-n argocd
```

Expected:

```text
argocd-server

Running


argocd-controller

Running
```

---

# Step 4 — Access Argo CD Service

Check services:

```bash
kubectl get svc \
-n argocd
```

---

# Step 5 — Create Argo CD Application

File:

```text
argocd/flavorforge-app.yaml
```

Purpose:

Defines:

- Repository location.
- Kubernetes namespace.
- Deployment source.
- Synchronization policy.

Example structure:

```yaml
apiVersion: argoproj.io/v1alpha1

kind: Application
```

---

# Step 6 — Apply Argo CD Application

Run:

```bash
kubectl apply \
-f argocd/flavorforge-app.yaml
```

---

# Step 7 — Verify Application

Check:

```bash
kubectl get applications \
-n argocd
```

Expected:

```text
flavorforge-app

Synced

Healthy
```

---

# Step 8 — Verify Argo CD Tree

Argo CD displays:

```text
Application

 |

 ├── Namespace

 ├── Deployment

 ├── Service

 ├── ConfigMap

 └── Pods
```

---

# GitOps Synchronization Flow

Example:

Developer changes:

```yaml
replicas: 3
```

Commit:

```text
Git Repository
```

Argo CD detects:

```text
Difference found
```

Synchronizes:

```text
AKS Cluster updated
```

---

# Files Created or Modified

Created:

```text
argocd/flavorforge-app.yaml
```

Modified:

```text
argocd/README.md
```

---

# Verification

## Argo CD Installation

Run:

```bash
kubectl get pods \
-n argocd
```

Expected:

```text
Running
```

---

## Application Status

Run:

```bash
kubectl get applications \
-n argocd
```

Expected:

```text
Healthy

Synced
```

---

## Kubernetes Verification

Run:

```bash
kubectl get all \
-n flavorforge
```

Confirm:

- Pods running.
- Services available.
- Deployments healthy.

---

# Evidence

Use the following screenshots.

![Argo CD Installation](/screenshots/argo-cd/1-install.png)

*Figure 16.1 – Argo CD installation in AKS.*

![Argo CD Pods and Services](/screenshots/argo-cd/2-pods-svc.png)

*Figure 16.2 – Argo CD components running.*

![Argo CD Application Creation](/screenshots/argo-cd/3-create-argocd-yaml.png)

*Figure 16.3 – FlavorForge Argo CD application manifest.*

![Argo CD Application Tree](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 16.4 – Argo CD application synchronization tree.*

---

# Common Mistakes

## Argo CD application shows OutOfSync

Cause:

Git state differs from cluster state.

Solution:

Synchronize application:

```bash
argocd app sync flavorforge-app
```

---

## Argo CD cannot access repository

Check:

- Repository URL.
- Repository permissions.
- Branch name.

---

## Application namespace missing

Check:

```yaml
destination:
 namespace:
```

---

## Manual kubectl changes disappear

Expected behavior.

GitOps principle:

```text
Git is the source of truth
```

Argo CD restores the Git-defined state.

---

# Learning Outcome

After completing this phase, you understand:

- GitOps principles.
- Argo CD deployment model.
- Continuous synchronization.
- Kubernetes self-healing.
- Declarative infrastructure management.

---

# Estimated Completion Time

Approximately 2–3 hours.

---

# Before Moving to Phase 17

Confirm:

- Argo CD is installed.
- FlavorForge application exists.
- Application status is Healthy.
- Application status is Synced.
- Kubernetes workloads are managed through Git.

FlavorForge now follows a GitOps deployment model.

---

# References

- Argo CD Documentation: https://argo-cd.readthedocs.io/
- GitOps Principles: https://opengitops.dev/

---

# Phase 17 — Monitoring and Observability

## Goal

Implement monitoring and observability practices for the FlavorForge application running on Azure Kubernetes Service.

The objective of this phase is to understand:

- Application health.
- Container status.
- Kubernetes workload state.
- Runtime logs.
- Deployment events.
- Operational troubleshooting.

---

# Why This Phase Comes Now

After implementing:

- AKS deployment.
- Kubernetes networking.
- Autoscaling.
- CI/CD.
- GitOps.

the application is production-ready.

However, production systems require visibility.

A running application is not enough.

Teams must answer:

```text
Is the application healthy?

Are users experiencing errors?

Are pods running correctly?

Why did a deployment fail?
```

Monitoring provides these answers.

---

# Concept

Imagine driving a car.

Without monitoring:

```text
Car is moving

but

No dashboard information
```

You cannot see:

- Fuel level.
- Engine temperature.
- Problems.

Observability provides the dashboard.

For FlavorForge:

```text
Application

=

Car


Monitoring

=

Dashboard
```

---

# Technical Explanation

FlavorForge uses multiple observability layers.

## Layer 1 — Application Monitoring

Backend exposes:

```text
/api/health
```

Purpose:

Verify application availability.

Example response:

```json
{
 "status":"healthy"
}
```

---

## Layer 2 — Container Monitoring

Docker and Kubernetes provide:

- Container status.
- Restart count.
- Runtime information.

Commands:

```bash
kubectl get pods
```

---

## Layer 3 — Kubernetes Monitoring

Kubernetes provides:

- Pod status.
- Deployment status.
- Replica status.
- Events.

Commands:

```bash
kubectl get all
```

and:

```bash
kubectl describe pod
```

---

## Layer 4 — Azure Monitoring

Azure provides:

- AKS monitoring.
- Resource health.
- Cluster visibility.

---

# Observability Architecture

Use the following architecture diagram:

![Cloud Observability Architecture](/docs/diagrams/cloud-observability-architecture-diagram.png)

*Figure 17.1 – FlavorForge cloud observability architecture.*

---

# Prerequisites

Before starting:

- AKS cluster running.
- Application deployed.
- Kubernetes namespace created.
- Services available.

Verify:

```bash
kubectl get pods -n flavorforge
```

Expected:

```text
Running
```

---

# Step-by-Step Tasks

# Step 1 — Verify Application Health Endpoint

Backend health endpoint:

```text
/api/health
```

Test:

```bash
curl http://<external-ip>/api/health
```

Expected:

```json
{
 "status":"healthy"
}
```

---

# Step 2 — Monitor Pod Status

Command:

```bash
kubectl get pods \
-n flavorforge
```

Verify:

```text
STATUS

Running
```

---

# Step 3 — View Application Logs

Backend logs:

```bash
kubectl logs \
<backend-pod-name> \
-n flavorforge
```

Logs help identify:

- Application errors.
- API failures.
- Startup issues.

---

# Step 4 — View Kubernetes Events

Command:

```bash
kubectl get events \
-n flavorforge
```

Events show:

- Scheduling.
- Image pulls.
- Deployment changes.
- Failures.

---

# Step 5 — Check Deployment Status

Command:

```bash
kubectl get deployments \
-n flavorforge
```

Expected:

```text
READY

AVAILABLE
```

---

# Step 6 — Check Replica Sets

Command:

```bash
kubectl get replicasets \
-n flavorforge
```

Purpose:

Verify Kubernetes maintains desired replicas.

---

# Step 7 — Resource Monitoring

Check pod resource usage:

```bash
kubectl top pods \
-n flavorforge
```

Displays:

```text
CPU

Memory
```

This information is used by HPA.

---

# Operational Troubleshooting Flow

When users report an issue:

Follow:

```text
User Issue

      |

      ▼

Check Application Health

      |

      ▼

Check Pod Status

      |

      ▼

Check Logs

      |

      ▼

Check Kubernetes Events

      |

      ▼

Resolve Issue
```

---

# Files Created or Modified

No new application files created.

Documentation references:

```text
docs/project/04-verification-and-validation-report/

14-Operations-Monitoring-and-Observability-Verification.md
```

Architecture reference:

```text
docs/diagrams/

cloud-observability-architecture-diagram.png
```

---

# Verification

Monitoring setup is successful when:

## Health Check

```bash
curl /api/health
```

returns healthy response.

---

## Pod Verification

```bash
kubectl get pods \
-n flavorforge
```

shows:

```text
Running
```

---

## Logs Available

```bash
kubectl logs
```

returns application logs.

---

## Events Available

```bash
kubectl get events \
-n flavorforge
```

shows Kubernetes activity.

---

# Evidence

Use the following screenshots.

![Backend Live Logs](/screenshots/azure/19-backend-live-logs.png)

*Figure 17.2 – Backend application logs from AKS.*

![Backend Events](/screenshots/azure/20-backend-events.png)

*Figure 17.3 – Kubernetes events for workload monitoring.*

![Replica Set Verification](/screenshots/azure/21-replica-set.png)

*Figure 17.4 – Backend replica set status.*

![Frontend Replica Set](/screenshots/azure/21-2-frontend-replica-set.png)

*Figure 17.5 – Frontend replica set status.*

![Pod Verification](/screenshots/kubernetes/pods.png)

*Figure 17.6 – Kubernetes pods running successfully.*

---

# Common Mistakes

## Application works but no monitoring exists

Problem:

No visibility into failures.

Solution:

Always verify:

```bash
kubectl logs

kubectl events

health endpoint
```

---

## Checking only pods

Problem:

Pods can be running but application may fail.

Example:

```text
Pod = Running

API = Failed
```

Solution:

Test application endpoints.

---

## Ignoring Kubernetes events

Events provide important information:

- Scheduling failures.
- Image pull problems.
- Configuration errors.

---

# Learning Outcome

After completing this phase, you understand:

- Kubernetes monitoring.
- Application health checks.
- Runtime troubleshooting.
- Logs and events.
- Production operations.

---

# Estimated Completion Time

Approximately 2 hours.

---

# Before Moving to Phase 18

Confirm:

- Health endpoint works.
- Logs are available.
- Kubernetes workloads are healthy.
- Monitoring verification is documented.

FlavorForge now has operational visibility.

---

# References

- Kubernetes Monitoring Documentation:
https://kubernetes.io/docs/tasks/debug/
- Azure Monitor for AKS:
https://learn.microsoft.com/azure/azure-monitor/containers/


---

# Phase 18 — Documentation Engineering and Automation

## Goal

Create a complete professional documentation system that captures the FlavorForge architecture, implementation process, verification results, troubleshooting procedures, and rebuild journey.

The objective is to ensure that the project can be understood and recreated by another developer after months or years.

---

# Why This Phase Comes Now

Software delivery is not complete when an application is deployed.

A production project requires documentation for:

- Knowledge transfer.
- Maintenance.
- Troubleshooting.
- Future development.
- Rebuilding environments.

Without documentation:

```text
Application works

but

Knowledge is lost
```

With documentation:

```text
Application

+

Engineering Knowledge

=

Maintainable System
```

---

# Concept

Imagine a machine built in a factory.

The machine alone is not enough.

The factory also needs:

- Design drawings.
- Operating instructions.
- Maintenance guide.
- Repair procedures.

Documentation provides the same purpose for software systems.

---

# Documentation Architecture

FlavorForge documentation follows this structure:

```text
docs/


Architecture

    |

    ├── Cloud Design

    ├── Application Design

    └── Security Design



Implementation

    |

    ├── Planning

    ├── Frontend

    ├── Backend

    ├── Docker

    └── Kubernetes



Operations

    |

    ├── Verification

    ├── Troubleshooting

    └── Cleanup



Delivery

    |

    ├── Pipeline

    ├── GitOps

    └── Presentation
```

---

# Prerequisites

Before documentation engineering:

- Application deployment completed.
- Architecture finalized.
- Pipeline completed.
- Screenshots collected.

Verify repository:

```bash
ls docs
```

Expected:

```text
architecture

implementation

pipeline

troubleshooting

project
```

---

# Step-by-Step Tasks

# Step 1 — Create Documentation Structure

Create folders:

```bash
mkdir -p docs/architecture

mkdir -p docs/implementation

mkdir -p docs/pipeline

mkdir -p docs/troubleshooting

mkdir -p docs/presentation
```

---

# Step 2 — Create Architecture Documentation

Location:

```text
docs/architecture/
```

Files:

```text
01-system-architecture.md

02-application-architecture.md

03-cloud-architecture.md

04-security-architecture.md
```

Purpose:

Explain:

- Application flow.
- Azure architecture.
- Security model.
- Cloud resources.

---

# Step 3 — Create Implementation Documentation

Location:

```text
docs/implementation/
```

Files:

```text
01-project-planning.md

02-prerequisites-and-setup.md

03-project-structure.md

04-application-architecture.md

05-frontend-development.md

06-backend-development.md

07-dockerization.md
```

Purpose:

Explain how the application was built.

---

# Step 4 — Create Pipeline Documentation

Location:

```text
docs/pipeline/
```

Files:

```text
azure-devops-pipeline.md

azure-devops-setup-guide.md
```

Documents:

- Service connections.
- Pipeline stages.
- Deployment flow.
- Security scans.

---

# Step 5 — Create Verification Documentation

Location:

```text
docs/project/04-verification-and-validation-report/
```

Purpose:

Validate:

- Source code.
- Containers.
- Azure infrastructure.
- Kubernetes.
- GitOps.
- Monitoring.

---

# Step 6 — Create Troubleshooting Documentation

Location:

```text
docs/troubleshooting/
```

Documents:

```text
01-application-issues.md

02-docker-issues.md

03-pipeline-issues.md

04-security-quality-issues.md

05-kubernetes-issues.md

06-argocd-gitops-issues.md

07-azure-cloud-issues.md
```

Purpose:

Provide recovery procedures.

---

# Step 7 — Create Build Journey Document

File:

```text
docs/BUILD-JOURNEY.md
```

Purpose:

Provide complete chronological rebuild instructions.

Structure:

```text
Phase 1

Project Planning


Phase 2

Repository Setup


Phase 3

Frontend Development


Phase 4

Backend Development


Phase 5

Docker


Phase 6

Azure


Phase 7

AKS


Phase 8

Kubernetes


Phase 9

CI/CD


Phase 10

GitOps


Phase 11

Monitoring


Phase 12

Demo Preparation
```

---

# Step 8 — Documentation Automation

FlavorForge contains automation scripts:

```text
scripts/
```

Important scripts:

```text
generate_project_report.py

update_readme.py
```

Purpose:

Automatically update project information.

---

# Step 9 — Generate Project Status

Run:

```bash
python3 scripts/generate_project_report.py
```

Generated file:

```text
docs/generated/PROJECT_STATUS.md
```

---

# Step 10 — Update README Automatically

Run:

```bash
python3 scripts/update_readme.py
```

Purpose:

Keep README synchronized with project state.

---

# Step 11 — Repository Verification

Check structure:

```bash
tree -L 2
```

Expected:

```text
frontend

backend

docker

kubernetes

argocd

docs

scripts
```

---

# Files Created or Modified

Created:

```text
docs/BUILD-JOURNEY.md
```

Documentation folders:

```text
docs/architecture

docs/implementation

docs/pipeline

docs/troubleshooting

docs/presentation
```

Generated:

```text
docs/generated/PROJECT_STATUS.md
```

Automation:

```text
scripts/generate_project_report.py

scripts/update_readme.py
```

---

# Verification

Documentation is complete when:

## Structure Verification

Run:

```bash
tree -L 2 docs
```

---

## Generated Report Verification

Check:

```bash
cat docs/generated/PROJECT_STATUS.md
```

---

## Documentation Links

Verify:

- Images render.
- Markdown links work.
- Folder references are correct.

---

# Evidence

Use the following screenshots.

![Repository Structure](/screenshots/enterprise-azure-devops-release-simulation/20-tree-l-2.png)

*Figure 18.1 – Complete repository structure.*

![Backend Structure](/screenshots/enterprise-azure-devops-release-simulation/21-ls-backend.png)

*Figure 18.2 – Backend project structure.*

![Frontend Structure](/screenshots/enterprise-azure-devops-release-simulation/22-ls-frontend.png)

*Figure 18.3 – Frontend project structure.*

![Kubernetes Structure](/screenshots/enterprise-azure-devops-release-simulation/23-ls-kubernetes.png)

*Figure 18.4 – Kubernetes configuration structure.*

![Documentation Structure](/screenshots/enterprise-azure-devops-release-simulation/24-ls-docs.png)

*Figure 18.5 – Documentation repository structure.*

---

# Common Mistakes

## Writing documentation only at the end

Problem:

Important implementation decisions are forgotten.

Solution:

Document each major phase.

---

## Broken image links

Problem:

Images work locally but fail on GitHub.

Solution:

Use repository absolute paths:

Correct:

```markdown
![Image](/docs/diagrams/example.png)
```

Avoid:

```markdown
![Image](../docs/diagrams/example.png)
```

---

## Duplicate documentation

Problem:

Same information exists in multiple files.

Solution:

Define purpose:

README:

```text
Project overview
```

Implementation:

```text
How it was built
```

Build Journey:

```text
How to rebuild from zero
```

---

# Learning Outcome

After completing this phase, you understand:

- Professional documentation practices.
- Repository organization.
- Documentation automation.
- Knowledge preservation.
- Developer handover practices.

---

# Estimated Completion Time

Approximately 4–6 hours.

---

# Before Moving to Phase 19

Confirm:

- Documentation structure exists.
- BUILD-JOURNEY.md is complete.
- Generated reports work.
- Images render correctly.
- Repository is understandable by a new developer.

FlavorForge now has a complete engineering knowledge base.

---

# References

- Markdown Guide:
https://www.markdownguide.org/

- GitHub Documentation:
https://docs.github.com/


---

# Phase 19 — Demo Preparation and Presentation Engineering

## Goal

Prepare a complete technical demonstration workflow for presenting the FlavorForge Azure DevSecOps Capstone.

The objective is to demonstrate:

- Application functionality.
- Cloud architecture.
- CI/CD automation.
- Kubernetes operations.
- GitOps deployment.
- Security practices.
- Troubleshooting capability.

---

# Why This Phase Comes Now

A production engineering project requires more than implementation.

Engineers must be able to explain:

- What was built.
- Why technologies were selected.
- How the system works.
- How failures are handled.

A good demonstration converts technical implementation into engineering communication.

---

# Concept

Imagine presenting a newly built aircraft.

Showing only the aircraft flying is not enough.

You should explain:

- Design.
- Engine.
- Safety systems.
- Failure handling.
- Maintenance process.

A DevOps demonstration follows the same principle.

---

# Demo Architecture Flow

The final presentation follows:

```text
Problem Statement

        |

        ▼

Solution Architecture

        |

        ▼

Application Demo

        |

        ▼

Containerization

        |

        ▼

Azure Deployment

        |

        ▼

CI/CD Pipeline

        |

        ▼

GitOps

        |

        ▼

Monitoring

        |

        ▼

Incident Recovery
```

---

# Prerequisites

Before preparing the demo:

- Application must be deployed.
- AKS cluster must be available.
- Pipeline must have successful runs.
- Argo CD must show healthy application.
- Screenshots must be collected.

Verify:

```bash
kubectl get pods -n flavorforge
```

Expected:

```text
Running
```

---

# Step-by-Step Tasks

# Step 1 — Define Demo Story

The presentation should start with the business problem.

Example:

```text
Recipe management application requiring scalable,
secure and automated cloud deployment.
```

---

# Step 2 — Explain Architecture

Present:

```text
User

 |

Frontend React Application

 |

Backend Node.js API

 |

Docker Containers

 |

Azure Container Registry

 |

Azure Kubernetes Service

 |

Ingress

 |

Users
```

Use architecture diagrams:

```text
docs/diagrams/
```

---

# Step 3 — Demonstrate Application

Show:

Frontend:

```text
Recipe application

Search

Categories

Recipes
```

Backend:

```text
/api/health
```

Example:

```bash
curl http://<external-ip>/api/health
```

---

# Step 4 — Demonstrate Docker Implementation

Explain:

```text
Source Code

      |

      ▼

Docker Build

      |

      ▼

Container Image

      |

      ▼

ACR Storage
```

Show:

```bash
docker images
```

and:

```bash
az acr repository list
```

---

# Step 5 — Demonstrate Azure Infrastructure

Explain:

Azure resources:

```text
Resource Group

        |

        ├── ACR

        ├── AKS

        └── Load Balancer
```

---

# Step 6 — Demonstrate Azure DevOps Pipeline

Explain pipeline stages:

```text
Build

↓

Test

↓

SonarCloud

↓

Docker Build

↓

Trivy Scan

↓

ACR Push

↓

AKS Deployment
```

Show:

```text
azure-pipelines.yml
```

and pipeline execution.

---

# Step 7 — Demonstrate GitOps

Explain:

```text
Developer

 |

Git Commit

 |

Argo CD

 |

AKS
```

Show:

```text
Argo CD Application Tree
```

---

# Step 8 — Demonstrate Incident Scenarios

A professional demo should include controlled failures.

Examples:

---

## Incident 1 — Wrong Container Image Version

Scenario:

```text
Deployment uses incorrect image tag
```

Detection:

```bash
kubectl get pods
```

Recovery:

```bash
kubectl rollout undo deployment
```

---

## Incident 2 — GitOps Drift

Scenario:

Manual Kubernetes change.

Example:

```bash
kubectl scale deployment backend --replicas=1
```

Expected:

Argo CD detects:

```text
OutOfSync
```

Recovery:

Synchronize:

```text
Argo CD Sync
```

---

## Incident 3 — Application Health Failure

Scenario:

Backend API unavailable.

Investigation:

```bash
kubectl logs
```

Check:

```bash
kubectl describe pod
```

Recovery:

Restart deployment.

---

# Step 9 — Prepare Interview Discussion

Prepare explanations for:

## Why AKS?

Answer:

```text
Managed Kubernetes service providing scalability,
security integration and Azure ecosystem support.
```

---

## Why Docker?

Answer:

```text
Provides consistent application packaging across environments.
```

---

## Why Kubernetes?

Answer:

```text
Provides orchestration, scaling, availability and deployment management.
```

---

## Why Argo CD?

Answer:

```text
Provides GitOps-based continuous delivery and self-healing.
```

---

# Files Created or Modified

Created:

```text
docs/presentation/
```

Files:

```text
demo-day.md

presentation-script.md

live-demo-flow.md

incident-scenarios.md

interviewer-questions.md

demo-prerequisites.md

speaker-notes.md

presentation-slides.md
```

---

# Verification

Demo preparation is complete when:

## Application Demo

Frontend loads successfully.

Backend health endpoint works.

---

## Pipeline Demo

Pipeline stages are visible:

```text
Build

Test

Security

Deploy
```

---

## GitOps Demo

Argo CD shows:

```text
Healthy

Synced
```

---

## Incident Demo

At least one controlled failure and recovery can be demonstrated.

---

# Evidence

Use the following screenshots.

![Final Pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-final-azure-pipeline.png)

*Figure 19.1 – Final Azure DevOps CI/CD pipeline.*

![Argo CD Pipeline](/screenshots/enterprise-azure-devops-release-simulation/17-argocd-pipeline.png)

*Figure 19.2 – Argo CD GitOps deployment workflow.*

![Frontend Application](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

*Figure 19.3 – FlavorForge frontend application running on AKS.*

![Backend Health Endpoint](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

*Figure 19.4 – Backend API health verification.*

---

# Common Mistakes

## Showing only screenshots

Problem:

The audience cannot understand the engineering process.

Solution:

Explain:

```text
Problem

Architecture

Implementation

Verification

Recovery
```

---

## Demo without backup plan

Problem:

Live systems can fail.

Solution:

Prepare:

- Screenshots.
- Commands.
- Recovery steps.

---

## Explaining tools separately

Weak explanation:

```text
Docker does containers.
Kubernetes does pods.
```

Better explanation:

```text
Docker packages the application,
Kubernetes manages availability,
Azure provides infrastructure,
and Argo CD automates delivery.
```

---

# Learning Outcome

After completing this phase, you understand:

- Technical storytelling.
- DevOps project demonstration.
- Incident management.
- Architecture communication.
- Interview preparation.

---

# Estimated Completion Time

Approximately 3–5 hours.

---

# Before Moving to Final Review

Confirm:

- Demo flow documented.
- Presentation script prepared.
- Incident scenarios tested.
- Screenshots available.
- Project explanation is clear.

FlavorForge is now ready for technical demonstration.

---

# References

- Kubernetes Debugging:
https://kubernetes.io/docs/tasks/debug/

- GitOps Principles:
https://opengitops.dev/

- Azure DevOps Documentation:
https://learn.microsoft.com/azure/devops/


---

# Phase 20 — Project Completion, Cleanup, Backup, and Rebuild Validation

## Goal

Perform final validation of the FlavorForge Azure DevSecOps Capstone and confirm that the complete system can be rebuilt, maintained, and operated successfully.

The objective is to transform the project from a completed implementation into a reusable engineering blueprint.

---

# Why This Phase Comes Last

A production engineering project is complete only when:

- The system works.
- The system can be rebuilt.
- The system can be maintained.
- Resources can be managed.
- Knowledge is documented.

The final stage validates the complete lifecycle.

---

# Final Project Lifecycle

The complete FlavorForge journey:

```text
Planning

    |

Repository Setup

    |

Frontend Development

    |

Backend Development

    |

Docker Containerization

    |

Azure Infrastructure

    |

ACR Image Management

    |

AKS Deployment

    |

Kubernetes Configuration

    |

Ingress Networking

    |

Autoscaling

    |

Azure DevOps CI/CD

    |

Security Scanning

    |

GitOps with Argo CD

    |

Monitoring

    |

Documentation

    |

Demo Preparation

    |

Final Validation
```

---

# Concept

Imagine building a house.

Construction is not finished when the house is completed.

You also need:

- Building documents.
- Maintenance instructions.
- Safety checks.
- Shutdown procedures.

This phase provides the same for FlavorForge.

---

# Prerequisites

Before final validation:

- Application deployed successfully.
- Pipeline completed.
- GitOps working.
- Documentation completed.
- Evidence collected.

Verify:

```bash
git status
```

Expected:

```text
working tree clean
```

---

# Step-by-Step Tasks

# Step 1 — Verify Repository Completeness

Check repository:

```bash
ls
```

Expected:

```text
frontend

backend

docker

kubernetes

argocd

docs

scripts
```

---

# Step 2 — Verify Documentation

Check:

```bash
ls docs
```

Expected:

```text
architecture

implementation

pipeline

project

troubleshooting

presentation

BUILD-JOURNEY.md
```

---

# Step 3 — Verify Application Source

Frontend:

```bash
cd frontend

npm install

npm run build
```

Expected:

```text
Build successful
```

---

Backend:

```bash
cd backend

npm install

npm test
```

Expected:

```text
Tests passed
```

---

# Step 4 — Verify Docker Images

Build frontend:

```bash
docker build \
-t flavorforge-frontend .
```

Build backend:

```bash
docker build \
-t flavorforge-backend .
```

Verify:

```bash
docker images
```

---

# Step 5 — Verify Kubernetes Configuration

Validate manifests:

```bash
kubectl kustomize kubernetes/overlays/dev
```

Expected:

Rendered Kubernetes resources.

---

# Step 6 — Verify AKS Deployment

Check nodes:

```bash
kubectl get nodes
```

Check workloads:

```bash
kubectl get all \
-n flavorforge
```

Expected:

```text
Pods Running

Services Available

Deployments Healthy
```

---

# Step 7 — Verify Pipeline

Azure DevOps pipeline should complete:

```text
Build

Test

Security

Docker Build

ACR Push

Deploy
```

---

# Step 8 — Verify GitOps

Check Argo CD:

Expected:

```text
Application:

Healthy

Synced
```

---

# Step 9 — Backup Important Information

Backup:

## Source Code

Repository:

```text
GitHub
```

---

## Kubernetes Configuration

Location:

```text
kubernetes/
```

---

## Argo CD Configuration

Location:

```text
argocd/
```

---

## Documentation

Location:

```text
docs/
```

---

# Step 10 — Azure Cleanup

When the environment is no longer required:

Review resources:

```bash
az resource list \
-g flavorforge-rg
```

Delete resource group:

```bash
az group delete \
--name flavorforge-rg
```

Confirmation:

```text
Are you sure?
```

Select:

```text
Yes
```

---

# Step 11 — Local Cleanup

Stop containers:

```bash
docker ps
```

Stop:

```bash
docker stop <container-id>
```

Remove unused images:

```bash
docker system prune
```

---

# Files Created or Modified

No application files modified.

Referenced documentation:

```text
docs/cleanup/

docs/project/04-verification-and-validation-report/
```

Final document:

```text
docs/BUILD-JOURNEY.md
```

---

# Final Verification Checklist

## Source Code

☑ Frontend available

☑ Backend available

☑ Tests passing

---

## Containers

☑ Dockerfiles available

☑ Images build successfully

☑ Container communication verified

---

## Azure

☑ Resource Group created

☑ ACR configured

☑ AKS cluster running

---

## Kubernetes

☑ Namespace created

☑ Deployments healthy

☑ Services available

☑ Ingress configured

☑ HPA configured

---

## CI/CD

☑ Azure DevOps pipeline working

☑ Security scans enabled

☑ Docker images published

---

## GitOps

☑ Argo CD installed

☑ Application synchronized

☑ Self-healing verified

---

## Documentation

☑ Architecture documented

☑ Implementation documented

☑ Troubleshooting documented

☑ Demo documentation completed

☑ BUILD-JOURNEY.md completed

---

# Evidence

Use the following screenshots.

![All Environments](/screenshots/enterprise-azure-devops-release-simulation/10-all-environments.png)

*Figure 20.1 – Final deployment environments.*

![Final Pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-final-azure-pipeline.png)

*Figure 20.2 – Final successful CI/CD pipeline.*

![Production Pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-2-prod-environment-final-azure-pipeline.png)

*Figure 20.3 – Production deployment validation.*

![Azure Resource Group](/screenshots/enterprise-azure-devops-release-simulation/flavorforge-rg-microsoft-azure-resource-group.png)

*Figure 20.4 – Final Azure resource organization.*

---

# Common Mistakes

## Deleting Azure resources without backup

Problem:

Important configuration is lost.

Solution:

Backup:

- YAML files.
- Documentation.
- Pipeline configuration.

---

## Assuming GitHub alone is enough

Problem:

Cloud configuration is not stored automatically.

Solution:

Keep:

```text
Infrastructure knowledge

+

Configuration files

+

Documentation
```

---

## Not testing rebuild

Problem:

Documentation may contain outdated steps.

Solution:

Perform periodic rebuild validation.

---

# Learning Outcome

After completing this phase, you understand:

- Production project closure.
- Resource lifecycle management.
- Backup practices.
- Reproducibility validation.
- Engineering handover.

---

# Final Outcome

FlavorForge Azure DevSecOps Capstone now contains:

```text
Application

+

Cloud Infrastructure

+

CI/CD

+

Security

+

GitOps

+

Monitoring

+

Documentation

+

Rebuild Blueprint
```

The project can be recreated from an empty repository by following this BUILD-JOURNEY document.

---

# End of Build Journey

FlavorForge has completed the complete DevSecOps lifecycle:

```text
Plan

↓

Develop

↓

Containerize

↓

Secure

↓

Deploy

↓

Operate

↓

Document

↓

Demonstrate

↓

Rebuild
```

---

---

# Phase 21 — Interview Preparation

## Goal

Prepare technical explanations for the FlavorForge Azure DevSecOps Capstone by understanding the architecture decisions, implementation choices, and operational practices followed during the project.

The objective is to ensure that the developer can explain not only what was built, but why each technology and design decision was selected.

---

# Why This Phase Comes After Documentation

A completed DevSecOps project requires both implementation knowledge and communication skills.

After rebuilding the project, a developer should be able to explain:

- Application architecture.
- Cloud design.
- CI/CD workflow.
- Security implementation.
- Kubernetes operations.
- GitOps approach.

---

# Prerequisites

Before starting interview preparation:

- Complete BUILD-JOURNEY.md.
- Understand repository structure.
- Understand deployment architecture.
- Review verification documents.

Required references:

```text
docs/architecture/

docs/implementation/

docs/pipeline/

docs/troubleshooting/
```

---

# Step-by-Step Preparation

# Step 1 — Explain the Project Overview

Expected explanation:

```text
FlavorForge is a full-stack recipe application deployed using
Azure DevSecOps practices.

The application uses React for frontend development,
Node.js and Express for backend services,
Docker for containerization,
Azure Kubernetes Service for deployment,
Azure DevOps for CI/CD,
and Argo CD for GitOps-based delivery.
```

---

# Step 2 — Explain Architecture

Important concepts:

## Frontend

Technology:

```text
React + Vite
```

Purpose:

- User interface.
- API communication.
- Component-based development.

---

## Backend

Technology:

```text
Node.js + Express
```

Purpose:

- REST APIs.
- Business logic.
- Health endpoints.

---

## Container Layer

Technology:

```text
Docker
```

Purpose:

- Package applications.
- Provide consistent runtime environments.

---

## Cloud Layer

Technology:

```text
Azure

ACR

AKS
```

Purpose:

- Store images.
- Run Kubernetes workloads.
- Provide scalable deployment.

---

# Step 3 — Explain CI/CD Pipeline

Pipeline flow:

```text
Developer Commit

        |

        ▼

Azure DevOps Pipeline

        |

        ▼

Application Testing

        |

        ▼

SonarCloud Analysis

        |

        ▼

Trivy Security Scan

        |

        ▼

Docker Image Build

        |

        ▼

Push Image to ACR

        |

        ▼

Deploy to AKS
```

---

# Step 4 — Explain Security Implementation

Security controls:

```text
SonarCloud

↓

Static Code Analysis


Trivy

↓

Container Vulnerability Scanning


Kubernetes Secrets

↓

Sensitive Configuration Management


ACR

↓

Private Image Storage
```

---

# Step 5 — Explain Kubernetes Design

Important concepts:

## Deployments

Responsible for:

- Pod management.
- Replica management.
- Rolling updates.

---

## Services

Responsible for:

- Internal communication.
- Application exposure.

---

## Ingress

Responsible for:

- External HTTP routing.

---

## HPA

Responsible for:

- Automatic scaling.

---

# Step 6 — Explain GitOps

Technology:

```text
Argo CD
```

Explanation:

```text
Git repository becomes the source of truth.

Argo CD continuously compares Git configuration
with Kubernetes state and synchronizes changes.
```

---

# Step 7 — Prepare Common Technical Questions

Examples:

## Why Kubernetes?

Answer:

```text
Kubernetes provides container orchestration,
automatic recovery, scaling, networking,
and deployment management.
```

---

## Why AKS?

Answer:

```text
AKS provides managed Kubernetes with Azure
integration, reducing cluster management overhead.
```

---

## Why ACR?

Answer:

```text
ACR provides private storage for Docker images
and integrates securely with AKS deployments.
```

---

## Why GitOps?

Answer:

```text
GitOps improves deployment reliability by making
Git the single source of truth for infrastructure
and application configuration.
```

---

# Files Referenced

Detailed interview preparation:

```text
docs/presentation/interviewer-questions.md
```

Supporting documentation:

```text
docs/architecture/

docs/pipeline/

docs/troubleshooting/
```

---

# Verification

Interview preparation is complete when the developer can explain:

☑ Application architecture

☑ Cloud architecture

☑ Deployment process

☑ CI/CD pipeline

☑ Security controls

☑ Kubernetes concepts

☑ GitOps workflow

☑ Troubleshooting approach

---

# Evidence

Use architecture documentation diagrams:

![Enterprise Cloud Architecture](/docs/diagrams/flavorforge-enterprise-cloud-architecture.png)

*Figure 21.1 – Cloud architecture used for technical explanation.*

![DevSecOps Lifecycle](/docs/diagrams/flavorforge-devsecops-lifecycle-infographic.png)

*Figure 21.2 – DevSecOps workflow explanation.*

---

---

# Phase 22 — Final Validation

## Goal

Perform the final validation of the FlavorForge Azure DevSecOps Capstone to confirm that all application components, cloud resources, deployment processes, security controls, and documentation are complete and working together successfully.

The objective is to verify that the project has reached a production-ready state.

---

# Why This Phase Comes Last

The complete DevSecOps lifecycle has already been implemented:

```text
Plan

↓

Develop

↓

Containerize

↓

Deploy

↓

Secure

↓

Automate

↓

Operate

↓

Document
```

Final validation ensures that every layer works as one complete system.

---

# Prerequisites

Before performing final validation:

- Application development completed.
- Docker images created.
- Azure resources provisioned.
- Kubernetes deployment completed.
- CI/CD pipeline configured.
- Security scanning enabled.
- GitOps configured.
- Documentation completed.

---

# Final Validation Flow

```text
Source Code

      |

      ▼

Application Build

      |

      ▼

Docker Images

      |

      ▼

Azure Container Registry

      |

      ▼

Azure Kubernetes Service

      |

      ▼

Kubernetes Resources

      |

      ▼

Ingress Access

      |

      ▼

Application Verification

      |

      ▼

Monitoring Verification
```

---

# Step-by-Step Validation

# Step 1 — Validate Repository

Check repository structure:

```bash
ls
```

Expected:

```text
frontend

backend

docker

kubernetes

argocd

scripts

docs
```

Verify Git status:

```bash
git status
```

Expected:

```text
working tree clean
```

---

# Step 2 — Validate Frontend

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Build application:

```bash
npm run build
```

Expected:

```text
Build completed successfully
```

Verify:

```text
dist/
```

directory created.

---

# Step 3 — Validate Backend

Navigate:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Expected:

```text
Tests passed
```

Verify API:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{
 "status":"healthy"
}
```

---

# Step 4 — Validate Docker

Build images:

Frontend:

```bash
docker build \
-t flavorforge-frontend \
frontend/
```

Backend:

```bash
docker build \
-t flavorforge-backend \
backend/
```

Verify:

```bash
docker images
```

Expected:

```text
flavorforge-frontend

flavorforge-backend
```

---

# Step 5 — Validate Azure Container Registry

Login:

```bash
az acr login \
--name <acr-name>
```

Verify images:

```bash
az acr repository list \
--name <acr-name>
```

Expected:

```text
frontend

backend
```

---

# Step 6 — Validate AKS Cluster

Check connection:

```bash
kubectl cluster-info
```

Verify nodes:

```bash
kubectl get nodes
```

Expected:

```text
STATUS

Ready
```

---

# Step 7 — Validate Kubernetes Workloads

Check namespace:

```bash
kubectl get namespace
```

Check deployments:

```bash
kubectl get deployments \
-n flavorforge
```

Expected:

```text
frontend

backend
```

Check pods:

```bash
kubectl get pods \
-n flavorforge
```

Expected:

```text
Running
```

---

# Step 8 — Validate Services and Ingress

Check services:

```bash
kubectl get svc \
-n flavorforge
```

Check ingress:

```bash
kubectl get ingress \
-n flavorforge
```

Expected:

```text
External Address Available
```

---

# Step 9 — Validate Autoscaling

Check HPA:

```bash
kubectl get hpa \
-n flavorforge
```

Expected:

```text
backend-hpa
```

Verify metrics:

```bash
kubectl top pods \
-n flavorforge
```

---

# Step 10 — Validate CI/CD Pipeline

Verify Azure DevOps pipeline stages:

```text
Build

↓

Test

↓

Security Scan

↓

Docker Build

↓

ACR Push

↓

Deploy
```

Expected:

```text
Pipeline Successful
```

---

# Step 11 — Validate Security Controls

## SonarCloud

Verify:

- Code quality analysis completed.
- Coverage report available.
- Quality gate passed.

---

## Trivy

Verify:

- Container image scan completed.
- Vulnerabilities reviewed.

---

# Step 12 — Validate GitOps

Check Argo CD application:

Expected:

```text
Application Status:

Healthy

Sync Status:

Synced
```

Verify:

```text
Git Repository

        |

        ▼

Argo CD

        |

        ▼

Kubernetes Cluster
```

---

# Step 13 — Validate Documentation

Verify documentation exists:

```text
docs/
```

Expected:

```text
architecture

implementation

pipeline

project

troubleshooting

presentation

BUILD-JOURNEY.md
```

---

# Final Acceptance Checklist

## Application

☑ Frontend deployed

☑ Backend deployed

☑ API health verified

---

## Containerization

☑ Docker images created

☑ Images stored in ACR

---

## Cloud Infrastructure

☑ Azure Resource Group created

☑ ACR available

☑ AKS running

---

## Kubernetes

☑ Namespace created

☑ Deployments healthy

☑ Services available

☑ Ingress working

☑ HPA configured

---

## DevSecOps

☑ Azure DevOps pipeline successful

☑ SonarCloud integrated

☑ Trivy integrated

---

## GitOps

☑ Argo CD installed

☑ Application synchronized

☑ Self-healing verified

---

## Documentation

☑ Architecture documented

☑ Implementation documented

☑ Troubleshooting documented

☑ Build journey documented

☑ Presentation documentation planned

---

# Evidence

Use final project validation screenshots.

![Final Azure Pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-final-azure-pipeline.png)

*Figure 22.1 – Final Azure DevOps pipeline execution.*

![AKS Workloads](/screenshots/azure/15-AKS%20Workloads%20(Deployments%20%26%20Pods).png)

*Figure 22.2 – Running AKS workloads.*

![Argo CD Application](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 22.3 – Argo CD synchronized application.*

![Production Ingress](/screenshots/enterprise-azure-devops-release-simulation/11-production-ingress.png)

*Figure 22.4 – Production ingress configuration.*

---

# Common Mistakes

## Validating only the application

Problem:

Application works but deployment pipeline or infrastructure may fail.

Solution:

Validate the complete lifecycle.

---

## Skipping security validation

Problem:

Application may contain unresolved vulnerabilities.

Solution:

Verify SonarCloud and Trivy results.

---

## Not testing recovery

Problem:

Operational readiness is unknown.

Solution:

Verify:

- Kubernetes self-healing.
- GitOps synchronization.
- Rollback capability.

---

# Learning Outcome

After completing this phase, you understand:

- Production readiness validation.
- End-to-end DevSecOps verification.
- Application lifecycle review.
- Cloud deployment validation.

---

# Final Project Status

FlavorForge Azure DevSecOps Capstone is complete.

The project contains:

```text
Application

+

Docker Containers

+

Azure Cloud Infrastructure

+

Kubernetes Platform

+

CI/CD Automation

+

Security Integration

+

GitOps Deployment

+

Monitoring

+

Documentation

+

Rebuild Blueprint
```

---

# End of FlavorForge Build Journey

The complete project can now be rebuilt from an empty repository by following:

```text
docs/BUILD-JOURNEY.md
```

Final lifecycle:

```text
Plan

↓

Develop

↓

Build

↓

Secure

↓

Deploy

↓

Operate

↓

Monitor

↓

Document

↓

Validate
```

---

# Phase 23 — Final Engineering Review and Knowledge Transfer

## Goal

Perform a final engineering review of the FlavorForge Azure DevSecOps Capstone and ensure that the repository contains everything required for future developers to understand, rebuild, maintain, and extend the project.

The objective of this phase is to transfer complete technical knowledge of the system.

---

# Why This Phase Comes Last

The previous phases created:

- Application code.
- Cloud infrastructure.
- Container images.
- Kubernetes deployments.
- CI/CD automation.
- Security validation.
- GitOps workflow.
- Documentation.

However, a production engineering project also requires knowledge transfer.

A future developer should be able to answer:

```text
What was built?

How does it work?

Where are the important files?

How can it be rebuilt?

How can problems be diagnosed?
```

This phase confirms that all required information exists.

---

# Final Engineering View

FlavorForge represents the complete DevSecOps lifecycle:

```text
Development

      |

      ▼

Source Control

      |

      ▼

Application Testing

      |

      ▼

Containerization

      |

      ▼

Security Validation

      |

      ▼

Cloud Deployment

      |

      ▼

Kubernetes Operations

      |

      ▼

GitOps Management

      |

      ▼

Monitoring

      |

      ▼

Documentation

      |

      ▼

Knowledge Transfer
```

---

# Prerequisites

Before completing this phase:

- Application deployment completed.
- Azure resources verified.
- Pipeline completed successfully.
- Kubernetes workloads running.
- Documentation available.
- Evidence collected.

Verify repository status:

```bash
git status
```

Expected:

```text
working tree clean
```

---

# Step-by-Step Tasks

# Step 1 — Review Repository Entry Points

The main project entry points are:

```text
README.md
```

Purpose:

Provides project overview and quick navigation.

---

```text
docs/README.md
```

Purpose:

Provides documentation navigation.

---

```text
docs/BUILD-JOURNEY.md
```

Purpose:

Provides complete rebuild instructions.

---

```text
azure-pipelines.yml
```

Purpose:

Defines CI/CD automation.

---

```text
kubernetes/
```

Purpose:

Contains Kubernetes deployment configuration.

---

```text
argocd/
```

Purpose:

Contains GitOps deployment configuration.

---

# Step 2 — Understand Application Structure

## Frontend

Location:

```text
frontend/
```

Technology:

```text
React + Vite
```

Responsibilities:

- User interface.
- Recipe display.
- User interactions.
- API communication.

---

## Backend

Location:

```text
backend/
```

Technology:

```text
Node.js + Express
```

Responsibilities:

- REST APIs.
- Business logic.
- Health monitoring.
- Recipe services.

---

# Step 3 — Understand Container Flow

Application packaging flow:

```text
Frontend Source

        |

        ▼

Frontend Docker Image


Backend Source

        |

        ▼

Backend Docker Image


        |

        ▼


Azure Container Registry
```

Important files:

```text
frontend/Dockerfile

backend/Dockerfile
```

---

# Step 4 — Understand Cloud Deployment Flow

Azure deployment architecture:

```text
Developer

      |

      ▼

Azure DevOps Pipeline

      |

      ▼

Azure Container Registry

      |

      ▼

Azure Kubernetes Service

      |

      ▼

FlavorForge Application
```

---

# Step 5 — Understand Kubernetes Management

Important location:

```text
kubernetes/
```

Structure:

```text
kubernetes/

├── base

└── overlays

    ├── dev

    ├── qa

    └── prod
```

Purpose:

Supports environment-specific deployments.

---

# Step 6 — Understand GitOps Management

Location:

```text
argocd/
```

Important file:

```text
flavorforge-app.yaml
```

Purpose:

Defines:

- Repository source.
- Kubernetes destination.
- Synchronization policy.

---

# Step 7 — Identify Troubleshooting Locations

When problems occur:

## Application Issues

Location:

```text
docs/troubleshooting/01-application-issues.md
```

---

## Docker Issues

Location:

```text
docs/troubleshooting/02-docker-issues.md
```

---

## Pipeline Issues

Location:

```text
docs/troubleshooting/03-pipeline-issues.md
```

---

## Kubernetes Issues

Location:

```text
docs/troubleshooting/05-kubernetes-issues.md
```

---

## GitOps Issues

Location:

```text
docs/troubleshooting/06-argocd-gitops-issues.md
```

---

## Azure Issues

Location:

```text
docs/troubleshooting/07-azure-cloud-issues.md
```

---

# Step 8 — Final Rebuild Sequence Summary

A developer rebuilding FlavorForge should follow this order:

```text
1. Clone Repository

        ↓

2. Install Prerequisites

        ↓

3. Configure Application Environment

        ↓

4. Build Frontend

        ↓

5. Build Backend

        ↓

6. Build Docker Images

        ↓

7. Create Azure Resources

        ↓

8. Push Images to ACR

        ↓

9. Create AKS Cluster

        ↓

10. Deploy Kubernetes Resources

        ↓

11. Configure Ingress

        ↓

12. Configure HPA

        ↓

13. Configure Azure DevOps Pipeline

        ↓

14. Enable Security Scanning

        ↓

15. Configure Argo CD

        ↓

16. Validate Monitoring

        ↓

17. Complete Documentation Review
```

---

# Files Reviewed

Important project files:

```text
README.md

azure-pipelines.yml

docker-compose.yml

frontend/

backend/

docker/

kubernetes/

argocd/

docs/

scripts/
```

---

# Verification

The project knowledge transfer is complete when:

## Repository Understanding

A developer can identify:

- Application source.
- Deployment files.
- Pipeline configuration.
- Documentation locations.

---

## Rebuild Understanding

A developer can rebuild the project by following:

```text
docs/BUILD-JOURNEY.md
```

---

## Operations Understanding

A developer can troubleshoot using:

```text
docs/troubleshooting/
```

---

## Architecture Understanding

A developer can understand the system using:

```text
docs/architecture/
```

---

# Evidence

Use the following repository structure screenshots.

![Repository Structure](/screenshots/enterprise-azure-devops-release-simulation/20-tree-l-2.png)

*Figure 21.1 – Complete FlavorForge repository structure.*

![Backend Structure](/screenshots/enterprise-azure-devops-release-simulation/21-ls-backend.png)

*Figure 21.2 – Backend source structure.*

![Frontend Structure](/screenshots/enterprise-azure-devops-release-simulation/22-ls-frontend.png)

*Figure 21.3 – Frontend source structure.*

![Kubernetes Structure](/screenshots/enterprise-azure-devops-release-simulation/23-ls-kubernetes.png)

*Figure 21.4 – Kubernetes deployment structure.*

![Documentation Structure](/screenshots/enterprise-azure-devops-release-simulation/24-ls-docs.png)

*Figure 21.5 – Documentation structure.*

---

# Common Mistakes

## Only documenting what was built

Problem:

Future developers cannot reproduce the environment.

Solution:

Document:

- Build process.
- Deployment process.
- Recovery process.

---

## Keeping knowledge only in personal notes

Problem:

Knowledge becomes unavailable.

Solution:

Store engineering knowledge inside the repository.

---

## Changing architecture without updating documentation

Problem:

Documentation becomes outdated.

Solution:

Update documentation whenever major architecture changes occur.

---

# Learning Outcome

After completing this phase, you understand:

- Engineering knowledge transfer.
- Repository maintainability.
- Production documentation standards.
- Long-term project ownership.

---

# Final Completion Status

FlavorForge Azure DevSecOps Capstone contains:

```text
Application

+

Cloud Infrastructure

+

Containerization

+

Kubernetes

+

CI/CD

+

Security

+

GitOps

+

Monitoring

+

Documentation

+

Rebuild Blueprint
```

The project can be recreated, operated, and maintained by another developer using the repository documentation.

---

# End of BUILD JOURNEY

FlavorForge follows the complete DevSecOps lifecycle:

```text
Plan

↓

Develop

↓

Build

↓

Secure

↓

Deploy

↓

Operate

↓

Monitor

↓

Document

↓

Maintain
```

