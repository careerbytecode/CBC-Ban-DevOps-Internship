Here's the **StatefulSet** section in the same GitHub `README.md` style as the Pods and Deployment sections.

# StatefulSet

## Definition

A **StatefulSet** is a Kubernetes workload resource used to manage **stateful applications**. Unlike a Deployment, a StatefulSet provides **stable Pod identities**, **persistent storage**, and **ordered deployment and scaling**.

Each Pod created by a StatefulSet has:

* A **unique and stable hostname**
* A **persistent storage volume** that remains attached even if the Pod is recreated
* A **predictable startup and shutdown order**

StatefulSets are commonly used for applications that require persistent data and stable network identities, such as databases and distributed systems.

---

## When to Use a StatefulSet

Use a StatefulSet when your application requires:

* Stable network identity
* Persistent storage
* Ordered deployment and termination
* Ordered rolling updates
* Unique identity for each Pod

### Common Examples

* MySQL
* PostgreSQL
* MongoDB
* Cassandra
* Apache Kafka
* Elasticsearch
* ZooKeeper
* Redis Cluster

---

## YAML Syntax

```yaml
apiVersion: apps/v1
kind: StatefulSet

metadata:
  name: <statefulset-name>

spec:
  serviceName: <headless-service-name>

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

          volumeMounts:
            - name: <volume-name>
              mountPath: <mount-path>

  volumeClaimTemplates:
    - metadata:
        name: <volume-name>

      spec:
        accessModes:
          - ReadWriteOnce

        resources:
          requests:
            storage: <storage-size>
```

---

## Syntax Explanation

| Field                  | Description                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `apiVersion`           | Kubernetes API version (`apps/v1`).                                                |
| `kind`                 | Specifies the resource type as **StatefulSet**.                                    |
| `metadata`             | Contains information about the StatefulSet.                                        |
| `metadata.name`        | Name of the StatefulSet.                                                           |
| `serviceName`          | Name of the required **Headless Service** that provides stable network identities. |
| `replicas`             | Number of Pods to maintain.                                                        |
| `selector`             | Identifies the Pods managed by the StatefulSet.                                    |
| `template`             | Pod template used to create Pods.                                                  |
| `containers`           | Defines the containers running inside each Pod.                                    |
| `image`                | Container image used by the Pod.                                                   |
| `containerPort`        | Port exposed by the application.                                                   |
| `volumeMounts`         | Mounts persistent storage inside the container.                                    |
| `volumeClaimTemplates` | Automatically creates a separate PersistentVolumeClaim (PVC) for each Pod.         |
| `storage`              | Amount of persistent storage requested.                                            |

---

## Example

The following example creates a **MySQL StatefulSet** with **3 replicas**, each having its own **persistent storage**.

```yaml
apiVersion: apps/v1
kind: StatefulSet

metadata:
  name: mysql

spec:
  serviceName: mysql-headless

  replicas: 3

  selector:
    matchLabels:
      app: mysql

  template:
    metadata:
      labels:
        app: mysql

    spec:
      containers:
        - name: mysql
          image: mysql:8.0

          ports:
            - containerPort: 3306

          env:
            - name: MYSQL_ROOT_PASSWORD
              value: root123

          volumeMounts:
            - name: mysql-storage
              mountPath: /var/lib/mysql

  volumeClaimTemplates:
    - metadata:
        name: mysql-storage

      spec:
        accessModes:
          - ReadWriteOnce

        resources:
          requests:
            storage: 5Gi
```

---

## Create the StatefulSet

Apply the YAML manifest.

```bash
kubectl apply -f statefulset.yaml
```

---

## Verify the StatefulSet

View the StatefulSet.

```bash
kubectl get statefulsets
```

Example output:

```bash
NAME    READY   AGE
mysql   3/3     2m
```

View the Pods.

```bash
kubectl get pods
```

Example output:

```bash
NAME      READY   STATUS    AGE
mysql-0   1/1     Running   2m
mysql-1   1/1     Running   2m
mysql-2   1/1     Running   2m
```

View Persistent Volume Claims.

```bash
kubectl get pvc
```

Example output:

```bash
NAME                    STATUS   CAPACITY
mysql-storage-mysql-0   Bound    5Gi
mysql-storage-mysql-1   Bound    5Gi
mysql-storage-mysql-2   Bound    5Gi
```

Describe the StatefulSet.

```bash
kubectl describe statefulset mysql
```

---

## Scale the StatefulSet

Increase the number of replicas.

```bash
kubectl scale statefulset mysql --replicas=5
```

Verify the Pods.

```bash
kubectl get pods
```

New Pods created:

```text
mysql-3
mysql-4
```

---

## Update the Container Image

Update the MySQL image.

```bash
kubectl set image statefulset/mysql mysql=mysql:8.4
```

Monitor the rollout.

```bash
kubectl rollout status statefulset/mysql
```

---

## Delete the StatefulSet

Delete the StatefulSet.

```bash
kubectl delete -f statefulset.yaml
```

Or delete it by name.

```bash
kubectl delete statefulset mysql
```

> **Note:** Deleting the StatefulSet does **not** automatically delete the PersistentVolumeClaims (PVCs). This prevents accidental data loss.

---

## Expected Output

```bash
$ kubectl get statefulsets

NAME    READY   AGE
mysql   3/3     5m
```

```bash
$ kubectl get pods

NAME      READY   STATUS    AGE
mysql-0   1/1     Running   5m
mysql-1   1/1     Running   5m
mysql-2   1/1     Running   5m
```

---

## Deployment vs StatefulSet

| Feature      | Deployment                 | StatefulSet                       |
| ------------ | -------------------------- | --------------------------------- |
| Pod Names    | Random                     | Stable (`mysql-0`, `mysql-1`)     |
| Storage      | Shared or Ephemeral        | Dedicated Persistent Storage      |
| Pod Identity | No                         | Yes                               |
| Scaling      | Parallel                   | Ordered                           |
| Updates      | Parallel Rolling Update    | Ordered Rolling Update            |
| Best For     | Stateless Applications     | Stateful Applications             |
| Examples     | Nginx, React, Node.js APIs | MySQL, PostgreSQL, MongoDB, Kafka |

---

## Key Points

* StatefulSets are designed for **stateful applications**.
* Every Pod has a **stable hostname** and **persistent storage**.
* Pods are created and terminated in a **predictable order**.
* Each Pod gets its own **PersistentVolumeClaim (PVC)**.
* StatefulSets require a **Headless Service** for stable DNS names.
* Deleting a StatefulSet does **not** remove the associated storage by default.
* Use StatefulSets for databases, messaging systems, and distributed applications that require stable identities and persistent data.

This README follows the same style as the Pods and Deployment sections while also including a useful **Deployment vs StatefulSet** comparison, which helps learners understand **when to use each workload type**.
