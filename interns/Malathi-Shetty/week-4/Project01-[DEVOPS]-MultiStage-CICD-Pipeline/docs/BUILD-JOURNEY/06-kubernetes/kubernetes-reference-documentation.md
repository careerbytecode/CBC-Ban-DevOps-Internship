# 📚 Kubernetes Reference Documentation & Learning Resources

This section provides additional reference material for understanding, deploying,
managing, troubleshooting, and learning Kubernetes.

FlavorForge uses Kubernetes as the container orchestration platform for deploying
and managing the application on Azure Kubernetes Service (AKS).

These resources are provided for readers who want to understand Kubernetes beyond
the project-specific implementation.

> **Recommended approach:** Start with the official Kubernetes documentation and
> tutorials, then use the additional learning resources and videos for practical
> understanding.

---

# 1. Official Kubernetes Documentation

## Kubernetes Official Documentation

The official Kubernetes documentation is the primary technical reference for
Kubernetes concepts, architecture, workloads, networking, security,
configuration, administration, and troubleshooting.

[Kubernetes Official Documentation](https://kubernetes.io/docs/)

Kubernetes is an open-source container orchestration platform used to automate
the deployment, scaling, and management of containerized applications.

**Recommended for:**

- Kubernetes fundamentals
- Cluster architecture
- Workloads
- Pods
- Deployments
- Services
- Networking
- Configuration
- Security
- Storage
- Administration

---

# 2. Kubernetes Concepts

The Concepts section explains how Kubernetes works and introduces the major
objects and abstractions used by Kubernetes.

[Kubernetes Concepts](https://kubernetes.io/docs/concepts/)

Important concepts include:

- Kubernetes architecture
- Control plane
- Nodes
- Pods
- Deployments
- ReplicaSets
- Services
- ConfigMaps
- Secrets
- Namespaces
- Labels and selectors
- Networking
- Storage
- Workloads

This is particularly useful for beginners before working with the FlavorForge
Kubernetes manifests.

---

# 3. Kubernetes Architecture

Understanding the Kubernetes architecture helps explain how FlavorForge is
managed inside AKS.

[Kubernetes Cluster Architecture](https://kubernetes.io/docs/concepts/architecture/)

Conceptually:

```text
                 Kubernetes Cluster
                        |
              +---------+---------+
              |                   |
        Control Plane           Nodes
              |                   |
       Kubernetes API          kubelet
              |                   |
        Scheduler             Pods
              |                   |
      Controller Manager     Containers
````

The architecture documentation explains the relationship between the
Kubernetes control plane, nodes, Kubernetes API, scheduler, controllers,
kubelet, and container runtime.

---

# 4. Kubernetes Basics — Interactive Tutorial

The official Kubernetes Basics tutorial is one of the best starting points for
beginners.

[Kubernetes Basics Interactive Tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

The tutorial walks through:

1. Creating a Kubernetes cluster
2. Deploying an application
3. Exploring the application
4. Exposing the application
5. Scaling the application
6. Updating the application

This is useful for understanding the basic Kubernetes workflow before working
with AKS.

---

# 5. Kubernetes Tutorials

The official Kubernetes Tutorials section provides hands-on exercises covering
many Kubernetes tasks.

[Kubernetes Tutorials](https://kubernetes.io/docs/tutorials/)

Topics include:

* Deploying applications
* Pods
* Services
* Configuration
* Stateful applications
* Security
* Cluster management
* Troubleshooting

The official tutorials are recommended over random third-party tutorials
because they are maintained as part of the Kubernetes documentation.

---

# 6. Pods

Pods are the smallest deployable compute objects in Kubernetes.

[Kubernetes Pods](https://kubernetes.io/docs/concepts/workloads/pods/)

A Pod can contain one or more containers that share networking and storage
resources.

FlavorForge deployments ultimately run application containers inside Pods.

---

# 7. Deployments

Deployments provide declarative management of application Pods and ReplicaSets.

[Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

Deployments are important for:

* Creating application replicas
* Updating container images
* Rolling updates
* Rollbacks
* Maintaining the desired number of Pods

FlavorForge uses Kubernetes Deployments for the frontend and backend workloads.

---

# 8. Services

Kubernetes Services provide stable networking access to application Pods.

[Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

Important Service concepts include:

* ClusterIP
* NodePort
* LoadBalancer
* Service discovery
* Labels and selectors

FlavorForge uses Kubernetes Services to expose the application workloads.

---

# 9. ConfigMaps

ConfigMaps provide a way to store non-confidential configuration data.

[Kubernetes ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)

ConfigMaps can be used to provide configuration values to containers without
hard-coding them into application images.

---

# 10. Secrets

Kubernetes Secrets are designed to hold sensitive information such as
credentials, tokens, and passwords.

[Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> **Security note:** Kubernetes Secrets should not be treated as automatically
> encrypted or completely secure merely because the resource is named Secret.
> Production environments should follow appropriate secret-management and
> encryption practices.

---

# 11. Namespaces

Namespaces provide logical separation of resources within a Kubernetes cluster.

[Kubernetes Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

FlavorForge uses the `flavorforge` namespace to organize its Kubernetes
resources.

Example:

```bash
kubectl get all -n flavorforge
```

---

# 12. kubectl Command-Line Reference

`kubectl` is the primary command-line tool used to communicate with a
Kubernetes cluster.

[kubectl Command Reference](https://kubernetes.io/docs/reference/kubectl/)

Useful commands include:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl apply -f <manifest.yaml>
kubectl delete -f <manifest.yaml>
kubectl rollout status deployment/<deployment-name>
kubectl get events
```

For FlavorForge, `kubectl` is used extensively for deployment verification and
troubleshooting.

---

# 13. kubectl Quick Reference

For frequently used commands, use the official quick reference.

[kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)

This is useful as a day-to-day command reference while working with Kubernetes.

---

# 14. Kubernetes Configuration

Kubernetes resources are commonly defined declaratively using YAML manifests.

[Kubernetes Configuration](https://kubernetes.io/docs/concepts/configuration/)

Configuration can include:

* ConfigMaps
* Secrets
* Environment variables
* Resource requests
* Resource limits
* Volumes
* Pod configuration

FlavorForge stores Kubernetes configuration in the project's
`kubernetes/` directory.

---

# 15. Kubernetes Networking

Understanding Kubernetes networking is important when troubleshooting
application connectivity.

[Kubernetes Services and Networking](https://kubernetes.io/docs/concepts/services-networking/)

Important topics include:

* Services
* DNS
* Ingress
* Network Policies
* Load balancing
* Service discovery

This is particularly relevant to FlavorForge because the frontend and backend
communicate through Kubernetes networking.

---

# 16. Ingress

Ingress provides HTTP and HTTPS routing into Kubernetes Services.

[Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

Ingress is useful when an application needs:

```text
Internet
   |
   v
Ingress
   |
   +----> Frontend Service
   |
   +----> Backend Service
```

Readers should also understand that an Ingress resource normally requires an
Ingress controller to actually implement the routing.

---

# 17. Horizontal Pod Autoscaling

FlavorForge uses Kubernetes Horizontal Pod Autoscaling concepts.

[Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

HPA can automatically adjust the number of Pods based on resource utilization
or other supported metrics.

The FlavorForge implementation documents:

```text
Minimum replicas : 2
Maximum replicas : 5
CPU target       : 70%
```

Readers can compare the project's HPA configuration with the official
Kubernetes documentation.

---

# 18. Kubernetes Resource Management

Kubernetes allows CPU and memory requests and limits to be defined for
containers.

[Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

Understanding resource requests and limits is important for:

* Scheduling
* Cluster capacity
* Application stability
* Autoscaling
* Troubleshooting

---

# 19. Kubernetes Troubleshooting

The official documentation provides troubleshooting guidance for Kubernetes
applications and clusters.

[Kubernetes Troubleshooting](https://kubernetes.io/docs/tasks/debug/)

Useful troubleshooting commands include:

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events
kubectl describe deployment <deployment-name>
kubectl describe service <service-name>
```

FlavorForge follows the general troubleshooting principle:

> **Diagnose first, change second, verify third.**

---

# 20. Viewing Pods and Nodes

This official tutorial is particularly useful for beginners learning how to
inspect Kubernetes workloads.

[Viewing Pods and Nodes](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-intro/)

It demonstrates:

* Viewing Pods
* Viewing Nodes
* Using `kubectl describe`
* Inspecting container information
* Troubleshooting workloads

---

# 21. Deploying an Application with kubectl

The official tutorial demonstrates how to create a Kubernetes Deployment.

[Using kubectl to Create a Deployment](https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/)

This is useful for understanding the relationship between:

```text
Container Image
      |
      v
Deployment
      |
      v
ReplicaSet
      |
      v
Pods
```

---

# 22. Scaling Applications

Kubernetes supports scaling application workloads by changing the desired
number of replicas.

[Running Multiple Instances of Your App](https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-intro/)

This helps explain how Kubernetes maintains multiple instances of an
application.

---

# 23. Exposing Applications

Applications running inside Pods need a networking mechanism to be accessed
through Kubernetes.

[Using a Service to Expose Your App](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/)

This tutorial explains:

* Services
* Labels
* Selectors
* Application exposure
* External access

---

# 24. Kubernetes Learning Environments

Readers who do not have an AKS cluster can practice Kubernetes locally.

[Kubernetes Learning Environment](https://kubernetes.io/docs/setup/learning-environment/)

Possible learning environments include:

* kind
* Minikube
* Online Kubernetes playgrounds

For beginners, the official documentation recommends starting with lightweight
learning environments before attempting production-like cluster setup.

---

# 25. Kubernetes Training

The Kubernetes project provides links to official training and certification
resources.

[Kubernetes Training and Certification](https://kubernetes.io/training/)

Resources include:

* Introduction to Kubernetes
* Linux Foundation training
* KCNA
* CKA
* CKAD
* CKS

These are useful for readers who want to continue learning Kubernetes beyond
FlavorForge.

---

# 26. Kubernetes on Azure — AKS

FlavorForge runs Kubernetes on Microsoft Azure using Azure Kubernetes Service.

[Azure Kubernetes Service Documentation](https://learn.microsoft.com/azure/aks/)

AKS is Microsoft's managed Kubernetes service.

Readers can use the official AKS documentation to understand:

* Creating AKS clusters
* Connecting to AKS
* Kubernetes workloads on Azure
* Networking
* Storage
* Security
* Monitoring
* Scaling
* Cluster management

---

# 27. Connect to an AKS Cluster

The Azure CLI can be used to obtain Kubernetes credentials for an AKS cluster.

[Connect to an AKS Cluster](https://learn.microsoft.com/azure/aks/learn/quick-kubernetes-deploy-cli)

Typical workflow:

```bash
az aks get-credentials \
  --resource-group <resource-group> \
  --name <aks-cluster>
```

Then verify access:

```bash
kubectl get nodes
```

FlavorForge uses this type of workflow when interacting with its AKS cluster.

---

# 28. Kubernetes and Kustomize

FlavorForge uses Kustomize to manage environment-specific Kubernetes
configuration.

[Kustomize Official Documentation](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)

Kustomize allows Kubernetes configuration to be customized without modifying
the original base manifests.

FlavorForge follows the structure:

```text
kubernetes/
├── base/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

Kubernetes can apply a Kustomize configuration using:

```bash
kubectl apply -k kubernetes/overlays/prod
```

For detailed Kustomize references, see the project's separate Kustomize
reference documentation.

---

# 🎥 29. Kubernetes Videos and Visual Learning

Videos can help beginners understand Kubernetes concepts visually.

## Kubernetes Official YouTube Channel

[Kubernetes Official YouTube Channel](https://www.youtube.com/@KubernetesCommunity)

The channel contains Kubernetes community presentations, demonstrations,
conference sessions, tutorials, and technical discussions.

Recommended topics to search for include:

* Kubernetes fundamentals
* Kubernetes architecture
* Pods and Deployments
* Kubernetes networking
* Kubernetes security
* Kubernetes troubleshooting
* Kubernetes on Azure

> **Important:** Videos are supplementary learning material. Use the official
> Kubernetes documentation as the primary technical source because Kubernetes
> versions and recommended practices change over time.

---

# 30. CNCF Kubernetes Resources

Kubernetes is a CNCF project, and CNCF provides talks, presentations, and
educational material about Kubernetes and cloud-native technologies.

[CNCF YouTube Channel](https://www.youtube.com/@cncf)

Useful topics include:

* Kubernetes fundamentals
* Cloud-native architecture
* Kubernetes operations
* Kubernetes security
* Observability
* GitOps
* Containers

---

# 31. Official Kubernetes GitHub Repository

The Kubernetes source code and project development can be found on GitHub.

[Kubernetes GitHub Repository](https://github.com/kubernetes/kubernetes)

Readers can use this resource to:

* Review source code
* Explore releases
* Review issues
* Understand project development
* Explore Kubernetes components

---

# 32. Kubernetes Glossary

The official glossary is useful when readers encounter unfamiliar Kubernetes
terminology.

[Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/)

Examples include:

* Pod
* Node
* Deployment
* ReplicaSet
* Service
* Namespace
* Ingress
* Controller
* Control Plane
* Kubelet

---

# 33. Recommended Reference Order for FlavorForge

For a beginner following the FlavorForge project, the recommended order is:

| Order | Resource                     | Purpose                             |
| ----: | ---------------------------- | ----------------------------------- |
|     1 | Kubernetes Documentation     | Primary reference                   |
|     2 | Kubernetes Concepts          | Understand fundamentals             |
|     3 | Cluster Architecture         | Understand Kubernetes internals     |
|     4 | Kubernetes Basics            | Hands-on introduction               |
|     5 | Pods and Deployments         | Understand workloads                |
|     6 | Services and Networking      | Understand application connectivity |
|     7 | ConfigMaps and Secrets       | Understand configuration            |
|     8 | HPA                          | Understand scaling                  |
|     9 | kubectl Reference            | Learn daily commands                |
|    10 | Troubleshooting              | Diagnose problems                   |
|    11 | Kustomize                    | Understand configuration overlays   |
|    12 | AKS Documentation            | Understand Kubernetes on Azure      |
|    13 | Kubernetes Videos            | Visual learning                     |
|    14 | FlavorForge Kubernetes Guide | Apply everything to the project     |

---

# 34. How These References Relate to FlavorForge

The external references should be used together with the project-specific
documentation.

```text
Official Kubernetes Documentation
              |
              v
      Kubernetes Concepts
              |
              v
       Hands-on Tutorials
              |
              v
       kubectl / AKS
              |
              v
          Kustomize
              |
              v
      FlavorForge Kubernetes
              |
              v
       Final Verification
```

The official documentation explains **Kubernetes itself**.

The FlavorForge BUILD-JOURNEY explains **how Kubernetes is used in this
specific project**.

---

# 35. Recommended Learning Principle

> **Learn the Kubernetes concept first, implement it in FlavorForge second,
> and verify the actual cluster state third.**

Do not assume that a successful `kubectl apply` automatically means the
application is healthy.

Verify the complete workload using:

```bash
kubectl get pods -n flavorforge
kubectl get deployments -n flavorforge
kubectl get services -n flavorforge
kubectl get ingress -n flavorforge
kubectl get hpa -n flavorforge
```

Then verify the application itself.

---

## Reference Priority

Use resources in this priority:

```text
1. Official Kubernetes Documentation
                ↓
2. Official Kubernetes Tutorials
                ↓
3. Official AKS Documentation
                ↓
4. Official Kubernetes / CNCF Videos
                ↓
5. Third-Party Tutorials
                ↓
6. FlavorForge Project Implementation
```

> **Source-of-truth principle:** Official Kubernetes and Microsoft
> documentation should be treated as the authoritative reference. Videos and
> third-party tutorials are supplementary learning resources.

- https://kubernetes.io/docs/home/index.html "Kubernetes Documentation | Kubernetes"
