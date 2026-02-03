copyCopychevron-down

1.  [API Integration](/api-integration)chevron-right
2.  [⚡Payments API](/api-integration/payments-api)

# webhookWebhook

Once, any transaction has been processed against the payment, the merchant will receive a webhook. The webhook is a GET request to the Merchant's server. Merchant has to accept the webhook request, parse this data and send back confirmation of the receipt.

### 

[hashtag](#how-to-set-up-a-webhook)

How to set up a webhook?

To set up a webhook for the Payment Session, you'll need a webhook URL.

1.  Access the Payram Dashboard.
    
2.  Locate the "Webhook" tab under the "Developer" section.
    
3.  Click the "Add Endpoint" button.
    
4.  Enter the Endpoint URL and a description for your webhook, then click "Add Endpoint."
    

### 

[hashtag](#sample-payload-structure)

Sample Payload Structure

Sample Payload

Copy

```
{
    "customer_id":          "1234",
    "invoice_id":           "fdfds",
    "reference_id":         "fdsfds",
    "status":               "OPEN",
    "amount":               "323.53",
    "currency":             "BTC",
    "filled_amount":        18,
    "filled_amount_in_usd": 18,
    "timestamp":            "fdsfds",
}
```

### 

[hashtag](#webhook-events)

Webhook Events

Here is the list of major events that our webhook will update your server.

1.  Payment Page Rendered
    
2.  Payment Detected on Network
    
3.  Payment Confirmed
    

[PreviousPayment Statuschevron-left](/api-integration/payments-api/payment-status)[NextPayouts APIschevron-right](/api-integration/payouts-apis)

Last updated 18 days ago