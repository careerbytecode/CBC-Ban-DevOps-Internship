# 🏦 Banking Application on AKS

> **Track:** `[DEVOPS]`  ·  **Intern:** `Aarav S`  ·  **Project No:** `01`

> ⭐ **This is a worked example** showing the standard every intern should aim for. Study how each section is filled in, then do the same for your own DevOps project.

---

## 💡 About Me
Hi! I'm **Aarav S**, an aspiring **Cloud / DevOps engineer** at CareerByteCode, focused on shipping reliable applications to Kubernetes.
- 📧 Email: aarav.s@example.com
- 🔗 LinkedIn: https://www.linkedin.com/in/example-intern/

---

## 📝 Project Description
A containerized **banking web application** deployed to **Azure Kubernetes Service (AKS)** through a fully automated **Azure DevOps CI/CD pipeline**. Configuration is managed with ConfigMaps and credentials with Secrets, traffic is routed through an Application Gateway, and the cluster is monitored with Azure Monitor + Container Insights.

---

## 📌 Problem Statement
Banking apps need consistent, repeatable, and observable deployments. Doing this by hand is slow and error-prone. This project automates the whole path — from a `git push` to a running, monitored app on Kubernetes — so releases are reliable and every change is traceable.

---

## 🎯 Objectives / DevOps Focus
- **Containerize** the banking app with a clean Dockerfile.
- **Automate delivery** with an Azure DevOps YAML pipeline (build → push to ACR → deploy to AKS).
- **Run on Kubernetes** with a Deployment, Service, and **Application Gateway** ingress.
- **Manage config & secrets** via ConfigMaps and Secrets.
- **Monitor** the cluster with Azure Monitor + Container Insights.

---

## 🏗️ Architecture & Workflow
```
Developer → GitHub (push)
          → Azure DevOps Pipeline
                ├── Build Docker image (app/Dockerfile)
                ├── Push image → Azure Container Registry (ACR)
                └── Deploy manifests → AKS
          → AKS: Deployment → Service → Application Gateway (L7 ingress) → users
          → Azure Monitor + Container Insights (metrics, logs, alerts)
```
1. Code is pushed to GitHub (the `main` branch triggers the pipeline).
2. The **Build** stage builds the image and pushes it to **ACR**.
3. The **Deploy** stage applies the `k8s/` manifests to **AKS**.
4. The app is exposed through the **Application Gateway** ingress.
5. **Container Insights** shows pod CPU/memory, logs, and alerts on restarts.

---

## 🧠 Tech Stack & Tools
- **OS / Shell:** Linux, Bash
- **Containers:** Docker
- **Orchestration:** Kubernetes (AKS)
- **Cloud:** Microsoft Azure — ACR, AKS, Application Gateway, Azure Monitor
- **CI/CD:** Azure DevOps Pipelines (YAML)
- **App language:** Python (Flask) — stand-in for the banking app

---

## 📂 Project Structure
```
📁 app/                – Flask banking app + Dockerfile
📁 k8s/                – deployment, service, ingress, configmap, secret, hpa
📄 azure-pipelines.yml – CI/CD pipeline (build → ACR → AKS)
📁 scripts/            – provision.sh (Azure CLI: RG + ACR + AKS)
📁 architecture/       – architecture diagram
📁 screenshots/        – pipeline run, pods, app live, Container Insights
📄 README.md
```

---

## 📦 How to Run
```bash
# 1. Build & run locally (free)
docker build -t cbc-banking-app ./app
docker run -p 5000:5000 cbc-banking-app
# open http://localhost:5000

# 2. Provision Azure (incurs small costs)
bash scripts/provision.sh      # edit values inside first

# 3. Build & push image to your ACR, then deploy
kubectl apply -f k8s/

# 4. Find the app address
kubectl get ingress

# 5. CLEAN UP (stop charges)
az group delete --name cbc-devops-rg --yes --no-wait
```

---

## 📈 Results & Screenshots
- ✅ Pipeline run: green Build + Deploy stages — `screenshots/pipeline-run.png`
- ✅ `kubectl get pods` showing 2 Running pods — `screenshots/pods-running.png`
- ✅ Banking app open via Application Gateway — `screenshots/app-live.png`
- ✅ Container Insights dashboard — `screenshots/container-insights.png`
- 🎥 Demo video (3–5 min): `screenshots/demo-link.txt`

---

## 🗒️ Learnings
- Attaching ACR to AKS (`--attach-acr`) avoids `ImagePullBackOff` headaches.
- Keeping Secrets out of Git (and noting Azure Key Vault for production) matters even in a demo.
- Container Insights made it obvious when a pod was restarting under load.

---

## 🔮 Future Enhancements
- Add Horizontal Pod Autoscaler tuning + a load test.
- Move secrets to **Azure Key Vault** with the CSI driver.
- Add a staging environment and approvals in the pipeline.

---

## ✅ Conclusion
The banking app goes from a `git push` to a running, monitored deployment on AKS with no manual steps. Objectives met: containerized, automated, deployed, secured, and observable.

---

## 🔗 My Visibility Links
| Item | Link |
|------|------|
| LinkedIn post (tagged @CareerByteCode + all 7 mentors) | https://www.linkedin.com/posts/example-w4 |
| Self-speech video — LinkedIn | https://www.linkedin.com/posts/example-w4v |
| Self-speech video — Instagram (careerbytecode collaborator) | https://www.instagram.com/reel/example-w4 |

### 📬 Submission Checklist
- [x] App + Dockerfile, k8s manifests, and azure-pipelines.yml pushed to my folder
- [x] README fully filled in
- [x] Screenshots + 3–5 min demo included
- [x] LinkedIn post done & tagged
- [x] Self-speech video on LinkedIn
- [x] Self-speech video on Instagram with `careerbytecode` collaborator
- [x] Azure resources deleted after testing
- [x] All links logged in `SUBMISSIONS.md`

---

🧑‍💻 _Project done as part of the **CareerByteCode Bangalore — Cloud & DevOps Internship Program**_ 🔥
