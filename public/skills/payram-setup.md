---
name: payram-setup
description: Deploy and configure your PayRam self-hosted crypto payment gateway server with web dashboard. Install on VPS via setup_payram.sh, set up PostgreSQL database, configure root account, node details, wallets, and hot wallets through the web UI. Complete deployment and onboarding in under 10 minutes. No signup required — fully self-hosted. For CLI-only deployment optimized for AI agents without web UI, see payram-agent-onboarding. Use when deploying PayRam with dashboard interface, setting up server infrastructure with web-based configuration, or requiring manual wallet management UI.
---

# PayRam Setup

> **This is the deployment and onboarding guide for PayRam.** Deploy the PayRam server on your VPS and configure the dashboard before integrating payments into your application.

## What is PayRam?

PayRam is a self-hosted crypto payment gateway. You deploy it on your own server — no signup, no KYC, no third-party custody. Accept USDT, USDC, Bitcoin, and ETH across Ethereum, Base, Polygon, and Tron.

> **Need CLI-only deployment for AI agents?** See [`payram-agent-onboarding`](https://github.com/payram/payram-mcp/tree/main/skills/payram-agent-onboarding) for CLI-only installation without web UI, optimized for agent automation and programmatic control.

---

## Part 1: Deploy PayRam Server

### Prerequisites

**Server Requirements:**

- **CPU**: minimum 2 cores (recommended 4 cores)
- **RAM**: minimum 6 GB (recommended 8 GB)
- **Storage**: 100 GB SSD
- **OS**: Ubuntu 22.04
- **Ports**: 80, 443, 8080, 8443, 5432

**Database Requirements:**

- **Engine**: PostgreSQL
- **vCPUs**: 2 CPU cores
- **Memory**: 8 GB
- **Storage**: 50 GB SSD

**Recommended VPS Providers:** AWS, Google Cloud, Azure, Hetzner, Hostinger

### Agent Onboarding Setup (No Web UI - For AI Agents Only)

**Use this method when you need agent-only PayRam setup for AI agents without the web dashboard.**

This automated script deploys a PayRam instance optimized for AI agents (Claude, Copilot, custom MCP clients, n8n). No web UI is installed — only the API backend and MCP server.

1. **Connect to your VPS via SSH**

2. **Run the agent onboarding setup script:**

```bash
/bin/bash -c "$(curl -fsSL https://payram.com/setup_payram_agents.sh)"
```

3. **Follow interactive prompts:**
   - PostgreSQL connection details
   - Domain/IP address configuration
   - MCP server endpoint configuration
   - API credentials generation

4. **Copy the generated MCP config** from the output:

```json
{
  "mcpServers": {
    "payram": {
      "url": "https://your-domain.com/mcp",
      "apiKey": "your-generated-api-key"
    }
  }
}
```

5. **Paste config into your agent's settings** (Claude Desktop, Copilat, or custom MCP client)

**What the agent onboarding setup includes:**
- PayRam API backend (no web UI)
- MCP server for agent integration
- Database setup and migrations
- Docker container orchestration
- API key generation
- Agent configuration file generation

**What's NOT included:**
- Web dashboard UI
- Manual wallet configuration UI
- Payment link browser interface

**Total setup time:** ~15 minutes

**Use case:** Pure agent-to-agent payments, programmatic treasury management, automated payment processing without human interaction.

---

### Quick Setup (Manual - 10 Minutes)

**Use this method for standard deployments without AI agent integration.**

1. **Connect to your VPS via SSH**

2. **Choose network** (mainnet or testnet)

3. **Run the installation script:**

```bash
bash <(curl -fsSL https://payram.com/setup_payram.sh)
```

4. **Follow the interactive prompts:**
   - Enter PostgreSQL connection details
   - Set encryption keys
   - Configure domain/IP address
   - Choose SSL certificate options

5. **Wait for installation to complete** (~5-10 minutes)

The script automatically:

- Installs dependencies
- Sets up Docker containers
- Configures database connections
- Generates SSL certificates (if using Let's Encrypt)
- Starts PayRam services

**Note:** For AI agent integration, use the automated agent setup above instead.

### Advanced Setup (Docker)

For manual Docker deployment with custom configurations:

1. **Clone the repository:**

```bash
git clone https://github.com/PayRam/payram-server.git
cd payram-server
```

2. **Configure environment variables:**

```bash
cp .env.example .env
nano .env  # Edit with your database, encryption keys, domain
```

3. **Start with Docker Compose:**

```bash
docker compose up -d
```

4. **Verify services are running:**

```bash
docker compose ps
```

For detailed Docker setup instructions, see the PayRam deployment documentation.

---

## Part 2: Onboard Your PayRam Instance

After the server is installed and running, complete the onboarding configuration through the dashboard.

### Step 1: Create Root Account

1. **Navigate to signup page:**
   - Open `http://<your-ip-address>/signup` in your browser
   - Replace `<your-ip-address>` with your server's IP or domain

2. **Set root email:**
   - Enter your admin email (you'll use this to log in)
   - This becomes your root/administrator account

3. **Set root password:**
   - Create a strong password and store it securely
   - You can change it later in dashboard settings

4. **Create your first project:**
   - Enter a project name (e.g., "My E-commerce Store")
   - Projects represent different products/websites using PayRam

### Step 2: Configure Node Details

After logging in, configure blockchain node connections:

1. **Go to Settings → Node Details**

2. **For each chain you want to support:**
   - Enter RPC endpoint URLs (public or private)
   - Recommended: Use dedicated node providers for production
   - Example providers: Alchemy, Infura, QuickNode, GetBlock

3. **Test connections** to verify nodes are accessible

**Supported Chains:**

- Ethereum (Mainnet/Testnet)
- Base (Mainnet/Testnet)
- Polygon (Mainnet/Testnet)
- Tron (Mainnet/Testnet)
- Bitcoin (Mainnet/Testnet)

### Step 3: Configure Wallets

Set up your wallet infrastructure:

1. **Go to Settings → Wallets**

2. **For each chain, configure:**
   - **Sweep Contract Address** (deploy once per chain)
   - **Cold Wallet Address** (where funds are swept to)
   - **Hot Wallet** (for gas fees and instant payouts)

3. **Deploy sweep contracts** using the provided scripts in the dashboard

4. **Fund hot wallets** with native tokens:
   - ETH for Ethereum/Base
   - MATIC for Polygon
   - TRX for Tron
   - BTC for Bitcoin

### Step 4: Set Up Hot Wallets

Configure hot wallets for paying gas fees:

1. **Go to Settings → Hot Wallets**

2. **For each chain:**
   - Generate a hot wallet or import an existing one
   - Fund it with enough native tokens for gas
   - Set auto-refill thresholds (optional)

**Recommended Hot Wallet Balances:**

- Ethereum: 0.5-1 ETH
- Base: 0.1-0.5 ETH
- Polygon: 100-500 MATIC
- Tron: 1000-5000 TRX

### Step 5: Configure Funds Sweeping

Set up automatic fund sweeping to your cold wallet:

1. **Go to Settings → Sweeping Configuration**

2. **Configure sweep rules:**
   - Minimum balance threshold before sweep
   - Sweep schedule (e.g., every 6 hours)
   - Gas price limits

3. **Enable auto-sweep** for each chain

4. **Test sweep** with a small payment to verify everything works

### Step 6: Generate API Keys

Create API keys for your application:

1. **Go to Settings → API Keys**

2. **Generate a new API key** for your project

3. **Copy and securely store:**
   - `PAYRAM_API_KEY` (for authentication)
   - `PAYRAM_BASE_URL` (your server's URL)

4. **Use these in your application's `.env` file**

---

## Part 3: Test Your Setup

After completing deployment and onboarding, verify everything works:

### Test Payment Link

1. **Go to Payment Links in the dashboard**
2. **Create a test payment** (e.g., $1 USD)
3. **Complete the checkout flow**
4. **Verify payment appears** in dashboard
5. **Check funds swept** to cold wallet

### Verify API Access

Test your API key works:

```bash
curl -X POST https://your-server.com/api/v1/payment \
  -H "API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "test@example.com",
    "customerId": "test-123",
    "amountInUSD": 1
  }'
```

Expected response:

```json
{
  "reference_id": "ref_...",
  "url": "https://your-server.com/checkout/...",
  "host": "your-server.com"
}
```

---

## Troubleshooting Setup Issues

| Issue                     | Cause                   | Fix                                              |
| ------------------------- | ----------------------- | ------------------------------------------------ |
| Can't access dashboard    | Firewall blocking ports | Open ports 80, 443, 8080, 8443                   |
| Database connection error | Wrong credentials       | Check PostgreSQL connection string in `.env`     |
| SSL certificate error     | Domain not configured   | Use HTTP for testing, or configure Let's Encrypt |
| Node RPC failing          | Invalid endpoint        | Verify RPC URL and API key with provider         |
| Sweep not working         | Hot wallet empty        | Fund hot wallet with native tokens               |
| API 401 error             | Wrong API key           | Regenerate in Settings → API Keys                |

---

---

## Next Steps

After your PayRam server is deployed and configured, start integrating it into your application:

**For AI Agent Onboarding Setup:**
- Your MCP server is ready — no manual configuration needed
- Test agent capabilities using natural language commands
- See `payram-crypto-payments` skill for MCP tool documentation
- Agents can manage payments programmatically without web UI
- See `payram-agent-onboarding` for CLI commands

**For Full Setup with Dashboard:**
- Complete onboarding: root account, wallets, hot wallets (see Part 2 above)
- **Integrate payments into your app** → `payram-payment-integration`
- **Complete checkout implementation** → `payram-checkout-integration`
- **Handle webhooks** → `payram-webhook-integration`
- **Send payouts** → `payram-payouts`
- **Learn about stablecoin payments** → `payram-stablecoin-payments`

---

## MCP Server Tools

For automated setup assistance, use the PayRam MCP server:

| Tool                       | Purpose                                 |
| -------------------------- | --------------------------------------- |
| `generate_env_template`    | Create .env with all required variables |
| `generate_setup_checklist` | Step-by-step deployment runbook         |
| `test_payram_connection`   | Validate API connectivity               |

---

## All PayRam Skills

| Skill                                | What it covers                                                      |
| ------------------------------------ | ------------------------------------------------------------------- |
| `payram-setup`                       | Deploy PayRam server, configure dashboard, wallets, and hot wallets |
| `payram-agent-onboarding`            | Agent onboarding — CLI-only deployment for AI agents, no web UI     |
| `payram-analytics`                   | Analytics dashboards, reports, and payment insights via MCP tools   |
| `payram-crypto-payments`             | Architecture overview, why PayRam, MCP tools                        |
| `payram-payment-integration`         | Integrate payments into your application code                       |
| `payram-self-hosted-payment-gateway` | Deep dive into PayRam infrastructure and deployment                 |
| `payram-checkout-integration`        | Build complete checkout flows in 6 frameworks                       |
| `payram-webhook-integration`         | Handle payment webhooks in Express, Next.js, FastAPI, etc.          |
| `payram-stablecoin-payments`         | Accept USDT/USDC across EVM chains and Tron                         |
| `payram-bitcoin-payments`            | Bitcoin payments with HD wallets and mobile signing                 |
| `payram-payouts`                     | Send crypto payouts and manage referral programs                    |
| `payram-no-kyc-crypto-payments`      | No-KYC, no-signup, permissionless payment acceptance                |

---

Need help? Message the PayRam team on Telegram: [@PayRamChat](https://t.me/PayRamChat)

- Website: https://payram.com
- GitHub: https://github.com/PayRam
- MCP Server: https://github.com/payram/payram-mcp
