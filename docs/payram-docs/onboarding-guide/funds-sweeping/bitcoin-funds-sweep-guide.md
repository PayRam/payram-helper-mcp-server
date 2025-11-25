# Bitcoin Funds Sweep Guide

{% stepper %}
{% step %}

### Setup PayRam Merchant mobile app

* Navigate to Settings and click on it. Then, go to the Accounts tab. You will see a QR code labeled Connect to PayRam Mobile App. This QR code is used to sync the app with your PayRam server. Download the PayRam mobile app from the app store separately, then scan this QR code to complete the sync.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/XTx0jtoWDdLUogfsiYSn/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/cmEORxLCR9kHJkiYBqFv/image.png" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Login to the PayRam app

* Scan the QR code from your phone. Once scanned, you will be prompted to log in. Use the same root login credentials that you used when setting up the PayRam server web application.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/GBMhxragEImuZXJFSXld/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/LxNWUO10HH1Fk0r9CPwf/image.png" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Set a passcode

Once the above step is completed, you will be prompted to set up a passcode. This passcode will be used to secure access to the PayRam mobile app on your device.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/qPaQFjiEO7WVOEmxkb6D/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/zRHTRxwYIqtHEznikQZG/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/vloPjOLEDjAotCig80Tp/image.png" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Link wallet

* Now you will see the wallet that you attached during the BTC wallet configuration. You need to select this exact same account so it can be linked here. Click on the link icon, then click on the Link Wallet button. You will be asked to enter the seed phrase, so make sure you have the exact same seed phrase for the account you attached earlier when configuring the BTC wallet. After entering the seed phrase, click Link Wallet to complete the process.

{% hint style="info" %} <mark style="color:$primary;">**Note**</mark><mark style="color:$info;">: The seed phrase will never be stored on any server. It is kept only on your local device storage and protected with encryption.</mark>
{% endhint %}

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/t8rU7Szkm9qOV5ChlE0Q/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/vyeqABOy5VTXqkZjz1W4/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/FLNjjYnW8VlkuLfFm79c/image.png" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Signing requests tab

* Once you have successfully linked the BTC wallet, you are ready to sweep funds from your BTC deposit wallets to your cold wallet. Go to the Signing Requests tab, where you will see the funds that are ready to be swept. This section will list the deposit addresses where you have received payments, allowing you to sweep them into your cold wallet.
  {% endstep %}

{% step %}

### Signing request rabs sections

In the Signing Requests tab, you will see two sub-tabs

* Pending&#x20;
* In Progress

{% tabs %}
{% tab title="Pending" %}

### **Pending**

* Shows the list of deposit addresses that have received funds and are ready to be swept into your cold wallet.
* These addresses are grouped together in batches for sweeping.
* Clicking on a batch allows you to sweep all funds from the deposit addresses in that batch to your cold wallet.
* For example, if a batch contains 1,400 deposit addresses, all of them have funds ready to sweep.
* If you see two batches, that means there are 2,800 deposit addresses ready to be swept.
* Simply approve and verify these sweeps to move the funds.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/4zYmDwmCRB57PaXzoy6y/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/y07G4sCp1k4JFu7KWp2P/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/WoKwcYFwVAe7mZ5ZSRjj/image.png" alt=""><figcaption></figcaption></figure>

{% endtab %}

{% tab title="In progress" %}

### **In progress**

* Shows batches of deposit addresses where sweeping has already started.
* Displays the status of each sweep, including whether all funds have been successfully transferred to your cold wallet.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/zokT8GadCr4Wc8Zi2P6Y/image.png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

{% endstep %}

{% step %}

### Sweeps completed

* Once the sweeps are fully completed, you can check the transaction status by moving from the In Progress tab to the History tab.

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/BhGRD7GaePqfQfXtIepW/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://content.gitbook.com/content/e8xE63hZD8rEwBT8vRke/blobs/FJJXbkxWVrqqbZt8id5U/image.png" alt=""><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}
