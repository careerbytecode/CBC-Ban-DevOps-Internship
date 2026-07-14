# Secrets

## Definition

A **Secret** is a Kubernetes resource used to store **sensitive information** such as passwords, API keys, access tokens, SSH keys, and TLS certificates. Secrets help keep confidential data separate from application code and configuration files.

Unlike ConfigMaps, Secrets are designed for sensitive data. Kubernetes stores Secret values as **Base64-encoded strings** (note that Base64 is **encoding**, not encryption).

---

## Why Do We Need Secrets?

* Store sensitive information securely.
* Avoid hardcoding passwords and API keys in application code.
* Separate sensitive configuration from container images.
* Reuse the same application across different environments.
* Manage credentials centrally.

### Common Examples

* Database Username & Password
* API Keys
* OAuth Tokens
* SSH Private Keys
* TLS Certificates
* Docker Registry Credentials

---

## Types of Secrets

| Secret Type                      | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `Opaque`                         | Default Secret type used for custom key-value pairs. |
| `kubernetes.io/dockerconfigjson` | Stores Docker registry credentials.                  |
| `kubernetes.io/tls`              | Stores TLS certificates and private keys.            |
| `kubernetes.io/basic-auth`       | Stores username and password.                        |
| `kubernetes.io/ssh-auth`         | Stores SSH private keys.                             |

---

## YAML Syntax

```yaml
apiVersion: v1
kind: Secret

metadata:
  name: <secret-name>

type: Opaque

data:
  <KEY1>: <BASE64_ENCODED_VALUE1>
  <KEY2>: <BASE64_ENCODED_VALUE2>
```

---

## Syntax Explanation

| Field           | Description                                       |
| --------------- | ------------------------------------------------- |
| `apiVersion`    | Kubernetes API version (`v1`).                    |
| `kind`          | Specifies the resource type as **Secret**.        |
| `metadata`      | Contains metadata about the Secret.               |
| `metadata.name` | Name of the Secret.                               |
| `type`          | Defines the Secret type. `Opaque` is the default. |
| `data`          | Stores Base64-encoded key-value pairs.            |
| `KEY`           | Name of the secret value.                         |
| `VALUE`         | Base64-encoded value of the secret.               |

---

## Base64 Encoding

Before storing values in a Secret, they must be Base64 encoded.

Example:

```bash
echo -n "admin" | base64
```

Output:

```text
YWRtaW4=
```

Encode a password:

```bash
echo -n "Password@123" | base64
```

Output:

```text
UGFzc3dvcmRAMTIz
```

---

## Example

The following example creates a Secret containing database credentials.

```yaml
apiVersion: v1
kind: Secret

metadata:
  name: db-secret

type: Opaque

data:
  username: YWRtaW4=
  password: UGFzc3dvcmRAMTIz
```

---

## Create the Secret

Apply the YAML manifest.

```bash
kubectl apply -f secret.yaml
```

---

## Verify the Secret

View all Secrets.

```bash
kubectl get secrets
```

Example output:

```bash
NAME                  TYPE      DATA   AGE
db-secret             Opaque    2      20s
default-token-abc12   kubernetes.io/service-account-token   3   5d
```

Describe the Secret.

```bash
kubectl describe secret db-secret
```

View the Secret in YAML format.

```bash
kubectl get secret db-secret -o yaml
```

---

## Using Secrets as Environment Variables

A Secret can be injected into a Pod as environment variables.

### Example

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: mysql-client

spec:
  containers:
    - name: mysql-client
      image: mysql:8.0

      env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: username

        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
```

---

## Using Secrets as a Volume

Secrets can also be mounted as files inside a container.

```yaml
volumes:
  - name: secret-volume
    secret:
      secretName: db-secret

containers:
  - name: app
    image: nginx

    volumeMounts:
      - name: secret-volume
        mountPath: /etc/secrets
        readOnly: true
```

Each key in the Secret becomes a separate file inside `/etc/secrets`.

---

## Create a Secret Using kubectl

Instead of YAML, you can create a Secret directly from the command line.

```bash
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=Password@123
```

---

## Decode a Secret

Retrieve and decode the username stored in the Secret.

```bash
kubectl get secret db-secret \
-o jsonpath="{.data.username}" | base64 --decode
```

Output:

```text
admin
```

---

## Update a Secret

Edit the Secret.

```bash
kubectl edit secret db-secret
```

Or apply an updated YAML file.

```bash
kubectl apply -f secret.yaml
```

> **Note:** Applications using Secrets as environment variables usually need to be restarted to read updated values.

---

## Delete the Secret

Delete using the YAML file.

```bash
kubectl delete -f secret.yaml
```

Or delete by name.

```bash
kubectl delete secret db-secret
```

---

## Expected Output

```bash
$ kubectl get secrets

NAME          TYPE      DATA   AGE
db-secret     Opaque    2      1m
```

---

## Secret Workflow

```text
        Secret
     +----------------------+
     | username=admin       |
     | password=********    |
     +----------------------+
              |
      -----------------------
      |                     |
      v                     v
 Environment           Mounted Files
 Variables            (/etc/secrets)
      |                     |
      +----------+----------+
                 |
           Application
```

---

## ConfigMap vs Secret

| Feature     | ConfigMap                    | Secret                               |
| ----------- | ---------------------------- | ------------------------------------ |
| Stores      | Non-sensitive data           | Sensitive data                       |
| Data Format | Plain text                   | Base64 encoded                       |
| Examples    | App settings, URLs           | Passwords, API keys, Tokens          |
| Security    | No                           | Yes (intended for confidential data) |
| Usage       | Environment variables, files | Environment variables, files         |

---

## Key Points

* Secrets store **sensitive information** securely in Kubernetes.
* Secret values are stored as **Base64-encoded** strings.
* Secrets can be consumed as:

  * Environment Variables
  * Mounted Files (Volumes)
* Never hardcode passwords or API keys inside application code.
* Use **ConfigMaps** for non-sensitive configuration and **Secrets** for confidential data.
* Secrets can also store TLS certificates, Docker registry credentials, SSH keys, and authentication tokens.
* Updating a Secret does **not automatically restart Pods** that consume it as environment variables.
