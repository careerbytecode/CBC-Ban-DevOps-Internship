# ⚛️ Frontend Development

> This document explains how the FlavorForge frontend was designed, developed, tested, and prepared for deployment.

---

# 📖 Introduction

The frontend is the user-facing part of the FlavorForge application.

It was developed using **React** with **Vite** to create a fast, responsive, and component-based web application.

The frontend communicates with the backend through REST APIs and provides users with an intuitive interface for browsing recipes while also displaying backend health information.

This module demonstrates frontend development practices commonly found in modern enterprise applications.

---

# Why React?

Several frontend frameworks were considered before starting the project.

| Framework | Reason |
|-----------|--------|
| React | ✅ Selected |
| Angular | Steeper learning curve for this project |
| Vue | Smaller enterprise adoption compared to React |

React was selected because:

- Large community support
- Component-based architecture
- Reusable UI
- Excellent Azure ecosystem support
- Industry adoption
- Easy integration with REST APIs

---

# Why Vite?

Instead of Create React App, Vite was selected.

Benefits include:

- Faster startup
- Faster builds
- Smaller production bundles
- Better developer experience
- Native ES Module support

---

# How the Frontend Journey Started

The frontend was developed before containerization or Kubernetes.

The initial focus was to create a working user interface that could communicate successfully with the backend running locally.

Development progressed in phases:

### Phase 1

Project initialization

```bash
npm create vite@latest frontend
```

---

### Phase 2

Install project dependencies.

```bash
cd frontend

npm install
```

---

### Phase 3

Install React Router.

```bash
npm install react-router-dom
```

---

### Phase 4

Create reusable folder structure.

Instead of writing everything inside one file, the project was organized into reusable modules.

```
src/

components/

pages/

services/

api/

layouts/

styles/

assets/
```

This organization makes the application easier to maintain as it grows.

---

# Building the User Interface

The application was built one feature at a time.

Implemented features include:

- Navigation Header
- Hero Section
- Feature Cards
- Recipe Listing
- Recipe Cards
- Search Bar
- Category Filter
- Backend Status Component
- Footer
- Loading Component
- Error Boundary
- Custom 404 Page

Each feature was developed independently and then integrated into the application.

---

# Component-Based Architecture

Instead of creating one large page, the application is divided into reusable components.

Benefits include:

- Better readability
- Easier testing
- Code reuse
- Independent development
- Easier maintenance

Example:

```
HomePage

├── Header
├── Hero
├── Features
├── SearchBar
├── CategoryFilter
├── RecipeList
├── BackendStatus
└── Footer
```

---

# Routing

React Router was added to provide navigation without reloading the browser.

Routes include:

| Route | Description |
|--------|-------------|
| / | Home |
| /recipes | Recipes |
| /about | About |
| /contact | Contact |
| * | Custom 404 |

---

# Backend Communication

The frontend does not access data directly.

Instead, it communicates with the backend using REST APIs.

Flow:

```
Browser

↓

React Component

↓

Service Layer

↓

API Client

↓

Express Backend
```

This layered approach keeps UI code separate from networking code.

---

# Environment Variables

Instead of hardcoding backend URLs inside React components, environment variables were used.

Example:

```
VITE_API_BASE_URL
```

Benefits:

- Easier deployment
- Different values for local and production environments
- Cleaner code

---

# Error Handling

Several mechanisms were implemented to improve user experience.

These include:

- Error Boundary
- Loading component
- Empty state
- Backend availability check
- API error handling

This prevents application crashes and provides meaningful feedback to users.

---

# Responsive Design

The application was designed to work across different screen sizes.

Techniques used include:

- Flexbox
- CSS Grid
- Media Queries
- Reusable CSS variables

Supported devices:

- Desktop
- Tablet
- Mobile

---

# Testing

Frontend testing was introduced to verify component behavior.

Examples include:

- API client tests
- Home page tests
- Error Boundary tests

Testing helps detect issues early during development.

---

# Preparing for Docker

Once local development was complete, the frontend was prepared for containerization.

Changes included:

- Production build configuration
- Nginx configuration
- Multi-stage Dockerfile
- Environment variable support

This ensured the application could run consistently across different environments.

---

# Challenges Faced

Some of the issues encountered during frontend development included:

- Backend CORS configuration
- API endpoint configuration
- React Router compatibility
- Environment variable management
- Docker networking
- Production build issues
- Azure Pipeline Node.js version mismatch

Each issue was documented and resolved before proceeding to the next stage.

---

# Lessons Learned

Developing the frontend provided practical experience in:

- React fundamentals
- Component design
- Routing
- API integration
- Responsive design
- Error handling
- Testing
- Production builds
- Preparing applications for containerization

---

# Screenshots to Capture

Include screenshots of:

- Project creation
- Folder structure
- Running application
- Home page
- Recipe page
- Backend status
- Responsive layout
- Test execution
- Production build
- Browser output

---

# Next Step

The next document explains how the backend REST API was designed, implemented, tested, and integrated with the frontend.

Continue with:

**06-backend-development.md**