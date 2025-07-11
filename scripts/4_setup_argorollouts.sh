#!/bin/bash

set -euo pipefail

echo "--- Setting up Argo Rollouts ---"

# Create argorollouts namespace
echo "Creating argorollouts namespace..."
kubectl create namespace argo-rollouts --dry-run=client -o yaml | kubectl apply -f -

# Install Argo Rollouts
echo "Installing Argo Rollouts into the cluster..."
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml

echo "Waiting for Argo Rollouts to be ready..."
kubectl wait --for=condition=available --timeout=600s deployment/argo-rollouts -n argo-rollouts

echo "--- Argo Rollouts setup complete ---"
