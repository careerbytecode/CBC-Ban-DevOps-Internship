# Grafana Installation & Dashboard Setup Guide

![Grafana](https://img.shields.io/badge/Grafana-Monitoring-orange?logo=grafana)
![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-red?logo=prometheus)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Cluster-blue?logo=kubernetes)
![Helm](https://img.shields.io/badge/Helm-Package_Manager-0F1689?logo=helm)

---

# 📖 Table of Contents

- Introduction
- Prerequisites
- Install Grafana
- Install Prometheus
- Configure Prometheus Data Source
- Create Your First Dashboard
- Useful PromQL Queries
- Import Community Dashboards
- Verify Metrics
- Troubleshooting
- Summary

---

# Introduction

## What is Grafana?

Grafana is an open-source visualization and monitoring platform used to collect, visualize, analyze, and alert on metrics from multiple data sources.

Grafana supports various data sources such as:

- Prometheus
- Loki
- Elasticsearch
- MySQL
- PostgreSQL
- Azure Monitor
- AWS CloudWatch
- InfluxDB

It provides interactive dashboards for monitoring applications, infrastructure, Kubernetes clusters, databases, and cloud resources.

---

# Prerequisites

Before installing Grafana, ensure you have:

- Kubernetes Cluster
- kubectl configured
- Helm installed
- Prometheus installed (or kube-prometheus-stack)

Verify Kubernetes Cluster

```bash
kubectl get nodes
```

Verify Helm

```bash
helm version
```

---

# Install Grafana

## Step 1: Add Helm Repository

```bash
helm repo add grafana https://grafana.github.io/helm-charts
```

Update Helm repositories

```bash
helm repo update
```

---

## Step 2: Create Namespace

```bash
kubectl create namespace monitoring
```

Verify

```bash
kubectl get ns
```

---

## Step 3: Install Grafana

```bash
helm install grafana grafana/grafana \
--namespace monitoring
```

Verify Installation

```bash
kubectl get pods -n monitoring
```

Example Output

```text
NAME                              READY   STATUS
grafana-7d89fd8c78-5w9kx          1/1     Running
```

---

## Step 4: Check Service

```bash
kubectl get svc -n monitoring
```

Example

```text
NAME       TYPE        CLUSTER-IP      PORT(S)
grafana    ClusterIP   10.96.152.34    80/TCP
```

---

## Step 5: Get Grafana Admin Password

```bash
kubectl get secret monitoring-grafana \ \
  -n monitoring \
  -o jsonpath="{.data.admin-password}" | base64 -d && echo
```

Example

```text
admin12345
```

---

## Step 6: Access Grafana

Port Forward

```bash
kubectl port-forward svc/monitoring-grafana 3001:80 -n monitoring
```

Open Browser

```
http://localhost:3000
```

---

## Login Credentials

Username

```
admin
```

Password

Use the password obtained from the previous step.

---

# Install Prometheus

If Prometheus is already installed, skip this section.

## Step 1: Add Repository

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

---

## Step 2: Update Repository

```bash
helm repo update
```

---

## Step 3: Install Prometheus

```bash
helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring
```

Verify Installation

```bash
kubectl get pods -n monitoring
```

---

# Configure Prometheus Data Source

Login to Grafana.

Navigate to

```
Connections
      ↓
Data Sources
      ↓
Add Data Source
      ↓
Prometheus
```

Enter Prometheus URL

```
http://prometheus-server.monitoring.svc.cluster.local
```

Click

```
Save & Test
```

Expected Output

```
Successfully queried the Prometheus API.
```

---

# Create Your First Dashboard

Navigate to

```
Dashboards
      ↓
New
      ↓
New Dashboard
      ↓
Add Visualization
```

Select

```
Prometheus
```

Choose Visualization

```
Stat
```

Enter Query

```promql
up
```

Click

```
Run Queries
```

Click

```
Save Dashboard
```

---

# Useful PromQL Queries

## Running Pods

```promql
count(kube_pod_status_phase{phase="Running"})
```

---

## Pending Pods

```promql
count(kube_pod_status_phase{phase="Pending"})
```

---

## Failed Pods

```promql
count(kube_pod_status_phase{phase="Failed"})
```

---

## Succeeded Pods

```promql
count(kube_pod_status_phase{phase="Succeeded"})
```

---

## Pods Per Namespace

```promql
count(kube_pod_info) by (namespace)
```

---

## Running Pods Per Node

```promql
count(kube_pod_info) by (node)
```

---

## CPU Usage Per Pod

```promql
sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod)
```

---

## Memory Usage Per Pod

```promql
sum(container_memory_usage_bytes{container!=""}) by (pod)
```

---

## Pod Restart Count

```promql
sum(kube_pod_container_status_restarts_total)
```

---

## Node CPU Usage

```promql
100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

---

## Node Memory Usage

```promql
100 * (
1 -
(
node_memory_MemAvailable_bytes
/
node_memory_MemTotal_bytes
)
)
```

---

# Import Existing Dashboards

Instead of creating dashboards manually, Grafana provides thousands of ready-made dashboards.

Navigate to

```
Dashboards
      ↓
New
      ↓
Import
```

Enter Dashboard ID.

## Recommended Kubernetes Dashboards

| Dashboard | Dashboard ID |
|------------|-------------:|
| Node Exporter Full | **1860** |
| Kubernetes Cluster Monitoring | **15757** |
| Kubernetes Views Global | **15759** |
| Kubernetes Views Pods | **15760** |
| Kubernetes Views Nodes | **15761** |

Click

```
Load
```

Select

```
Prometheus
```

Click

```
Import
```

---

# Verify Metrics

Open

```
Explore
```

Run

```promql
up
```

```promql
kube_pod_info
```

```promql
kube_node_info
```

```promql
node_memory_MemAvailable_bytes
```

If these queries return data, your monitoring setup is working correctly.

---

# Troubleshooting

## Prometheus Data Source Fails

Check Pods

```bash
kubectl get pods -n monitoring
```

Check Services

```bash
kubectl get svc -n monitoring
```

Check Prometheus Targets

```
http://<PROMETHEUS-IP>:9090/targets
```

---

## No Data in Dashboard

Verify kube-state-metrics

```bash
kubectl get pods -A | grep kube-state-metrics
```

If not installed, install it using Helm or the kube-prometheus-stack chart.

---

## Dashboard Shows Empty Panels

- Verify Prometheus is scraping metrics.
- Check the selected time range.
- Ensure PromQL queries are correct.
- Confirm exporters (Node Exporter, kube-state-metrics, cAdvisor) are running.

---

# Summary

Grafana is a powerful visualization tool that works seamlessly with Prometheus to monitor Kubernetes clusters and applications. By installing Grafana, connecting it to Prometheus, and either creating custom dashboards with PromQL or importing community dashboards, you can monitor:

- Kubernetes Pods
- Nodes
- Deployments
- CPU Usage
- Memory Usage
- Disk Usage
- Network Traffic
- Cluster Health
- Application Performance

Grafana dashboards provide real-time insights that help administrators quickly identify issues, analyze resource utilization, and maintain the overall health of Kubernetes environments.
