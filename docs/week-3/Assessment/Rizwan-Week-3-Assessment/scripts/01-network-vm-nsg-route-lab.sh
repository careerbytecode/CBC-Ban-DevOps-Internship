#!/bin/bash

RG="rg-week3-devops-lab"
LOC="centralindia"
VNET="vnet-week3-lab"
SUBNET="subnet-public"
SUBNET_PREFIX="10.0.1.0/24"
VM="vm-week3-public"
ADMIN="azureuser"
NSG="nsg-week3-vm"
RT="rt-block-internet"

az group create --name $RG --location $LOC

az network vnet create \
  --resource-group $RG \
  --location $LOC \
  --name $VNET \
  --address-prefix 10.0.0.0/16 \
  --subnet-name $SUBNET \
  --subnet-prefix $SUBNET_PREFIX

az vm create \
  --resource-group $RG \
  --name $VM \
  --image Ubuntu2204 \
  --size Standard_B1s \
  --admin-username $ADMIN \
  --generate-ssh-keys \
  --vnet-name $VNET \
  --subnet $SUBNET \
  --nsg $NSG \
  --nsg-rule NONE \
  --public-ip-sku Standard

az network nsg rule create \
  --resource-group $RG \
  --nsg-name $NSG \
  --name Allow-SSH-22 \
  --priority 1000 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 22

az network nsg rule create \
  --resource-group $RG \
  --nsg-name $NSG \
  --name Allow-HTTP-80 \
  --priority 1010 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 80

az network nsg rule create \
  --resource-group $RG \
  --nsg-name $NSG \
  --name Allow-HTTPS-443 \
  --priority 1020 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 443

MYIP=$(curl -s https://api.ipify.org)

az network nsg rule update \
  --resource-group $RG \
  --nsg-name $NSG \
  --name Allow-SSH-22 \
  --source-address-prefixes "$MYIP/32"

az network route-table create \
  --resource-group $RG \
  --location $LOC \
  --name $RT

az network route-table route create \
  --resource-group $RG \
  --route-table-name $RT \
  --name BlockInternet \
  --address-prefix 0.0.0.0/0 \
  --next-hop-type None

az network vnet subnet update \
  --resource-group $RG \
  --vnet-name $VNET \
  --name $SUBNET \
  --route-table $RT

az network vnet subnet update \
  --resource-group $RG \
  --vnet-name $VNET \
  --name $SUBNET \
  --remove routeTable
