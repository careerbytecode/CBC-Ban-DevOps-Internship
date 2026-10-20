from pathlib import Path
from datetime import datetime

ROOT = Path(".")


def exists(path):
    return Path(path).exists()


def search_files(pattern):
    return any(ROOT.rglob(pattern))


def search_content(keyword):
    for file in ROOT.rglob("*"):
        if file.is_file():
            try:
                content = file.read_text(
                    encoding="utf-8",
                    errors="ignore"
                )

                if keyword.lower() in content.lower():
                    return True

            except Exception:
                pass

    return False


components = {

    # ==========================
    # Application
    # ==========================

    "Frontend Application": exists("frontend"),

    "Backend API": exists("backend"),

    # ==========================
    # Containerization
    # ==========================

    "Docker Containerization": search_files("Dockerfile"),

    "Azure Container Registry (ACR)": (
        search_content("containerRegistry")
        or search_content(".azurecr.io")
        or search_content("acr")
    ),

    # ==========================
    # CI/CD
    # ==========================

    "Azure DevOps Pipeline": exists("azure-pipelines.yml"),

    # ==========================
    # Kubernetes
    # ==========================

    "Kubernetes Deployment": exists("kubernetes"),

    "Ingress": (
        search_content("kind: Ingress")
        or search_content("ingressClassName")
    ),

    "Secrets": (
        search_content("kind: Secret")
        or search_content("secretKeyRef")
    ),

    "Horizontal Pod Autoscaler (HPA)": (
        search_content("HorizontalPodAutoscaler")
        or search_content("kind: HorizontalPodAutoscaler")
        or search_content("autoscaling/v2")
    ),

    # ==========================
    # GitOps
    # ==========================

    "ArgoCD GitOps": (
        exists("argocd")
        or search_content("argocd")
        or search_content("Application")
    ),

    # ==========================
    # DevSecOps
    # ==========================

    "SonarCloud Integration": (
        search_content("SonarCloud")
        or search_content("SonarQube")
        or search_content("sonar")
    ),

    "Trivy Security Scan": (
        search_content("trivy")
        or search_content("Trivy")
    ),

    # ==========================
    # Monitoring
    # ==========================

    "Azure Monitor": (
        search_content("azure monitor")
        or search_content("Azure Monitor")
        or search_content("Container Insights")
        or search_content("monitoring")
    ),

    # ==========================
    # Documentation
    # ==========================

    "Documentation": exists("docs"),
}


report = []

report.append("# 📊 FlavorForge Automated Project Status\n\n")

report.append(
    f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
)

report.append("| Component | Status |\n")
report.append("|-----------|--------|\n")

for component, detected in components.items():

    status = "✅ Detected" if detected else "❌ Not Found"

    report.append(
        f"| {component} | {status} |\n"
    )

output = Path("docs/generated/PROJECT_STATUS.md")

output.parent.mkdir(
    parents=True,
    exist_ok=True
)

output.write_text(
    "".join(report),
    encoding="utf-8"
)

print("Documentation generated successfully")