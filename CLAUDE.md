# PayRam MCP Server

> **Read [SOUL.md](SOUL.md) for PayRam's core philosophy, voice, and design principles.**

MCP server for AI-assisted PayRam integration.

## File ownership map (read before editing docs)

Three kinds of doc files live here — only ONE is hand-edited:

| Path | Kind | Rule |
|---|---|---|
| `skills/*/SKILL.md`, `README.md`, `docs/*.md` (top level, except onboarding) | **Source** | Edit freely |
| `public/skills/*.md`, `public/.well-known/agent-skills/index.json` | **Generated** from `skills/*/SKILL.md` by `scripts/build-skills-index.mjs` (runs in `yarn build`) | Never hand-edit; edit the SKILL.md and rebuild |
| `docs/payram-docs-live/**` | **Vendored mirror** of docs.payram.com (`scripts/fetchDocs.ts`) | Local patches are lost on refetch — fix upstream too |
| `docs/PAYRAM_AGENT_ONBOARDING.md` | **Synced copy** of `payram-scripts/docs/PAYRAM_HEADLESS_AGENT.md` (served verbatim by the setup tools) | Never edit here; update the canonical file and re-copy (keep the banner) |


## Git Conventions

- Do **NOT** add `Co-Authored-By` trailers
- Use conventional prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Describe the "why", not the "what"
- Never commit `.env`, credentials, or API keys

---

## Hotfix Process

1. **Branch from `main`**: `git checkout -b hotfix/<description> origin/main`
2. **Apply fix** → run `/simplify` → build & test
3. **Commit** with `fix:` prefix
4. **Raise PR** from the same branch to both `main` and `develop`

## PR Instructions

Every PR must follow these steps:

1. **Assign PR** to self
2. **Add reviewers**: sam6230i, aryaman-payram, gulshanweb3
3. **Add PR** to the [PayRam project board](https://github.com/orgs/PayRam/projects/3):
   `gh project item-add 3 --owner PayRam --url <PR_URL>`
4. If the develop PR has merge conflicts, merge `origin/develop` into the branch and resolve

**Do NOT cherry-pick or create separate branches for develop.** One branch, two PRs.

## PR Review Follow-Up

After creating a PR, **schedule a task to check for reviews after 15 minutes** and address any comments:

```
Create a scheduled task (fireAt: 15 minutes from now) with prompt:
"Check PR reviews on PayRam/payram-mcp#<number> (and #<number> if two PRs).
Read all review comments, fix valid issues, push commits, and
reply to resolved comments. For nitpick/style suggestions, use
judgement — fix if reasonable, otherwise reply explaining why not."
```
