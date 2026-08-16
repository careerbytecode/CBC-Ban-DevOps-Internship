# Step 3 — GitHub Connection and Azure DevOps Repository

## What We Wanted

After creating the Azure DevOps project, the next step was to connect the FlavorForge source repository hosted on GitHub with the Azure DevOps project.

For this project:

- GitHub is the primary source-control repository.
- Azure DevOps contains a corresponding Azure Repos repository.
- GitHub Actions is used to synchronize changes from GitHub to Azure DevOps.
- Azure DevOps can then use the synchronized repository for its CI/CD workflow.

The main components are:

```text
GitHub Repository
        ↓
GitHub main branch
        ↓
GitHub Actions
        ↓
Azure DevOps Repository
        ↓
Azure DevOps Pipeline
```

The confirmed project details are:

| Component | Value |
|---|---|
| GitHub repository | `flavorforge-azure-devsecops-capstone` |
| GitHub branch | `main` |
| Azure DevOps organization | `malathiabhilash` |
| Azure DevOps project | `FlavorForge – Azure DevSecOps Capstone` |
| Azure DevOps repository | `FlavorForge – Azure DevSecOps Capstone` |

---

# Step 3.1 — Verify the GitHub Repository

## Where We Went

Open the FlavorForge repository in GitHub.

The repository is:

```text
flavorforge-azure-devsecops-capstone
```

## What We Verified

The repository uses:

```text
main
```

as the primary branch.

The repository contains the FlavorForge application source code, infrastructure configuration, Kubernetes manifests, pipeline configuration, and project documentation.

The GitHub repository is therefore used as the primary source repository for the project.

The source-control structure is:

```text
GitHub
   ↓
flavorforge-azure-devsecops-capstone
   ↓
main
```

---

# Step 3.2 — Open the Azure DevOps Project

## Where We Went

Open the Azure DevOps organization:

```text
https://dev.azure.com/malathiabhilash/
```

Open the project:

```text
FlavorForge – Azure DevSecOps Capstone
```

## What We Clicked

From the Azure DevOps project, open:

```text
Repos
    ↓
Files
```

## What We Verified

The project contains an Azure Repos repository named:

```text
FlavorForge – Azure DevSecOps Capstone
```

The relationship is:

```text
Azure DevOps Organization
        ↓
malathiabhilash
        ↓
FlavorForge – Azure DevSecOps Capstone
        ↓
Repos
        ↓
FlavorForge – Azure DevSecOps Capstone
```

---

# Step 3.3 — Verify the Azure DevOps Repository

## Repository Name

The Azure DevOps repository is:

```text
FlavorForge – Azure DevSecOps Capstone
```

## Repository Branch

The primary branch is:

```text
main
```

## Where We Went

Open:

```text
Repos
    ↓
Files
    ↓
main
```

## What We Verified

The repository contains the FlavorForge project files.

The repository also contains:

```text
README.md
```

The README documents the FlavorForge Azure DevSecOps capstone and its technology stack.

---

# Step 3.4 — Define the GitHub-to-Azure DevOps Synchronization

## What We Wanted

The goal was to avoid manually pushing changes to both GitHub and Azure DevOps.

The required synchronization flow is:

```text
Local FlavorForge Repository
        ↓
git push origin main
        ↓
GitHub main
        ↓
GitHub Actions
        ↓
Azure DevOps main
```

After the synchronization workflow is configured, changes pushed to GitHub can be automatically synchronized to the Azure DevOps repository.

This removes the need to manually run:

```bash
git push azure main
```

for every change.

---

# Step 3.5 — Create an Azure DevOps Personal Access Token

## What We Needed

GitHub Actions requires authentication before it can push repository changes to Azure DevOps.

For this implementation, an Azure DevOps Personal Access Token (PAT) is used for authentication.

The PAT is used by GitHub Actions to authenticate with Azure DevOps.

## Important Security Rule

The PAT must be treated like a password.

The actual PAT value must:

- Not be committed to GitHub.
- Not be placed directly inside a workflow YAML file.
- Not be placed inside `azure-pipelines.yml`.
- Not be included in `sync-to-azure-devops.yml`.
- Not be included in screenshots or documentation.
- Not be shared publicly.

---

# Step 3.6 — Create the Azure DevOps PAT

## Where We Went

Open Azure DevOps.

Open the user profile/security area and select:

```text
Personal Access Tokens
```

## What We Clicked

Select:

```text
New Token
```

## What We Entered

For the token name:

```text
FlavorForge-GitHub-Sync
```

Select the required expiration period for the capstone.

The token requires repository permissions sufficient to push code to Azure Repos.

The required code permission is:

```text
Code → Read & Write
```

## What Happened

Azure DevOps generated the Personal Access Token.

The token value was copied immediately after creation and stored securely.

The actual token value is intentionally not included in this documentation.

---

# Step 3.7 — Store the PAT in GitHub Secrets

## What We Wanted

GitHub Actions needs access to the Azure DevOps PAT, but the PAT must not be hard-coded in the workflow.

Therefore, the PAT was stored as a GitHub Actions repository secret.

## Where We Went

Open the FlavorForge GitHub repository.

Go to:

```text
Settings
    ↓
Secrets and variables
    ↓
Actions
```

## What We Clicked

Click:

```text
New repository secret
```

## What We Entered

Secret name:

```text
AZURE_DEVOPS_PAT
```

Secret value:

```text
<Azure DevOps PAT>
```

The actual PAT value is stored securely in GitHub and is not included in the repository.

## What Happened

GitHub stored the PAT as a repository secret.

The workflow accesses it using:

```yaml
${{ secrets.AZURE_DEVOPS_PAT }}
```

The actual token value is never written into the workflow file.

---

# Step 3.8 — Store the Azure DevOps Repository URL

## What We Wanted

The GitHub Actions workflow also needs to know which Azure DevOps repository should receive the synchronized changes.

Therefore, the Azure DevOps repository URL was stored as another GitHub Actions repository secret.

## Where We Went

Open:

```text
GitHub Repository
    ↓
Settings
    ↓
Secrets and variables
    ↓
Actions
```

## What We Clicked

Click:

```text
New repository secret
```

## What We Entered

Secret name:

```text
AZURE_DEVOPS_REPO
```

Secret value:

```text
<Azure DevOps repository URL>
```

The actual Azure DevOps repository URL used for the project points to:

```text
malathiabhilash
    ↓
FlavorForge – Azure DevSecOps Capstone
    ↓
FlavorForge – Azure DevSecOps Capstone
```

The PAT is not included in the repository URL.

## Final GitHub Secrets

The repository uses the following secrets for the synchronization workflow:

| Secret | Purpose |
|---|---|
| `AZURE_DEVOPS_PAT` | Authenticates GitHub Actions with Azure DevOps |
| `AZURE_DEVOPS_REPO` | Identifies the Azure DevOps repository to synchronize |

---

# Step 3.9 — Create the GitHub Actions Synchronization Workflow

## What We Wanted

The next step was to automate synchronization between:

```text
GitHub main
      ↓
Azure DevOps main
```

The workflow runs when changes are pushed to the GitHub `main` branch.

It also supports manual execution through GitHub Actions.

## Where We Went

Open the local FlavorForge repository in the WSL terminal:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

## Create the Workflow Directory

Run:

```bash
mkdir -p .github/workflows
```

## Create the Workflow File

Run:

```bash
nano .github/workflows/sync-to-azure-devops.yml
```

---

# Step 3.10 — Add the Synchronization Workflow

Add the following workflow:

```yaml
name: Sync GitHub to Azure DevOps

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  sync:
    name: Sync main branch to Azure DevOps
    runs-on: ubuntu-latest

    steps:
      - name: Checkout GitHub repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Configure Git identity
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Push main to Azure DevOps
        env:
          AZURE_DEVOPS_PAT: ${{ secrets.AZURE_DEVOPS_PAT }}
          AZURE_DEVOPS_REPO: ${{ secrets.AZURE_DEVOPS_REPO }}
        run: |
          git remote add azure "$AZURE_DEVOPS_REPO"

          git -c http.extraheader="AUTHORIZATION: Basic $(printf ':%s' "$AZURE_DEVOPS_PAT" | base64 -w 0)" \
            push azure HEAD:main
```

Save the file:

```text
Ctrl + O
Enter
Ctrl + X
```

---

# Step 3.11 — Understand the Synchronization Workflow

The workflow is triggered by:

```yaml
on:
  push:
    branches:
      - main
```

This means the workflow starts when a change is pushed to the GitHub `main` branch.

The workflow also supports manual execution through:

```yaml
workflow_dispatch:
```

The repository is checked out using:

```yaml
actions/checkout@v4
```

The complete Git history is retrieved using:

```yaml
fetch-depth: 0
```

The Azure DevOps PAT is obtained securely from:

```yaml
${{ secrets.AZURE_DEVOPS_PAT }}
```

The Azure DevOps repository is obtained from:

```yaml
${{ secrets.AZURE_DEVOPS_REPO }}
```

The workflow adds the Azure DevOps repository as a Git remote:

```bash
git remote add azure "$AZURE_DEVOPS_REPO"
```

Finally, the current GitHub commit is pushed to the Azure DevOps `main` branch:

```bash
git push azure HEAD:main
```

The resulting flow is:

```text
GitHub main
     ↓
GitHub Actions
     ↓
Checkout repository
     ↓
Authenticate using GitHub Secret
     ↓
Add Azure DevOps remote
     ↓
Push HEAD to Azure DevOps main
```

---

# Step 3.12 — Verify the Workflow File

## Where We Went

From the WSL terminal, run:

```bash
cat .github/workflows/sync-to-azure-devops.yml
```

## What We Checked

The workflow should reference:

```text
secrets.AZURE_DEVOPS_PAT
```

and:

```text
secrets.AZURE_DEVOPS_REPO
```

The actual PAT value must not appear in the file.

### Correct

```yaml
AZURE_DEVOPS_PAT: ${{ secrets.AZURE_DEVOPS_PAT }}
```

### Incorrect

```yaml
AZURE_DEVOPS_PAT: abc123-your-real-token
```

The actual token must never be stored in the workflow file.

---

# Step 3.13 — Commit the Synchronization Workflow

From the FlavorForge repository, stage the workflow:

```bash
git add .github/workflows/sync-to-azure-devops.yml
```

Create the commit:

```bash
git commit -m "Add GitHub to Azure DevOps repository sync"
```

Before pushing, check the repository status:

```bash
git status
```

The synchronization workflow is now included in the Git history.

---

# Step 3.14 — Push the Workflow to GitHub

Push the workflow to GitHub:

```bash
git push origin main
```

The expected flow is:

```text
Local Repository
      ↓
git push origin main
      ↓
GitHub main
      ↓
GitHub Actions
      ↓
Sync GitHub to Azure DevOps
      ↓
Azure DevOps main
```

---

# Step 3.15 — Verify GitHub Actions

## Where We Went

Open the FlavorForge GitHub repository.

Go to:

```text
Actions
```

## What We Looked For

The workflow should appear as:

```text
Sync GitHub to Azure DevOps
```

Open the workflow run.

A successful workflow should show steps similar to:

```text
✓ Checkout GitHub repository
✓ Configure Git identity
✓ Push main to Azure DevOps
```

A successful final step confirms that GitHub Actions was able to authenticate and push the repository contents to Azure DevOps.

---

# Step 3.16 — Verify the Azure DevOps Repository

## Where We Went

Open the Azure DevOps project:

```text
FlavorForge – Azure DevSecOps Capstone
```

Go to:

```text
Repos
    ↓
Files
    ↓
main
```

## What We Verified

The latest synchronized changes should be present in Azure DevOps.

The repository should contain the corresponding FlavorForge project files.

The synchronization flow is:

```text
GitHub main
      ↓
GitHub Actions
      ↓
Azure DevOps main
```

---

# Step 3.17 — Verify Commit Synchronization

The GitHub and Azure DevOps repositories should contain the corresponding synchronized commit.

One previously verified synchronization point was:

```text
23a47f8
```

This commit can be used as a verification point when comparing the GitHub and Azure DevOps commit histories.

Check the commit history in both repositories and confirm that the corresponding commit is present.

> **Note:** The commit `23a47f8` is documented as a previously verified synchronization point. It should not be described as the commit created by the synchronization workflow unless the corresponding GitHub Actions run was specifically verified.

---

# Step 3.18 — Final Repository Architecture

The completed source-control architecture is:

```text
                         Developer
                             │
                             ▼
                      GitHub Repository
              flavorforge-azure-devsecops-capstone
                             │
                             │ push main
                             ▼
                       GitHub Actions
                             │
                             │ authentication
                             │
                             │ AZURE_DEVOPS_PAT
                             ▼
                      Azure DevOps
                      malathiabhilash
                             │
                             ▼
              FlavorForge – Azure DevSecOps Capstone
                             │
                             ▼
                        Azure Repos
                             │
                             ▼
                            main
```

The two repositories serve different roles:

```text
GitHub
  ↓
Primary source repository

Azure DevOps
  ↓
Synchronized repository
  ↓
Used by Azure DevOps CI/CD workflow
```

---

# Verify

The following project and synchronization components were verified:

| Item | Confirmed Value |
|---|---|
| GitHub repository | `flavorforge-azure-devsecops-capstone` |
| GitHub branch | `main` |
| Azure DevOps organization | `malathiabhilash` |
| Azure DevOps project | `FlavorForge – Azure DevSecOps Capstone` |
| Azure DevOps repository | `FlavorForge – Azure DevSecOps Capstone` |
| GitHub secret | `AZURE_DEVOPS_PAT` |
| GitHub secret | `AZURE_DEVOPS_REPO` |
| Synchronization workflow | `sync-to-azure-devops.yml` |
| Synchronization direction | GitHub → Azure DevOps |

---

# Screenshot

## Screenshot 1 — GitHub Repository

Use the actual screenshot captured from GitHub showing:

```text
flavorforge-azure-devsecops-capstone
```

and the:

```text
main
```

branch.

Use the actual screenshot filename from the repository.

Do not invent a screenshot path.

```text
[Insert actual GitHub repository screenshot]
```

---

## Screenshot 2 — Azure DevOps Repository

Use the actual screenshot captured from:

```text
FlavorForge – Azure DevSecOps Capstone
    ↓
Repos
    ↓
Files
```

The screenshot should show the repository contents and `main` branch.

```text
[Insert actual Azure DevOps repository screenshot]
```

---

## Screenshot 3 — GitHub Actions

Use the actual screenshot captured from:

```text
GitHub
    ↓
Actions
    ↓
Sync GitHub to Azure DevOps
```

The screenshot should show the successful workflow run.

```text
[Insert actual GitHub Actions synchronization screenshot]
```

---

## Screenshot 4 — GitHub Repository Secrets

Use the actual screenshot captured from:

```text
GitHub
    ↓
Settings
    ↓
Secrets and variables
    ↓
Actions
```

The screenshot should show the secret names:

```text
AZURE_DEVOPS_PAT
AZURE_DEVOPS_REPO
```

**Important:** The actual PAT value must never be visible in the screenshot.

```text
[Insert actual GitHub Actions Secrets screenshot]
```

---

# Result

The FlavorForge GitHub repository was connected to the corresponding Azure DevOps repository using GitHub Actions.

The final synchronization flow is:

```text
Developer
    ↓
GitHub
    ↓
main
    ↓
GitHub Actions
    ↓
Azure DevOps
    ↓
FlavorForge – Azure DevSecOps Capstone
    ↓
Repos
    ↓
main
```

GitHub remains the primary source repository, while Azure DevOps receives synchronized repository changes for the Azure DevOps CI/CD workflow.

The GitHub Actions workflow uses:

```text
AZURE_DEVOPS_PAT
```

for Azure DevOps authentication and:

```text
AZURE_DEVOPS_REPO
```

to identify the destination repository.

The PAT value is not stored in the source code or workflow YAML.

The GitHub-to-Azure DevOps repository synchronization is now configured and ready for the next Azure DevOps configuration step.


