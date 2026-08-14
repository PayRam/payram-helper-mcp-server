For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/deployment-guide/quick-setup.md).

Copy

On this page

1.  [DEPLOYMENT GUIDE](/deployment-guide)

# ⚡Quick Setup

Deploy, configure, and start accepting payments on PayRam in under 10 minutes!

In this section, you’ll go through the complete setup of your PayRam server, including installation, security configuration, and encryption, to ensure it is fully prepared and running smoothly.

* * *

## **Prerequisites**[](#prerequisites)

Before starting, please ensure your system meets the following requirements:

### **Server configuration**[](#server-configuration)

-   Use a VPS or dedicated server with the minimum specifications required to host the PayRam server.
    

**Recommended VPS Providers:**

-   **AWS**
    
-   **Google Cloud (GCP)**
    
-   **Azure**
    
-   **Hetzner**
    
-   **Hostinger**
    

### **Minimum server requirements**[](#minimum-server-requirements)

-   **CPU**: 2 cores
    
-   **RAM**: 4 GB
    
-   **Storage**: 50 GB SSD (the installer requires at least 5 GB free, and recommends 10 GB)
    
-   **Operating System**: Ubuntu 22.04 or another supported distribution
    

**Supported operating systems:** Ubuntu, Debian, Linux Mint, CentOS, RHEL, Rocky Linux, AlmaLinux, Fedora, Arch Linux, and Alpine Linux. macOS is supported for local testing only, and runs over HTTP without SSL.

**Note**: Depending on your expected usage and scale, additional resources may be required.

### **Network requirements**[](#network-requirements)

-   Ensure the following ports are open on your server or VPS:
    
    Port
    
    Purpose
    
    80
    
    HTTP. Serves the dashboard, payment pages, and API. Redirects to 443 when SSL is enabled.
    
    443
    
    HTTPS. Required only when PayRam terminates TLS itself (Let's Encrypt or custom certificates).
    

### Database configuration[](#database-configuration)

-   To run PayRam smoothly, you must provision a PostgreSQL database with the following minimum configuration:
    
    **Minimum database requirements**:
    
    -   **Database engine**: PostgreSQL
        
    -   **vCPUs**: 1 CPU cores
        
    -   **Memory**: 1 GB
        
    -   **Storage**: 50 GB SSD
        
    

**Note** : These are the baseline requirements. Using a smaller configuration may cause performance issues during high transaction loads or while processing sweeps. You can scale up depending on the expected transaction volume.

* * *

## PayRam setup[](#payram-setup)

1

### Connect to your VPS[](#connect-to-your-vps)

-   Use SSH to connect to your server instance.
    

2

### Run the command[](#run-the-command)

-   Open your terminal and run the installer. Add sudo before the command if elevated privileges are required.
    

![Running the PayRam install command in the terminal](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-024e0942f1f4349e814306a6cb96a4f6a9b864cd%252Fpayram-quick-setup-run-command.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=2293bf6f&sv=2)

3

### Choose your operation[](#choose-your-operation)

-   PayRam opens an operations menu. Enter **1** and press Enter to begin a fresh installation.
    

![The PayRam operations menu shown when the command is run with no options](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-5a543a0033473ac20c6e7b4d850a244658d2a68b%252Fpayram-quick-setup-operations-menu.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=f602ffd3&sv=2)

4

### Choose your network[](#choose-your-network)

-   Next, enter **1** for mainnet or **2** for testnet, then press Enter.
    

![Choosing between mainnet and testnet](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-595fb25a655b9e568a65cd5fa239f7c41e67e776%252Fpayram-quick-setup-network-selection.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=19174641&sv=2)

**Note** : Mainnet is used for production, while Testnet is used for development and for testing PayRam features. Testnet is recommended for a first install.

**Testing Card-to-Crypto?** Install on Mainnet. Card payments are not fully available on Testnet, and stablecoin purchases require a Mainnet setup.

5

### Installing necessary dependencies[](#installing-necessary-dependencies)

-   The script then handles the rest of the setup automatically. It checks for previous installations, validates required ports, detects the operating system, and ensures compatibility. Next, it installs or verifies Docker and PostgreSQL, creates the needed directories, and performs a disk space check. If any problems are found (such as low storage), the script will display a warning and ask you to confirm whether to proceed by typing Y or N.
    

![System detection, disk space check and dependency installation](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-3c024f2050c9f04384094830c150496b08aa8f66%252Fpayram-quick-setup-system-detection.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=7e7dbdc&sv=2)

6

### Database setup[](#database-setup)

-   Once the dependencies are installed, you are prompted to choose between an External PostgreSQL Database and a Containerized PostgreSQL Database.
    

![Database configuration options](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-33fc39e5b00141ef05365b35c465b46d7c657454%252Fpayram-quick-setup-database-options.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=c220a1d7&sv=2)

-   Enter **1** or **2** based on your requirement.
    

**Note** : Option 1 is recommended for production environments.

Option 1

Option 2

-   If you enter **1**, you’ll be prompted for the following details:
    
    -   **Database Host**
        
    -   **Port**
        
    -   **Database Name**
        
    -   **Username**
        
    -   **Password**
        
    
    These details establish the connection between PayRam and your PostgreSQL database.
    
-   You can find them in your PostgreSQL server configuration or your hosting provider’s control panel. If you’re using a managed PostgreSQL service (for example, AWS RDS, Azure Database, or DigitalOcean), these values are available in the database connection settings.
    
-   **Example connection string**:
    
    -   In this example:
        
        -   `myuser` → Database username
            
        -   `mypassword` → Database password
            
        -   `db.example.com` → Database host
            
        -   `5432` → Database port
            
        -   `mydatabase` → Database name
            
        
    

**Note** : This option is for testing only. For production environments, always use Option 1.

-   If you enter **2**, the script creates a local PostgreSQL database using Docker with the following default credentials:
    

7

### SSL configuration[](#ssl-configuration)

-   After setting up the database, the script will prompt you to configure SSL by choosing from Let’s Encrypt (auto-generate free SSL), Custom Certificates (use your own), or no SSL for now.
    

![SSL certificate setup options](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-979341ff3a8200068a90ebaf9467dedc389e858b%252Fpayram-quick-setup-ssl-options.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=b9b2bddd&sv=2)

-   Enter **1**, **2**, or **3**.
    

Option 1

Option 2

Option 3

-   If you enter **1**, Let’s Encrypt will automatically generate and install a free SSL certificate for your domain within minutes, with certificates trusted by all browsers and auto-renewed every 90 days.
    
-   You will be asked for the domain name that points to this server.
    

-   Enter **2** if you already have your own SSL certificates.
    
-   When prompted, enter the **domain name** your certificates are issued for. PayRam looks for them at `/etc/letsencrypt/live/<domain>/`, so place `fullchain.pem` and `privkey.pem` there before you start.
    
-   The script verifies both files and validates the certificate before continuing. If a file is missing or the certificate is expired or mismatched, you can enter a different domain or skip SSL.
    

-   Enter **3** to skip SSL for now. PayRam starts on HTTP (port 80) immediately, with no domain or certificate needed. You can add SSL certificates later.
    

8

### Port mapping[](#port-mapping)

-   Next, the script asks which host port PayRam should listen on. Press Enter to use port 80, or enter a different port if your own reverse proxy sits in front of PayRam.
    

![The host port prompt](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-590f4be96f1d040ceb5f36eabe5701b1861c6365%252Fpayram-quick-setup-port-mapping.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=9372810d&sv=2)

**Note**: If you chose Let's Encrypt or custom certificates in the previous step, this prompt is skipped — PayRam uses ports 80 and 443, and both must be free.

9

### AES key encryption[](#aes-key-encryption)

-   After selecting your SSL option, you will be prompted with the Hot Wallet Encryption Setup screen. At this step, press Enter to generate the AES-256 encryption key for your hot wallet.
    

![Hot wallet AES-256 encryption setup](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-1fde8133667c8fb20b6d749c9e4ee8d761f3b3db%252Fpayram-quick-setup-aes-key.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=eb7ff064&sv=2)

10

### Review the settings[](#review-the-settings)

-   The script then displays all the configurations you selected. Review the settings carefully to make sure they are correct before proceeding.
    

![Configuration summary before deployment](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-fc393ae9a38f5fec5bf9064b01d395f286943f0b%252Fpayram-quick-setup-config-summary.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=1127ab1e&sv=2)

-   If the configuration is correct, press Enter and the script will set up the PayRam server based on the options you selected. This will start installing the payram server based on your configurations
    

![Pulling the PayRam image and deploying the container](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-f172ad4c06f5e5e4f8f62f0bee6c615d4bde7c41%252Fpayram-quick-setup-deploy.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=55aff577&sv=2)

11

### Installation completed[](#installation-completed)

-   PayRam then runs a health check to confirm the application is responding.
    

![Health check confirming PayRam is running](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-7291d8228679cd70b24ad5eff6801a7708300eab%252Fpayram-quick-setup-health-check.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=4f89f32f&sv=2)

-   After the installation completes, a confirmation message appears in the terminal.
    

![Installation complete, with PayRam access URLs](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-44d661dd186c67abdef460ae76d56c6a2d7f844e%252Fpayram-quick-setup-complete.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=426f66c4&sv=2)

Once the installation is complete, you’ll see “PayRam installation completed successfully” in the logs. You can then go to [http://](http://yourserverip.com/)[yourserverip](http://yourserverip.com/)[.com](http://yourserverip.com/), replacing yourserverip with the IP address or domain where the PayRam server is hosted.

* * *

Now that you’ve successfully completed the setup, please go to the [onboarding configuration](/onboarding-guide/root-account-setup) to start setting up your root account for PayRam.

[PreviousIntroduction](/deployment-guide/introduction)[NextAdvanced Setup](/deployment-guide/advanced-setup)

Last updated 9 hours ago