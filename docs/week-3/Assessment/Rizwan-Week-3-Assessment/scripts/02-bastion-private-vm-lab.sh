#!/bin/bash

RG="rg-week3-devops-lab"
LOC="centralindia"
VNET="vnet-week3-lab"
ADMIN="azureuser"

BASTION_SUBNET="AzureBastionSubnet"
BASTION="bastion-week3-lab"
BASTION_PIP="pip-bastion-week3-lab"

PRIVATE_SUBNET="subnet-private"
PRIVATE_VM="vm-week3-private"
PRIVATE_NSG="nsg-week3-private"

az network vnet subnet create \
  --resource-group $RG \
  --vnet-name $VNET \
  --name $BASTION_SUBNET \
  --address-prefixes 10.0.3.0/26

az network public-ip create \
  --resource-group $RG \
  --location $LOC \
  --name $BASTION_PIP \
  --sku Standard

az network bastion create \
  --resource-group $RG \
  --name $BASTION \
  --public-ip-address $BASTION_PIP \
  --vnet-name $VNET \
  --location $LOC

az network vnet subnet create \
  --resource-group $RG \
  --vnet-name $VNET \
  --name $PRIVATE_SUBNET \
  --address-prefixes 10.0.2.0/24

# Password is intentionally not stored in this script.
# Create private VM manually or pass password securely using shell variable.

az vm create \
  --resource-group $RG \
  --name $PRIVATE_VM \
  --image Ubuntu2204 \
  --size Standard_B1s \
  --admin-username $ADMIN \
  --authentication-type password \
  --admin-password "$VM_PASS" \
  --vnet-name $VNET \
  --subnet $PRIVATE_SUBNET \
  --public-ip-address "" \
  --nsg $PRIVATE_NSG \
  --nsg-rule NONE
