# Payram Helper MCP Server

An **MCP (Model Context Protocol) server** that teaches GitHub Copilot (and any MCP-aware client) how to integrate with a self-hosted Payram stack. It exposes one-click tools for assessing an existing codebase, scaffolding new starter apps, generating multi-language snippets, reading inline docs, and validating connectivity against your Payram deployment.

---

## Table of Contents
- [Project Goals](#project-goals)
- [Quick Start](#quick-start)
- [Tool Catalog](#tool-catalog)
- [Guided Workflows](#guided-workflows)
- [Docs & Specs](#docs--specs)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## Project Goals
- **Accelerate onboarding** by serving env templates, readiness checklists, and per-framework playbooks.
- **Retrofit existing repos** via the project assessment tool, which scans package manifests and `.env` files, then recommends the right integration snippets.
- **Provide copy/paste snippets** spanning Payments, Payouts, Referrals, Webhooks, and multi-language backends (Express, Next.js, FastAPI, Laravel, Gin, Spring Boot, etc.).
- **Keep docs local** so Copilot can explain Payram concepts, flows, and referral dashboards without leaving the editor.
- **Validate connectivity** through a built-in `/api/v1/payment` probe that enforces the `API-Key` header Payram expects.

---

## Quick Start
1. **Install dependencies**
   ```bash
   yarn install
   ```
2. **Configure environment**
   - Copy `.env.example` to `.env` and fill `PAYRAM_BASE_URL` + `PAYRAM_API_KEY`, or run the MCP tool `generate_env_template` from Copilot to append the template automatically.
3. **Run the server**
   ```bash
   yarn dev
   # exposes HTTP + SSE transports on http://localhost:3333/mcp and /mcp/sse
   ```
4. **Add the MCP server to Copilot / your MCP client**
   - Point the client to `http://localhost:3333/mcp` (or `/mcp/sse` if it supports streaming).
5. **Health check**
   ```bash
   curl http://localhost:3333/healthz
   ```

> **Tip:** When you tell Copilot "test payram" it will automatically run the readiness checklist, ensure `.env` exists, and only then call `test_payram_connection` with your real credentials. The behavior is documented in `COPILOT-USE.md`—no manual prompting required.

---

## Tool Catalog
| Category | Tool | Purpose |
| --- | --- | --- |
| **Connectivity** | `test_payram_connection` | POSTs to `/api/v1/payment` using `API-Key`. Returns status, headers, and helpful errors when `.env` is incomplete. |
| **Setup** | `generate_env_template`, `generate_setup_checklist`, `suggest_file_structure` | Ship env boilerplate, merchant runbooks, and recommended project layouts for Payram modules. |
| **Context / Docs** | `explain_payram_basics`, `explain_payram_concepts`, `explain_payment_flow`, `get_payram_links`, `prepare_payram_test`, `get_payram_doc_by_id`, `list_payram_docs`, etc. | Provide inline Markdown knowledge sourced from `docs/` so Copilot can answer conceptual questions. Some tools append “say `test payram`” reminders automatically. |
| **Integration – Payments** | `generate_payment_sdk_snippet`, `generate_payment_http_snippet`, `generate_payment_status_snippet`, `generate_payment_route_snippet` | Emit SDK, raw HTTP, or Express/Next.js route code for create + status flows. |
| **Integration – Payouts** | `generate_payout_sdk_snippet`, `generate_payout_status_snippet` | Provide payout creation and status helpers (JS SDK). |
| **Integration – Referrals** | `generate_referral_sdk_snippet`, `generate_referral_validation_snippet`, `generate_referral_status_snippet`, `generate_referral_route_snippet` | Cover referral auth, linking, validation, status, and express/next routes. |
| **Integration – Webhooks** | `generate_webhook_handler`, `generate_webhook_event_router`, `generate_mock_webhook_event` | Produce handlers for Express/Next/FastAPI/Gin/Laravel/Spring Boot, fan-out routers, and cURL/Python/Go/PHP/Java webhook testers. |
| **Integration – Multi-language Payments** | `snippet_*_payment_route` family | Prebuilt route handlers for Express, Next.js App Router, FastAPI, Gin, Laravel, and Spring Boot. |
| **Integration – Project Assessment** | `assess_payram_project` | Scans `package.json`, `requirements.txt`, `composer.json`, `go.mod`, `pom.xml`, `.env`, etc. Reports detected frameworks, env status, Payram dependencies, and prioritized next steps with tool suggestions. |
| **Scaffolding** | `scaffold_payram_app` | Generates full starter apps (Express, Next.js, FastAPI, Laravel, Gin, Spring Boot) with payments, payouts, webhooks, and a browser console. |

> Tool registrations live in `src/tools/index.ts`; individual implementations sit in `src/tools/**` with language-specific templates under `templates/` folders.

---

## Guided Workflows
### 1. Assess and Retrofit an Existing Project
1. Ask Copilot: "Can you integrate Payram into this project?"
2. The assistant runs `assess_payram_project`, reviewing dependency manifests and `.env`.
3. Follow the recommended steps (install `payram`, request Express/FastAPI/Spring route snippets, add webhooks, etc.).
4. Use `test_payram_connection` once credentials are real to ensure the backend can reach your self-hosted server.

### 2. Scaffold a Fresh Sample
1. "Create a Payram Express demo" → `scaffold_payram_app` builds an Express project with payments, payouts, webhooks, and a UI console.
2. Drop the generated files into an empty repo or compare against your existing directory for reference wiring.

### 3. Run the "Test Payram" Readiness Flow
1. Say "test payram". The assistant automatically:
   - Calls `prepare_payram_test` to share the readiness checklist.
   - Ensures `.env` exists (creating it if missing) using `generate_env_template`.
   - Waits for real credentials before invoking `test_payram_connection`.
2. Review the structured JSON result to confirm the Payram API is reachable.

### 4. Wire Payments, Payouts, Referrals, and Webhooks
- Payments: `generate_payment_sdk_snippet` (JS SDK) or `generate_payment_http_snippet` (Python/Go/PHP/Java).
- Multi-language routes: `snippet_nextjs_payment_route`, `snippet_fastapi_payment_route`, etc.
- Payouts: `generate_payout_sdk_snippet` for create + `generate_payout_status_snippet` for polling.
- Referrals: `generate_referral_route_snippet`, `generate_referral_validation_snippet`.
- Webhooks: `generate_webhook_handler` plus `generate_webhook_event_router` for fan-out + `generate_mock_webhook_event` to test each status.

---

## Docs & Specs
- Local references live under `docs/`:
  - `docs/js-sdk.md` – expanded guide for the TypeScript SDK.
  - `docs/payram-external.yaml`, `docs/payram-webhook.yaml` – OpenAPI specs.
  - `docs/referrals.md` – referral FAQs and workflows.
- MCP doc tools (`get_payram_doc_by_id`, `list_payram_docs`) read files from `docs/payram-docs/**` via `src/utils/markdownLoader.ts`.
- For future updates, mirror the upstream docs tree in `docs/payram-docs` so the server’s responses stay in sync.

---

## Development
| Command | Description |
| --- | --- |
| `yarn dev` | Run the MCP server with hot reload via `tsx`. |
| `yarn build` | Compile TypeScript to `dist/`. |
| `yarn lint` / `yarn format` | ESLint + Prettier across the repo. |
| `yarn test` | Executes the Vitest suite (`tests/health.test.ts`). |
| `make precommit-test` | Runs format → lint → test → build sequentially. |

Project is TypeScript-first (ESM). Prettier config lives in `.prettierrc.json`; ESLint is configured via `eslint.config.mjs`. Smooth contributions follow the commit helper in `Makefile` → `make commit`.

---

## Troubleshooting
- **Copilot doesn’t call the right tool:** Check `COPILOT-USE.md` and ensure your MCP client loaded the server. Re-run "test payram" or "assess my project" to trigger the expected automation.
- **`test_payram_connection` fails with 401:** Confirm `.env` uses the `API-Key` header, not `Authorization`. The tool echoes the missing fields when placeholders are detected.
- **Docs tool says a file is missing:** Verify your local `docs/payram-docs/` tree contains the requested markdown (`get_payram_doc_by_id` rejects paths with `..`).
- **Server won’t start:** Check `.env` for `PAYRAM_BASE_URL`/`PAYRAM_API_KEY`, ensure Node 18+, and run `yarn install` to grab the MCP SDK.

For anything else, inspect the structured logs emitted from `src/utils/logger.ts` (set `LOG_LEVEL=debug`) and open an issue/PR with reproduction details.
