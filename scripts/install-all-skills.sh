#!/usr/bin/env bash
set -euo pipefail

skills=(
  payram-setup
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

for skill in "${skills[@]}"; do
  npx skills add https://github.com/payram/payram-helper-mcp-server --skill "$skill" -a claude-code
done
