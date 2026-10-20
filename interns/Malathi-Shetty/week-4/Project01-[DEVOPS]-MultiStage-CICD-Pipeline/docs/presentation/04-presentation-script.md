# Presentation Script

# FlavorForge – From Code to Cloud: A DevSecOps Journey

## Opening

Good morning/afternoon everyone.

Before I begin talking about technologies, I'd like to start with a simple question.

**Have you ever heard someone say, "It works on my machine"?**

Most software engineers have.

Now imagine it's Friday evening.

The team is preparing for a production release.

The application has passed testing.

Everything looks ready.

A deployment starts.

A few minutes later, the frontend stops communicating with the backend.

Someone deployed the wrong image.

A configuration file is different.

Nobody is sure which version is actually running.

Developers say,

*"The code hasn't changed."*

Operations say,

*"The infrastructure looks fine."*

Everyone starts asking the same questions.

- What changed?
- Which version is deployed?
- Why is production behaving differently?
- How do we recover quickly?

The application itself isn't the problem.

The deployment process is.

That is exactly the challenge modern DevOps tries to solve.

And that challenge became the inspiration behind this project.

---

# Why FlavorForge?

Rather than building just another web application, I wanted to understand everything that happens **after the code is written**.

Because writing software is only the beginning.

The real challenge is making sure that software can be built, tested, secured, deployed, monitored, and recovered consistently every single time.

To understand that complete journey, I built **FlavorForge**.

FlavorForge is a cloud-native recipe application that demonstrates an end-to-end Azure DevSecOps workflow.

It combines modern application development with automation, cloud infrastructure, Kubernetes, CI/CD, GitOps, security scanning, and operational practices into a single project.

My goal wasn't simply to learn individual tools.

My goal was to understand **how those tools work together to solve real software delivery problems.**

---

# The Journey We'll Follow Today

Instead of presenting technologies one by one, I'd like to walk you through the same journey that a real application follows.

We'll start with the business problem.

Then we'll look at the application.

After that, we'll see how it is packaged, deployed, secured, automated, and operated in the cloud.

By the end of this presentation, you'll have seen the complete lifecycle of a modern cloud-native application—from development to production operations.

---

# Understanding the Solution

FlavorForge consists of two main components.

The frontend is developed using React and Vite, providing a modern and responsive user interface.

The backend is developed using Node.js and Express, exposing REST APIs that deliver recipe data and application health information.

Together, they create a complete full-stack application.

But building the application was never the most difficult part.

The bigger challenge was answering a much more important question.

**How do we make sure this application behaves the same way everywhere?**

On my laptop.

On another developer's machine.

Inside a testing environment.

And finally, in production.

That challenge naturally leads us to the next stage of the journey.

---

# From Code to Containers

Imagine another developer clones this project tomorrow.

If our machines have different operating systems, Node.js versions, dependencies, or environment configurations, the application might behave differently.

We've all heard the phrase:

> **"It works on my machine."**

In a professional environment, that isn't good enough.

Applications need to run consistently regardless of where they are deployed.

Containerization solves that problem.

By packaging the application together with all its dependencies, Docker creates a consistent runtime environment that behaves the same on every system.

For FlavorForge, both the frontend and backend are packaged as independent Docker images.

This allows the application to move reliably from development to testing and finally into production without changing how it runs.

Now that the application has been packaged consistently, another question appears.

**Where should those containers run in production?**

---

# Running Containers in Production

At this point, the application has been successfully containerized.

But packaging an application is only part of the journey.

Imagine receiving hundreds or even thousands of users every day.

What happens if one container crashes?

What happens if the server hosting that container suddenly becomes unavailable?

Should someone log in to the server at midnight just to restart the application?

Probably not.

Modern applications need to recover automatically.

They need to scale when traffic increases.

They need to remain available even when individual components fail.

This is where Kubernetes becomes essential.

Instead of manually managing containers, Kubernetes continuously monitors the desired state of the application and automatically works to maintain it.

For this project, I used **Azure Kubernetes Service (AKS)**, Microsoft's managed Kubernetes platform.

This allowed me to focus on deploying and managing the application without worrying about maintaining the Kubernetes control plane.

---

# Deploying FlavorForge to AKS

The application is deployed using Kubernetes manifests.

Each manifest has a specific responsibility.

Deployments define how the frontend and backend applications should run.

Services provide stable networking between components.

ConfigMaps store environment-specific configuration.

Secrets securely manage sensitive information.

The NGINX Ingress Controller exposes the application through a single external endpoint.

Finally, the Horizontal Pod Autoscaler monitors application load and automatically adjusts the number of backend pods when required.

Instead of manually managing infrastructure, Kubernetes continuously ensures that the application remains in its desired state.

---

# Live Demonstration

Rather than just describing the infrastructure, let's verify that everything is actually running.

I'll begin by checking the Kubernetes cluster.

```bash
kubectl get nodes
```

This command confirms that the AKS cluster is healthy and ready to run workloads.

Next, I'll display all resources running inside the FlavorForge namespace.

```bash
kubectl get all -n flavorforge
```

Here we can see:

- Deployments
- ReplicaSets
- Pods
- Services

Each resource has a specific role in delivering the application.

The frontend and backend pods are running successfully, and the services provide communication between them.

Finally, I'll verify that the application is accessible through the Ingress.

Opening the application in the browser confirms that the deployment has completed successfully.

At this point, we have achieved something important.

The application is no longer running only on my laptop.

It is now running inside a production-style Kubernetes environment on Microsoft Azure.

---

# But One Question Still Remains...

So far, we've built the application.

We've packaged it using Docker.

We've deployed it to Kubernetes.

But imagine another developer joins the team tomorrow.

They make a small code change.

Should they manually build Docker images?

Should they manually push images to Azure?

Should they manually deploy Kubernetes manifests every single time?

That approach doesn't scale.

As projects grow, manual deployments become slow, inconsistent, and error-prone.

To solve this problem, software delivery needs automation.

And that's where the CI/CD pipeline becomes the next stage of our journey.

---

# From Manual Deployments to Continuous Delivery

Imagine that I fix a small bug in the application.

The change may only be a few lines of code, but before it reaches production, several important questions need to be answered.

- Does the application still build successfully?
- Have the automated tests passed?
- Has the code quality changed?
- Are there any security vulnerabilities?
- Can the Docker images be created successfully?
- Is the deployment ready for Kubernetes?

Doing all of these checks manually for every change would be time-consuming and unreliable.

Instead, these tasks are automated through an Azure DevOps CI/CD pipeline.

Every code commit follows the same process, ensuring that software is delivered consistently regardless of who made the change.

---

# Azure DevOps Pipeline

Whenever code is pushed to the repository, Azure DevOps automatically starts the pipeline.

Rather than performing one large task, the pipeline is divided into multiple stages.

Each stage has a specific responsibility and acts as a quality checkpoint before the next stage begins.

The pipeline performs the following activities:

- Install project dependencies
- Build the frontend and backend applications
- Execute automated tests
- Perform code quality analysis using SonarCloud
- Scan Docker images using Trivy
- Build Docker images
- Push images to Azure Container Registry
- Deploy the application to Azure Kubernetes Service
- Publish deployment results

Because every deployment follows the same automated workflow, releases become predictable, repeatable, and easier to troubleshoot.

---

# Live Pipeline Demonstration

Let's look at the pipeline that deployed FlavorForge.

Here we can see every stage executed in sequence.

Notice that the deployment only continues after each previous stage completes successfully.

This means that code quality, testing, and security validation happen before the application reaches the Kubernetes cluster.

### Evidence

![Azure DevOps Pipeline](/screenshots/pipeline/6-pipelines-run.png)

*Figure – Successful Azure DevOps pipeline execution.*

---

# Why Code Quality Matters

Building an application successfully doesn't automatically mean it is ready for production.

Applications also need to be maintainable, reliable, and easy to evolve.

For that reason, every pipeline execution performs automated code quality analysis using SonarCloud.

SonarCloud helps identify:

- Code smells
- Bugs
- Maintainability issues
- Reliability concerns
- Test coverage information

Rather than waiting until production, these issues are identified during the CI/CD process.

This encourages developers to improve code quality continuously instead of fixing problems later.

### Evidence

![Code Coverage](/screenshots/enterprise-azure-devops-release-simulation/16-code-coverage.png)

*Figure – SonarCloud quality analysis and code coverage.*

---

# Security as Part of the Pipeline

Quality alone is not enough.

Modern software must also be secure.

Imagine deploying a container image that contains known vulnerabilities.

Even if the application works correctly, those vulnerabilities could introduce unnecessary security risks.

To reduce that risk, FlavorForge integrates Trivy into the CI/CD pipeline.

Trivy scans the container images before deployment and reports vulnerabilities in operating system packages and application dependencies.

This allows security issues to be identified early in the delivery process rather than after deployment.

Security therefore becomes part of the development lifecycle instead of being treated as a separate activity.

---

# Container Registry

Once the application successfully passes all quality and security checks, the Docker images are pushed to Azure Container Registry.

Azure Container Registry acts as a secure repository for storing container images.

Instead of deploying images directly from a developer's machine, Kubernetes always pulls approved images from the registry.

This creates a controlled and reliable deployment process.

### Evidence

![Azure Container Registry](/screenshots/azure/25-acr-images.png)

*Figure – FlavorForge container images stored in Azure Container Registry.*

---

# One Final Challenge

At this stage, we have achieved automated software delivery.

Every code change is built, tested, validated, scanned, packaged, and deployed automatically.

But imagine someone manually changes the Kubernetes cluster after deployment.

Now the Git repository says one thing.

The running cluster says something different.

Which version should we trust?

To answer that question, we move to the final stage of the journey—GitOps.

---

# GitOps – Keeping the Cluster in the Desired State

So far, we've seen how the application is developed, containerized, tested, secured, and deployed.

But another important question remains.

**What happens if someone manually changes the Kubernetes cluster?**

Imagine an engineer logs into the cluster and changes a deployment directly using `kubectl`.

The application may continue running, but now the live environment no longer matches the Git repository.

This situation is known as **configuration drift**.

In a production environment, configuration drift can lead to inconsistent deployments, difficult troubleshooting, and unexpected behavior.

To solve this problem, FlavorForge uses **GitOps** with **Argo CD**.

Git becomes the single source of truth.

Instead of trusting manual changes, Argo CD continuously compares the running cluster with the Kubernetes manifests stored in Git.

Whenever a difference is detected, Argo CD synchronizes the cluster back to the desired state.

This ensures that deployments remain consistent, repeatable, and version controlled.

---

# Live GitOps Demonstration

Let's verify that Argo CD is managing the application.

I'll check the application status.

```bash
kubectl get applications -n argocd
```

Here we expect to see two important values.

- **Healthy**
- **Synced**

Healthy confirms that the application is running correctly.

Synced confirms that the Kubernetes cluster matches the Git repository.

### Evidence

![Argo CD Application](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure – Argo CD showing the FlavorForge application in a Healthy and Synced state.*

---

# Demonstrating Self-Healing

One of the strengths of Kubernetes is its ability to recover automatically.

Rather than simply talking about self-healing, I'd like to demonstrate it.

I'll intentionally delete one of the backend pods.

```bash
kubectl get pods -n flavorforge

kubectl delete pod <backend-pod-name> -n flavorforge
```

Immediately after deleting the pod, Kubernetes notices that the desired number of replicas is no longer available.

The Deployment controller automatically creates a replacement pod.

Without any manual intervention, the application returns to its desired state.

This demonstrates how Kubernetes helps maintain application availability.

---

# Why This Matters

In production, failures happen.

Servers restart.

Containers crash.

Applications receive unexpected traffic.

The goal isn't to eliminate every failure.

The goal is to build systems that recover quickly and continue delivering reliable service.

That is exactly what modern DevOps practices encourage.

Automation reduces manual work.

Kubernetes improves resilience.

CI/CD improves consistency.

GitOps improves deployment reliability.

Security scanning reduces risk.

Together, these practices create a more dependable software delivery platform.

---

# Key Takeaways

Throughout this project, I implemented a complete Azure DevSecOps workflow that includes:

- A React frontend and Node.js backend
- Docker containerization
- Azure Container Registry
- Azure Kubernetes Service
- Kubernetes Deployments, Services, ConfigMaps, Secrets, Ingress, and Horizontal Pod Autoscaling
- Azure DevOps CI/CD pipeline
- SonarCloud code quality analysis
- Trivy container security scanning
- GitOps using Argo CD
- Comprehensive documentation, verification guides, troubleshooting guides, and presentation materials

Each component contributes to a specific part of the software delivery lifecycle.

Rather than working independently, they work together to deliver software that is reliable, secure, scalable, and easier to manage.

---

# My Learning Journey

This project taught me that DevOps is much more than learning individual tools.

Before starting FlavorForge, I understood technologies like Docker, Kubernetes, Azure, and CI/CD separately.

Building this project helped me understand how these technologies connect to solve real software delivery challenges.

I learned that successful software delivery is not about one tool.

It is about creating a workflow where development, testing, security, infrastructure, deployment, and operations work together as one continuous process.

That perspective has been the most valuable outcome of this project.

---

# Conclusion

FlavorForge is more than a recipe application.

It is a practical demonstration of how a modern cloud-native application can be built, tested, secured, deployed, and operated using Azure DevSecOps practices.

From writing code to running workloads on Kubernetes, from automated pipelines to GitOps, every stage of the project reflects real-world software engineering practices.

This project has strengthened my understanding of cloud infrastructure, automation, security, container orchestration, and operational reliability.

More importantly, it has shown me that great software delivery is not achieved by a single technology, but by integrating the right tools into a reliable and repeatable process.

Thank you for your time and attention.

I'd be happy to answer any questions about the project.

---

# Questions and Discussion

I welcome any questions related to:

- Architecture
- Azure
- Docker
- Kubernetes
- Azure DevOps
- CI/CD
- GitOps
- Security
- Monitoring
- Operational practices
- Design decisions
- Lessons learned