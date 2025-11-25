# Wallet Integration

***

## **Prerequisites**

Before you proceed with setting up your wallets, make sure the following steps are completed:

* Install [PayRam](https://docs.payram.com/deployment-guide/quick-setup) and ensure it is fully set up on your server.
* Successfully [configure the Blockchain node](https://docs.payram.com/onboarding-guide/node-details-configuration) where you plan to accept payments.

***

## Understanding some key terms&#x20;

* Before configuring your wallets, it's essential to understand how the different wallet types work together in our payment system. This section explains the key components and their relationships
  * Master account
  * Deposit wallets
  * Cold wallet
  * Sweep contract

### <sub>Master account</sub>&#x20;

* The master account is the merchant’s primary blockchain account that serves as the foundation for generating deposit wallet addresses. Every deposit wallet provided to customers for making payments is derived from this master account, ensuring all payment addresses remain linked to a single, consistent source. This setup allows the system to track, manage, and associate payments accurately under the merchant’s account
* In addition to generating deposit wallets, the master account is also used to deploy the sweep contract.

### Deposit wallets

* A deposit wallet is a blockchain address where customers send their payments. All deposit wallets are derived from the merchant’s master account and can exist on different supported blockchains. Each deposit wallet acts as a unique payment destination for a transaction or customer, while still being linked to the same master account for tracking and management purposes.

### Cold wallet&#x20;

* A cold wallet is a secure blockchain wallet used for storing funds offline or in a highly secure environment. Unlike deposit wallets, which are generated for receiving payments from customers, the cold wallet serves as the merchant’s main storage address where funds are ultimately consolidated. Cold wallets are not directly exposed to customers, reducing the risk of unauthorized access and improving overall fund security.

{% hint style="info" %} <mark style="color:$primary;">**NOTE**</mark> <mark style="color:$info;">: While configuring wallets, make sure to use different wallets for the master account and the cold wallet. Do not use the same wallet for both; always configure separate ones.</mark>
{% endhint %}

***

## Configuring wallets&#x20;

{% stepper %}
{% step %}

### Open wallet management tab

* Click on the Wallet Management tab and select Deposit Wallet to set up your wallets.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/1ZWybT8vziAbNZQQ96pc/image.png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Choose blockchain

* Now select the blockchain where you want to accept payments and configure your wallet accordingly. This setup ensures you'll only receive payments on your specific chosen chain.
  {% endstep %}

{% step %}

### Configure wallets on each chain

* Below are the steps for each chain how you can configure the wallet&#x20;
  * EVM Family (Base & Ethereum)
  * TRX
  * Bitcoin

{% tabs %}
{% tab title="Base" %}
{% hint style="info" %} <mark style="color:$primary;">**Note**</mark>**:** <mark style="color:$info;">When deploying contract addresses within the EVM family (e.g., Base, Ethereum), make sure to use the same master account for all networks in the family to ensure users receive consistent deposit addresses across blockchains</mark>
{% endhint %}

### Step 1

* Click on EVM family to expand the section. You will see options to deploy the contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/e529UDckvULJojkGeFng/image.png" alt=""><figcaption></figcaption></figure>

### Step 2

* In the EVM Family section, you can deploy contracts on both the Base and Ethereum blockchains. This means you will be able to accept payments on Base and Ethereum once the contracts are deployed there.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/5UkrucBL2s3v18etDyuf/image.png" alt=""><figcaption></figcaption></figure>

### Step 3

* Now click on Deploy Contract and choose either Base or Ethereum. The process is the same for both; in this example, I am deploying the contract on the Base chain.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/ZR2IHOgVxsxmGytmYT1c/image.png" alt=""><figcaption></figcaption></figure>

### Step 4

* You will see a pop-up screen where you can enter the required details, such as the master account and the cold wallet address.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/UIWKECTirsnROha9hgIY/image.png" alt=""><figcaption></figcaption></figure>

### Step 5

* Enter the required details, connect your master account, provide the cold wallet address, and add a wallet name. You can connect your master account using any wallet provider, such as MetaMask or WalletConnect, but it must support the Base network because we are deploying the contract on the Base blockchain. Therefore, it should be a Base-compatible wallet.
* Once you’ve added all the necessary details click on deploy contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/ljHspJoNNTeAOnR4dTbX/image.png" alt=""><figcaption></figcaption></figure>

* Wait until the contract get Deployed, Once deployed it will look like this

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/meEq39yGi3hDDXFRys4D/image.png" alt=""><figcaption></figcaption></figure>

### Step 6

* Once you’ve successfully deployed the contract and entered all the necessary details, the screen will look like this. It will display information such as the fund sweeper address, the master account address, and confirming that your setup is ready to receive payments.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/hRfnFHvmXlVU6kR28TiO/image.png" alt=""><figcaption></figcaption></figure>

* Congratulations, you are now ready to accept payments from your customers on the Base blockchain and its supported tokens.
  {% endtab %}

{% tab title="Ethereum" %}
{% hint style="info" %} <mark style="color:$primary;">**Note**</mark>**:** <mark style="color:$info;">When deploying contract addresses within the EVM family (e.g., Base, Ethereum), make sure to use the same master account for all networks in the family to ensure users receive consistent deposit addresses across blockchains</mark>
{% endhint %}

### Step 1

* Click on EVM family to expand the section. You will see options to deploy the contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/e529UDckvULJojkGeFng/image.png" alt=""><figcaption></figcaption></figure>

### Step 2

* In the EVM Family section, you can deploy contracts on both the Base and Ethereum blockchains. This means you will be able to accept payments on Base and Ethereum once the contracts are deployed there.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/5UkrucBL2s3v18etDyuf/image.png" alt=""><figcaption></figcaption></figure>

### Step 3

* Now click on Deploy Contract and choose either Base or Ethereum. The process is the same for both; in this example, I am deploying the contract on the Base chain.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/ZR2IHOgVxsxmGytmYT1c/image.png" alt=""><figcaption></figcaption></figure>

### Step 4

* You will see a pop-up screen where you can enter the required details, such as the master account and the cold wallet address.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/2Zn53aODXrJVQ2Y5V195/image.png" alt=""><figcaption></figcaption></figure>

### Step 5

* Enter the required details, connect your master account, provide the cold wallet address, and add a wallet name. You can connect your master account using any wallet provider, such as MetaMask or WalletConnect, but it must support the Base network because we are deploying the contract on the Base blockchain. Therefore, it should be a Base-compatible wallet.
* Once you’ve added all the necessary details click on deploy contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/nu8cVG9t9qGAWdjmU7Bn/image.png" alt=""><figcaption></figcaption></figure>

* Wait until the contract get Deployed, Once deployed it will look like this

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/meEq39yGi3hDDXFRys4D/image.png" alt=""><figcaption></figcaption></figure>

### Step 6

* Once you’ve successfully deployed the contract and entered all the necessary details, the screen will look like this. It will display information such as the fund sweeper address, the master account address, and confirming that your setup is ready to receive payments.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/XZSLyZwcgusGrpVCJHWP/image.png" alt=""><figcaption></figcaption></figure>

* Congratulations, you are now ready to accept payments from your customers on the Etheruem blockchain and its supported tokens.
  {% endtab %}

{% tab title="Tron" %}

### Step 1

* Click on Tron to expand the section. You will see options to deploy the contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/pk6GedjNKIZzf93t2ZRK/image.png" alt=""><figcaption></figcaption></figure>

* Now click on Deploy contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/z85ygFmPJ3nb9BkIucNM/image.png" alt=""><figcaption></figcaption></figure>

### Step 2

* You will see a pop-up screen where you can enter the required details, such as the master account and the cold wallet address.
* Enter the required details, connect your master account, provide the cold wallet address, and add a wallet name. You can connect your master account using any wallet provider, such as Wallet Connect Id, but it must support Tron because we are deploying the contract on the Tron blockchain. Therefore, it should be a Tron-compatible wallet.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/VG6D3zDIDj969ZGJt9VZ/image.png" alt=""><figcaption></figcaption></figure>

### Step 3

* Once you’ve added all the necessary details click on deploy contract

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/ljHspJoNNTeAOnR4dTbX/image.png" alt=""><figcaption></figcaption></figure>

* Wait until the contract get Deployed, Once deployed it will look like this

### Step 4

* Once you’ve successfully deployed the contract and entered all the necessary details, the screen will look like this. It will display information such as the fund sweeper address, the master account address, and confirming that your setup is ready to receive payments.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/CiAC7dVf2wpaLBqiSZWG/image.png" alt=""><figcaption></figcaption></figure>

* Congratulations, you are now ready to accept payments from your customers on the Tron blockchain and its supported tokens.
  {% endtab %}

{% tab title="Bitcoin" %}
{% hint style="info" %} <mark style="color:$primary;">**Note**</mark><mark style="color:$info;">: Bitcoin works a little differently from the other chains. For the other chains, we deploy a contract to generate deposit wallets, but for Bitcoin, there is no need to do that. You only need to add a BTC wallet, which will serve as the source for generating deposit wallets, and a cold wallet to receive the funds.</mark>
{% endhint %}

### Step 1

* Click on Bitcoin & Other Networks to expand the section. You will see options to Add wallet

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/wYeVyFtaDc4yQSJZuN1W/image.png" alt=""><figcaption></figcaption></figure>

### Step 2

* Now click on Add wallet

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/EGu70Fc4n56WF2zb1Jup/image.png" alt=""><figcaption></figcaption></figure>

### Step 3&#x20;

* You will see a pop-up screen where you can enter the required details. Enter the 12-word secret phrase of any BTC wallet, which will act as the master account for generating deposit addresses for your customers.
* Make sure to remember this seed phrase, as you will need the exact same phrase when sweeping funds from the PayRam mobile app.

{% hint style="info" %} <mark style="color:$success;">**Note**</mark><mark style="color:$info;">: The seed phrase will never be stored on any server. It is kept only on your PayRam server and protected with encryption.</mark>
{% endhint %}

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/8jHDJePR6XIgVy94R2Xj/image.png" alt=""><figcaption></figcaption></figure>

### Step 4&#x20;

* You need to enter the 12-word seed phrase of your BTC wallet.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/jjMvBeG6FfomAqSZXbAB/image.png" alt=""><figcaption></figcaption></figure>

* Once you’ve added all the necessary details click on Save & Generate Addresses

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/Ssikse16CtFke6E3u3Vx/image.png" alt=""><figcaption></figcaption></figure>

### Step 5

* Once you’ve successfully added the BTC wallet seed phrase, the configuration for generating deposit addresses on Bitcoin is complete. Next, you need to add a cold wallet to receive the funds.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/G9FEBV9PapF3O8tgwHZ0/image.png" alt=""><figcaption></figcaption></figure>

### Step 6

* Click on Add Cold wallet Button, then you'll be asked to enter the cold wallet

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/bLNfxoOr609y7QzoAFfa/image.png" alt=""><figcaption></figcaption></figure>

* Once you’ve added the cold wallet, click the Save button. Your cold wallet will then be successfully configured.
* That’s it. You have successfully set up the configuration for BTC wallets, and you can now receive payments from your customers on the BTC network as well.
  {% endtab %}
  {% endtabs %}
  {% endstep %}
  {% endstepper %}

***

You have successfully set up your wallets and can now start receiving payments from your customers. Follow this section to learn how to generate a test payment link or integrate the PayRam server API into your SaaS, dApp, or other applications.
