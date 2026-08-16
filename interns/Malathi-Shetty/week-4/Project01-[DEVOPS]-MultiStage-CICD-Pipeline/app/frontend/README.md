# 🍽️ FlavorForge Frontend

The **FlavorForge Frontend** is a modern single-page application (SPA) built with **React** and **Vite**. It provides the user interface for the FlavorForge Azure DevSecOps Capstone Project and communicates with the backend REST API to display recipes, monitor application health, and deliver a responsive user experience.

The application follows modern frontend development practices with reusable components, client-side routing, API integration, responsive layouts, and production-ready architecture.

---

# 🎯 Purpose

The frontend is responsible for:

- Providing an intuitive and responsive user interface
- Displaying recipe information
- Communicating with the backend REST API
- Monitoring backend health status
- Delivering a consistent user experience across devices
- Serving as the presentation layer of the FlavorForge application

---

# 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Component-based UI development |
| Vite | Development server and production build |
| React Router DOM | Client-side routing |
| JavaScript (ES6+) | Application logic |
| CSS3 | Styling and responsive layouts |
| Fetch API | Backend API communication |

---

# 📂 Project Structure

```text
frontend/
│
├── Dockerfile
├── README.md
├── eslint.config.js
├── index.html
├── nginx.conf.template
├── package-lock.json
├── package.json
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── App.jsx
│   ├── api
│   │   ├── apiClient.js
│   │   └── apiClient.test.js
│   ├── assets
│   │   └── hero.png
│   ├── components
│   │   ├── BackendStatus
│   │   │   ├── BackendStatus.css
│   │   │   └── BackendStatus.jsx
│   │   ├── CategoryFilter
│   │   │   ├── CategoryFilter.css
│   │   │   └── CategoryFilter.jsx
│   │   ├── EmptyState
│   │   │   ├── EmptyState.css
│   │   │   └── EmptyState.jsx
│   │   ├── ErrorBoundary
│   │   │   ├── ErrorBoundary.css
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── ErrorBoundary.test.jsx
│   │   ├── FeatureCard
│   │   │   ├── FeatureCard.css
│   │   │   └── FeatureCard.jsx
│   │   ├── Features
│   │   │   ├── Features.css
│   │   │   └── Features.jsx
│   │   ├── Footer
│   │   │   └── Footer.jsx
│   │   ├── Header
│   │   │   ├── Header.css
│   │   │   └── Header.jsx
│   │   ├── Hero
│   │   │   ├── Hero.css
│   │   │   └── Hero.jsx
│   │   ├── NotFound
│   │   │   ├── NotFound.css
│   │   │   └── NotFound.jsx
│   │   ├── RecipeCard
│   │   │   ├── RecipeCard.css
│   │   │   └── RecipeCard.jsx
│   │   ├── RecipeList
│   │   │   ├── RecipeList.css
│   │   │   └── RecipeList.jsx
│   │   ├── SearchBar
│   │   │   ├── SearchBar.css
│   │   │   └── SearchBar.jsx
│   │   └── ui
│   │       ├── Badge
│   │       │   ├── Badge.css
│   │       │   └── Badge.jsx
│   │       ├── Button
│   │       │   ├── Button.css
│   │       │   └── Button.jsx
│   │       ├── Card
│   │       │   ├── Card.css
│   │       │   └── Card.jsx
│   │       └── Loading
│   │           ├── Loading.css
│   │           └── Loading.jsx
│   ├── config
│   ├── hooks
│   ├── layouts
│   │   └── Layout.jsx
│   ├── main.jsx
│   ├── pages
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── HomePage.test.jsx
│   │   └── RecipesPage.jsx
│   ├── services
│   │   ├── healthService.js
│   │   └── recipeService.js
│   ├── styles
│   │   ├── global.css
│   │   └── variables.css
│   ├── test
│   │   └── setup.js
│   └── utils
└── vite.config.js
```

---

# ✨ Features

The FlavorForge Frontend provides a modern and responsive user experience with reusable React components and seamless backend integration.

## Application Features

- Responsive user interface
- Hero landing section
- Feature highlights
- Recipe listing
- Recipe search
- Category filtering
- Backend health monitoring
- Loading indicators
- Empty state handling
- Error Boundary
- Custom 404 page
- Mobile-friendly navigation
- Component-based architecture
- API integration with backend
- Unit testing using Vitest and React Testing Library
- Docker-ready frontend
- Nginx production configuration

---

# 🧩 Component Architecture

The application is designed using reusable and modular React components to improve maintainability and scalability.

## UI Components

These components provide reusable building blocks for the user interface.

- Button
- Card
- Badge
- Loading

## Feature Components

These components implement the core application functionality.

- Hero
- Features
- FeatureCard
- RecipeCard
- RecipeList
- SearchBar
- CategoryFilter
- BackendStatus
- EmptyState
- Header
- Footer
- NotFound
- ErrorBoundary

---

# 🌐 Routing

Client-side routing is implemented using **React Router DOM**, allowing users to navigate between pages without full page reloads.

| Route | Description |
|--------|-------------|
| `/` | Home page |
| `/recipes` | Displays available recipes |
| `/about` | About FlavorForge |
| `/contact` | Contact information |
| `*` | Custom 404 page |

---

# 🔗 Backend Integration

The frontend communicates with the Express backend using REST APIs.

## Available API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Check backend health status |
| `/api/recipes` | GET | Retrieve available recipes |

The backend base URL is configured using an environment variable.

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# ⚙️ Environment Configuration

Create a `.env` file in the frontend directory.

```env
VITE_API_BASE_URL=http://localhost:3000
```

> **Note:** Update the API URL according to the deployment environment (Development, QA, or Production).

---

# ▶️ Running the Application

## Prerequisites

Before running the application, ensure the following software is installed:

- Node.js (v18 or later)
- npm
- Git

The backend service should also be running to enable API communication.

---

## Install Dependencies

Navigate to the frontend directory and install the required packages.

```bash
cd frontend
npm install
```

---

## Start the Development Server

Run the Vite development server.

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Ensure the backend API is running at:

```text
http://localhost:3000
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

# 🏗️ Production Build

Generate an optimized production build.

```bash
npm run build
```

The compiled application is generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

# 🧹 Cleaning Local Artifacts

Remove generated files to restore the project to a clean state.

```bash
rm -rf node_modules
rm -rf dist
rm -rf coverage
```

Reinstall project dependencies when required.

```bash
npm install
```

---

# ✅ Code Quality

Run ESLint before committing changes:

```bash
npm run lint
```

Run unit tests:

```bash
npm test
```

Build production assets:

```bash
npm run build
```

Current verification status:

- ✅ ESLint checks passing
- ✅ Production build successful
- ✅ Responsive layout verified
- ✅ Backend API connectivity verified

---

# 🛡️ Error Handling

The frontend includes several mechanisms to improve reliability and user experience.

- Error Boundary for unexpected React errors
- Loading indicators during API requests
- Empty state component when no data is available
- Backend health monitoring
- API error handling with user-friendly messages
- Custom 404 page for invalid routes

These features help ensure the application remains stable even when unexpected situations occur.

---

# 🎨 Responsive Design

The user interface is designed to work across multiple screen sizes.

Supported devices include:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive techniques used:

- CSS Flexbox
- CSS Grid
- Media Queries
- Reusable CSS variables
- Responsive spacing and typography

---

# 🏛️ Frontend Architecture

```text
Browser
    │
    ▼
React Components
    │
    ▼
Pages
    │
    ▼
Services
    │
    ▼
API Client
    │
    ▼
Express Backend API
```

The application follows a layered architecture where UI components communicate with service modules, which interact with the backend through REST APIs.

---

# 📦 Key Dependencies

| Package                | Purpose             |
| ---------------------- | ------------------- |
| react                  | UI library          |
| react-dom              | React rendering     |
| react-router-dom       | Client-side routing |
| vite                   | Build tool          |
| @vitejs/plugin-react   | React support       |
| vitest                 | Unit testing        |
| @testing-library/react | Component testing   |
| eslint                 | Code quality        |


---

# 🔒 Dependency Security

During development, `npm audit` reported a high-severity advisory related to **react-router**.

Assessment:

- The advisory applies to React Server Components (RSC).
- FlavorForge is a client-side React Single Page Application (SPA).
- React Server Components are not used.
- No exploitable path exists in the current implementation.

Decision:

- Do not use `npm audit fix --force`.
- Review dependency updates during future maintenance and CI/CD validation.

---

# 🚀 Deployment

The frontend is designed to support modern containerized deployments.

Supported deployment platforms include:

- Docker
- Nginx
- Docker Compose
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Azure DevOps CI/CD Pipeline
- GitOps deployment using ArgoCD

Deployment instructions are documented in the repository-level documentation.

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

- React application development
- Vite project setup
- Component-based architecture
- React Hooks
- Client-side routing
- REST API integration
- Environment variable configuration
- Responsive web design
- Error handling
- Production build optimization
- Enterprise frontend project organization

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Project README](../README.md) | Project overview |
| [Implementation Guide](../docs/implementation/README.md) | Frontend implementation |
| [Pipeline Documentation](../docs/pipeline/README.md) | Azure DevOps pipeline |
| [Docker Documentation](../docker/README.md) | Docker containerization |
| [Troubleshooting Guide](../docs/troubleshooting/README.md) | Frontend troubleshooting |

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

This frontend is part of a production-style DevSecOps project demonstrating modern application development, containerization, Kubernetes orchestration, CI/CD automation, and GitOps deployment using Azure technologies.