# Services

## Definition

A **Service** is a Kubernetes resource that provides a **stable network endpoint** for accessing one or more Pods. Since Pods are ephemeral (they can be created, deleted, or recreated), their IP addresses can change over time. A Service ensures that applications can communicate reliably by exposing Pods through a fixed IP address and DNS name.

A Service uses **labels and selectors** to identify the Pods it should route traffic to.

---

## Why Do We Need a Service?

* Provides a stable IP address for Pods.
* Enables communication between applications inside the cluster.
* Load balances traffic across multiple Pods.
* Allows applications to be exposed inside or outside the Kubernetes cluster.
* Automatically routes traffic to healthy Pods.

---

## Types of Services

| Service Type     | Description                                                    | Use Case                                    |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------- |
| **ClusterIP**    | Default service type. Accessible only within the cluster.      | Internal communication between applications |
| **NodePort**     | Exposes the application on a static port of every worker node. | Testing and development environments        |
| **LoadBalancer** | Creates an external cloud load balancer.                       | Production applications on AWS, Azure, GCP  |
| **ExternalName** | Maps a Service to an external DNS name.                        | Accessing external services                 |

---

## YAML Syntax

```yaml
apiVersion: v1
kind: Service

metadata:
  name: <service-name>

spec:
  selector:
    app: <app-name>

  ports:
    - protocol: TCP
      port: <service-port>
      targetPort: <container-port>

  type: <ClusterIP | NodePort | LoadBalancer>
```

---

## Syntax Explanation

| Field           | Description                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| `apiVersion`    | Kubernetes API version (`v1`).                                                          |
| `kind`          | Specifies the resource type as **Service**.                                             |
| `metadata`      | Contains metadata such as the Service name.                                             |
| `metadata.name` | Name of the Service.                                                                    |
| `spec`          | Defines the desired configuration of the Service.                                       |
| `selector`      | Selects the Pods that will receive traffic.                                             |
| `ports`         | Defines the ports used by the Service.                                                  |
| `protocol`      | Network protocol (TCP or UDP).                                                          |
| `port`          | Port exposed by the Service.                                                            |
| `targetPort`    | Port on which the application inside the Pod is listening.                              |
| `type`          | Specifies how the Service is exposed (ClusterIP, NodePort, LoadBalancer, ExternalName). |

---

## Example

The following example creates a **NodePort Service** that exposes an Nginx Deployment.

```yaml
apiVersion: v1
kind: Service

metadata:
  name: nginx-service

spec:
  selector:
    app: nginx

  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

  type: NodePort
```

---

## Create the Service

Apply the YAML manifest.

```bash
kubectl apply -f service.yaml
```

---

## Verify the Service

View all Services.

```bash
kubectl get services
```

or

```bash
kubectl get svc
```

Example output:

```bash
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.96.0.1       <none>        443/TCP        5d
nginx-service   NodePort    10.96.24.125    <none>        80:30080/TCP   2m
```

Describe the Service.

```bash
kubectl describe service nginx-service
```

---

## Access the Application

### ClusterIP

Accessible only inside the Kubernetes cluster.

```text
http://nginx-service:80
```

---

### NodePort

Accessible using the Worker Node IP and NodePort.

```text
http://<Node-IP>:30080
```

Example:

```text
http://192.168.1.100:30080
```

---

### LoadBalancer

After creation, Kubernetes assigns an external IP address.

```text
http://20.204.45.18
```

---

## Delete the Service

Delete using the YAML file.

```bash
kubectl delete -f service.yaml
```

Or delete by name.

```bash
kubectl delete service nginx-service
```

---

## Expected Output

```bash
$ kubectl get svc

NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
nginx-service   NodePort    10.96.24.125    <none>        80:30080/TCP   1m
```

---

## Service Traffic Flow

```text
                Client
                   |
                   |
            +--------------+
            |   Service    |
            +--------------+
                   |
        -------------------------
        |           |           |
     nginx-1     nginx-2     nginx-3
      (Pod)       (Pod)       (Pod)
```

The Service automatically distributes incoming requests across all available Pods.

---

## Key Points

* A Service provides a **stable network endpoint** for Pods.
* Pods can be created or deleted, but the Service IP remains the same.
* Services use **labels and selectors** to identify backend Pods.
* Traffic is automatically **load balanced** across healthy Pods.
* The default Service type is **ClusterIP**.
* **NodePort** exposes applications on every worker node.
* **LoadBalancer** exposes applications to the internet using a cloud load balancer.
* **ExternalName** maps a Kubernetes Service to an external DNS name.
* Services enable reliable communication between applications in a Kubernetes cluster.
