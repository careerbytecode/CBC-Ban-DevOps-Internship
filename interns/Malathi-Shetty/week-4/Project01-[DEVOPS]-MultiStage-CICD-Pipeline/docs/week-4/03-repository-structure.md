# 3. Repository Structure

The FlavorForge Azure DevSecOps Capstone repository is organized into separate directories for the application source code, containerization, Kubernetes manifests, CI/CD pipelines, documentation, automation scripts, and project artifacts.

```text
flavorforge-azure-devsecops-capstone/
├── backend/                     # Node.js REST API
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                    # React + Vite application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── kubernetes/                  # Kubernetes manifests
│   ├── base/
│   │   ├── backend/
│   │   ├── frontend/
│   │   ├── config/
│   │   ├── ingress/
│   │   └── autoscaling/
│   └── overlays/
│       ├── dev/
│       ├── qa/
│       └── prod/
│
├── argocd/                      # GitOps configuration
│   ├── flavorforge-app.yaml
│   └── README.md
│
├── docker/                      # Docker documentation
│
├── scripts/                     # Automation scripts
│   ├── setup.sh
│   ├── deploy.sh
│   ├── verify.sh
│   ├── clean.sh
│   └── azure-manager.sh
│
├── docs/                        # Project documentation
│   ├── architecture/
│   ├── implementation/
│   ├── pipeline/
│   ├── troubleshooting/
│   ├── presentation/
│   └── project/
│
├── screenshots/                 # Project evidence
│
├── azure-pipelines.yml          # Azure DevOps CI/CD pipeline
├── argocd-pipeline.yml          # GitOps pipeline
├── docker-compose.yml           # Local development
├── README.md
├── LICENSE
└── SECURITY.md
```

> The repository is structured to separate application source code, infrastructure configuration, CI/CD pipelines, GitOps deployment, automation scripts, documentation, and supporting project artifacts. This modular organization improves maintainability, scalability, and ease of collaboration throughout the software development lifecycle.

<img width="871" height="133" alt="image" src="https://github.com/user-attachments/assets/062d67d1-b3f2-45e1-92e0-38cc85603601" />
<img width="432" height="1132" alt="image" src="https://github.com/user-attachments/assets/53230f39-897d-45b3-802e-0b3e37b01b89" />
<img width="421" height="1282" alt="image" src="https://github.com/user-attachments/assets/2632776d-fe11-4c19-8a9e-31b0eec86e2d" />

<img width="852" height="731" alt="image" src="https://github.com/user-attachments/assets/33f94559-0d12-46b3-81c2-b432717faf0a" />

<img width="683" height="905" alt="image" src="https://github.com/user-attachments/assets/d9523f35-b031-4a9c-889b-592857c4ebba" />
<img width="492" height="1098" alt="image" src="https://github.com/user-attachments/assets/11328c7e-9210-4032-81ae-b7fa9c1a8977" />

