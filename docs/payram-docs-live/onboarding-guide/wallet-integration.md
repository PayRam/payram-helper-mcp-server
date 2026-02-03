copyCopychevron-down

1.  [ONBOARDING GUIDE](/onboarding-guide)

# ⛓️Wallet Integration

In this section, you will begin the process of setting up your wallets, ensuring that everything is ready so you can start receiving payments seamlessly.

* * *

## 

[hashtag](#prerequisites)

**Prerequisites**

Before you proceed with setting up your wallets, make sure the following steps are completed:

-   Install [PayRam](/deployment-guide/quick-setup) and ensure it is fully set up on your server.
    
-   Successfully [configure the Blockchain node](/onboarding-guide/node-details-configuration) where you plan to accept payments.
    

* * *

## 

[hashtag](#understanding-some-key-terms)

Understanding some key terms

-   Before configuring your wallets, it's essential to understand how the different wallet types work together in our payment system. This section explains the key components and their relationships
    
    -   Master account
        
    -   Deposit wallets
        
    -   Cold wallet
        
    -   Sweep contract
        
    

### 

[hashtag](#master-account)

Master account

-   The master account is the merchant’s primary blockchain account that serves as the foundation for generating deposit wallet addresses. Every deposit wallet provided to customers for making payments is derived from this master account, ensuring all payment addresses remain linked to a single, consistent source. This setup allows the system to track, manage, and associate payments accurately under the merchant’s account
    
-   In addition to generating deposit wallets, the master account is also used to deploy the sweep contract.
    

### 

[hashtag](#deposit-wallets)

Deposit wallets

-   A deposit wallet is a blockchain address where customers send their payments. All deposit wallets are derived from the merchant’s master account and can exist on different supported blockchains. Each deposit wallet acts as a unique payment destination for a transaction or customer, while still being linked to the same master account for tracking and management purposes.
    

### 

[hashtag](#cold-wallet)

Cold wallet

-   A cold wallet is a secure blockchain wallet used for storing funds offline or in a highly secure environment. Unlike deposit wallets, which are generated for receiving payments from customers, the cold wallet serves as the merchant’s main storage address where funds are ultimately consolidated. Cold wallets are not directly exposed to customers, reducing the risk of unauthorized access and improving overall fund security.
    

circle-info

**NOTE** : While configuring wallets, make sure to use different wallets for the master account and the cold wallet. Do not use the same wallet for both; always configure separate ones.

* * *

## 

[hashtag](#configuring-wallets)

Configuring wallets

1

### 

[hashtag](#open-wallet-management-tab)

Open wallet management tab

-   Click on the Wallet Management tab and select Deposit Wallet to set up your wallets.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Feukjb5Cb2IpXQgTKY9aV%2Fimage.png&width=768&dpr=3&quality=100&sign=ebb0ad58&sv=2)

2

### 

[hashtag](#choose-blockchain)

Choose blockchain

-   Now select the blockchain where you want to accept payments and configure your wallet accordingly. This setup ensures you'll only receive payments on your specific chosen chain.
    

3

### 

[hashtag](#configure-wallets-on-each-chain)

Configure wallets on each chain

-   Below are the steps for each chain how you can configure the wallet
    
    -   EVM Family (Base & Ethereum)
        
    -   TRX
        
    -   Bitcoin
        
    

Base

Ethereum

Tron

Bitcoin

circle-info

**Note****:** When deploying contract addresses within the EVM family (e.g., Base, Ethereum), make sure to use the same master account for all networks in the family to ensure users receive consistent deposit addresses across blockchains

### 

[hashtag](#step-1)

Step 1

-   Click on EVM family to expand the section. You will see options to deploy the contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FiVILo6salbU9p1fPnMv0%2Fimage.png&width=768&dpr=3&quality=100&sign=5cbee775&sv=2)

### 

[hashtag](#step-2)

Step 2

-   In the EVM Family section, you can deploy contracts on both the Base and Ethereum blockchains. This means you will be able to accept payments on Base and Ethereum once the contracts are deployed there.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F4R8Jltec2YGxHxrBxPcV%2Fimage.png&width=768&dpr=3&quality=100&sign=2504757&sv=2)

### 

[hashtag](#step-3)

Step 3

-   Now click on Deploy Contract and choose either Base or Ethereum. The process is the same for both; in this example, I am deploying the contract on the Base chain.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FKS06Np2QEj3WZMU4G3P2%2Fimage.png&width=768&dpr=3&quality=100&sign=893f98b4&sv=2)

### 

[hashtag](#step-4)

Step 4

-   You will see a pop-up screen where you can enter the required details, such as the master account and the cold wallet address.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FE9Vt0HfETkZpFZUxRRrZ%2Fimage.png&width=768&dpr=3&quality=100&sign=8ac5e16f&sv=2)

### 

[hashtag](#step-5)

Step 5

-   Enter the required details, connect your master account, provide the cold wallet address, and add a wallet name. You can connect your master account using any wallet provider, such as MetaMask or WalletConnect, but it must support the Base network because we are deploying the contract on the Base blockchain. Therefore, it should be a Base-compatible wallet.
    
-   Once you’ve added all the necessary details click on deploy contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FRQZefTOYBlEvzMEWuq7n%2Fimage.png&width=768&dpr=3&quality=100&sign=ab53d231&sv=2)

-   Wait until the contract get Deployed, Once deployed it will look like this
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F0NYeqXccEpKohPmharwP%2Fimage.png&width=768&dpr=3&quality=100&sign=740292ed&sv=2)

### 

[hashtag](#step-6)

Step 6

-   Once you’ve successfully deployed the contract and entered all the necessary details, the screen will look like this. It will display information such as the fund sweeper address, the master account address, and confirming that your setup is ready to receive payments.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FFjciW4EvMTlEnrdbKmXf%2Fimage.png&width=768&dpr=3&quality=100&sign=e8e9b58&sv=2)

-   Congratulations, you are now ready to accept payments from your customers on the Base blockchain and its supported tokens.
    

circle-info

**Note****:** When deploying contract addresses within the EVM family (e.g., Base, Ethereum), make sure to use the same master account for all networks in the family to ensure users receive consistent deposit addresses across blockchains

### 

[hashtag](#step-1-1)

Step 1

-   Click on EVM family to expand the section. You will see options to deploy the contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FiVILo6salbU9p1fPnMv0%2Fimage.png&width=768&dpr=3&quality=100&sign=5cbee775&sv=2)

### 

[hashtag](#step-2-1)

Step 2

-   In the EVM Family section, you can deploy contracts on both the Base and Ethereum blockchains. This means you will be able to accept payments on Base and Ethereum once the contracts are deployed there.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F4R8Jltec2YGxHxrBxPcV%2Fimage.png&width=768&dpr=3&quality=100&sign=2504757&sv=2)

### 

[hashtag](#step-3-1)

Step 3

-   Now click on Deploy Contract and choose either Base or Ethereum. The process is the same for both; in this example, I am deploying the contract on the Base chain.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FKS06Np2QEj3WZMU4G3P2%2Fimage.png&width=768&dpr=3&quality=100&sign=893f98b4&sv=2)

### 

[hashtag](#step-4-1)

Step 4

-   You will see a pop-up screen where you can enter the required details, such as the master account and the cold wallet address.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F91oQcDKc0GmBuBj5A281%2Fimage.png&width=768&dpr=3&quality=100&sign=dcf29b0f&sv=2)

### 

[hashtag](#step-5-1)

Step 5

-   Enter the required details, connect your master account, provide the cold wallet address, and add a wallet name. You can connect your master account using any wallet provider, such as MetaMask or WalletConnect, but it must support the Base network because we are deploying the contract on the Base blockchain. Therefore, it should be a Base-compatible wallet.
    
-   Once you’ve added all the necessary details click on deploy contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Ft95RMgovliei78CkoSUH%2Fimage.png&width=768&dpr=3&quality=100&sign=f17dee14&sv=2)

-   Wait until the contract get Deployed, Once deployed it will look like this
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F0NYeqXccEpKohPmharwP%2Fimage.png&width=768&dpr=3&quality=100&sign=740292ed&sv=2)

### 

[hashtag](#step-6-1)

Step 6

-   Once you’ve successfully deployed the contract and entered all the necessary details, the screen will look like this. It will display information such as the fund sweeper address, the master account address, and confirming that your setup is ready to receive payments.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FT2zr6xIRSFAe5QK6c9cu%2Fimage.png&width=768&dpr=3&quality=100&sign=10ebf20b&sv=2)

-   Congratulations, you are now ready to accept payments from your customers on the Etheruem blockchain and its supported tokens.
    

### 

[hashtag](#step-1-2)

Step 1

-   Click on Tron to expand the section. You will see options to deploy the contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FjQTN14SMn18ZPqUfZpK4%2Fimage.png&width=768&dpr=3&quality=100&sign=e2b3ddc6&sv=2)

-   Now click on Deploy contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FMOPZDwnoL3hVfuJL8j2f%2Fimage.png&width=768&dpr=3&quality=100&sign=37493c04&sv=2)

### 

[hashtag](#step-2-2)

Step 2

-   You will see a pop-up screen where you can enter the required details, such as the master account and the cold wallet address.
    
-   Enter the required details, connect your master account, provide the cold wallet address, and add a wallet name. You can connect your master account using any wallet provider, such as Wallet Connect Id, but it must support Tron because we are deploying the contract on the Tron blockchain. Therefore, it should be a Tron-compatible wallet.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2F46pT5jLjffxAu0GHQPqX%2Fimage.png&width=768&dpr=3&quality=100&sign=b8f7daa0&sv=2)

### 

[hashtag](#step-3-2)

Step 3

-   Once you’ve added all the necessary details click on deploy contract
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FRQZefTOYBlEvzMEWuq7n%2Fimage.png&width=768&dpr=3&quality=100&sign=ab53d231&sv=2)

-   Wait until the contract get Deployed, Once deployed it will look like this
    

### 

[hashtag](#step-4-2)

Step 4

-   Once you’ve successfully deployed the contract and entered all the necessary details, the screen will look like this. It will display information such as the fund sweeper address, the master account address, and confirming that your setup is ready to receive payments.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FH4sN6924NWdbZDqXtoUd%2Fimage.png&width=768&dpr=3&quality=100&sign=92e84ce6&sv=2)

-   Congratulations, you are now ready to accept payments from your customers on the Tron blockchain and its supported tokens.
    

circle-info

**Note**: Bitcoin works a little differently from the other chains. For the other chains, we deploy a contract to generate deposit wallets, but for Bitcoin, there is no need to do that. You only need to add a BTC wallet, which will serve as the source for generating deposit wallets, and a cold wallet to receive the funds.

### 

[hashtag](#step-1-3)

Step 1

-   Click on Bitcoin & Other Networks to expand the section. You will see options to Add wallet
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FVZxrKtenISTq1MEFl3IL%2Fimage.png&width=768&dpr=3&quality=100&sign=2daa31e&sv=2)

### 

[hashtag](#step-2-3)

Step 2

-   Now click on Add wallet
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FnABMrWRN09v1oQYxOXjI%2Fimage.png&width=768&dpr=3&quality=100&sign=b96c71f0&sv=2)

### 

[hashtag](#step-3-3)

Step 3

-   You will see a pop-up screen where you can enter the required details. Enter the 12-word secret phrase of any BTC wallet, which will act as the master account for generating deposit addresses for your customers.
    
-   Make sure to remember this seed phrase, as you will need the exact same phrase when sweeping funds from the PayRam mobile app.
    

circle-info

**Note**: The seed phrase will never be stored on any server. It is kept only on your PayRam server and protected with encryption.

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2Fl9mEqdS9j8zfBIDWHT0p%2Fimage.png&width=768&dpr=3&quality=100&sign=66fbece4&sv=2)

### 

[hashtag](#step-4-3)

Step 4

-   You need to enter the 12-word seed phrase of your BTC wallet.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FTZfami9a2fybW04HwboJ%2Fimage.png&width=768&dpr=3&quality=100&sign=8e389747&sv=2)

-   Once you’ve added all the necessary details click on Save & Generate Addresses
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FY2fzViludfBt4ulbz05Y%2Fimage.png&width=768&dpr=3&quality=100&sign=6653dc6a&sv=2)

### 

[hashtag](#step-5-2)

Step 5

-   Once you’ve successfully added the BTC wallet seed phrase, the configuration for generating deposit addresses on Bitcoin is complete. Next, you need to add a cold wallet to receive the funds.
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FQSJZGKM8p9JiBRwScvbK%2Fimage.png&width=768&dpr=3&quality=100&sign=b90d7961&sv=2)

### 

[hashtag](#step-6-2)

Step 6

-   Click on Add Cold wallet Button, then you'll be asked to enter the cold wallet
    

![](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F2diixQuZV5bHAbOknKAq%2Fblobs%2FzQqurKyoumszTt8oSGCr%2Fimage.png&width=768&dpr=3&quality=100&sign=bad5531d&sv=2)

-   Once you’ve added the cold wallet, click the Save button. Your cold wallet will then be successfully configured.
    
-   That’s it. You have successfully set up the configuration for BTC wallets, and you can now receive payments from your customers on the BTC network as well.
    

* * *

You have successfully set up your wallets and can now start receiving payments from your customers. Follow this section to learn how to generate a test payment link or integrate the PayRam server API into your SaaS, dApp, or other applications.

[PreviousNode Details Configurationchevron-left](/onboarding-guide/node-details-configuration)[NextTesting Payment Linkschevron-right](/onboarding-guide/testing-payment-links)