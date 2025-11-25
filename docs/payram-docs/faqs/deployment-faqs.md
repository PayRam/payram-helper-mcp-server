# Deployment FAQ's

### Deployment and Setup

* [What are the minimum server requirements for PayRam?](#what-are-the-minimum-server-requirements-for-payram)
* [How do I start or update PayRam?](#how-do-i-start-or-update-payram)
* [How do I migrate from testnet to mainnet?](#how-do-i-migrate-from-testnet-to-mainnet)

#### What are the minimum server requirements for PayRam?

PayRam requires a modest server. For basic use, you should provision a VPS or dedicated machine with **≥4 CPU cores, ≥4 GB RAM, and ≥50 GB SSD storage**, running Ubuntu 22.04 (or equivalent). In addition, make sure that ports **80, 8080, 443, and 8443** are open on the host (for HTTP/HTTPS and PayRam’s back-end). (Note: larger sites should scale up CPU/RAM/disk as needed.)

#### How do I start or update PayRam?

PayRam installation and updates are handled via an install script. To install or start PayRam, switch to root and run the official script from GitHub. For example:

{% code title="" overflow="wrap" lineNumbers="true" %}

```bash
sudo su
rm -f script.sh \\
  && curl -sSL -o script.sh <https://raw.githubusercontent.com/PayRam/payram-scripts/refs/heads/master/script.sh> \\
  && chmod +x script.sh \\
  && ./script.sh
```

{% endcode %}

This will install PayRam’s dependencies and prompt you to set the root email/password. To update an existing PayRam to the latest version, rerun the script with the `--update` flag (while root):

{% code title="" overflow="wrap" lineNumbers="true" %}

```bash
rm -f script.sh && curl -sSL -o script.sh <https://raw.githubusercontent.com/PayRam/payram-scripts/refs/heads/master/script.sh> && chmod +x script.sh && ./script.sh --update
```

{% endcode %}

. To **reset** (wipe data and start fresh), use the same script with `--reset`. (This removes existing PayRam folders and allows a clean install.)

#### How do I migrate from testnet to mainnet?

When moving to production, update your `config.yaml` from **development** to **production** settings. In practice, set `server: "PRODUCTION"` (instead of `"DEVELOPMENT"`) in `config.yaml` and replace all testnet RPC URLs with mainnet ones. For example, use Ethereum mainnet RPC instead of Sepolia, Bitcoin mainnet RPC, and Tron mainnet API. Similarly swap any **testnet xpubs** (e.g. for Bitcoin testnet) with your **mainnet xpubs**. Also increase confirmation requirements for security (e.g. Bitcoin to 6 confirmations, Ethereum to 12, etc.). Finally, test everything on a staging server before swapping DNS and restarting PayRam with the new configs.
