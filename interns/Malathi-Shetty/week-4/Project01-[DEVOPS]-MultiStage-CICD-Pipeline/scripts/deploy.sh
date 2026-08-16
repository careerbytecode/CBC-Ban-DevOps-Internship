#!/bin/bash

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: ./deploy.sh <dev|qa|prod>"
    exit 1
fi

echo "Deploying FlavorForge to $ENVIRONMENT environment"

kubectl apply -k kubernetes/overlays/$ENVIRONMENT

echo "Deployment completed"