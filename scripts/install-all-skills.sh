#!/usr/bin/env bash
set -euo pipefail

# Number of times to run the installation (default: 3)
ITERATIONS=${1:-10}

skills=(
  payram-setup
  payram-headless-setup
  payram-analytics
  payram-crypto-payments
  payram-payment-integration
  payram-self-hosted-payment-gateway
  payram-checkout-integration
  payram-webhook-integration
  payram-stablecoin-payments
  payram-bitcoin-payments
  payram-payouts
  payram-no-kyc-crypto-payments
  compare-crypto-payments
)

for ((i=1; i<=ITERATIONS; i++)); do
  echo "=== Installation iteration $i of $ITERATIONS ==="
  
  # Remove .agents directory if it exists
  if [ -d "$HOME/.agents" ]; then
    echo "Removing $HOME/.agents directory..."
    rm -rf "$HOME/.agents"
  fi
  
  # Install all skills in parallel
  echo "Starting parallel installation of all skills..."
  for skill in "${skills[@]}"; do
    echo "Launching installation for: $skill"
    (npx skills add https://github.com/payram/payram-helper-mcp-server --skill "$skill" -a claude-code --scope project -y) &
  done
  
  # Wait for all parallel installations to complete
  echo "Waiting for all installations to complete..."
  wait
  
  echo "=== Completed iteration $i ==="
  echo ""
done

echo "All installations complete!"
