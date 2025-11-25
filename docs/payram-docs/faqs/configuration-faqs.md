# Configuration FAQ's

### Configuration

* [How do I configure `config.yaml` after installation?](#how-do-i-configure-config.yaml-after-installation)
* [How do I distinguish between testnet and mainnet configurations?](#how-do-i-distinguish-between-testnet-and-mainnet-configurations)
* [How do I generate wallet addresses (xpubs)?](#how-do-i-generate-wallet-addresses-xpubs)
* [Which blockchains does PayRam support and how do I configure them?](#which-blockchains-does-payram-support-and-how-do-i-configure-them)
* [How do I manage deposit addresses?](#how-do-i-manage-deposit-addresses)

#### How do I configure `config.yaml` after installation?

After installation, edit `config.yaml` to point PayRam to your server URLs and database. In the top-level `configuration:` section, set **`payram.backend`** and **`payram.frontend`** to your server’s URL (including port) – e.g. `http://yourdomain.com:8080` for backend and `http://yourdomain.com` for frontend. Under `database:`, enter your Postgres details (host, port, database name, username, password).

Next, under `projects:`, define each project (store) as shown: include its `name`, `website` URL, `successEndpoint` (where users are redirected after payment) and `webhookEndpoint`.

In the `blockchain:` section, configure each network you wish to support. For each, set `client` (e.g. “geth” for ETH or “bitcoin\_core” for BTC), the RPC `server` URL, and (if applicable) credentials. You should also set `min_confirmations` (for example `2` for Ethereum). Finally, under `wallets:`, paste each network’s **xpub** (extended public key) and set a number for `deposit_addresses_count` to control how many addresses PayRam should generate. (See “Wallet Configuration” docs for details.) Once saved, restart PayRam to apply the new settings.

#### How do I distinguish between testnet and mainnet configurations?

PayRam uses an environment flag in `config.yaml` to select testnet vs production. For **testnets**, set `server: "DEVELOPMENT"`; for **mainnet**, use `server: "PRODUCTION"`. Correspondingly, use testnet RPC URLs under `blockchain:` (e.g. Ethereum Sepolia, Bitcoin testnet, Tron Nile) when in DEVELOPMENT mode, and mainnet RPC URLs in PRODUCTION. In practice the example configs in PayRam’s docs show one section using Ethereum Sepolia endpoint under `server: "DEVELOPMENT"`, and a separate example with Ethereum mainnet under `server: "PRODUCTION"`. Be sure to use the appropriate xpubs and network settings for each mode.

#### How do I generate wallet addresses (xpubs)?

PayRam derives deposit addresses from an xpub (extended public key). To obtain xpubs for each network, open your PayRam server’s **Addresses** page: e.g. visit `http://<your-payram-server>/addresses` (use HTTPS if enabled) in a browser. On that page, paste in a single 12-word mnemonic seed (from MetaMask or similar), then select a network from the dropdown and click “Generate Addresses”. The tool will derive an **xpub** for that seed and network. Copy each generated xpub and paste it into the `wallets:` section of `config.yaml`. For example, you would generate xpubs for Ethereum, Bitcoin (testnet), and Tron with the same seed and enter them under `xpub:`. Set `deposit_addresses_count` to the number of addresses PayRam should pre-generate. Once in `config.yaml`, PayRam will automatically derive and track those deposit addresses – you do **not** need to manually create new addresses beyond this setup.

#### Which blockchains does PayRam support and how do I configure them?

PayRam supports multiple major blockchains. At launch it fully supports **Bitcoin (BTC)**, **Ethereum (ETH)**, and **Tron (TRX)**, and by extension many tokens (including stablecoins like USDT/USDC on those chains). (The system is designed to be extensible, and additional EVM chains can be added.) In `config.yaml`, each supported network goes under the `blockchain:` section. For example, the default YAML includes blocks for `ETH:`, `BTC:`, and `TRX:`. In each, you set:

* `client` (the software type, e.g. `"bitcoin_core"` or `"trongrid"`),
* `server` (the RPC endpoint URL for a node),
* other fields like RPC credentials or a Tron `server_api_key`.

  Also include `min_confirmations` (e.g. 2 for ETH). The docs’ example shows Ethereum with a public RPC, Bitcoin Core connection details, and Tron Grid settings. Use your own nodes or public RPC services as needed. Once configured, PayRam will listen for deposits on those chains.

#### How do I manage deposit addresses?

After setup, PayRam handles deposit addresses automatically. Each configured network’s xpub generates a sequence of addresses according to `deposit_addresses_count`. You **do not** need to manually create or rotate addresses: PayRam will derive addresses from the xpub and monitor them for incoming payments. (The `deposit_addresses_count` field in `config.yaml` simply controls how many addresses to pre-generate.) As customers make payments, PayRam credits them to the correct deposit address behind the scenes, so no manual address management is required.
