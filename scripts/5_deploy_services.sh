#!/bin/bash

set -euo pipefail

echo "--- Deploying services via Helm and ArgoCD ---"

# Ensure ArgoCD CLI is installed
if ! command -v argocd &> /dev/null
then
    echo "ArgoCD CLI not found. Please run 3_setup_argocd.sh first."
    exit 1
fi

# Define the path to your ArgoCD Application YAML
ARGO_APP_YAML="kubernetes/argocd/application.yaml"

# Apply the ArgoCD Application
echo "Applying ArgoCD Application from ${ARGO_APP_YAML}..."
kubectl apply -f "${ARGO_APP_YAML}"

echo "ArgoCD Application applied. It will now synchronize and deploy the service."

echo "--- Service deployment complete ---"