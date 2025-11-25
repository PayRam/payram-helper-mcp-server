# Script Usage

## Commands

### **Mainnet installation**

* **Install PayRam on the mainnet (production environment):**

  ```bash
  /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --mainnet
  ```

***

### **Testnet installation**

* **Install PayRam on the mainnet (Development environment):**

  ```bash
  /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --testnet
  ```

***

### Update

* To update the PayRam container to the latest version, run the following command:

  ```bash
  /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --update
  ```
* To update the PayRam server to a specific version using a tag, run the following command:

  ```bash
  /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --update --tag="version"
  ```

***

### Reset

* To completely reset the PayRam server configuration and perform a clean uninstallation, including the removal of all Docker images, run the following command:

  ```bash
  /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --reset
  ```

***

### Restart

* To restart the PayRam server and refresh all active services without removing any data or configurations, run the following command.This will safely restart PayRam, helping to resolve issues such as unprocessed blocks or inactive services

```bash
/bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/PayRam/payram-scripts/main/setup_payram.sh>)" bash --restart
```
