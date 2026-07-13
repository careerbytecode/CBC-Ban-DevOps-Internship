#!/usr/bin/env bash
# Sample Azure provisioning script — CareerByteCode Cloud & DevOps Internship
# Creates a resource group, ACR, and an AKS cluster, then connects kubectl.
#
# WARNING: these commands create REAL, BILLABLE Azure resources.
#          Delete them after practice to keep your costs minimal:
#          az group delete --name "$RG" --yes --no-wait
set -euo pipefail

RG="cbc-devops-rg"
LOCATION="eastus"
ACR="cbcdevopsacr$RANDOM"     # ACR names must be globally unique & lowercase
AKS="cbc-devops-aks"

echo ">> Creating resource group: $RG"
az group create --name "$RG" --location "$LOCATION"

echo ">> Creating container registry: $ACR"
az acr create --resource-group "$RG" --name "$ACR" --sku Basic

echo ">> Creating AKS cluster (this can take several minutes)..."
az aks create \
  --resource-group "$RG" \
  --name "$AKS" \
  --node-count 1 \
  --generate-ssh-keys \
  --attach-acr "$ACR"

echo ">> Connecting kubectl to the cluster"
az aks get-credentials --resource-group "$RG" --name "$AKS"

echo ">> Done. Your ACR is: $ACR"
echo ">> Remember to clean up: az group delete --name $RG --yes --no-wait"
