# Scripts

This directory contains utility scripts for the PayRam MCP Server project.

## fetchDocs.ts

Fetches documentation from docs.payram.com and updates the local markdown files in `docs/payram-docs-live/`.

### Usage

Run via Makefile:

```bash
make fetch-docs
```

Or directly with tsx:

```bash
tsx scripts/fetchDocs.ts
```

### What it does

1. **Automatically discovers** all documentation pages by crawling docs.payram.com starting from the root
2. Follows internal links to find all available documentation pages
3. Fetches each discovered page and converts HTML content to clean Markdown using Turndown
4. Saves the markdown files to `docs/payram-docs-live/` maintaining the same directory structure
5. Creates a manifest.json file listing all discovered and fetched pages
6. Provides a summary of successful and failed fetches

### Key Features

- **Auto-discovery**: No need to manually maintain a list of pages - new documentation pages are automatically detected
- **Smart crawling**: Skips non-documentation paths like `/api/`, `/static/`, images, etc.
- **Depth control**: Configurable crawl depth to prevent infinite loops (default: 5 levels)
- **Manifest tracking**: Generates a manifest.json with metadata about the fetch operation

### Configuration

You can modify the crawling behavior in `scripts/fetchDocs.ts`:

- **Max depth**: Change the `maxDepth` parameter in the `crawlPage` function (default: 5)
- **Crawl starting point**: Modify the initial URL in `fetchAllDocs()` (default: '/')
- **Excluded paths**: Add patterns to skip in (fresh sync every time)
- Create necessary subdirectories automatically
- Log progress for each discovered and fetched page
- Display a summary with success/failure counts
- Generate `manifest.json` with:
  - Timestamp of the fetch
  - Total number of pages
  - List of all discovered URLs and their corresponding file path
    All documentation files are saved to: `docs/payram-docs-live/`

The script will:

- Clear the existing directory before fetching
- Create necessary subdirectories automatically
- Log progress for each page
- Display a summary with success/failure counts
