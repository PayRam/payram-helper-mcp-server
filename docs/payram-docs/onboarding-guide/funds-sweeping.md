# Funds Sweeping

***

## **Prerequisites**

Before proceeding with this section, ensure the following steps are completed:

* The PayRam server is installed and running.
* Done with wallet configuration and able to accept payments.
* Hot wallet configuration has been successfully completed.

***

## **Sweep process by blockchain network**

The way sweeping works depends on the blockchain you are using.

{% tabs %}
{% tab title="EVM Family & Tron :" %}

* In the EVM family (Ethereum, Base) and Tron, sweeping is handled through the sweep contract you have already deployed. It automatically collects funds from your deposit wallets and sends them to your cold wallet. No additional setup is needed. It's simply magic.
  {% endtab %}

{% tab title="Bitcoin & other networks :" %}

* Bitcoin does not support on-chain smart contracts like EVM and Tron. Sweeping for Bitcoin is done using the PayRam Bitcoin mobile app, which follows a separate process. You will use the app to move funds from your BTC deposit wallets to your cold wallet.
  {% endtab %}
  {% endtabs %}

Check out the BTC sweep process step-by-step guide to learn how to transfer funds using the PayRam mobile app. If you accept payments in BTC, follow this sweep process guide.

{% content-ref url="funds-sweeping/bitcoin-funds-sweep-guide" %}
[bitcoin-funds-sweep-guide](https://docs.payram.com/onboarding-guide/funds-sweeping/bitcoin-funds-sweep-guide)
{% endcontent-ref %}
