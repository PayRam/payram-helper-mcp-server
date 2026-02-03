copyCopychevron-down

1.  [Script](/script)

# rectangle-codeScript Usage

## 

[hashtag](#commands)

Commands

### 

[hashtag](#mainnet-installation)

**Mainnet installation**

-   **Install PayRam on the mainnet (production environment):**
    
    Copy
    
    ```
    /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --mainnet
    ```
    

* * *

### 

[hashtag](#testnet-installation)

**Testnet installation**

-   **Install PayRam on the mainnet (Development environment):**
    
    Copy
    
    ```
    /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --testnet
    ```
    

* * *

### 

[hashtag](#update)

Update

-   To update the PayRam container to the latest version, run the following command:
    
    Copy
    
    ```
    /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --update
    ```
    
-   To update the PayRam server to a specific version using a tag, run the following command:
    
    Copy
    
    ```
    /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --update --tag="version"
    ```
    

* * *

### 

[hashtag](#reset)

Reset

-   To completely reset the PayRam server configuration and perform a clean uninstallation, including the removal of all Docker images, run the following command:
    

* * *

### 

[hashtag](#restart)

Restart

-   To restart the PayRam server and refresh all active services without removing any data or configurations, run the following command.This will safely restart PayRam, helping to resolve issues such as unprocessed blocks or inactive services
    

[PreviousBitcoin Funds Sweep Guidechevron-left](/onboarding-guide/funds-sweeping/bitcoin-funds-sweep-guide)[NextIntroductionchevron-right](/api-integration/introduction)