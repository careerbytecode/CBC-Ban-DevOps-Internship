# 🚀 CareerByteCode DevOps Internship

# Week 2 Assignment – Set 1

## Instructions

- Answer all questions in your own words.
- Execute commands wherever applicable.
- Include screenshots for practical questions.
- Submit your work in PDF or Markdown format.
- Upload all Dockerfiles, YAML manifests, and scripts to your GitHub repository.

---

## Questions

### Q1.
Explain the problems developers faced **before Docker** and how containerization solved them.

### Q2.
Differentiate between a **Virtual Machine** and a **Container** in terms of architecture, boot time, resource usage, isolation, and portability.

### Q3.
Explain the complete **Docker image lifecycle** — from writing a Dockerfile to running a container.

### Q4.
Write the Docker commands to perform the following:
- Build an image from a Dockerfile with the tag `myapp:v1`
- List all images
- Run the container in detached mode on port 8080
- View container logs
- Remove the image

### Q5.
Explain the difference between the `CMD` and `ENTRYPOINT` instructions in a Dockerfile with examples.

### Q6.
Write a multi-instruction Dockerfile for a web application and explain each line. Include `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, and `CMD`.

### Q7.
What is **Docker networking**? Explain the following network types:
- Bridge
- Host
- None
- Overlay

### Q8.
What is **Docker Compose**? Write a simple `docker-compose.yml` that runs two services (for example, a web app and a database).

### Q9.
What is a **Docker Registry**? Explain the steps to push an image to Docker Hub.

### Q10.
Research any **three Docker best practices** for writing efficient and secure images.

### Q11.
Explain the difference between the **Control Plane** and the **Worker Node** in Kubernetes, and list the components that run on each.

### Q12.
What is the role of **etcd** in a Kubernetes cluster? Why is it important?

### Q13.
Write a **Deployment** YAML manifest that runs 3 replicas of an `nginx` container, and write the command to apply it.

### Q14.
Explain how a **Service** enables communication with Pods. Write a NodePort Service manifest for a Deployment.

### Q15.
What is an **Ingress** in Kubernetes? Explain how it is different from a NodePort or LoadBalancer Service.

### Q16.
What is a **StatefulSet**? Explain how it differs from a Deployment and give one real-world use case.

### Q17.
What is the **Horizontal Pod Autoscaler (HPA)**? Explain how it works and what metrics it uses to scale.

### Q18.
Explain how **ConfigMaps** and **Secrets** are injected into a Pod (as environment variables and as mounted volumes).

### Q19.
Research any **three `kubectl` commands** that were not covered during the training and explain their purpose with one example each.

### Q20.
Create a GitHub repository named **week2-docker-k8s-assignment** containing:
- A Dockerfile and a built image pushed to Docker Hub (include the image link)
- A Deployment and a Service YAML manifest
- A `README.md` explaining your setup
- At least five Git commits
- Screenshots of your Minikube deployment

---

## Q21. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering:
- Your introduction
- What you learned during the second week
- Your favorite topic and why
- The most challenging topic
- What you explored beyond the training
- Your goals for the next week
