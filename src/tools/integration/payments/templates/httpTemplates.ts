import { SnippetResponse } from '../../common/snippetTypes.js';

const buildHeadersComment = () => "// Payram uses the 'API-Key' header.";

export const buildPythonHttpCreatePaymentSnippet = (): SnippetResponse => ({
  title: 'Create a Payram payment using Python + requests',
  snippet: `import os
import requests

PAYRAM_BASE_URL = os.environ['PAYRAM_BASE_URL']
PAYRAM_API_KEY = os.environ['PAYRAM_API_KEY']

payload = {
    'customerEmail': 'customer@example.com',
    'customerId': 'cust_123',
    'amountInUSD': 49.99,
}

headers = {
    'Content-Type': 'application/json',
    'API-Key': PAYRAM_API_KEY,
}

response = requests.post(
    f"{PAYRAM_BASE_URL}/api/v1/payment",
    json=payload,
    headers=headers,
    timeout=30,
)
response.raise_for_status()

checkout = response.json()
print('Reference:', checkout['reference_id'])
print('Checkout URL:', checkout['url'])
print('Host:', checkout['host'])
`,
  meta: {
    language: 'python',
    framework: 'generic-http',
    filenameSuggestion: 'scripts/payram/create_payment.py',
    description: 'Raw HTTP POST to /api/v1/payment using the documented payload.',
  },
  notes: `${buildHeadersComment()} Send the fields from InitiatePaymentRequest (customerEmail, customerId, amountInUSD).`,
});

export const buildGoHttpCreatePaymentSnippet = (): SnippetResponse => ({
  title: 'Create a Payram payment using Go net/http',
  snippet:
    `package payram

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

type initiatePaymentRequest struct {
    CustomerEmail string  ` +
    '`json:"customerEmail"`' +
    `
    CustomerID    string  ` +
    '`json:"customerId"`' +
    `
    AmountInUSD   float64 ` +
    '`json:"amountInUSD"`' +
    `
}

func CreatePayment() (*http.Response, error) {
    body, err := json.Marshal(initiatePaymentRequest{
        CustomerEmail: "customer@example.com",
        CustomerID:    "cust_123",
        AmountInUSD:   49.99,
    })
    if err != nil {
        return nil, err
    }

    url := fmt.Sprintf("%s/api/v1/payment", os.Getenv("PAYRAM_BASE_URL"))
    req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
    if err != nil {
        return nil, err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("API-Key", os.Getenv("PAYRAM_API_KEY"))

    return http.DefaultClient.Do(req)
}
`,
  meta: {
    language: 'go',
    framework: 'generic-http',
    filenameSuggestion: 'internal/payram/create_payment.go',
    description: 'Minimal net/http helper that posts InitiatePaymentRequest.',
  },
  notes: `${buildHeadersComment()} Log non-2xx responses to capture StandardError or FlatError envelopes.`,
});

export const buildPhpHttpCreatePaymentSnippet = (): SnippetResponse => ({
  title: 'Create a Payram payment using PHP + cURL',
  snippet: `<?php
$payload = [
    'customerEmail' => 'customer@example.com',
    'customerId' => 'cust_123',
    'amountInUSD' => 49.99,
];

$ch = curl_init(getenv('PAYRAM_BASE_URL') . '/api/v1/payment');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'API-Key: ' . getenv('PAYRAM_API_KEY'),
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

if ($response === false || $statusCode >= 400) {
    throw new RuntimeException('Payram create payment failed: ' . curl_error($ch));
}

echo $response;
`,
  meta: {
    language: 'php',
    framework: 'generic-http',
    filenameSuggestion: 'app/Services/Payram/CreatePayment.php',
    description: 'Straightforward cURL call to initiate a Payram payment.',
  },
  notes: `${buildHeadersComment()} Capture the JSON response to store reference_id + url for your checkout UI.`,
});

export const buildJavaHttpCreatePaymentSnippet = (): SnippetResponse => ({
  title: 'Create a Payram payment using Java HttpClient',
  snippet: `package com.acme.payram;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class PayramPaymentClient {
    private final HttpClient http = HttpClient.newHttpClient();
    private final String baseUrl = System.getenv("PAYRAM_BASE_URL");
    private final String apiKey = System.getenv("PAYRAM_API_KEY");

    public HttpResponse<String> createPayment() throws Exception {
        var payload = """
            {
              \"customerEmail\": \"customer@example.com\",
              \"customerId\": \"cust_123\",
              \"amountInUSD\": 49.99
            }
            """;

        var request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/api/v1/payment"))
            .header("Content-Type", "application/json")
            .header("API-Key", apiKey)
            .POST(HttpRequest.BodyPublishers.ofString(payload))
            .build();

        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
`,
  meta: {
    language: 'java',
    framework: 'generic-http',
    filenameSuggestion: 'src/main/java/com/acme/payram/PayramPaymentClient.java',
    description: 'Java 11+ HttpClient example for InitiatePaymentRequest.',
  },
  notes: `${buildHeadersComment()} Parse the JSON body to extract reference_id, url, and host per InitiatePaymentResponse.`,
});

export const buildGenericHttpPaymentStatusSnippet = (): SnippetResponse => ({
  title: 'Fetch Payram payment status over HTTP',
  snippet: `import { request } from 'node:https';

const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL!;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY!;

export function getPaymentStatus(referenceId: string) {
  return new Promise((resolve, reject) => {
    if (!referenceId) {
      return reject(new Error('referenceId is required to query Payram status.'));
    }

    const statusUrl = PAYRAM_BASE_URL + '/api/v1/payment/reference/' + referenceId;

    const req = request(
      statusUrl,
      {
        method: 'GET',
        headers: {
          'API-Key': PAYRAM_API_KEY,
          Accept: 'application/json',
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error('Payram status check failed: ' + res.statusCode));
          }
          resolve(JSON.parse(Buffer.concat(chunks).toString()));
        });
      },
    );

    req.on('error', reject);
    req.end();
  });
}
`,
  meta: {
    language: 'typescript',
    framework: 'generic-http',
    filenameSuggestion: 'src/payram/payments/getStatus.ts',
    description: 'Node HTTPS example hitting GET /api/v1/payment/reference/{referenceID}.',
  },
  notes: `${buildHeadersComment()} Store reference_id from initiatePayment and pass it to this helper.`,
});
