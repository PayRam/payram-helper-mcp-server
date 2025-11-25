SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help
PKG := yarn
RUN := yarn -s
REMOTE ?= origin

.PHONY: help
help:
	@echo "Payram MCP server automation"
	@echo "Available targets:"
	@echo "  make setup            Install dependencies"
	@echo "  make build            Compile TypeScript"
	@echo "  make lint             Run ESLint"
	@echo "  make format           Apply Prettier"
	@echo "  make format-check     Check formatting"
	@echo "  make test             Run Vitest suite"
	@echo "  make precommit-test   format-check + lint + test"
	@echo "  make commit           Run precommit checks, then guide interactive commit"

.PHONY: setup
setup:
	$(PKG) install

.PHONY: build
build:
	$(RUN) build

.PHONY: lint
lint:
	$(RUN) lint

.PHONY: format
format:
	$(RUN) format

.PHONY: format-check
format-check:
	$(RUN) format:check

.PHONY: test
test:
	$(RUN) test

.PHONY: precommit-test
precommit-test:
	@set -euo pipefail; \
	echo "Running precommit suite"; \
	$(MAKE) format-check; \
	$(MAKE) lint; \
	$(MAKE) test; \
	echo "All checks passed"

.PHONY: commit
commit: precommit-test
	@set -euo pipefail; \
	if ! git rev-parse --git-dir >/dev/null 2>&1; then \
		echo "Not a git repo"; exit 1; \
	fi; \
	if [ -z "$${STAGE:-}" ]; then read -p "Stage all changes now? [Y/n] " STAGE || true; STAGE=$${STAGE:-Y}; fi; \
	case "$${STAGE}" in y|Y|yes|YES) git add -A ;; *) echo "Skipping auto-stage." ;; esac; \
	TYPES="feat fix chore docs refactor perf test build ci revert"; \
	if [ -z "$${TYPE:-}" ]; then \
		echo "Select commit type:"; \
		i=1; \
		for t in $$TYPES; do echo "  $$i) $$t"; i=$$((i+1)); done; \
		read -p "Choose number: " N || true; \
		TYPE=$$(echo $$TYPES | awk -v n=$$N '{split($$0,a," "); print a[n]}'); \
	fi; \
	if [ -z "$$TYPE" ]; then echo "Commit type required"; exit 1; fi; \
	if [ -z "$${SCOPE:-}" ]; then read -p "Optional scope (e.g., core/tools): " SCOPE || true; fi; \
	if [ -z "$${MSG:-}" ]; then \
		while true; do read -p "Short description (<=72 chars): " MSG || true; [ -n "$$MSG" ] && break; done; \
	fi; \
	if [ -z "$${BODY:-}" ]; then read -p "Body (optional): " BODY || true; fi; \
	if [ -z "$${BREAKING:-}" ]; then \
		read -p "Breaking change? [y/N]: " BR || true; \
		if [[ $${BR:-N} =~ ^(y|Y)$$ ]]; then read -p "Describe breaking change: " BREAKING || true; else BREAKING=""; fi; \
	fi; \
	if [ -z "$${FOOTER:-}" ]; then read -p "Footer (e.g., Closes #123): " FOOTER || true; fi; \
	: "$${SCOPE:=}"; : "$${MSG:=}"; : "$${BODY:=}"; : "$${BREAKING:=}"; : "$${FOOTER:=}"; \
	HEADER="$$TYPE"; \
	[ -n "$$SCOPE" ] && HEADER="$$HEADER($$SCOPE)"; \
	[ -n "$$BREAKING" ] && HEADER="$$HEADER!"; \
	HEADER="$$HEADER: $$MSG"; \
	MSGFILE=$$(mktemp); \
	echo "$$HEADER" > $$MSGFILE; \
	[ -n "$$BODY" ] && { echo; echo "$$BODY"; } >> $$MSGFILE; \
	[ -n "$$BREAKING" ] && { echo; echo "BREAKING CHANGE: $$BREAKING"; } >> $$MSGFILE; \
	[ -n "$$FOOTER" ] && { echo; echo "$$FOOTER"; } >> $$MSGFILE; \
	echo; echo "--- Commit message preview ---"; cat $$MSGFILE; echo "-----------------------------"; echo; \
	if command -v commitlint >/dev/null 2>&1; then \
		commitlint -x @commitlint/config-conventional -f $$MSGFILE || { read -p "commitlint failed. Proceed anyway? [y/N] " CONT; [[ $${CONT:-N} =~ ^(y|Y)$$ ]] || { rm -f $$MSGFILE; exit 1; }; }; \
	fi; \
	if git commit -F $$MSGFILE; then echo "Commit created"; else echo "Commit failed"; fi; \
	rm -f $$MSGFILE
