Week 3 — Azure Pipeline CI/CD
Problem
During initial setup, the pipeline was stuck at Queued and never started.
This happened because there was no available agent to execute the job.
Azure DevOps pipelines require an agent (Microsoft‑hosted or self‑hosted) to run tasks.
Without an agent, the pipeline cannot start and remains in the queued state.

Solution
We solved this by using a Microsoft‑hosted agent (ubuntu-latest).
Hosted agents are provided by Azure DevOps and spin up automatically when a pipeline runs.
This ensures that jobs are picked up and executed without manual agent setup.

Pipeline YAML
The pipeline builds a Docker image and pushes it to Azure Container Registry (ACR).

trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  imageName: 'week3app'

steps:
- task: DockerInstaller@0

- task: Docker@2
  displayName: Build and push image
  inputs:
    containerRegistry: 'MyACRServiceConnection'   # Service connection to ACR
    repository: 'week3app'
    command: 'buildAndPush'
    Dockerfile: '**/Dockerfile'
    tags: |
      $(Build.BuildId)
