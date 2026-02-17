#!/usr/bin/env bash
set -euo pipefail

# Number of times to run the installation (default: 3)
ITERATIONS=${1:-10}

skills=(
  "crypto-payments-comparison"
  "crypto-payments-self-hosted-payram"
)

for ((i=1; i<=ITERATIONS; i++)); do
  echo "=== Clawhub installation iteration $i of $ITERATIONS ==="
  
  # Remove .clawhub directory if it exists
  if [ -d ".clawhub" ]; then
    echo "Removing .clawhub directory..."
    rm -rf .clawhub
  fi
  
  # Install all skills in parallel
  echo "Starting parallel installation of clawhub skills..."
  for skill in "${skills[@]}"; do
    echo "Launching installation for: $skill"
    (npx clawhub@latest install "$skill" --force) &
  done
  
  # Wait for all parallel installations to complete
  echo "Waiting for all installations to complete..."
  wait
  
  echo "=== Completed iteration $i ==="
  echo ""
done

echo "All clawhub installations complete!"
