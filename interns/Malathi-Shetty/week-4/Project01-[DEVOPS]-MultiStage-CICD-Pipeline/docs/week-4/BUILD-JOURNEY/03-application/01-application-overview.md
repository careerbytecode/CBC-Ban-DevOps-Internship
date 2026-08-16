# 03 — Application

This is where we started creating the actual FlavorForge application.

We already completed the prerequisites and GitHub setup.

The next step was to create the application structure and start building the frontend and backend.

---

## Step 1 — Go to the FlavorForge project

We first went to the FlavorForge project directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

We verified the location:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Check the project files

We checked what was already present:

```bash
ls -la
```

We also checked the project structure:

```bash
tree -L 2
```

At this stage, the project contained the Git/GitHub files and the initial project files.

---

## Step 3 — Create the application folders

The application was organized into separate frontend and backend parts.

The final application structure contains:

```text
flavorforge-azure-devsecops-capstone/
├── frontend/
└── backend/
```

The frontend contains the React application.

The backend contains the Node.js application and API.

---

## Step 4 — Create the frontend application

We created the frontend application inside:

```text
frontend/
```

The frontend was built using React.

The frontend project contains files such as:

```text
frontend/
├── package.json
├── package-lock.json
├── index.html
├── src/
└── public/
```

We verified the frontend files:

```bash
ls -la frontend
```

We also checked the source files:

```bash
ls -la frontend/src
```

### Screenshot

![Frontend React application running](/screenshots/frontend/03-react-application-running.png)

---

## Step 5 — Install frontend dependencies

We moved into the frontend directory:

```bash
cd frontend
```

The required npm dependencies were installed for the React application.

We verified that the dependency files were created:

```bash
ls -la
```

We could see:

```text
package.json
package-lock.json
```

We then returned to the project root:

```bash
cd ..
```

---

## Step 6 — Run the frontend

We started the frontend development server from the frontend directory.

The application became available locally.

The frontend was verified in the browser.

The local development application used the Vite development server.

### Screenshot

![Frontend running locally](/screenshots/frontend/03-react-application-running.png)

---

## Step 7 — Create the backend folder

We created the backend application separately:

```text
backend/
```

The backend was built using Node.js.

The backend contains the application source code, configuration, routes, controllers, services, database-related code, and tests.

The final structure includes:

```text
backend/
├── package.json
├── package-lock.json
├── src/
└── tests/
```

We verified the backend directory:

```bash
ls -la backend
```

---

## Step 8 — Create the backend application structure

The backend source code was organized under:

```text
backend/src/
```

The application was divided into separate areas such as:

```text
src/
├── config/
├── controllers/
├── database/
├── middleware/
├── models/
├── routes/
├── services/
└── utils/
```

The main server files include:

```text
src/app.js
src/server.js
```

This structure allowed the backend application to keep its different responsibilities separated.

---

## Step 9 — Add backend tests

Tests were created under:

```text
backend/tests/
```

The final test structure includes:

```text
tests/
├── app.test.js
├── controllers.test.js
└── services.test.js
```

The backend test configuration was also created:

```text
backend/jest.config.js
```

---

## Step 10 — Run and verify the backend

We started the backend application and verified that the server was running.

The backend health endpoint was tested.

The health endpoint was available at:

```text
/api/health
```

### Screenshot

![Backend server running](/screenshots/backend/03-backend-server-running.png)

The health endpoint was also verified:

![Backend health endpoint](/screenshots/backend/02-backend-health-endpoint.png)

---

## Step 11 — Verify the application structure

From the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

We checked the application structure:

```bash
tree frontend -L 2
```

and:

```bash
tree backend -L 2
```

The project now had two main application components:

```text
frontend/
backend/
```

---

## Result

The basic FlavorForge application was created.

At this point:

```text
FlavorForge
│
├── Frontend
│   └── React application
│
└── Backend
    └── Node.js API
```

The frontend and backend could be developed and verified separately.

➡️ **Next: 04 — Docker**
