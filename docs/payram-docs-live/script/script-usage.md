For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/script/script-usage.md).

Copy

On this page

1.  [Script](/script)

# Script Usage

In this section, you will find the script commands to install and update PayRam — use the Mainnet command for production, Testnet for development, and Update to upgrade to the latest version.

## Commands[](#commands)

### **Mainnet installation**[](#mainnet-installation)

-   **Install PayRam on the mainnet (production environment):**
    
    Copy
    
    ```
    bash <(curl -fsSL https://payram.com/setup_payram.sh) --mainnet
    ```
    

* * *

### **Testnet installation**[](#testnet-installation)

-   **Install PayRam on the testnet (Development environment):**
    
    Copy
    
    ```
    bash <(curl -fsSL https://payram.com/setup_payram.sh) --testnet
    ```
    

* * *

### Update[](#update)

-   To update the PayRam container to the latest version, run the following command:
    
    Copy
    
    ```
    bash <(curl -fsSL https://payram.com/setup_payram.sh) --update
    ```
    

* * *

### Reset[](#reset)

-   To completely reset the PayRam server configuration and perform a clean uninstallation, including the removal of all Docker images, run the following command:
    
    Copy
    
    ```
    bash <(curl -fsSL https://payram.com/setup_payram.sh) --reset
    ```
    

* * *

### Restart[](#restart)

-   To restart the PayRam server and refresh all active services without removing any data or configurations, run the following command.This will safely restart PayRam, helping to resolve issues such as unprocessed blocks or inactive services
    

[PreviousOperator Mode](/operator-mode/operator-mode)[NextIntroduction](/api-integration/introduction)

Last updated 9 hours ago