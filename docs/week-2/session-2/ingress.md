# Ingress

## Definition

An **Ingress** is a Kubernetes resource that manages **external HTTP and HTTPS traffic** and routes requests to Services inside the Kubernetes cluster.

Instead of exposing every application using a **NodePort** or **LoadBalancer**, an Ingress provides a **single entry point** for multiple applications. It routes traffic based on **hostnames** (domain names) or **URL paths**.

> **Note:** An Ingress resource requires an **Ingress Controller** (such as NGINX Ingress Controller or Traefik) to function.

---

## Why Do We Need an Ingress?

* Exposes multiple applications using a single IP address.
* Routes traffic based on domain names or URL paths.
* Supports SSL/TLS termination.
* Reduces the number of LoadBalancers required.
* Simplifies application routing and management.

### Common Use Cases

* Host multiple websites on one Kubernetes cluster.
* Route `/api` to a backend service.
* Route `/admin` to an admin application.
* Enable HTTPS using TLS certificates.
* Perform path-based and host-based routing.

---

## Ingress Workflow

```text
                        User
                          |
                 https://example.com
                          |
                          ▼
                +--------------------+
                |     Ingress        |
                +--------------------+
                  |               |
         /frontend            /backend
              |                  |
              ▼                  ▼
     frontend-service    backend-service
              |                  |
              ▼                  ▼
      Frontend Pods       Backend Pods
```

---

## Prerequisites

Before creating an Ingress resource, ensure that:

* A Kubernetes cluster is running.
* An **Ingress Controller** (e.g., NGINX Ingress Controller) is installed.
* Backend Services already exist.
* Pods are running successfully.

---

## YAML Syntax

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: <ingress-name>

spec:
  rules:
    - host: <domain-name>

      http:
        paths:
          - path: <url-path>
            pathType: Prefix

            backend:
              service:
                name: <service-name>

                port:
                  number: <service-port>
```

---

## Syntax Explanation

| Field                 | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `apiVersion`          | Kubernetes API version (`networking.k8s.io/v1`).                                  |
| `kind`                | Specifies the resource type as **Ingress**.                                       |
| `metadata`            | Contains metadata about the Ingress resource.                                     |
| `metadata.name`       | Name of the Ingress resource.                                                     |
| `spec`                | Defines the routing rules.                                                        |
| `rules`               | List of routing rules.                                                            |
| `host`                | Domain name used to access the application.                                       |
| `http`                | Defines HTTP routing rules.                                                       |
| `paths`               | List of URL paths.                                                                |
| `path`                | URL path to match (e.g., `/api`).                                                 |
| `pathType`            | Determines how the path is matched (`Prefix`, `Exact`, `ImplementationSpecific`). |
| `backend`             | Backend Service that receives traffic.                                            |
| `service.name`        | Name of the Kubernetes Service.                                                   |
| `service.port.number` | Port exposed by the Service.                                                      |

---

## Example

The following example routes requests for **app.example.com** to the **nginx-service**.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: nginx-ingress

spec:
  rules:
    - host: app.example.com

      http:
        paths:
          - path: /
            pathType: Prefix

            backend:
              service:
                name: nginx-service

                port:
                  number: 80
```

---

## Create the Ingress

Apply the YAML manifest.

```bash
kubectl apply -f ingress.yaml
```

---

## Verify the Ingress

View all Ingress resources.

```bash
kubectl get ingress
```

or

```bash
kubectl get ing
```

Example output:

```bash
NAME             CLASS   HOSTS             ADDRESS        PORTS   AGE
nginx-ingress    nginx   app.example.com   192.168.1.10   80      2m
```

Describe the Ingress.

```bash
kubectl describe ingress nginx-ingress
```

---

## Host-Based Routing Example

Different domains route traffic to different Services.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: host-routing

spec:
  rules:
    - host: app.example.com

      http:
        paths:
          - path: /
            pathType: Prefix

            backend:
              service:
                name: frontend-service

                port:
                  number: 80

    - host: api.example.com

      http:
        paths:
          - path: /
            pathType: Prefix

            backend:
              service:
                name: backend-service

                port:
                  number: 80
```

---

## Path-Based Routing Example

Different URL paths route to different Services.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: path-routing

spec:
  rules:
    - host: example.com

      http:
        paths:
          - path: /frontend
            pathType: Prefix

            backend:
              service:
                name: frontend-service

                port:
                  number: 80

          - path: /backend
            pathType: Prefix

            backend:
              service:
                name: backend-service

                port:
                  number: 80
```

---

## Enable HTTPS (TLS)

Ingress supports HTTPS using TLS certificates.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: secure-ingress

spec:
  tls:
    - hosts:
        - app.example.com

      secretName: tls-secret

  rules:
    - host: app.example.com

      http:
        paths:
          - path: /
            pathType: Prefix

            backend:
              service:
                name: nginx-service

                port:
                  number: 80
```

---

## Delete the Ingress

Delete using the YAML file.

```bash
kubectl delete -f ingress.yaml
```

Or delete by name.

```bash
kubectl delete ingress nginx-ingress
```

---

## Expected Output

```bash
$ kubectl get ingress

NAME             CLASS   HOSTS             ADDRESS        PORTS   AGE
nginx-ingress    nginx   app.example.com   192.168.1.10   80      1m
```

---

## Ingress Traffic Flow

```text
                    Internet
                        |
                        ▼
              +-------------------+
              | Ingress Controller|
              +-------------------+
                        |
        -----------------------------------
        |                                 |
        ▼                                 ▼
 frontend-service                 backend-service
        |                                 |
        ▼                                 ▼
 Frontend Pods                     Backend Pods
```

---

## Service vs Ingress

| Feature               | Service                    | Ingress                                         |
| --------------------- | -------------------------- | ----------------------------------------------- |
| Purpose               | Exposes Pods               | Routes external HTTP/HTTPS traffic              |
| Layer                 | Layer 4 (TCP/UDP)          | Layer 7 (HTTP/HTTPS)                            |
| Routing               | Port-based                 | Host-based & Path-based                         |
| External Access       | NodePort / LoadBalancer    | Ingress Controller                              |
| TLS Support           | Limited                    | Yes                                             |
| Multiple Applications | Requires multiple Services | Single Ingress can expose multiple applications |

---

## Key Points

* Ingress provides a **single entry point** for external HTTP and HTTPS traffic.
* It routes requests to backend Services using **host-based** or **path-based** routing.
* An **Ingress Controller** is required for Ingress resources to work.
* Supports **SSL/TLS termination** for secure communication.
* Reduces cloud costs by allowing multiple applications to share one external IP address.
* Works with Kubernetes Services, not directly with Pods.
* Commonly used Ingress Controllers include **NGINX Ingress Controller**, **Traefik**, and **HAProxy Ingress**.
