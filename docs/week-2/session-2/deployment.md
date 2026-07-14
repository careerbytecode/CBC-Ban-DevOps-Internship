# Deployments

## Definition

A **Deployment** is a Kubernetes resource used to manage Pods declaratively. It ensures that the desired number of Pod replicas are running at all times and provides features such as **scaling**, **rolling updates**, **rollbacks**, and **self-healing**.

Instead of creating Pods directly, Kubernetes best practice is to create a Deployment, which automatically creates and manages the Pods.

---

## YAML Syntax

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: <deployment-name>
  labels:
    app: <app-name>

spec:
  replicas: <number-of-replicas>

  selector:
    matchLabels:
      app: <app-name>

  template:
    metadata:
      labels:
        app: <app-name>

    spec:
      containers:
        - name: <container-name>
          image: <image-name>:<tag>

          ports:
            - containerPort: <container-port>

          env:
            - name: <ENV_VARIABLE>
              value: "<value>"
```

---

## Syntax Explanation

| Field                      | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `apiVersion`               | Specifies the Kubernetes API version for Deployments (`apps/v1`).                            |
| `kind`                     | Defines the resource type as **Deployment**.                                                 |
| `metadata`                 | Contains metadata such as the Deployment name and labels.                                    |
| `metadata.name`            | Unique name of the Deployment.                                                               |
| `metadata.labels`          | Labels assigned to the Deployment.                                                           |
| `spec`                     | Defines the desired state of the Deployment.                                                 |
| `replicas`                 | Specifies the number of Pod replicas to maintain.                                            |
| `selector`                 | Identifies which Pods are managed by the Deployment.                                         |
| `matchLabels`              | Matches Pods that have the specified labels.                                                 |
| `template`                 | Template used to create new Pods.                                                            |
| `template.metadata.labels` | Labels assigned to Pods created by the Deployment. These **must match** the selector labels. |
| `containers`               | List of containers that will run inside each Pod.                                            |
| `image`                    | Container image used to create the Pod.                                                      |
| `containerPort`            | Port exposed by the application running inside the container.                                |
| `env`                      | Defines environment variables for the container.                                             |

---

## Example

The following example creates a Deployment that runs **three Nginx Pods**.

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment
  labels:
    app: nginx

spec:
  replicas: 3

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
        - name: nginx-container
          image: nginx:1.27

          ports:
            - containerPort: 80

          env:
            - name: ENV
              value: "Production"
```

---

## Create the Deployment

Apply the YAML manifest to create the Deployment.

```bash
kubectl apply -f deployment.yaml
```

---

## Verify the Deployment

View all Deployments.

```bash
kubectl get deployments
```

Example output:

```bash
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment    3/3     3            3           30s
```

View the Pods created by the Deployment.

```bash
kubectl get pods
```

Example output:

```bash
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-7d4cfb8c9f-8xg4n   1/1     Running   0          30s
nginx-deployment-7d4cfb8c9f-jmz7w   1/1     Running   0          30s
nginx-deployment-7d4cfb8c9f-rb2xz   1/1     Running   0          30s
```

Describe the Deployment.

```bash
kubectl describe deployment nginx-deployment
```

---

## Scale the Deployment

Increase the number of replicas.

```bash
kubectl scale deployment nginx-deployment --replicas=5
```

Verify the updated replica count.

```bash
kubectl get deployments
kubectl get pods
```

---

## Update the Container Image

Update the running application to a new image version.

```bash
kubectl set image deployment/nginx-deployment nginx-container=nginx:1.28
```

Check the rollout status.

```bash
kubectl rollout status deployment/nginx-deployment
```

---

## Roll Back the Deployment

If the update causes issues, revert to the previous version.

```bash
kubectl rollout undo deployment/nginx-deployment
```

View rollout history.

```bash
kubectl rollout history deployment/nginx-deployment
```

---

## Delete the Deployment

Delete the Deployment using the YAML file.

```bash
kubectl delete -f deployment.yaml
```

Or delete it by name.

```bash
kubectl delete deployment nginx-deployment
```

---

## Expected Output

After creating the Deployment, you should see output similar to:

```bash
$ kubectl get deployments

NAME                READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment    3/3     3            3           20s
```

---

## Key Points

* A Deployment manages **Pods** using a declarative approach.
* Deployments automatically create and manage **ReplicaSets**.
* They provide **self-healing** by recreating failed Pods.
* They support **horizontal scaling** by changing the replica count.
* They enable **rolling updates** with zero or minimal downtime.
* They support **rollbacks** to a previous application version if an update fails.
* Deployments are the **recommended way** to run stateless applications in Kubernetes.
