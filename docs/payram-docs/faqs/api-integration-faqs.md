# API Integration FAQ's

### API Integration

* [How do I generate a payment link via the API?](#how-do-i-generate-a-payment-link-via-the-api)
* [How do I check payment status or get payment details?](#how-do-i-check-payment-status-or-get-payment-details)
* [How do webhooks work and how do I secure them?](#how-do-webhooks-work-and-how-do-i-secure-them)

#### How do I generate a payment link via the API?

To create a new payment session (link), send a **POST** request to the PayRam API’s `/api/v1/payment` endpoint. Include your project’s API key in the `API-Key` header, and set `Content-Type: application/json`. The JSON body should contain at least `customerEmail`, `customerId`, and `amountInUSD`. For example:

{% code title="" overflow="wrap" lineNumbers="true" %}

```bash
curl --location '<https://your-payram-server/api/v1/payment>' \\
  --header 'API-Key: YOUR_PROJECT_API_KEY' \\
  --header 'Content-Type: application/json' \\
  --data '{
      "customerEmail": "customer@example.com",
      "customerId": "unique_customer_id",
      "amountInUSD": 24.33
  }'
```

{% endcode %}

As shown in PayRam’s docs, this returns a JSON response with fields including `"url"` (the payment link URL to share with the customer) and `"reference_id"` (an ID you should store to track the payment).

#### How do I check payment status or get payment details?

To retrieve the status or details of a payment, send a **GET** request to `/api/v1/payment/reference/{reference_id}`, where `{reference_id}` is the ID returned when you created the payment. For example:

{% code title="" overflow="wrap" lineNumbers="true" %}

```bash
curl --location '<https://your-payram-server/api/v1/payment/reference/REF_ID>'
```

{% endcode %}

The JSON response will include fields such as `"amount"`, `"currency_symbol"` or name, `"deposit_address"` where funds should be sent, and `"payment_state"`. The `payment_state` can be `OPEN` (no payment yet), `FILLED` (full payment received), `PARTIALLY_FILLED`, `OVER_FILLED`, or `CANCELED`. The example PayRam response shows `amount`, `deposit_address`, and `"payment_state": "OPEN"` among other details. Use this endpoint to programmatically check if the customer has paid.

#### How do webhooks work and how do I secure them?

Webhooks allow PayRam to notify you of payment events. In your PayRam project settings, set a **`webhookEndpoint` URL** for your server (e.g. `https://yourstore.com/webhook`). Whenever a payment is processed, PayRam will send an **HTTP GET** request to that URL with a JSON payload of payment details. The request will include an `API-Key` header containing your project’s API key.

To secure this, on your server verify that the `API-Key` header matches your project key. Only process the webhook data if the key is correct. In the payload PayRam includes fields like `amount`, `deposit_address`, `payment_state` (OPEN, FILLED, etc.), and so on. Your endpoint should parse the JSON, validate the data (e.g. check the reference\_id and payment amount against your records), and then respond with HTTP 200 OK to acknowledge. By checking the `API-Key` header on each webhook call, you ensure that only legitimate PayRam notifications are accepted.
