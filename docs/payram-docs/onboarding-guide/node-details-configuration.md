# Node Details Configuration

***

## **Prerequisites**

Before you proceed with the node configuration, make sure the following steps are completed:

* Install the [PayRam](https://www.notion.so/PayRam-Setup-2782637ada87802ba500e9d01a595075?pvs=21) and complete the [onboarding configuration](https://www.notion.so/S1-Onboarding-Configuration-2782637ada87804ab920e82c033eed38?pvs=21).
* Ensure the server is running and ready, so you can connect your blockchain nodes without issues.

***

## Nodes configuration :

{% stepper %}
{% step %}

### Dashboard page

* Once you have successfully completed the Onboarding configuration, you will be redirected to the dashboard .

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/ZjpjOEywmKr5X5OWZDGO/image.png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Settings

* Before accepting any payments, you need to configure the blockchain nodes based on the network you selected while installing PayRam. For example, if you chose mainnet, configure the mainnet nodes, and if you chose testnet, configure the testnet nodes accordingly.
* Now click on the Settings

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/KFkWlw1HUJOb5eDZujnO/image.png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Integrations

* Then select integrations

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/u232SbyW4ztECmZ8P9VI/image.png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Node configurations

* Under **Node Details**, you will find the node configuration information

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/YXs3bA2rJ6jnj8bltGGl/image.png" alt=""><figcaption></figcaption></figure>

* The node details are already set up with some public RPC URLs. However, if you want to use any private RPC URLs, you can update the configuration according

> <mark style="color:$success;">**Note**</mark><mark style="color:$info;">: If the “</mark><mark style="color:$danger;">**Last Block Processed**</mark><mark style="color:$info;">” rows are not updating, you’ll need to restart your PayRam server. Please run the reset command script on the server where PayRam is hosted.</mark>
>
> 👉 [View Restart Command Guide](https://docs.payram.com/onboarding-guide/broken-reference)
> {% endstep %}
> {% endstepper %}

***

If you do not want to use the default node RPC provided by us and instead prefer to use your own private RPC, you can change the node configuration details by following the link below and updating the RPC URL with your custom endpoint.

***

You’ve successfully added the required node details for a blockchain, the node configuration is complete. The next step is to add the corresponding wallets for those blockchains, which is necessary before you can start receiving PayRam payments.
