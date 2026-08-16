# 🍽️ FlavorForge Application Architecture

## Overview

FlavorForge follows a modern frontend-backend architecture.

The application is divided into independent services:

- Frontend presentation layer
- Backend API layer
- Data layer


---

# Application Flow

```mermaid
flowchart TD
    User[User] --> Frontend[React Frontend]
    Frontend --> Backend[Node.js Express API]
    Backend --> Data[Application Data Layer]
```

---

# Frontend Architecture

## Technology

- React
- Vite
- Nginx


## Responsibilities

The frontend handles:

- User interface rendering
- User interaction
- API communication
- Recipe presentation


## Architecture:


```mermaid
flowchart TD
    Browser[Browser]
    Nginx[Nginx Web Server]
    React[React Static Assets]

    Browser --> Nginx
    Nginx --> React
```

---

## Backend Architecture

## Technology

- Node.js
- Express


## Responsibilities

Backend provides:

- REST API endpoints
- Business logic
- Health checks
- Application services


## Architecture:


```mermaid
flowchart TD
    Request[API Request]
    Express[Express Server]
    Logic[Business Logic]
    Data[Data Access]

    Request --> Express
    Express --> Logic
    Logic --> Data
```


---

## Container Architecture

Each application component runs independently.


```mermaid
flowchart LR
    subgraph Docker["Docker Environment"]
        Frontend["Frontend Container<br/>React + Nginx"]
        Backend["Backend Container<br/>Node.js + Express"]
    end

    Frontend --> Backend
```


---

## Benefits of This Architecture

- Independent scaling
- Easier deployment
- Clear separation of responsibilities
- Container portability
