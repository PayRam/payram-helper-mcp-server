For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/onboarding-guide/node-details-configuration.md).

Copy

On this page

1.  [ONBOARDING GUIDE](/onboarding-guide)

# 🔁Node Details Configuration

In this section, you will configure the node details of the blockchain where you want to accept payments. You can set up any blockchain that you wish to use for receiving payments.

* * *

## **Prerequisites**[](#prerequisites)

Before you proceed with the node configuration, make sure the following steps are completed:

-   [Install PayRam](/deployment-guide/quick-setup) and complete the [root account setup](/onboarding-guide/root-account-setup).
    
-   Ensure the server is running and ready, so you can connect your blockchain nodes without issues.
    

* * *

## Nodes configuration[](#nodes-configuration)

1

### Open Settings[](#open-settings)

-   From the left menu, select **Settings**.
    

![The Settings screen](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-a8935fd88273d4d7006a143b6f68ae362673b117%252Fpayram-onboarding-settings.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=de50c77a&sv=2)

2

### Open Node Configurations[](#open-node-configurations)

-   Under **Integrations**, select **Node Configurations**.
    

![Node configurations, listing each supported network](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-511956eb3135f654faaaee386e5165f0fe33890d%252Fpayram-onboarding-node-configurations.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=7d5e029e&sv=2)

-   Each supported network shows how many RPC nodes it has, how many are active, and the last block PayRam processed. PayRam ships with public nodes already configured, so payments are detected without any setup.
    

**Note**: If the **Last Block Processed** value is not moving, select **Restart Processors** on this page. If it stays stuck, restart the server itself — [see the restart command](/script/script-usage).

3

### Review a network's node pool[](#review-a-networks-node-pool)

-   Select any network to open its RPC node pool.
    

![The RPC node pool for a network](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-7a3da9f034a1ac1e1aaf24ebb862f47f69e02ce0%252Fpayram-onboarding-node-pool.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=72b4d5fd&sv=2)

-   Each node shows its position in the pool (**#1**, **#2**, and so on), whether it is **Free** or paid, and whether it is **Active**. The node marked **Preferred** is tried first, and PayRam falls back to the others if it is unreachable.
    
-   **Test Connection** checks the pool from your server, so you can confirm a node works before relying on it.
    

4

### Add your own RPC node[](#add-your-own-rpc-node)

-   Select **Add Node**, enter the node URL, choose whether it is a free or paid node, then select **Add Node**.
    

![Adding an RPC node](https://docs.payram.com/~gitbook/image?url=https%3A%2F%2F3861722996-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fwm1DIvbGMREWT1TdLPtz%252Fuploads%252Fgit-blob-9da67e722d3e8d20e5317df682f40482757e72bc%252Fpayram-onboarding-add-node.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=7d018b4d&sv=2)

**Consider a paid node provider.** The public nodes PayRam ships with are fine for testing and low volume, but they can be rate-limited or unreliable. If you expect high payment volume, or you need uninterrupted operation, add a node from a paid provider such as Infura or Alchemy.

* * *

You have configured the nodes for the blockchains you want to accept payments on. The next step is to add the wallets for those blockchains, which is required before you can receive payments.

[PreviousRoot Account Setup](/onboarding-guide/root-account-setup)[NextWallet Integration](/onboarding-guide/wallet-integration)

Last updated 9 hours ago