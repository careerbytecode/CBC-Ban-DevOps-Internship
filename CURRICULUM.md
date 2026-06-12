# 📚 Curriculum — Cloud & DevOps Internship (4 Weeks)

A live, hands-on, **beginner-friendly** syllabus that takes you from the Linux command line to deploying a real application on **Azure Kubernetes Service (AKS)** with a full **CI/CD pipeline**. **No prior DevOps experience required.** Weeks 1–3 are **live training**; Week 4 is your **DevOps capstone**.

> 🟢 **One live class per week (~1.5–2 hours)** on **Google Meet** (some classes may be in person in Bangalore). Each week's class covers the three sessions below. Your cohort's exact day/time is in [`COHORT-SCHEDULE.md`](COHORT-SCHEDULE.md).

**🎯 Outcome:** every student containerizes, ships, and monitors a real application on Kubernetes via an Azure CI/CD pipeline.
**👥 Target audience:** any graduate, 3rd-year, final-year, or passed-out student.
**🧰 Prerequisites:** none — we start from Linux basics. You'll need a laptop, plus GitHub, Docker Hub, and Azure accounts (see the cost note below).

> 💳 **Cloud-cost note (please read):** From **Week 3 onward** you use **your own Azure account**. VMs, AKS, and Application Gateway are **real, billable cloud resources** — expect **small charges** for the time your labs run. Stay on the **Azure free tier / free credits** where possible and **delete or stop your resources after every lab** to keep costs minimal. Mentors will show you exactly how.

---

## 🗓️ Week 1 — Linux, Shell & Docker Foundations
**Goal:** Get comfortable on the command line and ship your first container.

### Session 1 — Linux & Shell Scripting
- Linux commands & file system navigation
- File permissions (`chmod`, `chown`), users & groups
- Shell scripting basics — variables, conditionals, loops, functions
- Writing and running `.sh` scripts
- **Hands-on:** write a system-info script and a simple backup script

### Session 2 — Git & GitHub
- Version control basics
- `clone`, `add`, `commit`, `push`, `pull`
- Branches & pull requests
- `.gitignore`
- **Hands-on:** push a project to your own GitHub repo

### Session 3 — Docker Fundamentals
- Containers vs virtual machines
- Docker images & containers
- **Dockerfile creation**
- Build, run, and manage images & containers
- Push an image to **Docker Hub**
- **Hands-on:** containerize a sample application · push the Docker image to Docker Hub

### 📌 Week 1 Assignment
**"Create and deploy your own Dockerized application"** — containerize an app of your choice with a Dockerfile and push the image to Docker Hub.

### 📣 Your Week-1 visibility task
- 1 LinkedIn post + 1 short video on **what you learned this week** (script in [`WEEKLY-SCRIPTS.md`](WEEKLY-SCRIPTS.md))

---

## 🗓️ Week 2 — Kubernetes & Monitoring
**Goal:** Run and scale your containers on Kubernetes, and see them with monitoring.

### Session 1 — Kubernetes Core
- Kubernetes architecture (control plane & nodes)
- Pods
- Deployments
- Services
- `kubectl` basics
- **Hands-on:** deploy an application to Kubernetes · expose it using a Service

### Session 2 — Config, Networking & Scaling
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler (HPA)
- **Hands-on:** deploy a multi-tier application using ConfigMaps & Secrets

### Session 3 — Monitoring Introduction
- Why monitoring matters
- **Azure Monitor**
- **Container Insights** for AKS
- Metrics, logs & alerts
- **Demo:** enable Container Insights and read live cluster metrics

### 📌 Week 2 Assignment
**"Deploy a multi-tier application to Kubernetes."**

### 📣 Your Week-2 visibility task
- 1 LinkedIn post + 1 short video on Kubernetes & monitoring (script provided)

---

## 🗓️ Week 3 — Azure & CI/CD
**Goal:** Stand up cloud infrastructure on Azure and automate delivery with CI/CD.

### Session 1 — Azure Fundamentals
- Azure portal & resource groups
- Virtual Machine (VM) creation
- Azure networking basics (VNet, subnets, NSG)
- **Azure Load Balancer** (Layer-4 load balancing)
- **Application Gateway** (Layer-7 / ingress)
- **Hands-on:** create a VM · create a load balancer

### Session 2 — Azure Kubernetes Service (AKS)
- Create an **AKS** cluster
- **Azure Container Registry (ACR)**
- Connect `kubectl` to AKS
- Deploy your app to AKS
- **Hands-on:** create an AKS cluster · deploy an application to it

### Session 3 — Azure DevOps & CI/CD
- Azure DevOps Repositories
- Azure DevOps Pipelines
- CI/CD concepts
- **YAML pipelines**
- **Hands-on:** build a DevOps pipeline · automate the Docker image build → push to ACR → deploy to AKS

### 📌 Week 3 Assignment
**"Create a complete CI pipeline"** — a YAML pipeline that builds your image, pushes it to ACR, and deploys to AKS.

> 💳 **Reminder:** these labs run on your own Azure account and incur small charges. Delete resources (`az group delete ...`) after each lab.

### 📣 Your Week-3 visibility task
- 1 LinkedIn post + 1 short video on Azure & CI/CD (script provided)

---

## 🗓️ Week 4 — Capstone Project (Real-Time DevOps Project)
**Goal:** Prove your skills by building, shipping, and monitoring one real DevOps project.

Each student builds **one DevOps project individually**. The 10 projects (with their scenario, DevOps focus, and concepts) and the **Student-01 → Project 1 … Student-10 → Project 10** mapping are in [`PROJECTS-CATALOG.md`](PROJECTS-CATALOG.md). The flagship/worked example is **Project 1 — Banking Application on AKS**.

> ⚠️ Confirm your assigned project with your mentors, and make sure you're listed in the **Cohort Capstone Registry** in [`PROJECTS-CATALOG.md`](PROJECTS-CATALOG.md).

### Implementation (every project follows this backbone)
1. **Source code in GitHub**
2. **Dockerize** the application
3. **Azure CI/CD pipeline** (build → push to ACR → deploy)
4. **Deploy to Kubernetes (AKS)** — Service + Application Gateway
5. **Monitoring setup** — Azure Monitor + Container Insights
6. **Documentation**

### Internship deliverables (every student submits)
1. **GitHub Repository** — source, manifests, pipeline, README, screenshots
2. **Project Documentation** — problem statement, architecture, workflow, technologies used, future enhancements
3. **Project Demo Video** — 3–5 minutes (app running on AKS + pipeline + monitoring)
4. **Final Presentation** — problem, solution, demo, learnings

### 🎤 Demo Day
- Present your project to mentors & peers · live demo · Q&A

### 📣 Your Week-4 visibility task
- 1 capstone LinkedIn post (with GitHub link) + 1 demo video (scripts provided)

---

## 🎁 What you walk away with
By the end of 4 weeks, every student will:
- ✅ Be comfortable on Linux & the shell
- ✅ Build and manage Docker images & containers
- ✅ Deploy and scale applications on Kubernetes
- ✅ Provision Azure infrastructure (VM, networking, load balancing, AKS)
- ✅ Build a CI/CD pipeline with Azure DevOps
- ✅ Set up monitoring with Azure Monitor + Container Insights
- ✅ Publish a complete DevOps project on GitHub
- ✅ Add a real cloud/DevOps project to their resume
- ✅ Gain an **Internship Completion Certificate** & project experience
- ✅ Membership in the **2.4M+ CareerByteCode community**

> This curriculum is beginner-friendly, practical, and achievable within 4 weeks while still giving you a real DevOps project you can proudly showcase during placements and interviews.

---

📧 careerbytec@gmail.com · 🌐 www.careerbytecode.com · 💬 [WhatsApp group](https://chat.whatsapp.com/JvShK68sncb4IreV26k4sJ)

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
