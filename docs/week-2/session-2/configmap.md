# ConfigMaps

## Definition

A **ConfigMap** is a Kubernetes resource used to store **non-sensitive configuration data** as key-value pairs. It allows you to separate configuration from your application code, making applications more portable and easier to manage.

Instead of hardcoding configuration values inside a container image, you can store them in a ConfigMap and consume them as **environment variables**, **command-line arguments**, or **configuration files**.

---

## Why Do We Need a ConfigMap?

* Separates configuration from application code.
* Makes applications easier to maintain.
* Allows configuration changes without rebuilding the container image.
* Reuse the same container image across multiple environments.
* Centralized management of application configuration.

### Common Examples

* Database Host
* Application Mode
* Log Level
* API Endpoint
* Feature Flags
* Environment Variables

---

## YAML Syntax

```yaml
apiVersion: v1
kind: ConfigMap

metadata:
  name: <configmap-name>

data:
  <KEY1>: <VALUE1>
  <KEY2>: <VALUE2>
  <KEY3>: <VALUE3>
```

---

## Syntax Explanation

| Field           | Description                                   |
| --------------- | --------------------------------------------- |
| `apiVersion`    | Kubernetes API version (`v1`).                |
| `kind`          | Specifies the resource type as **ConfigMap**. |
| `metadata`      | Contains metadata about the ConfigMap.        |
| `metadata.name` | Name of the ConfigMap.                        |
| `data`          | Stores configuration as key-value pairs.      |
| `KEY`           | Configuration key used by the application.    |
| `VALUE`         | Value associated with the key.                |

---

## Example

The following example creates a ConfigMap containing application configuration.

```yaml
apiVersion: v1
kind: ConfigMap

metadata:
  name: app-config

data:
  APP_NAME: "Inventory-App"
  APP_ENV: "Production"
  DB_HOST: "mysql-service"
  DB_PORT: "3306"
  LOG_LEVEL: "INFO"
```

---

## Create the ConfigMap

Apply the YAML manifest.

```bash
kubectl apply -f configmap.yaml
```

---

## Verify the ConfigMap

View all ConfigMaps.

```bash
kubectl get configmaps
```

or

```bash
kubectl get cm
```

Example output:

```bash
NAME               DATA   AGE
app-config         5      20s
kube-root-ca.crt   1      5d
```

Describe the ConfigMap.

```bash
kubectl describe configmap app-config
```

View the ConfigMap in YAML format.

```bash
kubectl get configmap app-config -o yaml
```

---

## Using a ConfigMap as Environment Variables

A ConfigMap can be injected into a Pod as environment variables.

### Example

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: nginx-pod

spec:
  containers:
    - name: nginx
      image: nginx:1.27

      envFrom:
        - configMapRef:
            name: app-config
```

This makes all keys in the ConfigMap available as environment variables inside the container.

---

## Using Individual ConfigMap Keys

Instead of loading all values, you can load a specific key.

```yaml
env:
  - name: DB_HOST
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: DB_HOST
```

---

## Mounting a ConfigMap as a Volume

A ConfigMap can also be mounted as a file inside the container.

```yaml
volumes:
  - name: config-volume
    configMap:
      name: app-config

containers:
  - name: nginx
    image: nginx

    volumeMounts:
      - name: config-volume
        mountPath: /etc/config
```

Each key in the ConfigMap becomes a file inside `/etc/config`.

---

## Update a ConfigMap

Edit the ConfigMap.

```bash
kubectl edit configmap app-config
```

Or apply an updated YAML file.

```bash
kubectl apply -f configmap.yaml
```

> **Note:** Environment variables loaded from a ConfigMap are **not automatically updated** inside running Pods. Restart the Pods or perform a Deployment rollout to use the updated values.

---

## Delete the ConfigMap

Delete using the YAML file.

```bash
kubectl delete -f configmap.yaml
```

Or delete by name.

```bash
kubectl delete configmap app-config
```

---

## Expected Output

```bash
$ kubectl get configmaps

NAME               DATA   AGE
app-config         5      1m
kube-root-ca.crt   1      5d
```

---

## ConfigMap Workflow

```text
        ConfigMap
      +----------------+
      | APP_ENV=Prod   |
      | DB_HOST=mysql  |
      | LOG_LEVEL=INFO |
      +----------------+
               |
      --------------------
      |                  |
      v                  v
 Environment        Mounted File
 Variables             (/etc/config)
      |                  |
      +--------+---------+
               |
          Application
```

---

## Key Points

* ConfigMaps store **non-sensitive configuration data**.
* Configuration is stored as **key-value pairs**.
* They help separate configuration from application code.
* A ConfigMap can be consumed as:

  * Environment Variables
  * Command-Line Arguments
  * Mounted Files (Volumes)
* Updating a ConfigMap does **not automatically restart Pods**.
* ConfigMaps should **not** be used for passwords, API keys, or tokens. Use **Secrets** for sensitive data.
* ConfigMaps improve portability by allowing the same container image to run in different environments with different configurations.
