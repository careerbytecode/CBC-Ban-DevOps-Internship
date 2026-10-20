#!/bin/bash

echo "Checking FlavorForge deployment..."

kubectl get pods -n flavorforge

echo ""

kubectl get svc -n flavorforge

echo ""

kubectl get deployments -n flavorforge

echo ""

kubectl get hpa -n flavorforge

echo "Verification completed"