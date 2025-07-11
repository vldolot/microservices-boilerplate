#!/bin/bash

set -euo pipefail

echo "--- Setting up ArgoCD ---"

# Install ArgoCD CLI
if ! command -v argocd &> /dev/null
then
    echo "Installing ArgoCD CLI..."
    # For macOS
    brew install argocd
else
    echo "ArgoCD CLI already installed."
fi

# Create argocd namespace
echo "Creating argocd namespace..."
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -

# Install ArgoCD
echo "Installing ArgoCD into the cluster..."
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for ArgoCD to be ready..."
kubectl wait --for=condition=available --timeout=600s deployment/argocd-server -n argocd

# Get initial admin password
echo "Retrieving ArgoCD initial admin password..."
ARGO_PWD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)

echo "ArgoCD setup complete. Admin password: $ARGO_PWD"
echo "You can access ArgoCD UI by port-forwarding: kubectl port-forward svc/argocd-server -n argocd 8080:443"

echo "--- ArgoCD setup complete ---"
