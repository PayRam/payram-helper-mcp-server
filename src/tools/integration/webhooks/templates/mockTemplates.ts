// NOTE: Webhook snippets are derived from docs/payram-webhook.yaml (WebhookPayload/WebhookAck).
// If that spec changes, update it first and then refresh these templates.

import { SnippetResponse } from '../../common/snippetTypes.js';
import { PayramWebhookStatus } from '../webhookTypes.js';

const mockNotes =
  'Payload matches components.schemas.WebhookPayload (docs/payram-webhook.yaml). Update URL/API-Key/env vars for your environment before sending.';

const buildExamplePayload = (status: PayramWebhookStatus = 'FILLED') => `{
  "reference_id": "ref_demo_001",
  "invoice_id": "inv_demo_001",
  "customer_id": "cust_123",
  "customer_email": "user@example.com",
  "status": "${status}",
  "amount": 49.99,
  "filled_amount_in_usd": 49.99,
  "currency": "USD"
}`;

export const buildCurlMockWebhookEventSnippet = (
  status: PayramWebhookStatus = 'FILLED',
): SnippetResponse => ({
  title: 'Send a mock Payram webhook with curl',
  snippet: `curl -X POST \\
  -H 'Content-Type: application/json' \\
  -H "API-Key: ${'$'}{PAYRAM_WEBHOOK_SECRET:-replace-me}" \\
  -d '${buildExamplePayload(status)}' \\
  ${'${MOCK_WEBHOOK_URL:-http://localhost:3000/api/payram/webhook}'}`,
  meta: {
    language: 'javascript',
    framework: 'generic-http',
    filenameSuggestion: 'scripts/mock-payram-webhook.sh',
    description: 'Simple curl command to replay a Payram webhook locally.',
  },
  notes: `${mockNotes} Set PAYRAM_WEBHOOK_SECRET and MOCK_WEBHOOK_URL env vars before running.`,
});

export const buildPythonMockWebhookEventSnippet = (
  status: PayramWebhookStatus = 'FILLED',
): SnippetResponse => ({
  title: 'Send a mock Payram webhook with Python + httpx',
  snippet: `import os
import httpx

WEBHOOK_URL = os.getenv('MOCK_WEBHOOK_URL', 'http://localhost:3000/api/payram/webhook')
PAYRAM_WEBHOOK_SECRET = os.getenv('PAYRAM_WEBHOOK_SECRET', 'replace-me')

payload = {
    'reference_id': 'ref_demo_001',
    'invoice_id': 'inv_demo_001',
    'customer_id': 'cust_123',
    'customer_email': 'user@example.com',
    'status': '${status}',
    'amount': 49.99,
    'filled_amount_in_usd': 49.99,
    'currency': 'USD',
}

response = httpx.post(
    WEBHOOK_URL,
    headers={'Content-Type': 'application/json', 'API-Key': PAYRAM_WEBHOOK_SECRET},
    json=payload,
)

print(response.status_code, response.text)
`,
  meta: {
    language: 'python',
    framework: 'generic-http',
    filenameSuggestion: 'scripts/mock_payram_webhook.py',
    description: 'Python helper to post example webhook payloads via httpx.',
  },
  notes: `${mockNotes} Install httpx (pip install httpx) or swap for requests if preferred.`,
});

export const buildGoMockWebhookEventSnippet = (
  status: PayramWebhookStatus = 'FILLED',
): SnippetResponse => ({
  title: 'Send a mock Payram webhook with Go',
  snippet: `package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "net/http"
  "os"
)

func main() {
  payload := map[string]any{
    "reference_id": "ref_demo_001",
    "invoice_id": "inv_demo_001",
    "customer_id": "cust_123",
    "customer_email": "user@example.com",
    "status": "${status}",
    "amount": 49.99,
    "filled_amount_in_usd": 49.99,
    "currency": "USD",
  }

  body, _ := json.Marshal(payload)

  req, _ := http.NewRequest(http.MethodPost, getEnv("MOCK_WEBHOOK_URL", "http://localhost:3000/api/payram/webhook"), bytes.NewBuffer(body))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("API-Key", getEnv("PAYRAM_WEBHOOK_SECRET", "replace-me"))

  resp, err := http.DefaultClient.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Status:", resp.Status)
}

func getEnv(key, fallback string) string {
  if value := os.Getenv(key); value != "" {
    return value
  }
  return fallback
}
`,
  meta: {
    language: 'go',
    framework: 'generic-http',
    filenameSuggestion: 'cmd/mock_payram_webhook/main.go',
    description: 'Go CLI that replays a webhook payload to your local endpoint.',
  },
  notes: mockNotes,
});

export const buildPhpMockWebhookEventSnippet = (
  status: PayramWebhookStatus = 'FILLED',
): SnippetResponse => ({
  title: 'Send a mock Payram webhook with PHP + Guzzle',
  snippet: `<?php

require __DIR__.'/vendor/autoload.php';

use GuzzleHttp\\Client;

$client = new Client();

$payload = [
    'reference_id' => 'ref_demo_001',
  'invoice_id' => 'inv_demo_001',
  'customer_id' => 'cust_123',
  'customer_email' => 'user@example.com',
  'status' => '${status}',
  'amount' => 49.99,
  'filled_amount_in_usd' => 49.99,
  'currency' => 'USD',
];

$response = $client->post(
    getenv('MOCK_WEBHOOK_URL') ?: 'http://localhost:3000/api/payram/webhook',
    [
        'headers' => [
            'Content-Type' => 'application/json',
      'API-Key' => getenv('PAYRAM_WEBHOOK_SECRET') ?: 'replace-me',
        ],
        'json' => $payload,
    ],
);

echo $response->getStatusCode().' '.$response->getBody();
`,
  meta: {
    language: 'php',
    framework: 'generic-http',
    filenameSuggestion: 'scripts/mock_payram_webhook.php',
    description: 'PHP example using Guzzle to post a fake webhook payload.',
  },
  notes: `${mockNotes} Requires composer require guzzlehttp/guzzle.`,
});

export const buildJavaMockWebhookEventSnippet = (
  status: PayramWebhookStatus = 'FILLED',
): SnippetResponse => ({
  title: 'Send a mock Payram webhook with Java HttpClient',
  snippet: `package com.example.webhooks;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class MockPayramWebhookSender {
  public static void main(String[] args) throws IOException, InterruptedException {
    String webhookUrl = System.getenv().getOrDefault("MOCK_WEBHOOK_URL", "http://localhost:3000/api/payram/webhook");
    String apiKey = System.getenv().getOrDefault("PAYRAM_WEBHOOK_SECRET", "replace-me");

    String payload = """
{
  \"reference_id\": \"ref_demo_001\",
  \"invoice_id\": \"inv_demo_001\",
  \"customer_id\": \"cust_123\",
  \"customer_email\": \"user@example.com\",
  \"status\": \"${status}\",
  \"amount\": 49.99,
  \"filled_amount_in_usd\": 49.99,
  \"currency\": \"USD\"
}
""";

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(webhookUrl))
        .header("Content-Type", "application/json")
        .header("API-Key", apiKey)
        .POST(HttpRequest.BodyPublishers.ofString(payload))
        .build();

    HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

    System.out.println(response.statusCode() + " " + response.body());
  }
}
`,
  meta: {
    language: 'java',
    framework: 'generic-http',
    filenameSuggestion: 'scripts/MockPayramWebhookSender.java',
    description: 'Java HttpClient example that simulates a webhook callback.',
  },
  notes: mockNotes,
});
