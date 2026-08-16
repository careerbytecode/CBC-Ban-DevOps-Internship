# SonarQube Cloud Pipeline Integration

## What We Wanted to Do

After creating the FlavorForge project in SonarQube Cloud, the next step was to integrate SonarQube Cloud with the Azure DevOps CI/CD pipeline.

The objective was to make SonarQube Cloud automatically analyze the FlavorForge source code during the pipeline and publish the resulting Quality Gate status.

The integration follows this flow:

```text
GitHub Repository
       |
       v
Azure DevOps Pipeline
       |
       v
CodeQuality Stage
       |
       +----------------------+
       |                      |
       v                      v
SonarCloudPrepare@4      Test & Coverage
       |                      |
       +----------+-----------+
                  |
                  v
        SonarCloudAnalyze@4
                  |
                  v
        SonarCloudPublish@4
                  |
                  v
             Quality Gate
```

The pipeline configuration is stored in:

```text
azure-pipelines.yml
```

The SonarQube Cloud project configuration is stored in:

```text
sonar-project.properties
```

---

# 1. Verify the Azure DevOps Pipeline

The FlavorForge repository contains the Azure DevOps pipeline configuration at the repository root:

```text
flavorforge-azure-devsecops-capstone/
├── azure-pipelines.yml
├── sonar-project.properties
├── backend/
├── frontend/
├── kubernetes/
└── ...
```

The pipeline contains a dedicated stage for SonarQube Cloud analysis.

The stage is:

```yaml
- stage: CodeQuality
  displayName: "SonarCloud Code Quality Analysis"
  dependsOn: Security
```

This means the SonarCloud analysis is performed after the Security stage has completed successfully.

---

# 2. Verify the Code Quality Stage

The Code Quality stage contains a job named:

```yaml
- job: SonarScan
  displayName: "Run SonarCloud Analysis"
```

The purpose of this job is to prepare, execute, and publish the SonarQube Cloud analysis.

The pipeline flow is:

```text
Build
  |
  v
Test
  |
  v
Security
  |
  v
CodeQuality
  |
  +--> SonarCloud Preparation
  |
  +--> Backend Tests
  |
  +--> Frontend Tests
  |
  +--> Coverage
  |
  +--> SonarCloud Analysis
  |
  +--> Quality Gate
```

---

# 3. Checkout the Repository

The SonarCloud job first checks out the source code:

```yaml
- checkout: self
  fetchDepth: 0
```

The repository is checked out with full Git history.

This provides the pipeline with the source files required for analysis and the complete repository history available to the build agent.

---

# 4. Prepare SonarQube Cloud Analysis

The pipeline uses the SonarCloud Azure DevOps task:

```yaml
- task: SonarCloudPrepare@4
  displayName: "Prepare SonarCloud Analysis"
```

This task prepares the SonarQube Cloud analysis before the tests and scanner execution.

The configuration uses the existing Azure DevOps service connection:

```yaml
SonarCloud: 'flavorforge-sonarcloud-sc'
```

The service connection provides the authentication required for Azure DevOps to communicate with SonarQube Cloud.

---

# 5. Configure the SonarQube Cloud Organization

The pipeline specifies the SonarQube Cloud organization:

```yaml
organization: 'malathi-shetty'
```

This corresponds to the organization configured in SonarQube Cloud.

The organization identifies where the FlavorForge project belongs.

The organization is:

```text
malathi-shetty
```

---

# 6. Configure the SonarQube Cloud Project

The pipeline uses manual project configuration:

```yaml
scannerMode: 'cli'
configMode: 'manual'
```

The project key is:

```yaml
cliProjectKey: 'shettymalathib_flavorforge-azure-devsecops-capstone'
```

The project name is:

```yaml
cliProjectName: 'FlavorForge'
```

Therefore, the pipeline identifies the SonarQube Cloud project as:

```text
Organization:
malathi-shetty

Project:
FlavorForge

Project Key:
shettymalathib_flavorforge-azure-devsecops-capstone
```

The project key must remain consistent with the project created in SonarQube Cloud.

---

# 7. Configure the Source Directories

The pipeline specifies the source directories to be analyzed:

```yaml
sonar.sources=backend/src,frontend/src,kubernetes
```

The analysis therefore includes:

```text
backend/src
frontend/src
kubernetes
```

These directories contain the application source code and Kubernetes configuration that are relevant to the project's code-quality analysis.

---

# 8. Configure SonarQube Exclusions

The pipeline excludes JavaScript test files from the source analysis:

```yaml
sonar.exclusions=**/*.test.js
```

This prevents test files matching the pattern from being treated as normal source files during the analysis.

The repository-level configuration also contains broader exclusions for generated and dependency directories:

```text
**/node_modules/**
**/dist/**
**/.git/**
**/*.test.js
```

The repository-level configuration is maintained in:

```text
sonar-project.properties
```

---

# 9. Configure JavaScript Coverage Reports

The pipeline provides the locations of the JavaScript LCOV coverage reports:

```yaml
sonar.javascript.lcov.reportPaths=backend/coverage/lcov.info,frontend/coverage/lcov.info
```

The expected coverage files are:

```text
backend/coverage/lcov.info
frontend/coverage/lcov.info
```

The coverage information allows SonarQube Cloud to include test coverage information in the project analysis.

The repository-level configuration contains the same coverage paths:

```properties
sonar.javascript.lcov.reportPaths=backend/coverage/lcov.info,frontend/coverage/lcov.info
```

---

# 10. Configure Source Encoding

The pipeline specifies UTF-8 source encoding:

```yaml
sonar.sourceEncoding=UTF-8
```

This ensures that the source files are interpreted using UTF-8 encoding during analysis.

---

# 11. Install Node.js

Before running the application tests, the pipeline installs Node.js 22:

```yaml
- task: UseNode@1
  displayName: "Install Node.js 22 LTS"
  inputs:
    version: "22.x"
```

This provides a consistent Node.js runtime for the backend and frontend test execution.

---

# 12. Install Backend Dependencies

The pipeline installs backend dependencies using:

```bash
cd backend
npm ci --ignore-scripts
```

The `npm ci` command installs dependencies based on the existing lock file.

The pipeline does not execute package installation scripts because `--ignore-scripts` is used.

---

# 13. Run Backend Tests with Coverage

The backend tests are executed using:

```bash
cd backend
npm test -- --coverage
```

The purpose of this step is to execute the backend Jest tests and generate coverage information.

The expected coverage output is stored under:

```text
backend/coverage/
```

The LCOV report used by SonarQube Cloud is:

```text
backend/coverage/lcov.info
```

---

# 14. Install Frontend Dependencies and Run Tests

The frontend dependencies are installed and the frontend tests are executed using:

```bash
cd frontend
npm ci --ignore-scripts
npm run test
```

The frontend coverage output is generated under:

```text
frontend/coverage/
```

The SonarQube Cloud analysis uses:

```text
frontend/coverage/lcov.info
```

---

# 15. Publish Test Results

The pipeline publishes the backend test results using:

```yaml
- task: PublishTestResults@2
  displayName: "Publish Test Results"
```

The configured test result file is:

```text
backend/coverage/junit.xml
```

The pipeline is configured to fail this task when test failures are detected:

```yaml
failTaskOnFailedTests: true
```

This provides Azure DevOps with test execution results from the backend test suite.

---

# 16. Publish Backend Code Coverage

The pipeline publishes backend coverage using:

```yaml
- task: PublishCodeCoverageResults@2
  displayName: "Publish Code Coverage"
```

The configured coverage report is:

```text
backend/coverage/lcov.info
```

The coverage directory is:

```text
backend/coverage
```

This makes the generated backend coverage available to Azure DevOps.

---

# 17. Publish Frontend Code Coverage

The pipeline separately publishes frontend coverage:

```yaml
- task: PublishCodeCoverageResults@2
  displayName: "Publish Frontend Coverage"
```

The configured coverage report is:

```text
frontend/coverage/lcov.info
```

The coverage directory is:

```text
frontend/coverage
```

This allows the frontend coverage information to be published separately from the backend coverage.

---

# 18. Verify Coverage Reports

The pipeline verifies that the coverage files were generated.

The backend coverage directory is inspected using:

```bash
ls -R backend/coverage
```

The frontend coverage directory is inspected using:

```bash
ls -R frontend/coverage
```

The pipeline also previews the backend LCOV file:

```bash
head -20 backend/coverage/lcov.info
```

This provides a basic verification that the coverage report exists before the SonarCloud scanner runs.

---

# 19. Run SonarQube Cloud Analysis

After the tests and coverage generation are completed, the pipeline runs:

```yaml
- task: SonarCloudAnalyze@4
  displayName: "Run SonarCloud Analysis"
```

This executes the SonarQube Cloud analysis using the configuration prepared earlier in the job.

The scanner analyzes the configured source directories and uses the available coverage information.

The analysis is associated with:

```text
Organization:
malathi-shetty

Project:
FlavorForge

Project Key:
shettymalathib_flavorforge-azure-devsecops-capstone
```

---

# 20. Publish the Quality Gate

After the analysis completes, the pipeline publishes the Quality Gate result:

```yaml
- task: SonarCloudPublish@4
  displayName: "Publish Quality Gate"
```

The pipeline uses:

```yaml
pollingTimeoutSec: "300"
```

This allows Azure DevOps to wait for the SonarQube Cloud Quality Gate result for up to 300 seconds.

The resulting Quality Gate provides a quality status for the analyzed code.

---

# 21. Complete SonarQube Cloud Pipeline Flow

The complete integration can be represented as:

```text
Azure DevOps Pipeline
        |
        v
   CodeQuality
        |
        v
SonarCloudPrepare@4
        |
        +----------------------+
        |                      |
        v                      v
 Backend Tests          Frontend Tests
        |                      |
        v                      v
 Backend Coverage       Frontend Coverage
        |                      |
        +----------+-----------+
                   |
                   v
        Verify Coverage Reports
                   |
                   v
        SonarCloudAnalyze@4
                   |
                   v
        SonarCloudPublish@4
                   |
                   v
             Quality Gate
```

---

# 22. Relationship Between Configuration Files

FlavorForge uses two configuration locations for SonarQube Cloud.

Repository-level configuration:

```text
sonar-project.properties
```

Azure DevOps pipeline configuration:

```text
azure-pipelines.yml
```

The relationship is:

```text
sonar-project.properties
        |
        | Project-level SonarQube configuration
        v
GitHub Repository

azure-pipelines.yml
        |
        | CI/CD execution configuration
        v
Azure DevOps Pipeline
        |
        v
SonarQube Cloud
```

The Azure DevOps pipeline explicitly configures the organization, project key, project name, source directories, exclusions, coverage paths, and source encoding for the CLI analysis.

---

# 23. Security Considerations

Authentication credentials are not stored in:

```text
sonar-project.properties
```

The repository configuration contains project settings but does not contain the actual SonarQube authentication token.

Authentication is handled through the Azure DevOps service connection:

```text
flavorforge-sonarcloud-sc
```

This keeps credentials separate from the source repository.

The configuration therefore follows this separation:

```text
Repository
    |
    +-- sonar-project.properties
    |      |
    |      +-- Project configuration
    |
    +-- azure-pipelines.yml
           |
           +-- Pipeline configuration

Azure DevOps
    |
    +-- SonarCloud Service Connection
           |
           +-- Authentication
```

---

# 24. Pipeline Dependency

The SonarCloud Code Quality stage depends on the Security stage:

```yaml
dependsOn: Security
```

The Docker Build stage depends on the Code Quality stage:

```yaml
- stage: DockerBuild
  dependsOn: CodeQuality
```

Therefore, the pipeline establishes the following quality-control sequence:

```text
Security
   |
   v
SonarCloud Code Quality
   |
   v
Docker Build
```

This places code-quality analysis before the Docker image build.

---

# 25. Configuration and Pipeline Verification

The required SonarQube Cloud configuration files were verified using:

```bash
ls -l sonar-project.properties azure-pipelines.yml
```

The repository contains:

```text
sonar-project.properties
azure-pipelines.yml
```

The Azure DevOps pipeline configuration was also verified using:

```bash
grep -n -A35 -B5 "SonarCloudPrepare" azure-pipelines.yml
```

The pipeline references the existing SonarQube Cloud service connection:

```yaml
SonarCloud: 'flavorforge-sonarcloud-sc'
```

The CodeQuality stage uses:

```yaml
SonarCloudPrepare@4
SonarCloudAnalyze@4
SonarCloudPublish@4
```

The pipeline was then executed from Azure DevOps using the `main` branch.

The pipeline run completed successfully.

The SonarCloud Code Quality stage completed successfully, including:

```text
Prepare SonarCloud Analysis
Install Node.js 22 LTS
Install Backend Dependencies
Run Jest Tests with Coverage
Install Frontend Dependencies and Run Tests
Publish Test Results
Publish Code Coverage
Verify Coverage Reports
Run SonarCloud Analysis
Publish Quality Gate
```

The SonarQube Cloud project was also verified after the pipeline execution.

The Quality Gate result was:

```text
Quality Gate: PASSED
```

The Git working tree was checked using:

```bash
git status --short
```

The only current modification is the documentation file being updated:

```text
M docs/week-4/BUILD-JOURNEY/09-sonarcloud/03-pipeline-integration.md
```

No changes were made to the SonarQube Cloud service connection because the existing `flavorforge-sonarcloud-sc` connection was already configured and successfully used by the pipeline.

---

# Result

The FlavorForge Azure DevOps pipeline successfully integrates SonarQube Cloud into the CI/CD workflow.

The existing SonarQube Cloud service connection was used to authenticate the Azure DevOps pipeline. The CodeQuality stage prepares the analysis, runs backend and frontend tests, generates coverage reports, executes the SonarQube Cloud analysis, and publishes the Quality Gate result.

The pipeline was successfully executed from the `main` branch, and the SonarQube Cloud Quality Gate passed.

The verified flow is:

```text
GitHub Repository
        |
        v
Azure DevOps Pipeline
        |
        v
Security
        |
        v
SonarCloudPrepare
        |
        v
Backend + Frontend Tests
        |
        v
Coverage Reports
        |
        v
SonarCloudAnalyze
        |
        v
SonarCloudPublish
        |
        v
Quality Gate: PASSED
        |
        v
Docker Build
```

This confirms that SonarQube Cloud is successfully integrated into the FlavorForge DevSecOps pipeline and that the code-quality gate is executed before the Docker Build stage.

---

# 26. Current SonarQube Cloud Integration Configuration

The final configuration used by the pipeline is:

| Setting | Value |
|---|---|
| SonarCloud Organization | `malathi-shetty` |
| Project Name | `FlavorForge` |
| Project Key | `shettymalathib_flavorforge-azure-devsecops-capstone` |
| Service Connection | `flavorforge-sonarcloud-sc` |
| Scanner Mode | `cli` |
| Configuration Mode | `manual` |
| Source Directories | `backend/src,frontend/src,kubernetes` |
| Backend Coverage | `backend/coverage/lcov.info` |
| Frontend Coverage | `frontend/coverage/lcov.info` |
| Source Encoding | `UTF-8` |
| Quality Gate Timeout | `300 seconds` |

---

# Result

The FlavorForge Azure DevOps pipeline contains a dedicated SonarQube Cloud Code Quality stage.

The integration prepares the SonarQube Cloud project, runs backend and frontend tests, generates coverage reports, executes the SonarQube Cloud analysis, and publishes the Quality Gate result.

The implemented flow is:

```text
Security
    |
    v
SonarCloudPrepare
    |
    v
Tests + Coverage
    |
    v
SonarCloudAnalyze
    |
    v
SonarCloudPublish
    |
    v
Quality Gate
    |
    v
Docker Build
```
