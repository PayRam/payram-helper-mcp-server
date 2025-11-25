# Advanced Setup

***

## Docker installation

PayRam can be run using Docker, which provides a clean, isolated environment and avoids operating system or tooling incompatibilities. It also makes managing the database and environment variables simple and straightforward.

You can run PayRam inside a Docker container in any os with a simple command, either on testnet for development or on mainnet for production.

***

## Technical knowledge requirements for self-hosting

Running PayRam on your own servers requires understanding of technical concepts such as:

* Installing and managing Docker containers
* Allocating system resources effectively
* Securing servers and sensitive data
* Configuring environment variables and application settings correctly

Incorrect setup can result in data loss, security risks, or downtime.

{% hint style="info" %} <mark style="color:$primary;">**Note**</mark> <mark style="color:$info;">: If you do not have Docker installed or have limited technical knowledge, there is a Easy Method available that can install and configure your PayRam server in just less than 5 minutes.</mark>&#x20;

<mark style="color:$success;">**Checkout the Easy Method here :**</mark> [quick-setup](https://docs.payram.com/deployment-guide/quick-setup "mention")
{% endhint %}

***

## Hardware requirements

### Server configuration

* Use a VPS or dedicated server with the minimum specifications required to host the PayRam server.

### **Minimum server requirements:**

* **CPU**: 4 cores
* **RAM**: 4 GB
* **Storage**: 50 GB SSD
* **Operating System**: Ubuntu 22.04

{% hint style="info" %} <mark style="color:$primary;">**Note**</mark><mark style="color:$info;">: Depending on your expected usage and scale, additional resources may be required.</mark>
{% endhint %}

### **Network requirements**

* Ensure the following ports are open on your server or VPS:

  | Port | Purpose                                                                                |
  | ---- | -------------------------------------------------------------------------------------- |
  | 80   | Used for running the Frontend (FE) on standard HTTP protocol.                          |
  | 8080 | Used for running the Backend (BE) services on HTTP.                                    |
  | 443  | Required for the Frontend when serving the application over HTTPS (secure connection). |
  | 8443 | Required for the Backend when serving APIs over HTTPS (secure connection).             |
  | 5432 | Used by the PostgreSQL Database for database connections.                              |

***

## Quick start

* Use this guide to run PayRam with Docker on testnet for local setup and testing. See below for instructions on deploying PayRam in production on the mainnet.
* Assuming you have Docker installed and running, pull the latest PayRam image and start a container

{% hint style="info" %} <mark style="color:$success;">**Note**</mark><mark style="color:$info;">: When running the Docker command, do not modify the port mappings. Changing the default ports may cause PayRam to stop working correctly or prevent it from connecting to required services.</mark>
{% endhint %}

```docker
docker run -d \
  --name payram-testnet \
  --publish 8080:8080 \
  --publish 80:80 \
  --publish 5432:5432 \
  -e AES_KEY="366502f6c3e3d828d903691bcc8f46e0d009b70477076b6417cef0a3974b78e8" \
  -e SSL_CERT_PATH="" \
  -e BLOCKCHAIN_NETWORK_TYPE="testnet" \
  -e SERVER="DEVELOPMENT" \
  -e POSTGRES_HOST="localhost" \
  -e POSTGRES_PORT="5432" \
  -e POSTGRES_DATABASE="payram" \
  -e POSTGRES_USERNAME="payram" \
  -e POSTGRES_PASSWORD="payram123" \
  -v "home/payram:/root/payram" \
  -v "home/payram/log/supervisord:/var/log" \
  -v "home/payram/db/postgres:/var/lib/payram/db/postgres" \
  payramapp/payram:1.6.0
```

This command does the following:

* **Runs PayRam in the background** (-d) with the name payram-testnet.
* **Exposes ports**:
  * 8080 → PayRam internal API access
  * 80 → HTTP access
  * 5432 → Postgres database access
* **Sets environment variables**:
  * AES\_KEY: Encryption key used for securing data.
  * SSL\_CERT\_PATH: Path to SSL certificates (optional in testnet).
  * BLOCKCHAIN\_NETWORK\_TYPE: Configures the blockchain network (testnet).
  * SERVER: Marks the environment as DEVELOPMENT.
  * POSTGRES\_\*: Database connection details.
* **Mounts volumes**:
  * home/payram:/root/payram → Application data.
  * home/payram/log/supervisord:/var/log → Log files.
  * home/payram/db/postgres\:/var/lib/payram/db/postgres → Database storage.
  * Pulls and runs the PayRam Docker image: payramapp/payram:1.6.0.

{% hint style="info" %} <mark style="color:$primary;">**Note**</mark><mark style="color:$info;">: After the installation is complete, you can access PayRam at <https://your-domain.com/login>.</mark>

<mark style="color:$info;">For detailed configuration steps, refer to the</mark> [<mark style="color:$info;">Merchant Guide</mark>](https://docs.payram.com/onboarding-guide/introduction) <mark style="color:$info;">for further instructions.</mark>
{% endhint %}

***

## Advance setup

* If you’re running PayRam in production, keep the following in mind: you need to configure an external database, set up proper SSL certificates, and generate your own unique AES key for security.

### AES key generation

* A secure encryption key required by PayRam.
* In production, you should generate your own **AES key** using:

  ```bash
  openssl rand -hex 32
  ```
* Example in Docker:

  ```bash
  -e AES_KEY="366502f6c3e3d828d903691bcc8f46e0d009b70477076b6417cef0a3974b78e8"
  ```

### Postgres setup

To run **PayRam** safely and reliably in a production environment, you must connect it to an **external PostgreSQL database** hosted by a trusted and managed provider. Local or containerized databases should not be used in production, as they are not secure, scalable, or fault-tolerant.

* Recommended PostgreSQL providers include:
  * **Amazon RDS for PostgreSQL / Aurora PostgreSQL**
  * **Google Cloud SQL for PostgreSQL**
  * **Azure Database for PostgreSQL**
  * **DigitalOcean Managed PostgreSQL**

#### **Required environment variables**

* When your provider gives you a connection URL, simply take each part of it and map it to PayRam’s required environment variables.

  <pre class="language-bash" data-full-width="false"><code class="lang-bash">postgres://payram_user:very_strong_password_here@mydb.xxxxxx.us-east-1.rds.amazonaws.com:5432/payram
  </code></pre>
* The following example shows how this connection URL can be expressed as environment variables for PayRam:

```bash
-e POSTGRES_HOST="mydb.xxxxxx.us-east-1.rds.amazonaws.com"
-e POSTGRES_PORT="5432"
-e POSTGRES_DATABASE="payram"
-e POSTGRES_USERNAME="payram_user"
-e POSTGRES_PASSWORD="very_strong_password_here"
```

### SSL configuration

* PayRam requires **SSL/TLS certificates** to enable secure **HTTPS** connections in production.
* If you are using a third-party provider such as **Cloudflare** or **AWS Load Balancer** that manages HTTPS for you, you can leave this value empty:

  ```bash
  -e SSL_CERT_PATH=""
  ```
* If you are managing certificates yourself on the PayRam server, you must point this variable to the directory where your domain’s SSL/TLS certificates are stored.
* The most common setup is with **Let’s Encrypt**, which stores certificates in:

  ```bash
  -e SSL_CERT_PATH="/etc/letsencrypt/live/your-domain.com"
  ```
* Ensure the directory contains the correct certificate files for your domain (commonly fullchain.pem and privkey.pem).

{% hint style="info" %} <mark style="color:$primary;">**Note**</mark><mark style="color:$info;">: Setting the SSL\_CERT\_PATH is required only if you manage HTTPS directly on your PayRam server.If you’re using a third-party service such as Cloudflare that already handles HTTPS, you can leave this value "</mark><mark style="color:blue;">**SSL\_CERT\_PATH**</mark><mark style="color:$info;">" empty.</mark>
{% endhint %}

### Production setup

Before starting PayRam for the first time, make sure you **note down and store all necessary configurations securely**. These will be required for future updates or troubleshooting:

* **AES\_KEY** → Keep a copy of the key securely; required for decrypting data in future updates.
* **Postgres details** → Database name, username, password, and port. You will need the same details to reconnect or update.
* **Volume paths (WORKDIR)** → Note the host paths you plan to use for data, logs, and database files (e.g., `/home/payram`). These must remain consistent for updates

```docker
docker run -d \                                    
  --name payram-mainnet \                          
  --publish 8081:8080 \                            
  --publish 8443:8443 \                           
  --publish 80:80 \                                
  --publish 443:443 \                              
  --publish 5432:5432 \                            
  -e AES_KEY="replace_with_random_hex_key" \       # Secure AES encryption key (MUST generate your own for production)
  -e SSL_CERT_PATH="" \  # Path to SSL certs (mandatory in production unless using external TLS termination)
  -e BLOCKCHAIN_NETWORK_TYPE="mainnet" \           
  -e SERVER="PRODUCTION" \                         
  -e POSTGRES_HOST="" \                   # External Postgres host (replace if using cloud DB)
  -e POSTGRES_PORT="" \                        # Postgres port
  -e POSTGRES_DATABASE="" \                  # Database name (replace with production DB)
  -e POSTGRES_USERNAME="" \                  # Database username (replace with production user)
  -e POSTGRES_PASSWORD="" \     # Database password (replace with production password)
  -v "$WORKDIR:/root/payram" \                     # Application data directory (replace $WORKDIR with your path)
  -v "$WORKDIR/log/supervisord:/var/log" \         # Log files directory
  -v "$WORKDIR/db/postgres:/var/lib/payram/db/postgres" \ # Postgres data directory (if self-hosted)
  -v /etc/letsencrypt:/etc/letsencrypt \           # Mount host certs into container (needed if SSL_CERT_PATH set)
  payramapp/payram:1.6.0                           
```

#### **What does this command do?**

* **Runs PayRam on mainnet** in a Docker container.
* **Maps and exposes ports**:
  * 8080 → internal API access
  * 8443 → secure HTTPS API
  * 80 → standard HTTP
  * 443 → HTTPS (requires valid SSL certs)
  * 5432 → Postgres access

⚠️ **Important on HTTPS:**

* If you **set SSL\_CERT\_PATH and mount certs**, HTTPS (443, 8443) will work and PayRam will serve securely.
* If you **leave SSL\_CERT\_PATH=""**, PayRam will only serve over HTTP. This is acceptable if you use an external TLS termination service (like Cloudflare, reverse proxy, or load balancer).
* **Configures environment variables**:
  * AES\_KEY must be a secure random hex string in production.
  * SERVER=PRODUCTION ensures PayRam runs in production mode.
  * Postgres settings must point to your **production-grade database**.
* **Mounts volumes**:
  * $WORKDIR:/root/payram → application data.
  * $WORKDIR/log/supervisord:/var/log → logs.
  * $WORKDIR/db/postgres\:/var/lib/payram/db/postgres → Postgres storage (only if self-hosted).
  * /etc/letsencrypt:/etc/letsencrypt → host SSL certs (required if SSL\_CERT\_PATH is set).

***

## Updating PayRam Docker container

{% stepper %}
{% step %}

### Prepare before updating

Before stopping or removing any containers, make sure you **note down all current configurations**:

* **AES\_KEY** → Must be the same as the current container, otherwise PayRam will fail to decrypt data.
* **Postgres details** → Database name, username, password, and port must remain the same.
* **Volume mappings** → Use the exact same host paths to persist data (e.g., /home/ubuntu/payram, /home/ubuntu/payram/log/supervisord, /home/ubuntu/payram/db/postgres).
* **SSL\_CERT\_PATH** → Keep the same configuration (empty for testnet, or set if using SSL).
* **Network type and SERVER environment** → Must be the same as the current container (testnet & DEVELOPMENT, mainnet & PRODUCTION) or it will cause issues.

{% hint style="info" %} <mark style="color:$info;">**If any of these are changed, you may lose access to stored data or encounter startup errors.**</mark>
{% endhint %}
{% endstep %}

{% step %}

### Check running containers

```
docker ps
```

This shows the currently running PayRam container. Note the **CONTAINER ID** or **NAME**.
{% endstep %}

{% step %}

### Stop the running container

```
docker stop <CONTAINER_ID_OR_NAME>
```

{% endstep %}

{% step %}

### Remove the stopped container

```
docker rm <CONTAINER_ID_OR_NAME>
```

{% endstep %}

{% step %}

### Check existing images

```
docker images
```

{% endstep %}

{% step %}

### Remove the old image

```
docker rmi <IMAGE_ID>
```

{% endstep %}

{% step %}

### Run the updated container

Start PayRam again with the new version using your saved configuration values. Make sure to use the same AES key, database, server, and other details as before to avoid errors.

```docker
docker run -d \\
--name payram \\
--publish 8080:8080 \\ 
--publish 8443:8443 \\
--publish 80:80 \\
--publish 443:443 \\
--publish 5432:5432 \\
-e AES_KEY="" \\ # Use the saved AES_KEY
-e SSL_CERT_PATH="" \\ # Use the saved SSL_CERT_PATH
-e BLOCKCHAIN_NETWORK_TYPE="" \\ # Use the saved BLOCKCHAIN_NETWORK_TYPE
-e SERVER="" \\ # Use the saved SERVER value
-e POSTGRES_HOST="" \\ # Use the saved POSTGRES_HOST
-e POSTGRES_PORT="" \\ # Use the saved POSTGRES_PORT
-e POSTGRES_DATABASE="" \\ # Use the saved POSTGRES_DATABASE
-e POSTGRES_USERNAME="" \\ # Use the saved POSTGRES_USERNAME
-e POSTGRES_PASSWORD="" \\ # Use the saved POSTGRES_PASSWORD
-v "$WORKDIR:/root/payram" \\ # Map your application data directory (WORKDIR)
-v "$WORKDIR/log/supervisord:/var/log" \\ 
-v "$WORKDIR/db/postgres:/var/lib/payram/db/postgres" \\ # Map Postgres data directory
-v /etc/letsencrypt:/etc/letsencrypt \\ # Mount host certs (if SSL_CERT_PATH set previously)
payramapp/payram:<version>
```

{% endstep %}

{% step %}

### Verify the update

```
docker ps
```

You should now see the container running with the new version.
{% endstep %}
{% endstepper %}

***

Done! All your data and configurations are preserved while updating PayRam.
