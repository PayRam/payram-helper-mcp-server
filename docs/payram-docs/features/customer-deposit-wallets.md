# Customer Deposit Wallets

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/NXnQaNm4Z5tC6cRMm4or/payram-feature-customer-deposit-wallets.png" alt=""><figcaption></figcaption></figure>

Give each customer their own deposit address or wallet within PayRam, so they can top up, settle balances, or make repeat payments without needing to supply a new address each time.

***

### **Why it matters**

* **Frictionless deposits:** Customers can deposit anytime without needing you to issue a new address or link each time.
* **Consistency & reuse:** The same deposit address works repeatedly (i.e. “permanent deposit address”).
* **Easier accounting & attribution:** Funds go directly to a customer’s wallet, simplifying ledger entries and reconciliation.
* **Better UX:** Your customers don’t have to request a fresh address each time, speeds up repeat payments.
* **Support for multiple assets:** You can support wallets per token or network, depending on your architecture.

***

### **How it works**

1. When a new customer is onboarded, PayRam creates a unique deposit address mapped to that customer (and possibly per token / network).
2. When the customer sends funds to that address, PayRam monitors the chain (or network), identifies and attributes the incoming transaction to the correct customer wallet.
3. The deposited amount is credited to the customer’s internal balance (or account ledger) in PayRam.
4. Internally, PayRam may consolidate or sweep funds from multiple customer wallets into its master wallet(s) to manage liquidity and gas efficiency (if blockchain).
5. On withdrawals, spends, or transfers, PayRam can debit from the customer’s wallet balance.

This is analogous to “permanent deposit address” setups used by crypto gateways, where each user has a persistent address for deposits.

***

### **Using deposit wallets**

* **Customer deposit:** The customer sends funds to the given address (on the appropriate network).
* **Monitoring & attribution:** PayRam listens for incoming transactions, matches them to known deposit wallets, and credits the customer’s balance.
* **Balance display:** Show real-time wallet balance in merchant dashboard.

***

### **Balances, transfers, and consolidation**

* **Internal balance model:** Maintain a ledger of balances per customer wallet.
* **Consolidation / sweeping:** Periodically sweep small deposits into a master wallet to reduce on-chain overhead.

***

### **Security & reconciliation**

* **Address uniqueness:** Ensure deposit addresses are unique and collision-resistant.
* **Monitoring / alerting:** Watch for suspicious deposits, double spends, or network reorgs.
* **Confirmations:** Only credit after required blockchain confirmations (configurable).
* **Error handling:** Rejections or refunds if wrong token / network.
* **Audit trails:** Record every deposit, sweep, internal transfer, and withdrawal.
