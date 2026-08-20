For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/deployment-guide/advanced-setup.md).

Copy

On this page

1.  [DEPLOYMENT GUIDE](/deployment-guide)

# ⚙️Advanced Setup

In this section, you’ll set up your PayRam server using Docker, covering installation, security configuration, and encryption to ensure your server is fully prepared and running smoothly.

* * *

## Docker installation[](#docker-installation)

PayRam can be run using Docker, which provides a clean, isolated environment and avoids operating system or tooling incompatibilities. It also makes managing the database and environment variables simple and straightforward.

You can run PayRam inside a Docker container in any os with a simple command, either on testnet for development or on mainnet for production.

* * *

## Technical knowledge requirements for self-hosting[](#technical-knowledge-requirements-for-self-hosting)

Running PayRam on your own servers requires understanding of technical concepts such as:

-   Installing and managing Docker containers
    
-   Allocating system resources effectively
    
-   Securing servers and sensitive data
    
-   Configuring environment variables and application settings correctly
    

Incorrect setup can result in data loss, security risks, or downtime.

**Note** : If you do not have Docker installed or have limited technical knowledge, there is a Easy Method available that can install and configure your PayRam server in just less than 5 minutes.

**Checkout the Easy Method here :** [Quick Setup](/deployment-guide/quick-setup)

* * *

## Hardware requirements[](#hardware-requirements)

### Server configuration[](#server-configuration)

-   Use a VPS or dedicated server with the minimum specifications required to host the PayRam server.
    

### **Minimum server requirements:**[](#minimum-server-requirements)

-   **CPU**: 2 cores
    
-   **RAM**: 4 GB
    
-   **Storage**: 50 GB SSD
    
-   **Operating System**: Ubuntu 22.04
    

**Note**: Depending on your expected usage and scale, additional resources may be required.

### **Network requirements**[](#network-requirements)

-   Ensure the following ports are open on your server or VPS:
    
    Port
    
    Purpose
    
    80
    
    HTTP. Serves the dashboard, payment pages, and API. Redirects to 443 when SSL is enabled.
    
    443
    
    HTTPS. Required only when PayRam terminates TLS itself (Let's Encrypt or custom certificates).
    

* * *

## Quick start[](#quick-start)

-   Use this guide to run PayRam with Docker on testnet for local setup and testing. See below for instructions on deploying PayRam in production on the mainnet.
    
-   Assuming you have Docker installed and running, pull the latest PayRam image and start a container
    
-   Create a folder where PayRam should store its data, logs, and database files, then point `WORKDIR` at it. Choose any location you like — just keep it the same across updates.
    
-   Generate your own `AES_KEY`. This encrypts your hot wallet keys, so never reuse a key from the docs or from anyone else.
    

**Save your AES key somewhere safe.** You must use the exact same key every time you update PayRam. Without it, your existing data cannot be decrypted.

**Note**: When running the Docker command, do not modify the port mappings. Changing the default ports may cause PayRam to stop working correctly or prevent it from connecting to required services.

**Do not change or remove** `PAYMENTS_APP_SERVER_URL`. Keep it exactly as shown, or PayRam will not work.

amd64

arm64

**Note** **:** Use this build if your machine runs on an Intel or AMD processor. This covers most Linux servers, Windows PCs, and default cloud VMs (AWS EC2, Google Cloud, Azure). To confirm your architecture, run `uname -m` in your terminal — if it returns `x86_64`, you're good to go with this build.

**Note** **:** Use this build if you're on an Apple Silicon Mac (M1, M2, M3), AWS Graviton instance, or Raspberry Pi. To confirm, run `uname -m` in your terminal — if it returns `aarch64`, use this build.

This command does the following:

-   **Runs PayRam in the background** (-d) with the name payram-testnet.
    
-   **Exposes ports**:
    
    -   80 → HTTP access to the dashboard, payment pages, and API
        
    
-   **Sets environment variables**:
    
    -   AES\_KEY: Encryption key used for securing data.
        
    -   SSL\_CERT\_PATH: Path to SSL certificates (optional in testnet).
        
    -   BLOCKCHAIN\_NETWORK\_TYPE: Configures the blockchain network (testnet).
        
    -   SERVER: Marks the environment as DEVELOPMENT.
        
    -   POSTGRES\_\*: Database connection details.
        
    
-   **Mounts volumes**:
    
    -   $WORKDIR:/root/payram → Application data.
        
    -   $WORKDIR/log/supervisord:/var/log → Log files.
        
    -   $WORKDIR/db/postgres:/var/lib/payram/db/postgres → Database storage.
        
    -   Pulls and runs the PayRam Docker image: payramapp/payram:latest (or payramapp/payram:latest-arm64 on ARM).
        
    

**Note**: After the installation is complete, you can access PayRam at https://your-domain.com/login.

For detailed configuration steps, refer to the [Merchant Guide](/onboarding-guide/introduction) for further instructions.

* * *

## Advance setup[](#advance-setup)

-   If you’re running PayRam in production, keep the following in mind: you need to configure an external database, set up proper SSL certificates, and generate your own unique AES key for security.
    

### AES key generation[](#aes-key-generation)

-   A secure encryption key required by PayRam.
    
-   Generate it the same way as in [Quick start](/deployment-guide/advanced-setup#quick-start), and use a **fresh key for production** — never reuse the one from your testnet instance.
    

### Postgres setup[](#postgres-setup)

To run **PayRam** safely and reliably in a production environment, you must connect it to an **external PostgreSQL database** hosted by a trusted and managed provider. Local or containerized databases should not be used in production, as they are not secure, scalable, or fault-tolerant.

-   Recommended PostgreSQL providers include:
    
    -   **Amazon RDS for PostgreSQL / Aurora PostgreSQL**
        
    -   **Google Cloud SQL for PostgreSQL**
        
    -   **Azure Database for PostgreSQL**
        
    -   **DigitalOcean Managed PostgreSQL**
        
    

#### **Required environment variables**[](#required-environment-variables)

-   When your provider gives you a connection URL, simply take each part of it and map it to PayRam’s required environment variables.
    
-   The following example shows how this connection URL can be expressed as environment variables for PayRam:
    

### SSL configuration[](#ssl-configuration)

-   PayRam requires **SSL/TLS certificates** to enable secure **HTTPS** connections in production.
    
-   If you are using a third-party provider such as **Cloudflare** or **AWS Load Balancer** that manages HTTPS for you, you can leave this value empty:
    
-   If you are managing certificates yourself on the PayRam server, you must point this variable to the directory where your domain’s SSL/TLS certificates are stored.
    
-   The most common setup is with **Let’s Encrypt**, which stores certificates in:
    
-   Ensure the directory contains the correct certificate files for your domain (commonly fullchain.pem and privkey.pem).
    

**Note**: Setting the SSL\_CERT\_PATH is required only if you manage HTTPS directly on your PayRam server.If you’re using a third-party service such as Cloudflare that already handles HTTPS, you can leave this value "**SSL\_CERT\_PATH**" empty.

### Production setup[](#production-setup)

Before starting PayRam for the first time, make sure you **note down and store all necessary configurations securely**. These will be required for future updates or troubleshooting:

-   **AES\_KEY** → Keep a copy of the key securely; required for decrypting data in future updates.
    
-   **Postgres details** → Database name, username, password, and port. You will need the same details to reconnect or update.
    
-   **Volume paths (WORKDIR)** → Note the host paths you plan to use for data, logs, and database files (e.g., `/home/payram`). These must remain consistent for updates
    

amd64

arm64

**Note** **:** Use this build if your machine runs on an Intel or AMD processor. This covers most Linux servers, Windows PCs, and default cloud VMs (AWS EC2, Google Cloud, Azure). To confirm your architecture, run `uname -m` in your terminal — if it returns `x86_64`, you're good to go with this build.

**Note** **:** Use this build if you're on an Apple Silicon Mac (M1, M2, M3), AWS Graviton instance, or Raspberry Pi. To confirm, run `uname -m` in your terminal — if it returns `aarch64`, use this build.

#### **What does this command do?**[](#what-does-this-command-do)

-   **Runs PayRam on mainnet** in a Docker container.
    
-   **Maps and exposes ports**:
    
    -   80 → standard HTTP (redirects to 443 when SSL is enabled)
        
    -   443 → HTTPS (requires valid SSL certs)
        
    

⚠️ **Important on HTTPS:**

-   If you **set SSL\_CERT\_PATH and mount certs**, HTTPS on 443 will work and PayRam will serve securely.
    
-   If you **leave SSL\_CERT\_PATH=""**, PayRam will only serve over HTTP. This is acceptable if you use an external TLS termination service (like Cloudflare, reverse proxy, or load balancer).
    
-   **Configures environment variables**:
    
    -   AES\_KEY must be a secure random hex string in production.
        
    -   SERVER=PRODUCTION ensures PayRam runs in production mode.
        
    -   Postgres settings must point to your **production-grade database**.
        
    
-   **Mounts volumes**:
    
    -   $WORKDIR:/root/payram → application data.
        
    -   $WORKDIR/log/supervisord:/var/log → logs.
        
    -   $WORKDIR/db/postgres:/var/lib/payram/db/postgres → Postgres storage (only if self-hosted).
        
    -   /etc/letsencrypt:/etc/letsencrypt → host SSL certs (required if SSL\_CERT\_PATH is set).
        
    

* * *

## Updating PayRam Docker container[](#updating-payram-docker-container)

1

### Prepare before updating[](#prepare-before-updating)

Before stopping or removing any containers, make sure you **note down all current configurations**:

-   **AES\_KEY** → Must be the same as the current container, otherwise PayRam will fail to decrypt data.
    
-   **Postgres details** → Database name, username, password, and port must remain the same.
    
-   **Volume mappings** → Use the exact same host paths to persist data (e.g., /home/ubuntu/payram, /home/ubuntu/payram/log/supervisord, /home/ubuntu/payram/db/postgres).
    
-   **SSL\_CERT\_PATH** → Keep the same configuration (empty for testnet, or set if using SSL).
    
-   **Network type and SERVER environment** → Must be the same as the current container (testnet & DEVELOPMENT, mainnet & PRODUCTION) or it will cause issues.
    

**If any of these are changed, you may lose access to stored data or encounter startup errors.**

2

### Check running containers[](#check-running-containers)

This shows the currently running PayRam container. Note the **CONTAINER ID** or **NAME**.

3

### Stop the running container[](#stop-the-running-container)

4

### Remove the stopped container[](#remove-the-stopped-container)

5

### Check existing images[](#check-existing-images)

6

### Remove the old image[](#remove-the-old-image)

7

### Run the updated container[](#run-the-updated-container)

Start PayRam again with the new version using your saved configuration values. Make sure to use the same AES key, database, server, and other details as before to avoid errors.

8

### Verify the update[](#verify-the-update)

You should now see the container running with the new version.

* * *

Done! All your data and configurations are preserved while updating PayRam.

[PreviousQuick Setup](/deployment-guide/quick-setup)[NextIntroduction](/onboarding-guide/introduction)

Last updated 9 hours ago