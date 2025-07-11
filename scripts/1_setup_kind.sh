#!/bin/bash

set -euo pipefail

echo "--- Installing kind and creating a local cluster ---"

# Check if kind is installed
if ! command -v kind &> /dev/null
then
    echo "kind could not be found. Please install kind first."
    echo "For macOS with Homebrew: brew install kind"
    echo "For other OS: https://kind.sigs.k8s.io/docs/user/quick-start/#installation"
    exit 1
fi

# Delete existing cluster if it exists
echo "Checking for existing kind cluster..."
if kind get clusters | grep -q "microservices-boilerplate"; then
    echo "Deleting existing 'microservices-boilerplate' kind cluster..."
    kind delete cluster --name microservices-boilerplate
else
    echo "No existing 'microservices-boilerplate' kind cluster found."
fi

# Create a new kind cluster
echo "Creating new 'microservices-boilerplate' kind cluster..."
kind create cluster --name microservices-boilerplate

echo "Kind cluster 'microservices-boilerplate' created successfully."
echo "Setting kubectl context to 'kind-microservices-boilerplate'..."
kubectl cluster-info --context kind-microservices-boilerplate

echo "--- Kind setup complete ---"
