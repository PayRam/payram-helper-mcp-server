For the complete documentation index, see [llms.txt](https://docs.payram.com/llms.txt). This page is also available as [Markdown](https://docs.payram.com/support/change-log.md).

Copy

On this page

1.  [SUPPORT](/support)

# 📅Change Log

These release notes document changes and updates to the API and functionalities. Ensure you are using the latest Docker file for optimal performance.

* * *

### For the latest PayRam Releases, you can also refer to [https://www.payram.com/releases](https://www.payram.com/releases)[](#for-the-latest-payram-releases-you-can-also-refer-to-https-www.payram.com-releases)

* * *

## PayRam — What's New[](#payram-whats-new)

> **45 Releases** | **454 Changes Shipped**

* * *

### June 19, 2026[](#june-19-2026)

#### PayRam Frontend `v1.2.0`[](#payram-frontend-v1.2.0)

**UI**

-   Renamed the Payments "Cards" tab to "PayRam Wallet" for clearer navigation
    

**Fixed**

-   Checkout polish: removed stray horizontal and vertical scrollbars, and the payment-options list no longer flickers while it loads
    

* * *

### June 18, 2026[](#june-18-2026)

#### PayRam Core `v3.1.4`[](#payram-core-v3.1.4)

**Added**

-   Set payout rules per project: minimum amounts, approval policies, and auto-approval now apply per project, including payouts you create from the dashboard
    
-   Per-project sweep settings let each project consolidate balances its own way, and deposit addresses now deploy automatically the moment funds arrive
    
-   API keys are now encrypted at rest and matched by a secure hash, a stronger lock on your gateway credentials
    

**Changed**

-   Creating a payout is now near-instant: notifications send in the background instead of holding up the response by about ten seconds
    

**Fixed**

-   Stuck EVM withdrawals recover automatically, and payout errors now come back clear and specific instead of a generic failure
    
-   Shared deposit wallets can deploy through any of a project's mapped hot wallets, so setup keeps working in mixed configurations
    

#### PayRam Frontend `v1.1.3`[](#payram-frontend-v1.1.3)

**Added**

-   New per-project controls in the dashboard: a Payout Limits tab and a Sweep Settings tab with inline editing, tune the rules for each project without leaving the page
    

**Changed**

-   Creating payouts is smoother: a loading state on the Create Payout button, inline error messages, and the list refreshes automatically after you create or approve one
    

**UI**

-   Checkout payment options are reordered for faster selection, with a clearer label for local payment methods
    

**Fixed**

-   Reliability polish: accessibility labels, fewer stale-data flickers, and BTC correctly hidden from project sweep settings
    

#### PayRam Wallet Backend `v1.0.3`[](#payram-wallet-backend-v1.0.3)

**Changed**

-   Card on-ramps now pick the best provider per country, with improved coverage and routing for the US, Canada, and Mexico
    

* * *

### June 12, 2026[](#june-12-2026)

#### PayRam Core `v3.1.2`[](#payram-core-v3.1.2)

**Added**

-   PayRam now accepts PYUSD (PayPal's USD stablecoin) on Ethereum, joining USDT and USDC. New and existing installs pick it up automatically on upgrade, no migration needed
    
-   Merchant webhooks are now signed with HMAC-SHA256, so your store can cryptographically verify every payment notification really came from your gateway. Powers the new WooCommerce plugin and any custom integration
    
-   Payment webhooks now carry the full on-chain deposit details: paying address, transaction hash, deposit address, and block number, so you can reconcile and display payments without a second lookup
    

**Changed**

-   Operators get safer economics: project-to-wallet mappings are now gated on operator-fee compatibility, and incompatible wallets are flagged before they cause a problem
    
-   The checkout now surfaces a merchant's most-used and recently-used coins as a quick-pay shortlist, so repeat customers reach their preferred token faster
    

**Fixed**

-   Merchant payout reads are restored for project API keys, and project names can now contain colons
    

#### PayRam Frontend `v1.1.1`[](#payram-frontend-v1.1.1)

**Added**

-   PYUSD shows up everywhere it should: its own icon at checkout and full visibility in the dashboard graphs alongside your other currencies
    
-   Card payments are easier to set up: a clear banner and nav nudge now guide you when card is switched on but the wallet it needs isn't ready yet
    
-   Checkout return links now carry the payment reference and invoice id back to your store, so post-payment redirects land on the right order every time
    

**Changed**

-   When picking a wallet for a project, incompatible options are now clearly flagged instead of failing silently later
    

**UI**

-   The customer payment screen has been rebuilt from the ground up: a calmer, clearer checkout with a connected list of payment options, adaptive coin logos, refined bottom-sheets, and a sharper typographic hierarchy
    

**Fixed**

-   Steadier live payment status on the checkout screen, with clearer connection diagnostics when a network blip happens
    
-   The deposit-wallet family dropdown no longer gets clipped inside scrollable tables, and the sweep queue now shows a friendly all-caught-up state when there's nothing to do
    

#### PayRam MCP Server `v1.2.0`[](#payram-mcp-server-v1.2.0)

**Added**

-   New self-healing tools: AI agents can now run a staged health check on your PayRam node, get a plain-language verdict, and restart a stuck worker, turning "something's wrong" into "here's what to do" automatically
    
-   A guided diagnosis assistant walks an agent (or you) through pinpointing setup and connection issues, with actionable hints surfaced directly from the API
    

**Changed**

-   A single front-door guide for AI agents makes PayRam discoverable and integrable in one read, with the live tool reference kept in lockstep with the latest Core API
    

* * *

### June 4, 2026[](#june-4-2026)

#### PayRam Core `v3.0.5`[](#payram-core-v3.0.5)

**Changed**

-   PayRam now serves its API from the same origin as your dashboard, with the web-server config bundled in — a simpler, more reliable setup behind reverse proxies and custom domains. Existing HTTPS deployments on port 8443 keep working via backward compatibility
    
-   The connection setting is now a clearer "Site URL," and changes are restricted to the root operator while admins retain view access
    

**Fixed**

-   Tron now handles larger blocks reliably by allowing bigger node responses
    

#### PayRam Frontend `v1.0.4`[](#payram-frontend-v1.0.4)

**UI**

-   Renamed "Backend URL" to "Site URL" and redesigned the setting with an HTTPS toggle — view-only for admins, editable only by the root operator
    

**Fixed**

-   Payment pages now always resolve to the correct same-origin address, eliminating malformed payment links
    

* * *

### June 3, 2026[](#june-3-2026)

#### PayRam Core `v3.0.3`[](#payram-core-v3.0.3)

**Added**

-   Bitcoin can now connect to remote and public HTTPS RPC nodes, so you can point your deployment at a managed node provider instead of running your own. Connection handling is hardened against IPv6 addresses, partial credentials, and malformed URLs
    
-   Setup progress is now tracked on the server, so the onboarding wizard survives reloads and device switches, can be dismissed, and adapts to your role
    

**Changed**

-   PayRam now waives its protocol fee on Bitcoin in production — 0% on BTC payments
    
-   Bitcoin node selection now prefers healthy public nodes and automatically drops unreachable private ones, with a free public testnet node seeded out of the box
    

**Fixed**

-   Deployment reliability: the web server now starts cleanly even when its logs are mounted to a separate volume
    

#### PayRam Frontend `v1.0.3`[](#payram-frontend-v1.0.3)

**Added**

-   Customers can now pay with a card at checkout, and every deposit method is organized into clean, consistent bottom-sheets
    
-   The merchant setup wizard is now resumable — pick up exactly where you left off on any device — with a redesigned, clearer role-selection step
    

**UI**

-   Redesigned customer payment page: clearer deposit options, a preferred-currency setting, and the merchant's store logo with an auto-generated fallback when none is set
    

**Fixed**

-   Public payment links now resolve the correct merchant backend reliably, instead of occasionally falling back to the setup screen
    
-   The operator fund-collector view now correctly displays the Bitcoin collector wallet
    

* * *

### May 27, 2026[](#may-27-2026)

#### PayRam Core `v3.0.0`[](#payram-core-v3.0.0)

**Added**

-   Operator Mode — run a payment gateway for other merchants without ever taking custody of their funds. Set a markup fee per chain (with per-project overrides) paid out to your own collector address automatically, on-chain, every time a merchant's funds are swept
    
-   On-chain fee engine: in a single sweep transaction, merchant funds, network fees, and the operator's markup are split and routed separately. The operator's cut is settled directly on-chain at sweep time
    
-   Operator fees work end-to-end across Bitcoin, Ethereum, Base, and Polygon, including BTC sweeps that settle the fee through a dedicated sweep contract
    
-   Fee collectors with encrypted master wallets, per-chain defaults, and per-project overrides
    
-   Operator analytics dashboard endpoint — live earnings and per-project performance served from a single call, with websocket push on every fee settlement
    
-   Setup Mode: every install now identifies as either Operator or Merchant. Existing deployments are auto-migrated to Merchant mode on upgrade
    
-   Deposit-wallet inspector with per-family metrics and per-address sweep error reporting
    
-   Smart-contract deposit-wallet flow with an explicit project picker and on-chain validation; deterministic contract addresses across Ethereum, Base, and Polygon via a CreateX factory deployment
    

**Changed**

-   Explicit project-to-deposit-wallet assignment replaces the old "default wallet" concept — every deposit wallet is now scoped to a specific project
    
-   EVM-family deposit wallets are reused across chains — one address family now serves Ethereum, Base, and Polygon instead of a separate wallet per chain
    
-   Faster cross-chain deposit detection via a universal calldata address scanner, plus an upgrade to Go 1.26.3 with all dependencies refreshed
    

**Fixed**

-   Native-deposit addresses stored with inconsistent letter casing no longer break the deposit pipeline — fixes deposits that could get stuck at pending
    
-   The accounting worker is now panic-proof: nil-guards keep the goroutines alive through unexpected data instead of silently dying, and zero-amount sweep legs no longer create noise rows
    

#### PayRam Frontend `v1.0.0`[](#payram-frontend-v1.0.0)

**Added**

-   Operator onboarding wizard — pick your role, name your gateway, set per-chain markup fees, assign team members, and land on your operator dashboard in a few guided steps
    
-   Operator dashboard and Analytics wired to live data with websocket hot-refresh — earnings and project activity update in place, no manual reload
    
-   On-chain fee and collector edit dialog — change your markup percentage or payout address and have it written to the contract directly, with clear pending-state feedback while the transaction confirms
    
-   Fee management surfaces: per-blockchain defaults, per-project overrides, and bulk "set fee collector" actions, all driven from URL-addressable tabs
    
-   Deposit-wallet inspector — copy-on-click addresses, explorer links, a collapsible metrics band, and operator fee rows surfaced in sweep history
    

**Changed**

-   ETH is now available on PayRam Wallet for Base merchants
    

**UI**

-   Three-tone sweep error banners that clearly distinguish recoverable, queued, and infrastructure issues — plus a mobile usability pass across all operator and sweep screens
    

**Fixed**

-   Tron WalletConnect popup no longer fires unexpectedly when a deposit wallet loads
    

#### PayRam Smart Contracts — FundSweeper V2[](#payram-smart-contracts-fundsweeper-v2)

**Added**

-   FundSweeper V2 introduces a second fee tier that pays the operator's markup directly to their collector address at sweep time — in the same transaction that moves merchant funds
    
-   A new factory contract deploys sweepers with the operator fee baked in (fee percentage and collector address) through a single initializer, so no per-merchant redeployment is needed
    
-   EIP-7702 account attachment is used for the global fee collector and sweepers, giving deterministic contract addresses across chains
    
-   Verified on Sepolia and covered by a 42-test suite exercising the full operator-fee lifecycle
    

#### PayRam Wallet Backend `v1.0.2`[](#payram-wallet-backend-v1.0.2)

**Added**

-   ETH transfers are now supported on Base
    

**Changed**

-   Payment amount math preserves full wei precision end-to-end, eliminating rounding drift on transfers
    
-   The card onramp widget now supports per-flow selectable cryptocurrencies, and notification emails gained normalization plus one-click unsubscribe
    

#### PayRam Wallet (Web) `v1.0.0`[](#payram-wallet-web-v1.0.0)

**Added**

-   ETH transfer support on Base
    

**Changed**

-   Transfer totals are now consistent across the send, confirm, success, and history screens
    
-   "Max" send uses wei-precise math to avoid transaction simulation reverts, and ETH quotes apply a slippage haircut at fetch time for more accurate amounts
    

**Fixed**

-   The card onramp no longer loops back to the start on a zero-balance checkout
    

#### PayRam MCP Server `v1.1.0`[](#payram-mcp-server-v1.1.0)

**Added**

-   New live-data and operations tools, plus a streamlined 3-step payout flow for AI agents settling funds
    

**Changed**

-   Agent-first documentation and a cleaner discovery surface, with templates and specs realigned to the latest PayRam Core API
    

* * *

### May 3, 2026[](#may-3-2026)

#### PayRam Core `v2.0.5`[](#payram-core-v2.0.5)

**Fixed**

-   Withdrawal lookup for individual merchants is working again — a routing regression introduced during Operator Mode scoping has been corrected
    

#### PayRam Frontend `v0.5.6`[](#payram-frontend-v0.5.6)

**Fixed**

-   Payout history now reloads correctly when you change the date filter, and no longer jumps back to the first tab when results update
    

* * *

### May 2, 2026[](#may-2-2026)

#### PayRam Core `v2.0.4`[](#payram-core-v2.0.4)

**Fixed**

-   Sweep history and filters now show the correct transactions — a misclassification that was mixing non-sweep actions into sweep results has been corrected
    

#### PayRam Frontend `v0.5.5`[](#payram-frontend-v0.5.5)

**Fixed**

-   The Funds dashboard no longer shows a spurious "hot wallet missing" warning on wallets that are correctly configured
    

* * *

### April 30, 2026[](#april-30-2026)

#### PayRam Core `v2.0.3`[](#payram-core-v2.0.3)

**Added**

-   Sweep routing now uses a refined 4-action classification with estimated completion times calculated in the database — every balance row gets a more precise status and an accurate ETA
    

**Fixed**

-   Concurrent sweeps on the same wallet and chain are now serialized — nonce collisions that caused transactions to fail silently are prevented
    
-   Eligible wallet addresses are deduplicated and balances re-verified on-chain before each sweep runs — prevents duplicate sweeps and protects against stale balance data
    
-   Wallets with a negative balance are now correctly routed to Below Threshold instead of appearing in sweep queues unexpectedly
    
-   Deposit detection now has a three-layer fallback before concluding a transaction doesn't exist — prevents deposits from being incorrectly dropped when a node is lagging
    
-   Edge-case collection events that previously slipped through reconciliation are now caught, keeping all wallets in sync after unusual funding events
    

#### PayRam Frontend `v0.5.4`[](#payram-frontend-v0.5.4)

**Added**

-   The Funds tab now refreshes automatically every 15 seconds — balances, sweep statuses, and ETAs stay current without a manual reload
    
-   Every balance row now shows a precise status and an estimated time to sweep, powered by the new 4-action classification from the backend
    

* * *

### April 29, 2026[](#april-29-2026)

#### PayRam Core `v2.0.2`[](#payram-core-v2.0.2)

**Fixed**

-   Sweep reconciler now fires immediately when block processing detects a funding-shortfall signal — recoveries start without waiting for the next scheduled cycle
    
-   Reconciler handles temporary node errors without aborting mid-run and caps its lookback window to 10 days for faster incremental scans
    
-   Removed an accidental minimum-balance filter that was silently preventing eligible wallets from being swept
    
-   First-ever sweep on a new project no longer gets stuck — the eligibility check that blocked it is fixed and sweep timestamps are now tracked per project
    

#### PayRam Frontend `v0.5.3`[](#payram-frontend-v0.5.3)

**Fixed**

-   Transaction History wallet filter now stays in sync with the Funds section — switching wallets in one updates the other
    
-   Wallet filter options on sweep pages now load from the backend, so the available wallets match what you actually have configured
    

* * *

### April 28, 2026[](#april-28-2026)

#### PayRam Core `v2.0.1`[](#payram-core-v2.0.1)

**Added**

-   Sweep observability overhaul — every queued, in-flight, and failed sweep now surfaces a real reason, a real retry time, and the broadcast transaction hash — operators always know exactly why a sweep is waiting and what unblocks it
    
-   Manual sweep trigger endpoint — operators can force-sweep an eligible balance on demand instead of waiting for the next cycle
    
-   Sweep reconciler automatically backfills missed sweeps when an InsufficientBalance signal fires, and recovers orphaned pending deployments at the start of every deployment phase — no more sweeps stuck in limbo after a transient failure
    
-   BTC sweeps are now fully project-scoped — sweep transactions, balance queries, and confirmation flows all respect tenant boundaries on Operator Mode deployments
    
-   Funds consolidation metrics endpoint with a simplified action model — the dashboard can render the entire sweep pipeline from one call
    
-   `GET /sweeps` gains filters for network, currency, wallet, and type
    

**Changed**

-   Smart contract wallet deployment now emits a typed network-failure event when the broadcast can't reach a node — the dashboard reacts instead of silently retrying
    

**Fixed**

-   Sweep eligibility rules now match exactly between the balance API, the sweep engine, and the dashboard's Eligible-For-Sweep tile — totals add up cleanly, no more confusing off-by-one discrepancies
    
-   Deposit-wallet hot-wallet lookups are now scoped by wallet type, preventing cold and hot wallet records from leaking across each other in multi-wallet projects
    
-   Manual-sweep and in-progress rows are correctly counted in the Eligible-For-Sweep tile, and zero-row queries now return an empty array instead of null
    

#### PayRam Frontend `v0.5.2`[](#payram-frontend-v0.5.2)

**Added**

-   New card-based Transaction History — mobile-friendly, with sweep / fee / collect legs visually distinguished, a transfer-only default toggle, and per-asset filters
    
-   Manual sweep-trigger button on queued asset cards, with a custom confirmation dialog — operators can force a sweep on demand without leaving the dashboard
    
-   "Activate hot wallet" and "Fund hot wallet" CTAs on the relevant blocker rows — every error tells you what to fix, not just that something is wrong
    
-   Connect-app CTA on rows that require a manual sweep, plus a wallet-inactive section and default-cold-wallet blocker for clear remediation paths
    
-   WalletConnect project ID now sourced per-merchant from the backend — merchants configure once and the right session opens on every checkout
    

**UI**

-   Funds consolidation page redesigned with a sectioned layout, metrics band, filters, anchors, and an in-progress card — every sweep stage is one click away
    
-   Deposit page redesigned for merchant checkouts: accordion payment methods, official provider icons, smart network switching, inline fiat rates, and a two-audience flow that splits crypto and card cleanly
    
-   Prominent next-sweep badge with a focused pulse only when a sweep is within the hour, queued cards collapsed by default, and breathing room added between tabs and content
    
-   Mobile-responsive asset cards across every Funds section, plus dozens of polish items on dropdowns, pagination, asset names, and avatar stacks
    

**Fixed**

-   Explorer URLs are now read from the blockchains config instead of being hardcoded to testnet bases — links resolve correctly on mainnet deployments
    
-   Sweep triggers now use the row's own project ID instead of the URL param, so cross-project triggers from a shared view always hit the right project
    
-   Native-coin sends now route past the zero-address sentinel correctly, and the coin/network dropdown pushes content instead of overlaying the row
    
-   Funds-band chips show real $0 instead of a dash placeholder, and inactive manual-sweep rows are routed to the blocker view rather than the wallet-inactive section
    

* * *

### April 20, 2026[](#april-20-2026)

#### PayRam Core `v2.0.0`[](#payram-core-v2.0.0)

**Added**

-   Introducing Operator Mode — a ground-up rearchitecture that lets one PayRam instance serve many merchants in complete isolation. [Read the Operator playbook](https://www.payram.com/operator)
    
-   Project-scoped access control across the entire API: members, wallets, withdrawals, sweeps, balances, recipients, webhooks, and API keys all belong to projects — a user only sees what they're assigned to
    
-   Single role per member with a clear role ladder — `project_admin`, `project_lead`, `project_manager`, `project_ops` — each with a curated set of read/write rights scoped to their project
    
-   New `GET /project-permissions` bulk endpoint so dashboards can filter pages, tabs, and actions against what the signed-in user is actually allowed to do — without per-action round-trips
    
-   Recipients now require an explicit project assignment on creation — the address book stays cleanly partitioned between tenants from day one
    
-   Withdrawal approvals, referral payouts, cold-wallet edits, and address-pool reads are all gated by per-project role — operators can delegate safely without handing out the keys
    

**Changed**

-   Webhook permissions split cleanly from project-settings permissions — API-only teammates can ship integrations without touching the rest of the dashboard
    
-   Smart contract wallets are automatically promoted to the project default on confirmation when no default exists — no manual re-tagging after first deploy
    
-   Wallet APIs gain an optional `?include=` filter so clients fetch only what they need; Member and ExternalPlatform preloads are slimmed to essentials
    
-   Docker build is significantly faster with a prebuilt runtime base, build cache mounts, and a proper `.dockerignore` — first-byte deploys in seconds rather than minutes
    

**Fixed**

-   Reverse-proxy trust now covers RFC 1918 private ranges — self-hosted deployments behind nginx or a VPC load balancer no longer see spoofable Host headers
    
-   Admin approval of referral payouts can no longer bypass OTP and accounting entries — every approval path now runs the same verification
    

#### PayRam Frontend `v0.5.1`[](#payram-frontend-v0.5.1)

**Added**

-   Operator-mode dashboard: sidebar, tabs, and every write action gated by per-project permissions — the UI shows exactly what the signed-in user can do, nothing more, nothing less
    
-   Rich role picker when inviting users — pick by persona (admin / lead / manager / ops), preview the access scope, review the permission chips before sending the invite
    
-   Wallet management, deposit wallets, payouts, address book, and withdrawal screens all filter by project-write permission so collaborators see only what they own
    
-   Recipient creation collects the project assignment up-front, keeping the ledger clean across multi-tenant deployments
    

**UI**

-   Inline project picker built into the breadcrumb — switch tenants without leaving the page you're on
    
-   Create Payment Link promoted to a top-level sidebar CTA above the project selector — the fastest path from login to a fresh payment URL
    
-   Single-role invitation UI with a role badge in the sidebar — the person's role is visible everywhere they appear
    
-   Project-name validation, dropdown polish, breadcrumb icons, mobile user-management layout — dozens of small quality-of-life improvements across the dashboard
    

**Fixed**

-   Stablecoin QR codes no longer encode extra trailing zeros — scanning wallets pre-fill the correct amount on the first try
    
-   Payouts list refreshes immediately after a new one is created and resets to the first page so the fresh entry is always visible
    

#### PayRam Wallet Backend `v1.2.2`[](#payram-wallet-backend-v1.2.2)

**Added**

-   Multi-app Universal Links and Android assetlinks — the web wallet, v1 mobile, and v2 mobile now deep-link into the correct app from a single signed link
    
-   Web Credential App IDs configuration for passkey flows that span related apps — no re-enrolment when moving between wallet surfaces
    

#### PayRam Wallet (Web) `v0.4.0`[](#payram-wallet-web-v0.4.0)

**Added**

-   New `/links/send` route converts EIP-681 `ethereum_uri` deep links into a pre-filled transfer — tap a link anywhere, land on the right send screen with the amount and recipient filled in
    

**UI**

-   Home redesigned with an asset list and correct USD balance labelling — the first thing you see is an accurate picture of what you hold
    
-   Floating action bar and a unified scroll architecture across every screen — consistent body-scroll behaviour across iOS and Android, no more inner scroll-well quirks
    
-   Delete-transfer confirm, pending-CTA polish, and a portal-based Modal primitive so dialogs always render above everything else
    

**Fixed**

-   Add-funds hero no longer goes blank during fiat received / initiated / cancelled states — every transition shows meaningful copy
    
-   Transfer signing guards against zero-amount payloads so wallets never sign an empty operation
    

#### PayRam Wallet (Mobile) `v2.5.0`[](#payram-wallet-mobile-v2.5.0)

**Added**

-   Production-ready: mainnet credentials, real EIP-7702 signing, and the new floating tab bar — the path from development to the App Store is one command
    
-   Apple Sign-In end-to-end, plus a passkey unenrolment fix and delete-transfer support
    
-   Universal deep links: `payram.com/links/send` opens the mobile wallet's transfer flow pre-populated from any shared link
    

**Changed**

-   GA4 analytics via the Measurement Protocol directly — no Firebase SDK dependency, smaller app bundle, cleaner App Privacy declarations
    

**UI**

-   Camera permission for the QR scanner now recovers gracefully — if the user denies access, a single tap jumps to iOS or Android Settings
    
-   Redesigned splash screen: full-bleed green app-shell from cold launch all the way to home — no white flash, no layout jump
    

**Fixed**

-   Strict App Transport Security in production builds, and the insecure RNG fallback has been removed entirely
    
-   Android package split: `com.payram` for production, `com.payram.dev` for development — the two builds coexist on the same device
    

#### PayRam MCP Server `v1.3.0`[](#payram-mcp-server-v1.3.0)

**Added**

-   Agent discoverability shipped end-to-end: `robots.txt` with AI-crawler rules, `sitemap.xml`, Link response headers (RFC 8288), and a SEP-1649 server card so MCP-capable clients find PayRam automatically
    
-   Agent skills catalog — 16 standalone skills agents can fetch, cache, and cite, covering setup, authentication, analytics, payments, payouts, webhooks, widget integration, OpenClaw, and a full comparison to other gateways
    
-   New OpenClaw integration skill: the functional how-to for registering `mcp.payram.com` in OpenClaw, Claude Desktop, Cursor, Copilot, or n8n — with a testnet walkthrough and debugging checklist
    
-   New widget integration skill: full script-tag embed reference plus webhook signature verification and idempotency patterns in Express, Next.js, FastAPI, Laravel, and Gin
    
-   Markdown content negotiation on the landing page — agents that request `Accept: text/markdown` get a purpose-built summary; browsers keep seeing the full HTML
    

**Fixed**

-   Server-spec copy corrected across skills and docs — the minimum is 2 CPU / 6 GB RAM / 15 GB+ disk, dropping inflated values that had drifted over time
    

* * *

### April 10, 2026[](#april-10-2026)

#### **PayRam Core** `**v1.9.7**`[](#payram-core-v1.9.7)

**Added**

-   Smart contract wallets (EIP-7702 / EIP-4337) can now be used to update cold wallets
    

**Fixed**

-   Batch address identification restored for TRX — addresses are detected reliably again
    
-   Default wallet handling now correctly scoped to the specific blockchain instead of clearing globally
    

#### **PayRam Frontend** `**v0.4.5**`[](#payram-frontend-v0.4.5)

**Changed**

-   Update Manager is back — now includes an installation and troubleshooting guide
    
-   Wallet management now validates connections before showing wallets as ready
    

**Fixed**

-   BTC deposit wallets no longer require a hot wallet to be considered setup-ready
    

* * *

### April 7, 2026[](#april-7-2026)

#### **PayRam Core** `**v1.9.5**`[](#payram-core-v1.9.5)

**Added**

-   Per-project access control: members, wallets, withdrawals, sweeps, balances, and recipients are now scoped to projects so users only see what they own
    
-   New `project_admin` role with the same permissions as project lead — can assign and revoke roles
    
-   Hot wallets are now bound to projects with first-class project management and ownership rules
    
-   Unified withdrawal endpoint with pagination — single API for all withdrawal listings
    
-   Recipients API now supports pagination
    
-   Webhook delivery logs persisted with backfill — full audit trail of every webhook attempt
    

**UI**

-   Cleaner `All Time` / `forever` option labels in date filters
    

**Fixed**

-   Smart contract wallets can now deploy through wrapper contracts (Safe, account abstraction, EIP-7702)
    
-   Activity log entries scoped by user access — internal members and customers no longer leak across projects
    
-   Nginx SSL termination now supported without requiring an SSL cert path on the PayRam container
    
-   Reverse proxy headers (`X-Forwarded-Host`, `X-Forwarded-*`) are only trusted from known proxy IPs to prevent host header injection
    
-   Analytics count queries now respect the active date filter
    

#### **PayRam Frontend** `**v0.4.4**`[](#payram-frontend-v0.4.4)

**Added**

-   User management, payouts, address book, withdrawals, and wallets all now scoped per project — switch projects to filter what you see
    
-   Payouts table shows the project column and payout creation requires picking a project
    
-   Server-side pagination on payouts, address book, and withdrawal lists — handles large datasets without lag
    

**Changed**

-   MFA and password management consolidated into a single Account Security settings page
    
-   Update Manager temporarily marked as `Coming Soon` while we polish it
    

**UI**

-   Hot wallet page redesigned with project management and a first-time onboarding flow
    
-   Wallet detail page redesigned with a new assets section
    
-   Payments page redesigned with a two-column checkout layout
    

**Fixed**

-   Funds tab now shows an empty state instead of a blank screen when there's no data
    
-   Dropdowns now render via portal so they're never clipped by parent containers
    
-   Old-password error message and visibility toggle fixed in the Change Password dialog
    
-   Sweep history no longer logs spurious errors when requests are cancelled mid-flight
    

#### PayRam Payments App `**v1.2.1**`[](#payram-payments-app-v1.2.1)

**Added**

-   Checkout now pre-fills the buyer's local currency based on geolocation
    

**Changed**

-   Card onramp purchases now enforce a $12 minimum to comply with provider rules
    

**Fixed**

-   Fixed nil-pointer crashes when updating transaction hashes for payments without a sender op hash
    
-   Authentication tokens no longer incorrectly appear expired due to a token-parsing bug
    
-   EIP-7702 delegation user operations are correctly skipped during sponsorship parsing
    
-   Token balance locks and unlocks guarded against zero-value sponsorship operations
    
-   Geolocation database now bundled with the Docker image so country detection works out of the box
    

#### PayRam MCP Server `**v1.2.1**`[](#payram-mcp-server-v1.2.1)

**Fixed**

-   Switched to a per-request MCP connection pattern to eliminate a memory leak on serverless deployments
    

* * *

### April 1, 2026[](#april-1-2026)

#### **PayRam Core** `**v1.9.4**`[](#payram-core-v1.9.4)

**Added**

-   Clearer error codes when the blockchain needs a moment to catch up (409 with retry guidance)
    

**Fixed**

-   Deposit wallet deployment now auto-retries when the network is briefly out of sync
    

#### **PayRam Frontend** `**v0.4.3**`[](#payram-frontend-v0.4.3)

**UI**

-   Better error messages during wallet registration — explains what's happening and what to do
    

**Fixed**

-   Wallet setup shows progress spinner, countdown timer, and retry button instead of failing silently
    
-   Payment links now work correctly — fixed broken wallet URLs
    

#### **PayRam Business App** `**v1.0.0**`[](#payram-business-app-v1.0.0)

**Added**

-   PayRam Business merchant app now available on [Google Play](https://play.google.com/store/apps/details?id=com.payram.business&hl=en_US) and the [App Store](https://apps.apple.com/us/app/payram-business-merchant-app/id6759707719)
    

* * *

### March 25, 2026[](#march-25-2026)

#### PayRam Core `v1.9.3`[](#payram-core-v1.9.3)

**Fixed**

-   BTC transaction receipt now surfaces real errors (timeout, auth failure, rate limit) instead of silently marking transactions as not found
    
-   Deposit verification correctly distinguishes missing transactions from transient RPC failures — nil receipts are retried on next cycle
    
-   Removed exponential retry backoff from confirming sweeps — now processed every cycle without age-based delays
    
-   Refresh token endpoint returns correct HTTP status codes (401 for invalid JWT, 404 for deleted members) instead of generic 500
    
-   Database errors in token refresh no longer collapse into incorrect 404 — real DB failures propagate as 500
    

#### PayRam Frontend `v0.4.2`[](#payram-frontend-v0.4.2)

**Added**

-   System Updater page with version management, upgrade planning, and real-time upgrade monitoring
    
-   Debug panel wallet URL override for testing payments page against custom backends
    

**Fixed**

-   Remove authenticated config call from public payments page and add checkout suffix to wallet URLs
    
-   Improve error handling and type safety in updater API functions
    
-   Normalize upgrade failure state check and fix import paths in updater module
    

#### PayRam MCP Server `v1.2.0`[](#payram-mcp-server-v1.2.0-1)

**Fixed**

-   Auto-discover platform ID so agents no longer need to ask for it during setup
    

* * *

### March 21, 2026[](#march-21-2026)

#### PayRam MCP Server `v1.2.0`[](#payram-mcp-server-v1.2.0-2)

**Added**

-   MCP server discovery tool for agents to find and connect to PayRam instances
    
-   Authentication skill for secure agent access to PayRam APIs
    
-   Authenticated data-fetching MCP tools for merchant dashboards
    

**Changed**

-   Rewritten analytics skill with direct API access for real-time data
    

* * *

### March 20, 2026[](#march-20-2026)

#### PayRam Core `v1.9.2`[](#payram-core-v1.9.2)

**Added**

-   Batch BTC DB queries — reduces ~22,000 queries per block down to 2 using two-pass batch pattern for UTXO and sweep detection
    

**Changed**

-   RPC pool composite node identity uses URL + credential hash as key — fixes credential loss for same-URL nodes with different API keys
    
-   Existing RPC nodes re-hashed via migration for consistency with new hashing scheme
    
-   Processor shutdown changed to graceful termination via context cancellation
    

**Fixed**

-   BTC UTXO batch fallback — on DB error, falls back to per-item lookup instead of dropping sweep detections
    
-   `Stop()` now unblocks correctly by listening on both context and stop channel
    
-   BTC unauthenticated RPC nodes filtered out for remote connections
    
-   Empty batch returns consistent empty slice instead of nil for JSON safety
    

* * *

### March 19, 2026[](#march-19-2026)

#### PayRam Frontend `v0.4.1`[](#payram-frontend-v0.4.1)

**Fixed**

-   Remove authenticated config API call from public payments page to prevent auth errors
    
-   Use plain axios (unauthenticated) for `reportMissedDeposit` on public payments page
    

#### PayRam Frontend `v0.4.0`[](#payram-frontend-v0.4.0)

**Added**

-   Default configuration integration for dynamic backend and wallet URLs
    
-   Unified page headers with `PageHeader` component across all screens
    
-   Sidebar logo now clickable to navigate home
    
-   RPC pool frontend alignment with updated backend API changes
    

**UI**

-   Fixed alert bar transparency in page headers
    
-   UI polish for payment links, chart legends, alert bar, and sponsorship copy
    
-   Addressed loading flash, overflow, and accessibility issues in RPC pool
    

**Fixed**

-   Guard against null analytics cells crashing dashboard on login
    
-   Fix `defaultValue` sync issue in RPC pool settings
    
-   Update `PAYMENTS_APP_CONFIG` with new backend and web wallet URLs
    

#### PayRam Core `v1.9.1`[](#payram-core-v1.9.1)

**Fixed**

-   BTC batch size reduced to 2 for per-block height updates to improve stability
    

#### PayRam Core `v1.9.0`[](#payram-core-v1.9.0)

**Added**

-   RPC connection pool with health-based routing, priority ranking, and 60 seed nodes across all supported chains
    
-   RPC node management APIs — create, update, delete, and per-node live connection testing
    
-   ARM64 Docker build and publish workflow for multi-platform image support
    
-   Automatic releases and tag builds via CI pipeline
    
-   Computed `webhookStatus` field in payment search results
    
-   Deposit sponsorship retry timeout configuration
    
-   `CONFIRMING` payment status exposed in API; analytics tightened to processed-only deposits
    
-   Computed `priority` field in RPCNode API response
    
-   Hash-based RPC node gatekeeper (`ConnectionHash`) to prevent duplicate node registration
    
-   BTC fallback node support in RPC pool
    

**Changed**

-   Centralized `BLOCKCHAIN_NETWORK_TYPE` environment reads into `models.GetNetworkType()`
    
-   Removed redundant `network_type` column from `rpc_nodes` table
    
-   Chain ID retrieval refactored — TRX JSON-RPC probe separated into a dedicated function
    
-   Seeder now uses `OnConflict{DoNothing}` for idempotency; syncs non-key fields on duplicate key
    
-   Batch address checking for ETH/BASE blocks for improved performance
    
-   Chain ID cached via `sync.Once` for Received events matching
    

**Fixed**

-   TRX chain ID retrieval — enhanced error handling for unsupported endpoints and improved JSON-RPC probe
    
-   TRX multi API key support — per-node API key used for gRPC calls instead of single client-level key
    
-   TRX URL parsing and pool integration
    
-   TRX timestamp handling
    
-   RPC pool poisoning from "not found" errors — errors no longer incorrectly evict healthy nodes
    
-   RPC pool: removed silent `DefaultFreeNodes` fallback to surface configuration issues explicitly
    
-   Tron node mapping fix — nodes slice initialized to empty instead of nil
    
-   BTC missed deposit flow improved
    
-   BTC testnet connectivity fix
    
-   Sweep retry logic — sweeps no longer incorrectly marked as `not_found` on transient errors
    
-   Dashboard confirming deposits filter accuracy
    
-   `FetchTransactionSponsorship` error handling and logging improvements
    
-   Deposit pipeline stability — prevents silent deposit loss and unsafe height advancement
    
-   External platform blockchain currency approval logic corrected
    
-   Chain ID validation skipped on non-connection RPC node updates
    
-   Signed transaction payload stored for safe re-broadcast on withdrawal failure
    
-   Race condition and goroutine leak fixes in RPC pool management
    
-   Worker restart error handling fixed
    

#### PayRam Payments App `v1.2.0`[](#payram-payments-app-v1.2.0)

**Added**

-   Withdraw transactions support
    
-   Sponsorship calculation endpoint and handler
    
-   Fiat currency and country data integration
    
-   Automated CI/CD release pipeline
    

#### PayRam Wallet `v2.4.0`[](#payram-wallet-v2.4.0)

**Changed**

-   TypeScript migration and ESLint configuration
    

**Fixed**

-   Improved installation check logic and login redirect on token expiry
    

* * *

### March 11, 2026[](#march-11-2026)

#### PayRam Frontend `v0.3.1`[](#payram-frontend-v0.3.1)

**Added**

-   Activity Log in settings with breadcrumb navigation
    
-   Missed payments reporting feature with UI components, validation, and error handling
    
-   `excludeActionStatusPairs` filter support for activity logs API and hooks
    
-   `UserMultiSelect` component improvements for activity log filtering
    

**UI**

-   Quick filter style updates with high value filter option removed
    

**Fixed**

-   Update `WEB_WALLET_URL` in `PAYMENTS_APP_CONFIG` to new production URL
    
-   Handle 403 Forbidden separately from 401 to prevent unintended logout
    
-   Update activity log API routes for correctness
    

#### PayRam Core `v1.8.3`[](#payram-core-v1.8.3)

**Added**

-   Polygon listener and broadcast processor registered in system service
    
-   Webhook retry mechanism with exponential backoff — failed webhook deliveries are automatically retried at 30m, 1h, 2h, 4h, 8h, 24h, and 48h intervals before being marked as failed; retry intervals are configurable via system configuration
    

**Fixed**

-   BTC missed deposit flow — improved handling in BTC client
    
-   Sweep approval: temporarily disabled fee transfer and signature broadcasting in run method
    

#### PayRam Payments App `v1.1.0`[](#payram-payments-app-v1.1.0)

**Changed**

-   Country selector and default payment method configuration
    

**Fixed**

-   Card onramp parameter handling improvements
    

* * *

### March 5, 2026[](#march-5-2026)

#### PayRam Core `v1.8.2`[](#payram-core-v1.8.2)

**Fixed**

-   Polygon mainnet RPC connectivity
    

#### PayRam Payments App `v1.0.0`[](#payram-payments-app-v1.0.0)

**Added**

-   Address book service with Ethereum address validation and normalization
    
-   Sponsorship calculation logic with user payable amount computation
    
-   Network fee support for payment calculations
    

* * *

### March 1, 2026[](#march-1-2026)

#### PayRam Core `v1.8.1`[](#payram-core-v1.8.1)

**Fixed**

-   Batch DB query for calldata address checking to fix slow block processing
    
-   Nil guard for `IdentifyOurAddresses` to prevent panic
    
-   Error logging in `identifyOurAddresses` for silent DB failures
    
-   Remove `MaxBlocksPerBatch` cap in polling to eliminate inter-batch sleep
    
-   Prevent genuine deposits from being marked stale on transient RPC errors
    
-   Log error from `MarkStaleConfirmingDeposits` instead of discarding
    

* * *

### February 28, 2026[](#february-28-2026)

#### PayRam Frontend `v0.3.0`[](#payram-frontend-v0.3.0)

**Added**

-   OnRamp Payments: new `OnrampPaymentsScreen` component integrated into OnrampPayments page
    
-   `ErrorBoundary` for `OnrampPaymentsScreen` to handle rendering errors gracefully
    
-   Confirmation state logic with debug mode and animated transitions for payment flows
    
-   Legacy QR toggle with improved dropdown overflow handling and payment UI enhancements
    
-   PayRam logo embedded in QR codes
    
-   Restart Nodes button in integrations settings
    
-   Refresh icon added to icon components
    
-   Configure MCP nav item with icons in sidebar
    

**Changed**

-   Rolled back Next.js 15 to 14 for stability
    
-   Upgraded CSS and UI dependencies to latest compatible versions
    
-   Cleaned up global CSS, removed redundant configs and duplicate imports
    
-   Refactored icon imports and added new OnrampPayments API
    

**UI**

-   Global design unification — slate color palette, stat strip, settings and payments redesign
    
-   Dashboard design audit — slate color scheme, table redesign, mobile filters, chart theming
    
-   Redesigned dashboard metric cards and updated sidebar color theme
    
-   Mobile hamburger menu, neon green theme, and dashboard polish
    
-   Instant sidebar highlight on navigation click
    
-   Fixed dropdown flash by defaulting to desktop positioning
    
-   Restored credit card icon next to Cards payment method label
    
-   Aligned Crypto icon layout to match Cards payment method
    
-   Settings list layout, sweep-in header and info block reorder
    

**Fixed**

-   Update wallet URL to production domain
    
-   Handle 403 Forbidden separately from 401 to prevent unintended logout
    
-   Prevent automatic logout on transient errors during token refresh
    
-   Improve logic to check availability of USDC token and BASE blockchain in ChannelSelector
    
-   Remove duplicate blockchain case showing incorrect card icons
    
-   Add QR code containers to prevent SVG overflow and fix wallet chain detection race condition
    
-   Revert build optimizations and remove deprecated Next.js 15 config
    

#### PayRam Core `v1.8.0`[](#payram-core-v1.8.0)

**Added**

-   Deposit confirming state support — frontend can now track confirmation progress before deposits are fully confirmed
    
-   Blockchain node validation with mainnet detection (`IsMainnet` method)
    
-   Support for missed deposit webhook approval workflow
    

**Changed**

-   Consolidated webhook processing into single method to prevent duplicate webhook sends
    
-   Improved OnramperPayments API with better pagination, date filtering, and sorting validation
    
-   Refactored blockchain client methods for consistency (`ChainIDUint64` renamed to `GetChainID`)
    
-   Standardized error responses with correct HTTP status codes
    

**Fixed**

-   Context deadline/cancellation handling in blockchain processors
    
-   `EnsureTxConfirmed` polling behavior on `NotFound` status
    
-   TRX sweep transaction field population (Token/From/To/Amount/EventType)
    
-   BTC sweep UTXO processing to include "confirming" status
    
-   Analytics graph colors for New/Recurring metrics
    
-   Payment channel seeder to set Payments App status to active
    

* * *

### February 17, 2026[](#february-17-2026)

#### PayRam MCP Server `v1.1.0`[](#payram-mcp-server-v1.1.0-1)

**Added**

-   Headless setup guide retrieval tool with formatted checklist
    
-   Agent onboarding skill for automated deployment
    
-   Analytics references integrated across all existing skills
    
-   Google Analytics integration on MCP landing page
    

**Changed**

-   Renamed headless setup to agent onboarding for clarity
    

**UI**

-   Integration card layout split into 2-column grid
    

* * *

### February 14, 2026[](#february-14-2026)

#### PayRam Frontend `v0.2.8`[](#payram-frontend-v0.2.8)

**Added**

-   Added Payments App Channel
    
-   Update Payments Page to support Payments App
    

**Fixed**

-   Payments Page UI fixes
    

#### PayRam Core `v1.7.9`[](#payram-core-v1.7.9)

**Added**

-   Integration of Payments App
    

* * *

### February 10, 2026[](#february-10-2026)

#### PayRam Frontend `v0.2.7`[](#payram-frontend-v0.2.7)

**Added**

-   Payments page Disclaimer
    

**Fixed**

-   QR code styles and UI improvements
    
-   Recommended token fix
    
-   Dashboard UI fixes
    

#### PayRam Core `v1.7.8`[](#payram-core-v1.7.8)

**Added**

-   Tracking of user activity in the dashboard
    
-   Improved polling logic for the blockchain network processors
    

* * *

### January 15, 2026[](#january-15-2026)

#### PayRam Frontend `v0.2.6`[](#payram-frontend-v0.2.6)

**Added**

-   Added support for Polygon
    

**Fixed**

-   Recommended token fix in payments page
    

#### PayRam Core `v1.7.7`[](#payram-core-v1.7.7)

**Added**

-   Polygon integration
    

**Fixed**

-   Minor bug fixes
    

* * *

### January 6, 2026[](#january-6-2026)

#### PayRam Frontend `v0.2.5`[](#payram-frontend-v0.2.5)

**Fixed**

-   Add disclaimer text regarding PayRam software usage and liability
    
-   Add disclaimer text regarding software usage and liability in PaymentScreen
    

#### PayRam Core `v1.7.6`[](#payram-core-v1.7.6)

**Fixed**

-   Bug fix for deposits coming through smart contracts
    
-   Improvement in Tron sweep
    

* * *

### December 26, 2025[](#december-26-2025)

#### PayRam Frontend `v0.2.4`[](#payram-frontend-v0.2.4)

**Fixed**

-   TRON QR scan fix
    
-   Update precision of amount on scanning QR code on Payments Page
    
-   Filter inactive recipient while creating Payout
    

#### PayRam Core `v1.7.5`[](#payram-core-v1.7.5)

**Fixed**

-   Fix for JWT token based authentication
    
-   Minor fix in Ethereum blockchain listener
    

* * *

### December 9, 2025[](#december-9-2025)

#### PayRam Frontend `v0.2.3`[](#payram-frontend-v0.2.3)

**Added**

-   Payment channels (TransFi)
    
-   Added support for JWT based authentication
    

#### PayRam Core `v1.7.4`[](#payram-core-v1.7.4)

**Added**

-   JWT token based authentication for all the dashboard APIs
    
-   Swagger documentation for all APIs
    

* * *

### November 15, 2025[](#november-15-2025)

#### PayRam Core `v1.7.0`[](#payram-core-v1.7.0)

**Added**

-   Support for smart contract ETH deposits (e.g. deposits from Coinbase)
    

* * *

### November 11, 2025[](#november-11-2025)

#### PayRam Frontend `v0.2.2`[](#payram-frontend-v0.2.2)

**Added**

-   Merchant payout: merchant can create a payout request
    

**Fixed**

-   Minor bug fixes and performance improvements
    

#### PayRam Core `v1.6.9`[](#payram-core-v1.6.9)

**Added**

-   APIs for merchant payout (withdrawal)
    

* * *

### April 18, 2024[](#april-18-2024)

#### PayRam Core `v1.2.6`[](#payram-core-v1.2.6)

**Added**

-   APIs to add member
    
-   APIs to add roles
    
-   APIs to add permissions
    
-   APIs to assign roles to members
    
-   API for signing authentication
    
-   APIs to add permissions to roles
    
-   USD adjustment factor of 2%
    

* * *

### April 10, 2024[](#april-10-2024)

#### PayRam Core `v1.2.5`[](#payram-core-v1.2.5)

**Fixed**

-   Removed unwanted log
    
-   Added defer function to avoid nil pointer error
    

#### PayRam Core `v1.2.4`[](#payram-core-v1.2.4)

**Fixed**

-   Added defer to handle abrupt termination of webhook job due to error at network layer
    

#### PayRam Core `v1.2.3`[](#payram-core-v1.2.3)

**Added**

-   Support for notifying customer through email upon BTC credits
    
-   Added necessary logs
    
-   Updated event consumer library
    

**Fixed**

-   Fixed few bugs related to transaction which was causing database locking
    

* * *

### April 9, 2024[](#april-9-2024)

#### PayRam Core `v1.2.2`[](#payram-core-v1.2.2)

**Added**

-   Support to add multiple platforms for a merchant
    
-   Migration to add platform table and updates in the database tables
    
-   Code refactored
    
-   Payment request API no-ok response structured
    

* * *

### April 5, 2024[](#april-5-2024)

#### PayRam Core `v1.2.1`[](#payram-core-v1.2.1)

**Added**

-   Support for Tron listening
    
-   Change in routes and handlers for admin APIs to follow REST API guidelines
    
-   Code refactored
    

* * *

### March 29, 2024[](#march-29-2024)

#### PayRam Core `v1.2.0`[](#payram-core-v1.2.0)

**Added**

-   Feature to send email to merchant on payment request
    
-   Added open source event emitter library
    
-   Added open source event consumer library
    

* * *

### March 19, 2024[](#march-19-2024)

#### PayRam Core `v1.1.6`[](#payram-core-v1.1.6)

**Added**

-   Changed USD amount adjustment factor from 0.988 to 0.984
    
-   Refactored the code
    
-   Removed unwanted comments
    

* * *

### March 15, 2024[](#march-15-2024)

#### PayRam Core `v1.1.5`[](#payram-core-v1.1.5)

**Added**

-   Accounting processor for Bitcoin sweep (withdrawal)
    
-   Updated go.mod and go.sum (showing vulnerability in one of the libraries)
    

* * *

### March 14, 2024[](#march-14-2024)

#### PayRam Core `v1.1.4`[](#payram-core-v1.1.4)

**Added**

-   Audit processor for Bitcoin sweep (withdrawal)
    
-   Changed USD amount adjustment factor from 0.995 to 0.988
    
-   Updated go.mod and go.sum
    

* * *

### March 12, 2024[](#march-12-2024)

#### PayRam Core `v1.1.3`[](#payram-core-v1.1.3)

**Added**

-   Modified withdraw API to take withdraw hash in param rather than JSON params
    

* * *

### March 9, 2024[](#march-9-2024)

#### PayRam Core `v1.1.2`[](#payram-core-v1.1.2)

**Fixed**

-   Removed unwanted webhook call for cancelled payments in create payment request API call
    

#### PayRam Core `v1.1.1`[](#payram-core-v1.1.1)

**Added**

-   Restructured and added few test cases along with makefile
    
-   Separate webhook processor for retrying failed webhooks
    
-   APIs for BTC sweeper (withdrawal)
    
-   Removed unwanted logs
    
-   Migration to copy deposits to `withdra_deposits` table for sweeping
    
-   Migration to mark all cancelled payment requests webhook status to received
    
-   Migration to add two more tables
    

**Fixed**

-   Multiple bug fixes in the code while testing
    

* * *

### March 3, 2024[](#march-3-2024)

#### PayRam Core `v1.1.0`[](#payram-core-v1.1.0)

**Added**

-   Support to pay using Bitcoin
    
-   Bitcoin listener can be run as a separate job
    
-   Created README.md file with installation, configuration and usage details
    

**Fixed**

-   Error in Ether and ERC20 subscription stops abruptly
    

* * *

### February 24, 2024[](#february-24-2024)

#### PayRam Core `v1.0.8`[](#payram-core-v1.0.8)

**Added**

-   Welcome message in the home page
    

#### PayRam Core `v1.0.7`[](#payram-core-v1.0.7)

**Fixed**

-   Small bug fix — added missed return statement in payment request API for all users when it is a pre-prod server
    

* * *

### February 23, 2024[](#february-23-2024)

#### PayRam Core `v1.0.6`[](#payram-core-v1.0.6)

**Added**

-   Added code to copy `created_at` and `updated_at` in DB migration
    

#### PayRam Core `v1.0.3`[](#payram-core-v1.0.3)

**Fixed**

-   Bug fix in URL configuration
    

#### PayRam Core `v1.0.2`[](#payram-core-v1.0.2)

**Fixed**

-   Bug fix
    

#### PayRam Core `v1.0.1`[](#payram-core-v1.0.1)

**Fixed**

-   Bug fix
    

#### PayRam Core `v1.0.0`[](#payram-core-v1.0.0)

**Added**

-   First release with new architecture
    

[PreviousImportant Links](/support/important-links)

Last updated 9 hours ago