# Horizontal Pod Autoscaler (HPA)

## Definition

A **Horizontal Pod Autoscaler (HPA)** is a Kubernetes resource that automatically **scales the number of Pods** in a Deployment, ReplicaSet, or StatefulSet based on resource utilization or custom metrics.

HPA continuously monitors metrics such as **CPU utilization**, **Memory utilization**, or **custom metrics** and automatically increases or decreases the number of running Pods to handle application load efficiently.

---

## Why Do We Need HPA?

* Automatically scales applications based on traffic.
* Improves application availability during high load.
* Reduces infrastructure costs during low traffic.
* Eliminates manual scaling.
* Maintains consistent application performance.

### Common Use Cases

* E-commerce applications during sales.
* Banking applications during peak hours.
* Video streaming platforms.
* APIs with fluctuating traffic.
* Microservices handling variable workloads.

---

## How HPA Works

```text
                 Users
                   |
             Increased Traffic
                   |
                   ▼
           Kubernetes Metrics Server
                   |
                   ▼
      Horizontal Pod Autoscaler (HPA)
                   |
      -----------------------------
      |                           |
 CPU > Target              CPU < Target
      |                           |
 Increase Pods             Decrease Pods
      |                           |
      ▼                           ▼
 Deployment                 Deployment
      |
      ▼
 Running Pods
```

---

## Prerequisites

Before using HPA, ensure the following:

* Kubernetes Metrics Server is installed.
* The application is running as a Deployment, ReplicaSet, or StatefulSet.
* CPU and/or Memory **requests** are defined for the container.
* Metrics Server is collecting resource usage.

---

## YAML Syntax

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler

metadata:
  name: <hpa-name>

spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <deployment-name>

  minReplicas: <minimum-pods>
  maxReplicas: <maximum-pods>

  metrics:
    - type: Resource

      resource:
        name: cpu

        target:
          type: Utilization
          averageUtilization: <percentage>
```

---

## Syntax Explanation

| Field                | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `apiVersion`         | Kubernetes API version (`autoscaling/v2`).                             |
| `kind`               | Specifies the resource type as **HorizontalPodAutoscaler**.            |
| `metadata`           | Contains metadata about the HPA.                                       |
| `metadata.name`      | Name of the HPA resource.                                              |
| `spec`               | Defines the desired configuration of the HPA.                          |
| `scaleTargetRef`     | Specifies the workload (Deployment, ReplicaSet, StatefulSet) to scale. |
| `apiVersion`         | API version of the target workload.                                    |
| `kind`               | Resource type to scale.                                                |
| `name`               | Name of the workload to scale.                                         |
| `minReplicas`        | Minimum number of Pods that should always run.                         |
| `maxReplicas`        | Maximum number of Pods that can be created.                            |
| `metrics`            | Metrics used for scaling decisions.                                    |
| `resource`           | Specifies CPU or Memory metrics.                                       |
| `target`             | Defines the scaling target.                                            |
| `averageUtilization` | Target average CPU or Memory utilization percentage.                   |

---

## Example

The following example automatically scales the **nginx-deployment** between **2 and 10 Pods** when average CPU utilization exceeds **70%**.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler

metadata:
  name: nginx-hpa

spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment

  minReplicas: 2
  maxReplicas: 10

  metrics:
    - type: Resource

      resource:
        name: cpu

        target:
          type: Utilization
          averageUtilization: 70
```

---

## Create the HPA

Apply the YAML manifest.

```bash
kubectl apply -f hpa.yaml
```

Or create it directly using the command line.

```bash
kubectl autoscale deployment nginx-deployment \
  --cpu-percent=70 \
  --min=2 \
  --max=10
```

---

## Verify the HPA

View all HPAs.

```bash
kubectl get hpa
```

Example output:

```bash
NAME        REFERENCE                     TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
nginx-hpa   Deployment/nginx-deployment   25%/70%  2         10        2          1m
```

Describe the HPA.

```bash
kubectl describe hpa nginx-hpa
```

View the Deployment to verify scaling.

```bash
kubectl get deployment nginx-deployment
```

View the Pods.

```bash
kubectl get pods
```

---

## Scaling Example

Suppose:

* Current Pods = **2**
* Target CPU = **70%**
* Current CPU Usage = **90%**

HPA automatically scales the Deployment.

```text
Before Scaling

Pod-1 (90%)
Pod-2 (88%)

Average CPU = 89%
```

↓

```text
After Scaling

Pod-1
Pod-2
Pod-3
Pod-4

Average CPU ≈ 45%
```

Similarly, if CPU usage decreases, HPA automatically reduces the number of Pods.

---

## Check Metrics

Verify CPU and Memory usage.

```bash
kubectl top pods
```

Check node utilization.

```bash
kubectl top nodes
```

> **Note:** These commands require the **Metrics Server** to be installed.

---

## Update the HPA

Edit the HPA.

```bash
kubectl edit hpa nginx-hpa
```

Or apply an updated YAML file.

```bash
kubectl apply -f hpa.yaml
```

---

## Delete the HPA

Delete using the YAML file.

```bash
kubectl delete -f hpa.yaml
```

Or delete by name.

```bash
kubectl delete hpa nginx-hpa
```

---

## Expected Output

```bash
$ kubectl get hpa

NAME        REFERENCE                     TARGETS   MINPODS   MAXPODS   REPLICAS
nginx-hpa   Deployment/nginx-deployment   32%/70%  2         10        2
```

---

## HPA Workflow

```text
               Client Requests
                      |
                      ▼
                Deployment
                      |
                      ▼
               Running Pods
                      |
              CPU / Memory Usage
                      |
                      ▼
             Kubernetes Metrics Server
                      |
                      ▼
         Horizontal Pod Autoscaler (HPA)
                      |
          -------------------------
          |                       |
      Scale Up               Scale Down
          |                       |
          ▼                       ▼
    More Pods Created      Extra Pods Removed
```

---

## Manual Scaling vs HPA

| Feature           | Manual Scaling     | Horizontal Pod Autoscaler      |
| ----------------- | ------------------ | ------------------------------ |
| Scaling           | Manual             | Automatic                      |
| Trigger           | Administrator      | CPU, Memory, or Custom Metrics |
| Response Time     | Slower             | Immediate                      |
| Cost Optimization | No                 | Yes                            |
| High Availability | Limited            | Improved                       |
| Best For          | Small environments | Production workloads           |

---

## Key Points

* HPA automatically scales Pods **horizontally** based on resource utilization.
* It works with **Deployments**, **ReplicaSets**, and **StatefulSets**.
* Requires the **Metrics Server** to collect CPU and memory metrics.
* Supports **CPU**, **Memory**, and **Custom Metrics** for scaling decisions.
* Helps improve application availability and optimize infrastructure costs.
* HPA scales the **number of Pods**, not the resources (CPU/Memory) of individual Pods.
* For vertical scaling (changing CPU/Memory resources), use a **Vertical Pod Autoscaler (VPA)**.
