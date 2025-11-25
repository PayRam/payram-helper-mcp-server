# Glossary

### <mark style="color:$primary;">**Cold wallet**</mark>

A secure blockchain wallet used for storing funds offline or in a highly secure environment. Unlike deposit wallets, which are generated for receiving payments from customers, the cold wallet serves as the merchant’s main storage address where funds are ultimately consolidated. Cold wallets are not directly exposed to customers, reducing the risk of unauthorized access and improving overall fund security.

### <mark style="color:$primary;">**Deposit wallet**</mark>

A blockchain address where customers send their payments. Each customer is assigned a unique deposit wallet address, ensuring that their transactions can be tracked and managed individually. All deposit wallets are derived from the merchant’s master account.

### <mark style="color:$primary;">Hot Wallet</mark>

A wallet used to cover transaction fees (gas) when sweeping funds from deposit wallets to the cold wallet. Because blockchain transactions require gas, the hot wallet holds the funds needed to pay these fees and enable transfers during the sweep process. Hot wallets are EOA (Externally Owned Account) wallets. Always maintain a minimum balance in the hot wallet; otherwise, sweep operations will fail.

### <mark style="color:$primary;">**Master account**</mark>

The merchant’s primary blockchain account for a network family (for example, one master account for all EVM-compatible networks). All customer deposit wallet addresses are generated from this account, ensuring that payment addresses remain linked to a single, consistent source. The master account is also used to deploy the sweep contract and enables accurate tracking, management, and association of payments under the merchant’s account.

### <mark style="color:$primary;">**SmartSweep**</mark>

This feature automatically moves funds from customer deposit wallets to your main wallet. This reduces manual transfers and consolidates funds efficiently. The goal is to simplify daily operations while keeping security a priority. For most blockchains, SmartSweep uses a family of smart contracts. This design ensures you don’t have to expose keys to sweep funds, while PayRam manages the orchestration.

### <mark style="color:$primary;">**Sweep contract**</mark>

A smart contract that the merchant sets up using their master account. When customers make payments, the money first goes into deposit wallets that are created from the master account. Over time, the merchant may have many deposit wallets, one for each customer or payment. Instead of moving the money from each deposit wallet manually, the sweep contract does it automatically. It collects the funds from all deposit wallets and sends them to the merchant’s cold wallet. These setup also eliminates the need to keep private keys on the server which is very unique to PayRam, adding a difficult layer of security.
