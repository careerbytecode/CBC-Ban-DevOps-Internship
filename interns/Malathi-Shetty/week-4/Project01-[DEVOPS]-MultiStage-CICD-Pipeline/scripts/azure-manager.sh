#!/bin/bash

# =====================================================
# FlavorForge Azure Resource Manager
# =====================================================
# Purpose:
# Manage Azure resources for FlavorForge DevSecOps Project
#
# Commands:
# ./azure-manager.sh status
# ./azure-manager.sh start
# ./azure-manager.sh stop
# ./azure-manager.sh cleanup
#
# =====================================================


RESOURCE_GROUP="<your-resource-group-name>"
AKS_CLUSTER="<your-aks-cluster-name>"


function status() {

echo "======================================"
echo "Azure Resource Status"
echo "======================================"

az resource list \
--resource-group $RESOURCE_GROUP \
--query "[].{Name:name,Type:type,Location:location}" \
-o table

echo ""

echo "AKS Status"

az aks show \
--resource-group $RESOURCE_GROUP \
--name $AKS_CLUSTER \
--query "{Name:name,PowerState:powerState.code}" \
-o table

}


function start_aks() {

echo "Starting AKS Cluster..."

az aks start \
--resource-group $RESOURCE_GROUP \
--name $AKS_CLUSTER

echo "AKS started successfully"

}


function stop_aks() {

echo "Stopping AKS Cluster..."

az aks stop \
--resource-group $RESOURCE_GROUP \
--name $AKS_CLUSTER

echo "AKS stopped successfully"

}


function cleanup() {

echo "WARNING: This will delete Azure resources permanently."

read -p "Are you sure? (yes/no): " confirmation


if [ "$confirmation" == "yes" ]

then

echo "Deleting Resource Group..."

az group delete \
--name $RESOURCE_GROUP \
--yes \
--no-wait


echo "Cleanup started."

else

echo "Cleanup cancelled."

fi

}



case "$1" in


status)

status
;;

start)

start_aks
;;

stop)

stop_aks
;;

cleanup)

cleanup
;;

*)

echo "Usage:"
echo "./azure-manager.sh status"
echo "./azure-manager.sh start"
echo "./azure-manager.sh stop"
echo "./azure-manager.sh cleanup"

;;

esac