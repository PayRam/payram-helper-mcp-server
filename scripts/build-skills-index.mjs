#!/usr/bin/env node
// Regenerate public/.well-known/agent-skills/index.json from skills/*/SKILL.md.
//
// Source of truth: the SKILL.md bodies. URLs in the index point to the
// GitHub raw tree for the payram-mcp repo (where agents fetch the body).
// sha256 is computed per file so any edit bumps the cache-key automatically.
//
// Run via `npm run skills:build` or automatically pre-build. Commit the
// regenerated index so the deployed site serves it without needing a
// runtime generator.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const SKILLS_SRC = join(ROOT, 'skills');
const INDEX_OUT = join(ROOT, 'public', '.well-known', 'agent-skills', 'index.json');
const SKILLS_OUT_DIR = join(ROOT, 'public', 'skills');

const REPO_RAW = 'https://raw.githubusercontent.com/PayRam/payram-mcp/main/skills';
const SITE = 'https://mcp.payram.com';

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^"(.*)"$/, '$1');
  }
  return fm;
};

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

mkdirSync(dirname(INDEX_OUT), { recursive: true });
mkdirSync(SKILLS_OUT_DIR, { recursive: true });

const entries = readdirSync(SKILLS_SRC, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const skills = [];
for (const name of entries) {
  const srcPath = join(SKILLS_SRC, name, 'SKILL.md');
  if (!existsSync(srcPath)) continue;

  const raw = readFileSync(srcPath, 'utf8');
  const fm = parseFrontmatter(raw);
  if (!fm.name || !fm.description) {
    throw new Error(`[${name}] missing name/description frontmatter`);
  }

  // Also serve skills directly from mcp.payram.com/skills/<name>.md so the
  // website's URL-guessing fallback (which 308s there) lands on a real file.
  writeFileSync(join(SKILLS_OUT_DIR, `${name}.md`), raw);

  skills.push({
    name: fm.name,
    type: 'skill.md',
    description: fm.description,
    url: `${REPO_RAW}/${name}/SKILL.md`,
    mcpUrl: `${SITE}/skills/${name}.md`,
    sha256: sha256(raw),
  });
}

const index = {
  $schema: 'https://agentskills.io/schemas/v0.2.0/index.json',
  version: '0.2.0',
  publisher: { name: 'PayRam', url: 'https://payram.com' },
  skills,
};

writeFileSync(INDEX_OUT, JSON.stringify(index, null, 2) + '\n');
console.log(`[skills] wrote ${skills.length} skills + index`);
