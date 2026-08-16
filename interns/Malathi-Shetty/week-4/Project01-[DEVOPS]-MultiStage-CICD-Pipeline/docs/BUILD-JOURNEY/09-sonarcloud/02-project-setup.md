# SonarQube Cloud Project Setup

## What We Wanted to Do

After creating the SonarQube Cloud account and connecting it with Azure DevOps, the next step was to configure the **FlavorForge project** for code-quality analysis.

The project setup connects:

```text
GitHub
   |
   v
FlavorForge Repository
   |
   v
SonarQube Cloud Project
   |
   v
Azure DevOps Pipeline
   |
   v
SonarQube Cloud Analysis
```

The objective was to make sure that SonarQube Cloud knows:

- Which repository belongs to the project.
- Which organization owns the project.
- Which project key identifies the project.
- Which project name should be displayed.
- Which source code should be analyzed.
- How the Azure DevOps pipeline should identify the project.

---

# 1. Verify the FlavorForge Repository

The source code for the project is maintained in GitHub.

The repository used for this project is:

```text
flavorforge-azure-devsecops-capstone
```

The repository contains the application source code and infrastructure required for the FlavorForge DevSecOps implementation.

The major application directories are:

```text
backend/
frontend/
docker/
kubernetes/
argocd/
docs/
```

SonarQube Cloud analyzes the source code from this repository as part of the CI/CD process.

---

# 2. Open the SonarQube Cloud Project

Sign in to SonarQube Cloud.

Open the organization and locate the FlavorForge project.

The project dashboard provides the central view of the code-quality analysis.

The dashboard can show information such as:

```text
Quality Gate
Reliability
Security
Maintainability
Coverage
Duplications
Lines of Code
Issues
```

### Screenshot

The existing project dashboard screenshot is:

![FlavorForge SonarQube Cloud Project](/screenshots/build-journey/sonarqube/projects-sonarCloud-dashboard.png)

**Evidence file:**

```text
screenshots/build-journey/sonarqube/projects-sonarCloud-dashboard.png
```

This screenshot provides evidence that the FlavorForge project exists in SonarQube Cloud.

---

# 3. Identify the SonarQube Cloud Organization

The SonarQube Cloud organization is used to group the project's analysis results.

For the FlavorForge setup, the organization configured for the pipeline is:

```text
malathi-shetty
```

The organization value must match the organization configured in SonarQube Cloud.

It is later referenced by the Azure DevOps pipeline.

Example:

```yaml
organization: 'malathi-shetty'
```

The organization should not be confused with:

```text
Azure Subscription
Azure Resource Group
Azure DevOps Project
GitHub Repository
```

They are separate components of the overall DevSecOps architecture.

---

# 4. Identify the SonarQube Cloud Project Name

The project name displayed in SonarQube Cloud is:

```text
FlavorForge
```

The project name is the human-readable name shown in the SonarQube Cloud interface.

The Azure DevOps pipeline uses the project name when preparing the analysis.

Example:

```yaml
cliProjectName: 'FlavorForge'
```

---

# 5. Identify the SonarQube Cloud Project Key

The project key is the unique identifier used by SonarQube Cloud to identify the project.

For FlavorForge, the configured project key is:

```text
shettymalathib_flavorforge-azure-devsecops-capstone
```

The project key is different from the project display name.

```text
Project Name:
FlavorForge

Project Key:
shettymalathib_flavorforge-azure-devsecops-capstone
```

The project key must remain consistent between SonarQube Cloud and the Azure DevOps pipeline.

Example:

```yaml
cliProjectKey: 'shettymalathib_flavorforge-azure-devsecops-capstone'
```

---

# 6. Project Configuration Summary

The important SonarQube Cloud project values are:

| Setting | Value |
|---|---|
| Organization | `malathi-shetty` |
| Project Name | `FlavorForge` |
| Project Key | `shettymalathib_flavorforge-azure-devsecops-capstone` |
| Repository | `flavorforge-azure-devsecops-capstone` |
| Analysis Platform | SonarQube Cloud |
| CI/CD Platform | Azure DevOps |

These values are used consistently throughout the SonarQube Cloud integration.

---

# 7. Repository and SonarQube Cloud Relationship

The relationship between the GitHub repository and SonarQube Cloud project can be represented as:

```text
GitHub
  |
  | flavorforge-azure-devsecops-capstone
  |
  v
SonarQube Cloud
  |
  | Organization:
  | malathi-shetty
  |
  | Project:
  | FlavorForge
  |
  | Project Key:
  | shettymalathib_flavorforge-azure-devsecops-capstone
  |
  v
Code Quality Analysis
```

The SonarQube Cloud project provides the destination where the analysis results are stored and displayed.

---

# 8. Configure the Project Analysis Properties

The repository contains a SonarQube configuration file:

```text
sonar-project.properties
```

This file is located at the repository root:

```text
flavorforge-azure-devsecops-capstone/
├── sonar-project.properties
├── azure-pipelines.yml
├── backend/
├── frontend/
├── kubernetes/
└── ...
```

The file provides project-level configuration that can be used by the SonarQube scanner.

Before changing any values, verify the existing repository configuration.

Use:

```bash
cd ~/flavorforge-azure-devsecops-capstone
cat sonar-project.properties
```

This allows the existing project configuration to be reviewed before making changes.

---

# 9. Verify the SonarQube Configuration File

The repository already contains:

```text
sonar-project.properties
```

The configuration should correspond to the SonarQube Cloud project.

The important concepts are:

```text
SonarQube Cloud Organization
        |
        v
SonarQube Cloud Project Key
        |
        v
Source Code
        |
        v
Analysis
```

Do not add authentication tokens to this file.

The authentication token belongs in the secure Azure DevOps service connection.

---

# 10. Do Not Store Credentials in `sonar-project.properties`

The following type of configuration must never be added:

```properties
sonar.token=my-real-token
```

or:

```properties
sonar.login=my-real-token
```

A credential inside the repository would create a security risk because anyone with repository access could potentially obtain it.

The correct separation is:

```text
sonar-project.properties
        |
        | Project configuration
        v
GitHub Repository


Azure DevOps Service Connection
        |
        | Authentication credential
        v
SonarQube Cloud
```

---

# 11. Verify the Project Key

The project key configured in SonarQube Cloud must match the project key used by the Azure DevOps pipeline.

Expected value:

```text
shettymalathib_flavorforge-azure-devsecops-capstone
```

Pipeline configuration:

```yaml
cliProjectKey: 'shettymalathib_flavorforge-azure-devsecops-capstone'
```

If these values do not match, SonarQube Cloud may create or reference a different project instead of the intended FlavorForge project.

Therefore, this value should be checked carefully before running the pipeline.

---

# 12. Verify the Project Name

The project name used by the pipeline is:

```text
FlavorForge
```

Pipeline configuration:

```yaml
cliProjectName: 'FlavorForge'
```

The project name is primarily used as the human-readable project identifier.

The project key is the unique project identifier.

Therefore:

```text
Human-readable name:
FlavorForge

Unique project identifier:
shettymalathib_flavorforge-azure-devsecops-capstone
```

---

# 13. Verify the Organization

The organization configured for the project is:

```text
malathi-shetty
```

The pipeline references the same organization:

```yaml
organization: 'malathi-shetty'
```

The organization value must correspond to the SonarQube Cloud organization where the FlavorForge project exists.

---

# 14. Verify the Azure DevOps Service Connection

The project setup depends on the service connection created in the previous step.

The overall relationship is:

```text
SonarQube Cloud
      |
      | Organization
      | Project
      | Token
      v
Azure DevOps Service Connection
      |
      v
Azure DevOps Pipeline
```

The service connection provides authentication.

The project key and project name identify the analysis destination.

These responsibilities should remain separate.

---

# 15. Verify the Existing Service Connection

The repository already contains evidence of the service connection.

### Screenshot

![Azure DevOps SonarQube Cloud Service Connection](/screenshots/build-journey/sonarqube/azure-devops-sonarcloud-service-connection.png)

**Evidence file:**

```text
screenshots/build-journey/sonarqube/azure-devops-sonarcloud-service-connection.png
```

The service connection should be available under:

```text
Azure DevOps
   |
   v
Project Settings
   |
   v
Service connections
```

---

# 16. Verify Successful Connection

The existing repository also contains evidence showing the service connection verification.

### Screenshot

![SonarQube Cloud Service Connection Verified](/screenshots/build-journey/sonarqube/settings-sonarcloud-service-connection-verified.png)

**Evidence file:**

```text
screenshots/build-journey/sonarqube/settings-sonarcloud-service-connection-verified.png
```

This confirms that the Azure DevOps service connection was successfully verified.

---

# 17. Verify the Local Repository

Before integrating SonarQube Cloud into the pipeline, verify that the repository contains the required configuration files.

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone

ls -l sonar-project.properties
ls -l azure-pipelines.yml
```

Expected files:

```text
sonar-project.properties
azure-pipelines.yml
```

Also verify the Git working tree:

```bash
git status
```

The working tree should be checked before making any configuration changes.

---

# 18. Verify the SonarQube Configuration

Display the project configuration:

```bash
cat sonar-project.properties
```

Review the configuration carefully.

The purpose of this verification is to ensure that:

- The project configuration file exists.
- The file is located at the repository root.
- No authentication token is stored in the file.
- The project configuration is compatible with the SonarQube Cloud project.
- The Azure DevOps pipeline remains the main CI/CD integration point.

---

# 19. Project Setup Flow

The complete project setup can now be represented as:

```text
                     GitHub
                       |
                       v
       flavorforge-azure-devsecops-capstone
                       |
                       v
              SonarQube Cloud
                       |
          +------------+------------+
          |                         |
          v                         v
   Organization                Project
   malathi-shetty              FlavorForge
                                    |
                                    v
                              Project Key
                  shettymalathib_flavorforge-
                  azure-devsecops-capstone
                                    |
                                    v
                         Azure DevOps Pipeline
                                    |
                                    v
                           SonarQube Analysis
```

---

# 20. Configuration Checklist

Verify the following before moving to pipeline integration:

- [x] SonarQube Cloud account is accessible.
- [x] SonarQube Cloud dashboard is available.
- [x] FlavorForge project exists.
- [x] Organization is identified.
- [x] Project name is identified.
- [x] Project key is identified.
- [x] Authentication token was created.
- [x] Token is not stored in the repository.
- [x] Azure DevOps SonarQube Cloud service connection exists.
- [x] Service connection verification succeeded.
- [x] `sonar-project.properties` exists.
- [x] `azure-pipelines.yml` exists.
- [x] Project key can be matched with the pipeline configuration.

---

# 21. Evidence Used

The following existing screenshots are used as evidence for the SonarQube Cloud project setup:

```text
screenshots/build-journey/sonarqube/
├── Login.png
├── projects-sonarCloud-dashboard.png
├── sonarqube-Access-Tokens.png
├── azure-devops-sonarcloud-service-connection.png
└── settings-sonarcloud-service-connection-verified.png
```

Relevant evidence:

| Evidence | Purpose |
|---|---|
| `projects-sonarCloud-dashboard.png` | SonarQube Cloud project/dashboard |
| `azure-devops-sonarcloud-service-connection.png` | Azure DevOps service connection |
| `settings-sonarcloud-service-connection-verified.png` | Service connection verification |

The token screenshot is treated as sensitive evidence and must not expose the actual token value.

---

# Result

The FlavorForge SonarQube Cloud project configuration was prepared for Azure DevOps pipeline integration.

The important project configuration is:

```text
Organization:
malathi-shetty

Project:
FlavorForge

Project Key:
shettymalathib_flavorforge-azure-devsecops-capstone

Repository:
flavorforge-azure-devsecops-capstone
```

The project is now ready for the next stage:

```text
SonarQube Cloud Project
        |
        v
Azure DevOps Service Connection
        |
        v
Azure DevOps Pipeline
        |
        v
SonarQube Cloud Analysis
        |
        v
Quality Gate
```
