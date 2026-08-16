# Step 5 — Agent Pools

## What We Wanted

After configuring the Azure DevOps project and service connections, the next step was to verify the agent pool used by Azure DevOps Pipelines.

An Azure DevOps pipeline needs an agent to execute its jobs.

The agent performs tasks such as:

- Checking out source code
- Installing required tools
- Building the application
- Running tests
- Running security scans
- Building Docker images
- Publishing artifacts
- Executing deployment commands

For the FlavorForge project, the pipeline uses a Microsoft-hosted Linux agent.

The pipeline configuration uses:

```yaml
pool:
  vmImage: ubuntu-latest
````

Therefore, Azure DevOps provisions a Microsoft-hosted Ubuntu agent whenever the pipeline runs.

---

# Step 5.1 — Open Agent Pools

## Where We Went

From the Azure DevOps organization, open:

```text
Organization
    ↓
Organization settings
    ↓
Agent pools
```

Agent pools are managed at the Azure DevOps organization level.

They provide the agents that Azure DevOps Pipelines can use to execute pipeline jobs.

---

# Step 5.2 — Review Available Agent Pools

The Agent pools page displays the pools available to the Azure DevOps organization.

For Microsoft-hosted pipeline execution, Azure DevOps provides the hosted pool:

```text
Azure Pipelines
```

The hosted pool is used by Microsoft-hosted agents.

The FlavorForge pipeline does not require a separately managed self-hosted machine.

---

# Step 5.3 — Understand Microsoft-Hosted Agents

## What We Wanted

We wanted the FlavorForge pipeline to execute on a clean Linux build environment without maintaining our own Azure DevOps build server.

Microsoft-hosted agents provide temporary build environments managed by Azure DevOps.

For FlavorForge, the pipeline requests:

```yaml
pool:
  vmImage: ubuntu-latest
```

This tells Azure DevOps to use the latest available Ubuntu Microsoft-hosted agent image.

The basic execution flow is:

```text
Azure DevOps Pipeline
        ↓
pool:
  vmImage: ubuntu-latest
        ↓
Microsoft-hosted agent
        ↓
Ubuntu environment
        ↓
Pipeline jobs execute
```

---

# Step 5.4 — Verify the Pipeline Agent Configuration

## Where We Went

Open the FlavorForge Azure DevOps pipeline YAML.

The pipeline contains the agent configuration:

```yaml
pool:
  vmImage: ubuntu-latest
```

This configuration confirms that the pipeline uses a Microsoft-hosted Ubuntu agent.

---

## What We Verified

The important configuration is:

```yaml
pool:
  vmImage: ubuntu-latest
```

The value:

```text
ubuntu-latest
```

specifies the operating-system image requested for the pipeline agent.

Therefore, the FlavorForge pipeline is designed to execute on a Linux-based Microsoft-hosted build agent.

---

# Step 5.5 — Why Ubuntu Was Used

The FlavorForge pipeline performs several Linux-friendly DevSecOps tasks.

The pipeline requires tools and commands for activities such as:

```text
Git
Maven
Docker
Trivy
SonarCloud
Azure CLI
kubectl
Kubernetes deployment
```

Using:

```text
ubuntu-latest
```

provides a Linux environment suitable for these pipeline operations.

The agent is provisioned when the pipeline job starts and is used to execute the required steps.

---

# Step 5.6 — Hosted Agent vs Self-Hosted Agent

For this project, we use a Microsoft-hosted agent rather than maintaining a self-hosted agent.

The difference is:

| Agent Type       | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| Microsoft-hosted | Azure DevOps provides and manages the build machine             |
| Self-hosted      | The project/organization provides and manages the build machine |

For FlavorForge:

```text
Agent type:
Microsoft-hosted
```

Requested image:

```text
ubuntu-latest
```

This avoids the need to install and maintain an Azure DevOps build agent manually.

---

# Step 5.7 — Agent Pool and Pipeline Relationship

The relationship between the pipeline and agent pool is:

```text
Azure DevOps
    ↓
FlavorForge – Azure DevSecOps Capstone
    ↓
Pipeline
    ↓
pool:
  vmImage: ubuntu-latest
    ↓
Azure Pipelines
    ↓
Microsoft-hosted Ubuntu Agent
    ↓
Pipeline Jobs
```

The agent executes the commands defined by the pipeline.

For example:

```text
Checkout source code
        ↓
Build
        ↓
Test
        ↓
SonarCloud analysis
        ↓
Trivy scan
        ↓
Docker build
        ↓
Push image
        ↓
Deploy to AKS
```

---

# Step 5.8 — Verify Agent Pool Access

From Azure DevOps, open:

```text
Organization settings
    ↓
Agent pools
```

Review the available hosted agent pools.

The pipeline uses the Microsoft-hosted Azure Pipelines infrastructure through:

```yaml
pool:
  vmImage: ubuntu-latest
```

The important verification is therefore the pipeline's `pool` configuration rather than the creation of a custom agent pool.

---

# Step 5.9 — No Custom Agent Pool Created

For this FlavorForge implementation, no custom self-hosted agent pool is being documented.

We should not claim that a custom agent pool was created unless there is corresponding Azure DevOps evidence.

The confirmed pipeline configuration is:

```yaml
pool:
  vmImage: ubuntu-latest
```

Therefore:

```text
Custom self-hosted pool:
Not required

Pipeline agent:
Microsoft-hosted Ubuntu agent

Image:
ubuntu-latest
```

---

# Step 5.10 — Agent Execution During a Pipeline Run

When a FlavorForge pipeline starts, Azure DevOps allocates an available Microsoft-hosted agent.

The process is:

```text
Pipeline Run
    ↓
Agent Requested
    ↓
Microsoft-hosted Ubuntu Agent Allocated
    ↓
Repository Checked Out
    ↓
Pipeline Tasks Execute
    ↓
Pipeline Completes
    ↓
Hosted Agent Environment Released
```

The build environment is therefore available for the duration of the pipeline execution without requiring us to maintain a permanent build server.

---

# Verify

Before moving to the next BUILD-JOURNEY step, verify:

```text
Azure DevOps
    ↓
Organization settings
    ↓
Agent pools
```

and verify the pipeline YAML contains:

```yaml
pool:
  vmImage: ubuntu-latest
```

The confirmed FlavorForge agent configuration is:

| Configuration     | Value                  |
| ----------------- | ---------------------- |
| Agent type        | Microsoft-hosted       |
| Operating system  | Ubuntu                 |
| Pipeline image    | `ubuntu-latest`        |
| Self-hosted agent | Not required           |
| Custom agent pool | Not created/documented |

---

# Screenshot

Use the actual screenshot captured from Azure DevOps if one exists for the Agent Pools page.

Recommended evidence:

```text
Azure DevOps
    ↓
Organization settings
    ↓
Agent pools
```

If there is no dedicated screenshot for this step, do not invent a screenshot filename.

A pipeline YAML screenshot showing:

```yaml
pool:
  vmImage: ubuntu-latest
```

can also be used as supporting evidence.

Use the actual repository screenshot path only after confirming it.

Example placeholder:

```markdown
![Azure DevOps Agent Pools](<actual-screenshot-path>)
```

---

# Result

The FlavorForge Azure DevOps pipeline is configured to use a Microsoft-hosted Ubuntu build agent.

The confirmed configuration is:

```text
Azure DevOps Pipeline
        ↓
Microsoft-hosted agent
        ↓
ubuntu-latest
        ↓
Linux build environment
```

No custom self-hosted agent is required for the FlavorForge pipeline.

The agent pool configuration is now ready for the pipeline creation and execution steps.