# 📚 Capstone Project Catalog — Cloud & DevOps (Week 4)

Your Week-4 capstone is **one DevOps project**, built individually. This cohort works from a fixed set of **10 Cloud DevOps projects**, each assigned to one student (see the **Cohort Capstone Registry** at the bottom).

> 🔁 **Every project follows the same backbone:** Source in GitHub → **Dockerize** → **Azure CI/CD pipeline** (build → push to **ACR**) → **Deploy to AKS** (Service + **Application Gateway**) → **Monitoring** (Azure Monitor + Container Insights) → **Documentation**. What changes per project is the **DevOps focus** — so every portfolio is distinct.

> 📌 **Note:** The assignment table below uses placeholders (`Student-01` … `Student-10`). Closer to the cohort dates, this file will be **regenerated with the final list of students and their assigned projects**. If there are more than 10 students, additional projects/assignments will be added then.

> Folder naming: `Project01-[DEVOPS]-Your-DevOps-Project` inside `interns/Your-Name/`.

---

## 🛠️ The 10 Cloud DevOps Projects

### Project 1 — Banking Application on AKS  ⭐ *(flagship / worked example)*
- **Scenario:** Deploy a multi-tier banking application to Kubernetes with secure config.
- **DevOps focus:** Full end-to-end pipeline · multi-tier Deployment · **ConfigMaps + Secrets** · Service + Application Gateway.
- **Concepts:** Docker · AKS · Azure CI/CD · ConfigMaps/Secrets · Container Insights.

### Project 2 — Multi-Tier App with Autoscaling (HPA)
- **Scenario:** Deploy a multi-tier web app and make it scale automatically under load.
- **DevOps focus:** **Horizontal Pod Autoscaler** · resource requests/limits · load-test to trigger scaling.
- **Concepts:** Deployments · HPA · Container Insights metrics.

### Project 3 — Multi-Stage CI/CD Pipeline (Azure DevOps)
- **Scenario:** Take an application and ship it through a complete multi-stage pipeline.
- **DevOps focus:** **Azure DevOps YAML pipeline** — build → test → containerize → push to **ACR** → deploy to AKS.
- **Concepts:** Azure DevOps Pipelines · multi-stage YAML · ACR.

### Project 4 — Microservices Deployment on AKS
- **Scenario:** Deploy a small set of services that talk to each other on Kubernetes.
- **DevOps focus:** Multiple Deployments · **Service-to-Service** networking · **Application Gateway** path routing.
- **Concepts:** Microservices · Services · Ingress routing · ConfigMaps.

### Project 5 — Secrets & Config Management Deployment
- **Scenario:** Deploy an app where all configuration and credentials are managed the right way.
- **DevOps focus:** All config via **ConfigMaps**, all credentials via **Secrets** (+ Azure Key Vault note) · live secret rotation.
- **Concepts:** ConfigMaps · Secrets · secure configuration.

### Project 6 — Zero-Downtime Releases (Rolling + Blue-Green)
- **Scenario:** Release new versions of an app safely with no downtime.
- **DevOps focus:** **Rolling updates** · **blue-green** switch via Services · rollback demo.
- **Concepts:** Deployment strategies · Services · rollback.

### Project 7 — Infra Provisioning with Shell + Azure CLI
- **Scenario:** Automate the creation of cloud infrastructure, then deploy an app onto it.
- **DevOps focus:** **Shell-script toolkit** that provisions VM + networking + AKS via **Azure CLI**.
- **Concepts:** Linux/shell scripting · Azure CLI · VM/AKS/networking provisioning.

### Project 8 — Observability with Azure Monitor + Container Insights
- **Scenario:** Deploy an app to AKS and build out full monitoring around it.
- **DevOps focus:** **Container Insights** · metrics · **KQL log queries** · alerts on CPU/memory/pod restarts.
- **Concepts:** Azure Monitor · Container Insights · alerting.

### Project 9 — Docker Compose → Kubernetes Migration
- **Scenario:** Take a multi-container app defined in Docker Compose and run it on Kubernetes.
- **DevOps focus:** Containerize a multi-container app · translate **Compose → K8s manifests** · deploy to AKS.
- **Concepts:** Docker · Docker Compose · Deployments/Services on AKS.

### Project 10 — End-to-End DevOps Pipeline (Web App)
- **Scenario:** Build the complete DevOps lifecycle for a web application.
- **DevOps focus:** Repo → Dockerfile → **Azure CI/CD** → AKS → **Application Gateway** → **monitoring** → docs.
- **Concepts:** Full CI/CD · the complete pipeline end to end.

---

## ✅ Capstone requirements (every project)
Per the internship deliverables, every student submits:
- **App + Dockerfile** in `app/`, **manifests** in `k8s/`, **pipeline** in `azure-pipelines.yml`, pushed to `interns/Your-Name/Project01-[DEVOPS]-Name/`
- A complete **`README.md`** — problem statement, architecture, workflow, technologies used, future enhancements
- **Screenshots** (pipeline run, pods running, app via Application Gateway, Container Insights) + a **3–5 minute demo video**
- A **final presentation** — problem, solution, demo, learnings
- A capstone **LinkedIn post (with GitHub link) + demo video** (scripts in [`WEEKLY-SCRIPTS.md`](WEEKLY-SCRIPTS.md))
- Presented on **Demo Day**

> 💳 **Cloud-cost reminder:** your capstone runs on your own Azure account and incurs small charges while resources are live. Delete your resource group after testing (`az group delete --name <your-rg> --yes --no-wait`).

---

## 🗂️ Cohort Capstone Registry

Each student is assigned **one** DevOps project. Confirm your assignment with your mentors and keep your `Status` updated.

> ⚠️ **Placeholders only** — `Student-01` … `Student-10` will be replaced with the real student names (and their LinkedIn) when the final cohort list is confirmed.

| # | Intern | Assigned Project | Track | GitHub folder | Status |
|---|--------|------------------|-------|---------------|--------|
| 1 | `Student-01` | Project 1 — Banking Application on AKS | `[DEVOPS]` | `interns/Student-01/Project01-[DEVOPS]-Banking-Application-on-AKS` | Assigned |
| 2 | `Student-02` | Project 2 — Multi-Tier App with Autoscaling (HPA) | `[DEVOPS]` | `interns/Student-02/Project01-[DEVOPS]-Autoscaling-HPA-App` | Assigned |
| 3 | `Student-03` | Project 3 — Multi-Stage CI/CD Pipeline | `[DEVOPS]` | `interns/Student-03/Project01-[DEVOPS]-MultiStage-CICD-Pipeline` | Assigned |
| 4 | `Student-04` | Project 4 — Microservices Deployment on AKS | `[DEVOPS]` | `interns/Student-04/Project01-[DEVOPS]-Microservices-on-AKS` | Assigned |
| 5 | `Student-05` | Project 5 — Secrets & Config Management | `[DEVOPS]` | `interns/Student-05/Project01-[DEVOPS]-Secrets-Config-Management` | Assigned |
| 6 | `Student-06` | Project 6 — Zero-Downtime Releases (Blue-Green) | `[DEVOPS]` | `interns/Student-06/Project01-[DEVOPS]-Zero-Downtime-Releases` | Assigned |
| 7 | `Student-07` | Project 7 — Infra Provisioning with Shell + Azure CLI | `[DEVOPS]` | `interns/Student-07/Project01-[DEVOPS]-Infra-Provisioning-AzureCLI` | Assigned |
| 8 | `Student-08` | Project 8 — Observability with Azure Monitor | `[DEVOPS]` | `interns/Student-08/Project01-[DEVOPS]-Observability-Azure-Monitor` | Assigned |
| 9 | `Student-09` | Project 9 — Docker Compose → Kubernetes Migration | `[DEVOPS]` | `interns/Student-09/Project01-[DEVOPS]-Compose-to-Kubernetes` | Assigned |
| 10 | `Student-10` | Project 10 — End-to-End DevOps Pipeline (Web App) | `[DEVOPS]` | `interns/Student-10/Project01-[DEVOPS]-End-to-End-DevOps-Pipeline` | Assigned |

> Status options: `Assigned` → `In progress` → `Shipped`.
> Worked example to follow: [`interns/EXAMPLE-Intern-Aarav-S/`](interns/EXAMPLE-Intern-Aarav-S/) (Project 1 — Banking Application on AKS).

---

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
