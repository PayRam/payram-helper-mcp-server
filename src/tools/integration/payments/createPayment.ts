import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { buildToolSchemas } from '../../common/schemas.js';
import { safeHandler } from '../../common/errors.js';
import { codeTemplate } from '../../common/templates.js';
import { SnippetContext, SnippetResult, buildSnippetNotes } from '../../common/snippets.js';

const frameworks = [
  'nextjs-app',
  'nextjs-pages',
  'node-express',
  'node-bare',
  'python-fastapi',
  'python-django',
  'java-spring-boot',
  'php-laravel',
] as const;

const languages = ['typescript', 'javascript', 'python', 'java', 'php'] as const;

type SupportedFramework = (typeof frameworks)[number];
type SupportedLanguage = (typeof languages)[number];

const schemas = buildToolSchemas({
  input: z.object({
    framework: z.enum(frameworks),
    language: z.enum(languages),
    useSdk: z.boolean().optional(),
    defaultCurrency: z.string().optional(),
    defaultBlockchainCode: z.string().optional(),
  }),
  output: z.object({
    code: z.string(),
    notes: z.string(),
  }),
});

export type CreatePaymentInput = z.infer<typeof schemas.input>;
export type CreatePaymentSnippet = z.infer<typeof schemas.output>;

interface CreatePaymentContext extends SnippetContext {
  framework: SupportedFramework;
  language: SupportedLanguage;
}

type SnippetGenerator = (context: CreatePaymentContext) => SnippetResult;

type GeneratorMatrix = Partial<
  Record<
    SupportedFramework,
    Partial<Record<SupportedLanguage, { sdk?: SnippetGenerator; raw?: SnippetGenerator }>>
  >
>;

const ensureUseSdk = (value?: boolean): boolean => value ?? true;
const textContent = (text: string) => ({ type: 'text' as const, text });
const buildNotes = (context: CreatePaymentContext, extra: string) =>
  buildSnippetNotes(context, extra);

// Next.js (App Router)
const nextAppSdkTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// app/api/payram/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payram, InitiatePaymentRequest } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as Partial<InitiatePaymentRequest>;

  if (!payload.customerEmail || !payload.customerId || typeof payload.amountInUSD !== 'number') {
    return NextResponse.json({ error: 'MISSING_PAYMENT_FIELDS' }, { status: 400 });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail: payload.customerEmail,
      customerId: payload.customerId,
      amountInUSD: payload.amountInUSD,
    });

    return NextResponse.json({
      referenceId: checkout.reference_id,
      hostedUrl: checkout.url,
      host: checkout.host,
    });
  } catch (error) {
    console.error('Payram create payment failed', error);
    return NextResponse.json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' }, { status: 502 });
  }
}
`,
  notes: buildNotes(params, 'App Router handler using the Payram SDK.'),
});

const nextAppSdkJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// app/api/payram/create-payment/route.js
import { NextResponse } from 'next/server';
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY,
  baseUrl: process.env.PAYRAM_BASE_URL,
});

export async function POST(req) {
  const payload = await req.json();
  const { customerEmail, customerId, amountInUSD } = payload;

  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return NextResponse.json({ error: 'MISSING_PAYMENT_FIELDS' }, { status: 400 });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail,
      customerId,
      amountInUSD,
    });
    return NextResponse.json(checkout);
  } catch (error) {
    console.error('Payram create payment failed', error);
    return NextResponse.json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' }, { status: 502 });
  }
}
`,
  notes: buildNotes(params, 'JavaScript App Router handler using the SDK.'),
});

const nextAppRawTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// app/api/payram/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';

const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL!;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY!;

export async function POST(req: NextRequest) {
  const { customerEmail, customerId, amountInUSD } = await req.json();

  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return NextResponse.json({ error: 'MISSING_PAYMENT_FIELDS' }, { status: 400 });
  }

  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: errorText || 'PAYRAM_CREATE_PAYMENT_FAILED' }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}
`,
  notes: buildNotes(params, 'Raw HTTP fallback for the App Router.'),
});

const nextAppRawJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// app/api/payram/create-payment/route.js
const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY;

export async function POST(req) {
  const { customerEmail, customerId, amountInUSD } = await req.json();

  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return new Response(JSON.stringify({ error: 'MISSING_PAYMENT_FIELDS' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: errorText || 'PAYRAM_CREATE_PAYMENT_FAILED' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(await response.text(), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
`,
  notes: buildNotes(params, 'Raw HTTP App Router handler in JavaScript.'),
});

// Next.js (Pages Router)
const nextPagesSdkTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// pages/api/payram/create-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Payram, InitiatePaymentRequest } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const payload = req.body as Partial<InitiatePaymentRequest>;
  if (!payload.customerEmail || !payload.customerId || typeof payload.amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail: payload.customerEmail,
      customerId: payload.customerId,
      amountInUSD: payload.amountInUSD,
    });
    return res.status(200).json(checkout);
  } catch (error) {
    console.error('Payram create payment failed', error);
    return res.status(502).json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }
}
`,
  notes: buildNotes(params, 'Pages Router API route using the SDK.'),
});

const nextPagesSdkJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// pages/api/payram/create-payment.js
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY,
  baseUrl: process.env.PAYRAM_BASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { customerEmail, customerId, amountInUSD } = req.body ?? {};
  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail,
      customerId,
      amountInUSD,
    });
    return res.status(200).json(checkout);
  } catch (error) {
    console.error('Payram create payment failed', error);
    return res.status(502).json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }
}
`,
  notes: buildNotes(params, 'JavaScript Pages Router handler using the SDK.'),
});

const nextPagesRawTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// pages/api/payram/create-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL!;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { customerEmail, customerId, amountInUSD } = req.body ?? {};
  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(502).json({ error: errorText || 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }

  return res.status(200).json(await response.json());
}
`,
  notes: buildNotes(params, 'Raw HTTP Pages Router fallback.'),
});

const nextPagesRawJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// pages/api/payram/create-payment.js
const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { customerEmail, customerId, amountInUSD } = req.body ?? {};
  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(502).json({ error: errorText || 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }

  return res.status(200).json(await response.json());
}
`,
  notes: buildNotes(params, 'JavaScript Pages Router raw HTTP handler.'),
});

// Express
const expressSdkTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// src/routes/payram.ts
import { Router } from 'express';
import { Payram, InitiatePaymentRequest } from 'payram';

const router = Router();
const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

router.post('/payram/payments', async (req, res) => {
  const payload = req.body as Partial<InitiatePaymentRequest>;
  if (!payload.customerEmail || !payload.customerId || typeof payload.amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail: payload.customerEmail,
      customerId: payload.customerId,
      amountInUSD: payload.amountInUSD,
    });
    return res.json({
      referenceId: checkout.reference_id,
      checkoutUrl: checkout.url,
      host: checkout.host,
    });
  } catch (error) {
    console.error('Payram create payment failed', error);
    return res.status(502).json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }
});

export default router;
`,
  notes: buildNotes(params, 'Express router using the SDK (TypeScript).'),
});

const expressSdkJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// routes/payram.js
import { Router } from 'express';
import { Payram } from 'payram';

const router = Router();
const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY,
  baseUrl: process.env.PAYRAM_BASE_URL,
});

router.post('/payram/payments', async (req, res) => {
  const { customerEmail, customerId, amountInUSD } = req.body ?? {};
  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  try {
    const checkout = await payram.payments.initiatePayment({
      customerEmail,
      customerId,
      amountInUSD,
    });
    return res.json({
      referenceId: checkout.reference_id,
      checkoutUrl: checkout.url,
      host: checkout.host,
    });
  } catch (error) {
    console.error('Payram create payment failed', error);
    return res.status(502).json({ error: 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }
});

export default router;
`,
  notes: buildNotes(params, 'Express router using the SDK (JavaScript).'),
});

const expressRawTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// src/routes/payram.ts
import { Router } from 'express';

const router = Router();
const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL!;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY!;

router.post('/payram/payments', async (req, res) => {
  const { customerEmail, customerId, amountInUSD } = req.body ?? {};
  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(502).json({ error: errorText || 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }

  return res.json(await response.json());
});

export default router;
`,
  notes: buildNotes(params, 'Express router calling REST directly (TypeScript).'),
});

const expressRawJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// routes/payram.js
import { Router } from 'express';

const router = Router();
const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY;

router.post('/payram/payments', async (req, res) => {
  const { customerEmail, customerId, amountInUSD } = req.body ?? {};
  if (!customerEmail || !customerId || typeof amountInUSD !== 'number') {
    return res.status(400).json({ error: 'MISSING_PAYMENT_FIELDS' });
  }

  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify({ customerEmail, customerId, amountInUSD }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(502).json({ error: errorText || 'PAYRAM_CREATE_PAYMENT_FAILED' });
  }

  return res.json(await response.json());
});

export default router;
`,
  notes: buildNotes(params, 'Express router calling REST directly (JavaScript).'),
});

// Node scripts / workers
const nodeSdkTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// src/payram/createPayment.ts
import { Payram, InitiatePaymentRequest } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY!,
  baseUrl: process.env.PAYRAM_BASE_URL!,
});

export async function createPayramPayment(payload: InitiatePaymentRequest) {
  return payram.payments.initiatePayment(payload);
}
`,
  notes: buildNotes(params, 'Utility shared by queues or cron jobs (TypeScript).'),
});

const nodeSdkJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// src/payram/createPayment.js
import { Payram } from 'payram';

const payram = new Payram({
  apiKey: process.env.PAYRAM_API_KEY,
  baseUrl: process.env.PAYRAM_BASE_URL,
});

export async function createPayramPayment(payload) {
  return payram.payments.initiatePayment(payload);
}
`,
  notes: buildNotes(params, 'Utility shared by queues or cron jobs (JavaScript).'),
});

const nodeRawTs: SnippetGenerator = (params) => ({
  code: codeTemplate`// src/payram/createPayment.ts
const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL!;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY!;

export async function createPayramPayment(payload: {
  customerEmail: string;
  customerId: string;
  amountInUSD: number;
}) {
  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(\`Payram responded with \${response.status}\`);
  }

  return response.json();
}
`,
  notes: buildNotes(params, 'Raw HTTP helper for background workers (TypeScript).'),
});

const nodeRawJs: SnippetGenerator = (params) => ({
  code: codeTemplate`// src/payram/createPayment.js
const PAYRAM_BASE_URL = process.env.PAYRAM_BASE_URL;
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY;

export async function createPayramPayment(payload) {
  const response = await fetch(\`\${PAYRAM_BASE_URL}/api/v1/payment\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': PAYRAM_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(\`Payram responded with \${response.status}\`);
  }

  return response.json();
}
`,
  notes: buildNotes(params, 'Raw HTTP helper for background workers (JavaScript).'),
});

// Non-JS frameworks (raw HTTP)
const pythonFastApi: SnippetGenerator = (params) => ({
  code: codeTemplate`# app/payram.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import httpx
import os

PAYRAM_BASE_URL = os.environ["PAYRAM_BASE_URL"]
PAYRAM_API_KEY = os.environ["PAYRAM_API_KEY"]

class PaymentPayload(BaseModel):
    customerEmail: EmailStr
    customerId: str
    amountInUSD: float

app = FastAPI()

@app.post("/payram/payments")
async def create_payment(payload: PaymentPayload):
    url = f"{PAYRAM_BASE_URL.rstrip('/')}/api/v1/payment"
    headers = {"API-Key": PAYRAM_API_KEY, "Content-Type": "application/json"}

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(url, json=payload.model_dump())

    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail={"message": response.text})

    return response.json()
`,
  notes: buildNotes(params, 'FastAPI route calling the Payram REST endpoint.'),
});

const pythonDjango: SnippetGenerator = (params) => ({
  code: codeTemplate`# views.py
import json
import os
import httpx
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

PAYRAM_BASE_URL = os.environ["PAYRAM_BASE_URL"]
PAYRAM_API_KEY = os.environ["PAYRAM_API_KEY"]

@csrf_exempt
def create_payram_payment(request):
    if request.method != "POST":
        return JsonResponse({"error": "METHOD_NOT_ALLOWED"}, status=405)

    payload = json.loads(request.body or '{}')
    customerEmail = payload.get('customerEmail')
    customerId = payload.get('customerId')
    amountInUSD = payload.get('amountInUSD')

    if not customerEmail or not customerId or not isinstance(amountInUSD, (int, float)):
        return JsonResponse({"error": "MISSING_PAYMENT_FIELDS"}, status=400)

    url = f"{PAYRAM_BASE_URL.rstrip('/')}/api/v1/payment"
    headers = {"API-Key": PAYRAM_API_KEY, "Content-Type": "application/json"}
    response = httpx.post(url, headers=headers, json={
        "customerEmail": customerEmail,
        "customerId": customerId,
        "amountInUSD": amountInUSD,
    }, timeout=10.0)

    if response.status_code >= 400:
        return JsonResponse({"error": response.text or 'PAYRAM_CREATE_PAYMENT_FAILED'}, status=502)

    return JsonResponse(response.json())
`,
  notes: buildNotes(params, 'Django view that proxies to Payram.'),
});

const javaSpringBoot: SnippetGenerator = (params) => ({
  code: codeTemplate`// PayramController.java
package com.example.payram;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/payram")
public class PayramController {

    private final WebClient webClient;

    public PayramController(
        @Value("\${PAYRAM_BASE_URL}") String baseUrl,
        @Value("\${PAYRAM_API_KEY}") String apiKey
    ) {
        this.webClient = WebClient.builder()
            .baseUrl(baseUrl)
            .defaultHeader("API-Key", apiKey)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    @PostMapping("/payments")
    public Mono<String> createPayment(@RequestBody InitiatePaymentRequest payload) {
        return webClient.post()
            .uri("/api/v1/payment")
            .bodyValue(payload)
            .retrieve()
            .onStatus(status -> status.isError(), response -> response.bodyToMono(String.class)
                .flatMap(body -> Mono.error(new IllegalStateException("Payram error: " + body))))
            .bodyToMono(String.class);
    }
}

// InitiatePaymentRequest.java
package com.example.payram;

public record InitiatePaymentRequest(
    String customerEmail,
    String customerId,
    Double amountInUSD
) {}
`,
  notes: buildNotes(params, 'Spring Boot controller using WebClient.'),
});

const phpLaravel: SnippetGenerator = (params) => ({
  code: codeTemplate`<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Http;

class PayramController extends Controller
{
    public function createPayment(Request $request)
    {
        $payload = $request->validate([
            'customerEmail' => 'required|email',
            'customerId' => 'required|string',
            'amountInUSD' => 'required|numeric',
        ]);

        $response = Http::withHeaders([
            'API-Key' => env('PAYRAM_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post(rtrim(env('PAYRAM_BASE_URL'), '/') . '/api/v1/payment', $payload);

        if ($response->failed()) {
            return response()->json([
                'error' => $response->body() ?: 'PAYRAM_CREATE_PAYMENT_FAILED',
            ], 502);
        }

        return response()->json($response->json());
    }
}
`,
  notes: buildNotes(params, 'Laravel controller wiring to Payram REST.'),
});

const generatorMatrix: GeneratorMatrix = {
  'nextjs-app': {
    typescript: { sdk: nextAppSdkTs, raw: nextAppRawTs },
    javascript: { sdk: nextAppSdkJs, raw: nextAppRawJs },
  },
  'nextjs-pages': {
    typescript: { sdk: nextPagesSdkTs, raw: nextPagesRawTs },
    javascript: { sdk: nextPagesSdkJs, raw: nextPagesRawJs },
  },
  'node-express': {
    typescript: { sdk: expressSdkTs, raw: expressRawTs },
    javascript: { sdk: expressSdkJs, raw: expressRawJs },
  },
  'node-bare': {
    typescript: { sdk: nodeSdkTs, raw: nodeRawTs },
    javascript: { sdk: nodeSdkJs, raw: nodeRawJs },
  },
  'python-fastapi': {
    python: { raw: pythonFastApi },
  },
  'python-django': {
    python: { raw: pythonDjango },
  },
  'java-spring-boot': {
    java: { raw: javaSpringBoot },
  },
  'php-laravel': {
    php: { raw: phpLaravel },
  },
};

const resolveGenerator = (params: CreatePaymentContext): SnippetGenerator => {
  const byFramework = generatorMatrix[params.framework];
  if (!byFramework) {
    throw new Error(`Unsupported framework: ${params.framework}`);
  }

  const byLanguage = byFramework[params.language];
  if (!byLanguage) {
    throw new Error(`Unsupported language ${params.language} for ${params.framework}`);
  }

  const desired = params.useSdk ? byLanguage.sdk : byLanguage.raw;
  if (desired) {
    return desired;
  }

  const fallback = params.useSdk ? byLanguage.raw : byLanguage.sdk;
  if (fallback) {
    return fallback;
  }

  throw new Error(
    `No generator available for ${params.framework}/${params.language} (useSdk=${params.useSdk})`,
  );
};

export const registerCreatePaymentSnippetTool = (server: McpServer) => {
  server.registerTool(
    'generate_payram_create_payment_snippet',
    {
      title: 'Generate Payram Create Payment Snippet',
      description: 'Outputs backend code that POSTs /api/v1/payment per the Payram External API.',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async (args: CreatePaymentInput) => {
        const normalized: CreatePaymentContext = {
          ...args,
          useSdk: ensureUseSdk(args.useSdk),
        } as CreatePaymentContext;

        const generator = resolveGenerator(normalized);
        const snippet = generator(normalized);

        return {
          content: [
            textContent(
              `Generated ${
                normalized.useSdk ? 'SDK' : 'raw HTTP'
              } snippet for ${normalized.framework}.`,
            ),
          ],
          structuredContent: snippet,
        };
      },
      { toolName: 'generate_payram_create_payment_snippet' },
    ),
  );
};
