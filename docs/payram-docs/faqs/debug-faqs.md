# Debug FAQ's

### Security & Troubleshooting

* [What security best practices does PayRam recommend?](#what-security-best-practices-does-payram-recommend)
* [How can I debug payment or configuration issues?](#how-can-i-debug-payment-or-configuration-issues)
* [How do I migrate from testnet to mainnet?](#how-do-i-migrate-from-testnet-to-mainnet)

#### What security best practices does PayRam recommend?

Security is paramount. Key practices include: always run PayRam over **HTTPS/TLS** (so API calls and UI are encrypted); keep your PayRam API keys, wallet mnemonics, and xpubs out of source control and never expose them publicly; validate incoming webhooks by checking the `API-Key` header or source IP to ensure they’re really from PayRam; back up your PayRam database (`payram.db`) and mnemonic seed securely (encrypted, offline); and monitor server logs for anomalies. If a key or credential is compromised, rotate it immediately. These measures help keep your self-hosted PayRam instance safe from unauthorized access or data loss.

#### How can I debug payment or configuration issues?

If you encounter problems, PayRam provides several tools:

* **Logs**: Check the console output where you ran the install script and the runtime logs from the PayRam service. They often report errors or warnings about missing config values or failed transactions.
* **Testnets**: Use testnets (Ethereum Sepolia, Bitcoin Testnet, Tron Nile) and faucets to simulate deposits without real crypto. This helps you verify that addresses, confirmations, and webhooks are working.
* **Webhook testing**: Temporarily log incoming requests on your webhook endpoint (e.g. using a tool like RequestBin or local logging) to ensure PayRam is sending them and your server is responding correctly.
* **Configuration**: Double-check `config.yaml` for typos (YAML is sensitive to formatting). Confirm that RPC endpoints work by testing them separately. For address issues, ensure your xpub is correctly pasted. Sometimes simply restarting PayRam after a config change resolves issues. In general, use the above aids to trace where a payment is (in PayRam’s database vs on-chain vs your system).

#### How do I migrate from testnet to mainnet?

(Repeat of “migrate from testnet to mainnet” for visibility.) Update `config.yaml` for **production**: switch `server: "PRODUCTION"`, replace test RPC endpoints with mainnet endpoints (Ethereum mainnet RPC, Bitcoin mainnet node, Tron mainnet), and use mainnet xpubs instead of testnet ones. Also raise confirmation requirements (e.g. Bitcoin ≥6, Ethereum ≥12). Test these settings on a staging instance first. Once confirmed, point your DNS to the new server (or switch environment flag) and restart PayRam. This moves PayRam from test to live mode safely.

**Sources:** PayRam installation and configuration guides.
