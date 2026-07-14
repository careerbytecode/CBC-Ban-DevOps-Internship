1. Kubernetes Architecture
Definition

Kubernetes Architecture is the structure of a Kubernetes cluster. It consists of two major components:

Control Plane – Manages the cluster.
Worker Nodes – Run the application containers.
Architecture
                Kubernetes Cluster

            +-----------------------+
            |     Control Plane     |
            +-----------------------+
            | API Server            |
            | Scheduler             |
            | Controller Manager    |
            | etcd                  |
            +-----------------------+

                     |
      ------------------------------------
      |                                  |
+-------------------+          +-------------------+
|   Worker Node 1   |          |   Worker Node 2   |
+-------------------+          +-------------------+
| kubelet           |          | kubelet           |
| kube-proxy        |          | kube-proxy        |
| Container Runtime |          | Container Runtime |
| Pods              |          | Pods              |
+-------------------+          +-------------------+
