// NOTE: Webhook snippets are derived from docs/payram-webhook.yaml (WebhookPayload/WebhookAck).
// If that spec changes, update it first and then refresh these templates.

import { SnippetResponse } from '../../common/snippetTypes.js';

const handlerNotes =
  'Mirrors docs/payram-webhook.yaml (WebhookPayload/WebhookAck). Ensure your shared secret env var matches the API-Key header Payram sends.';

export const buildExpressWebhookHandlerSnippet = (): SnippetResponse => ({
  title: 'Express handler for Payram webhooks (POST)',
  snippet: `import express, { Request, Response } from 'express';
import { handlePayramEvent } from '../services/payramWebhookRouter';
import { PayramWebhookPayload, PayramWebhookAck } from '../services/payramWebhookTypes';

const router = express.Router();
router.use(express.json());

router.post('/api/payram/webhook', async (req: Request, res: Response) => {
  const sharedSecret = process.env.PAYRAM_WEBHOOK_SECRET;
  const incomingKey = req.get('API-Key');

  if (!sharedSecret) {
    return res.status(500).json({ error: 'webhook_not_configured' });
  }

  if (!incomingKey || incomingKey !== sharedSecret) {
    return res.status(401).json({ error: 'invalid-webhook-key' });
  }

  const payload = req.body as PayramWebhookPayload;

  if (!payload?.reference_id || !payload?.status) {
    return res.status(400).json({ error: 'invalid-webhook-payload' });
  }

  try {
    await handlePayramEvent(payload);
    const ack: PayramWebhookAck = { message: 'Webhook received successfully' };
    return res.json(ack);
  } catch (error) {
    console.error('Error handling Payram webhook', error);
    return res.status(500).json({ error: 'webhook_handler_error' });
  }
});

export default router;
`,
  meta: {
    language: 'typescript',
    framework: 'express',
    filenameSuggestion: 'src/routes/payramWebhook.ts',
    description:
      'Express route that validates API-Key header then forwards payload to your domain router.',
  },
  notes: handlerNotes,
});

export const buildNextjsWebhookHandlerSnippet = (): SnippetResponse => ({
  title: 'Next.js App Router handler for Payram webhooks (POST)',
  snippet: `// app/api/payram/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handlePayramEvent } from '@/lib/payram/handlePayramEvent';
import { PayramWebhookPayload, PayramWebhookAck } from '@/lib/payram/webhookTypes';

export async function POST(request: NextRequest) {
  const sharedSecret = process.env.PAYRAM_WEBHOOK_SECRET;
  const incomingKey = request.headers.get('API-Key');

  if (!sharedSecret) {
    return NextResponse.json({ error: 'webhook_not_configured' }, { status: 500 });
  }

  if (!incomingKey || incomingKey !== sharedSecret) {
    return NextResponse.json({ error: 'invalid-webhook-key' }, { status: 401 });
  }

  let payload: PayramWebhookPayload;

  try {
    payload = (await request.json()) as PayramWebhookPayload;
  } catch (error) {
    return NextResponse.json({ error: 'invalid-json-payload' }, { status: 400 });
  }

  if (!payload.reference_id || !payload.status) {
    return NextResponse.json({ error: 'invalid-webhook-payload' }, { status: 400 });
  }

  try {
    await handlePayramEvent(payload);
    const ack: PayramWebhookAck = { message: 'Webhook received successfully' };
    return NextResponse.json(ack);
  } catch (error) {
    console.error('Error handling Payram webhook', error);
    return NextResponse.json({ error: 'webhook_handler_error' }, { status: 500 });
  }
}
`,
  meta: {
    language: 'typescript',
    framework: 'nextjs',
    filenameSuggestion: 'app/api/payram/webhook/route.ts',
    description:
      'Next.js App Router handler that validates the API-Key header before dispatching events.',
  },
  notes: handlerNotes,
});

export const buildFastapiWebhookHandlerSnippet = (): SnippetResponse => ({
  title: 'FastAPI handler for Payram webhooks (POST)',
  snippet: `# app/webhooks/payram.py
import os
from fastapi import FastAPI, HTTPException, Request
from app.services.payram_webhook_router import handle_payram_event

app = FastAPI()

@app.post('/api/payram/webhook')
async def payram_webhook(request: Request):
    shared_secret = os.getenv('PAYRAM_WEBHOOK_SECRET')

    if not shared_secret:
        raise HTTPException(status_code=500, detail='webhook_not_configured')

    incoming_key = request.headers.get('API-Key')

    if not incoming_key or incoming_key != shared_secret:
        raise HTTPException(status_code=401, detail='invalid-webhook-key')

    payload = await request.json()

    if 'reference_id' not in payload or 'status' not in payload:
        raise HTTPException(status_code=400, detail='invalid-webhook-payload')

    await handle_payram_event(payload)

    return {'message': 'Webhook received successfully'}
`,
  meta: {
    language: 'python',
    framework: 'fastapi',
    filenameSuggestion: 'app/webhooks/payram.py',
    description: 'FastAPI route that checks the API-Key header then forwards JSON payloads.',
  },
  notes: handlerNotes,
});

export const buildGinWebhookHandlerSnippet = (): SnippetResponse => ({
  title: 'Gin handler for Payram webhooks (POST)',
  snippet: `package webhooks

import (
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
)

type PayramWebhookPayload struct {
  ReferenceID       string   \`json:"reference_id" binding:"required"\`
  InvoiceID         *string  \`json:"invoice_id"\`
  CustomerID        *string  \`json:"customer_id"\`
  CustomerEmail     *string  \`json:"customer_email"\`
  Status            string   \`json:"status" binding:"required"\`
  Amount            *float64 \`json:"amount"\`
  FilledAmountInUSD *float64 \`json:"filled_amount_in_usd"\`
  Currency          *string  \`json:"currency"\`
  Additional        map[string]any \`json:"-"\`
}

func RegisterPayramRoutes(router *gin.Engine) {
    router.POST("/api/payram/webhook", func(c *gin.Context) {
        sharedSecret := os.Getenv("PAYRAM_WEBHOOK_SECRET")
        if sharedSecret == "" {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "webhook_not_configured"})
            return
        }

        if c.GetHeader("API-Key") != sharedSecret {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid-webhook-key"})
            return
        }

        var payload PayramWebhookPayload
        if err := c.ShouldBindJSON(&payload); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid-json-payload"})
            return
        }

        if err := handlePayramEvent(payload); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "webhook_handler_error"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"message": "Webhook received successfully"})
    })
}
`,
  meta: {
    language: 'go',
    framework: 'gin',
    filenameSuggestion: 'internal/webhooks/payram.go',
    description: 'Gin route that verifies API-Key header before invoking your webhook router.',
  },
  notes: `${handlerNotes} Replace handlePayramEvent with your own domain service that accepts map[string]any payloads.`,
});

export const buildLaravelWebhookHandlerSnippet = (): SnippetResponse => ({
  title: 'Laravel controller for Payram webhooks (POST)',
  snippet: `use App\Http\Controllers\Controller;
use App\Services\PayramWebhookRouter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/api/payram/webhook', [PayramWebhookController::class, 'handle']);

class PayramWebhookController extends Controller
{
  public function __construct(private PayramWebhookRouter $router)
  {
  }

  public function handle(Request $request)
  {
    $sharedSecret = env('PAYRAM_WEBHOOK_SECRET');

    if (!$sharedSecret) {
      return response()->json(['error' => 'webhook_not_configured'], 500);
    }

    if ($request->header('API-Key') !== $sharedSecret) {
      return response()->json(['error' => 'invalid-webhook-key'], 401);
    }

    $payload = $request->json()->all();

    if (empty($payload['reference_id']) || empty($payload['status'])) {
      return response()->json(['error' => 'invalid-webhook-payload'], 400);
    }

    $this->router->handle($payload);

    return response()->json(['message' => 'Webhook received successfully']);
  }
}
`,
  meta: {
    language: 'php',
    framework: 'laravel',
    filenameSuggestion: 'app/Http/Controllers/PayramWebhookController.php',
    description:
      'Laravel controller that validates the API-Key header and forwards payloads to a domain router.',
  },
  notes: `${handlerNotes} Replace PayramWebhookRouter with your own service for dispatching events.`,
});

export const buildSpringBootWebhookHandlerSnippet = (): SnippetResponse => ({
  title: 'Spring Boot controller for Payram webhooks (POST)',
  snippet: `package com.example.webhooks;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payram")
public class PayramWebhookController {

    private final PayramWebhookRouter router;

    public PayramWebhookController(PayramWebhookRouter router) {
        this.router = router;
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(
            @RequestBody Map<String, Object> payload,
            @RequestHeader(value = "API-Key", required = false) String apiKey) {

        String sharedSecret = System.getenv("PAYRAM_WEBHOOK_SECRET");

        if (sharedSecret == null || sharedSecret.isBlank()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "webhook_not_configured"));
        }

        if (apiKey == null || !apiKey.equals(sharedSecret)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "invalid-webhook-key"));
        }

        if (!payload.containsKey("reference_id") || !payload.containsKey("status")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "invalid-webhook-payload"));
        }

        router.handle(payload);

        return ResponseEntity.ok(Map.of("message", "Webhook received successfully"));
    }
}
`,
  meta: {
    language: 'java',
    framework: 'spring-boot',
    filenameSuggestion: 'src/main/java/com/example/webhooks/PayramWebhookController.java',
    description:
      'Spring Boot REST controller that validates the API-Key header and calls your router service.',
  },
  notes: `${handlerNotes} Implement PayramWebhookRouter#handle(Map<String, Object>) to inspect event_type/data per your domain.`,
});
