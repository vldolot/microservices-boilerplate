#!/bin/bash

set -euo pipefail

echo "--- Installing kubectl and helm ---"

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null
then
    echo "kubectl could not be found. Please install kubectl first."
    echo "For macOS with Homebrew: brew install kubectl"
    echo "For other OS: https://kubernetes.io/docs/tasks/tools/install-kubectl/"
    exit 1
fi

# Check if helm is installed
if ! command -v helm &> /dev/null
then
    echo "helm could not be found. Please install helm first."
    echo "For macOS with Homebrew: brew install helm"
    echo "For other OS: https://helm.sh/docs/intro/install/"
    exit 1
fi

echo "kubectl and helm are already installed."

echo "--- Tool setup complete ---"
