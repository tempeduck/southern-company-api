# southern-company-api — Claude Code Context

## Project Summary

Node.js/TypeScript library for accessing utility data from Southern Company power utilities (Alabama Power, Georgia Power, Mississippi Power). This is a fork/local copy of the `apearson/southern-company-api` npm package. Provides programmatic access to account info, usage data, and billing via the Southern Company web API.

## Environment

- **Host**: Ubuntu VM at 10.10.1.19
- **Project root**: `~/projects/southern-company-api/`
- **Language**: TypeScript (Node.js)
- **Source**: `src/`
- **Tests**: `tests/`
- **GitHub**: https://github.com/tempeduck/southern-company-api (public)

## Rules

- Credentials are never hardcoded — pass at runtime or via environment
- Run tests before committing: check `src/` for test runner config
- This is a library — no secrets.env needed; credentials passed by callers

## Agent Collaboration Rules

- **Read History First**: At the start of every session, the agent MUST run `git status` and `git log -n 5` to understand recent changes, and read the `## Active Handoff` section in this file.
- **Commit with Context**: Every commit message must explain the *why* behind a change, not just the *what*.
- **The Handoff Journal**: Before concluding a session or completing a major task, the active agent MUST update the `## Active Handoff` section at the bottom of this file.
- **Interactive Dry Runs**: The agent must always perform a dry run and list planned changes for user approval before modifying code, databases, or configuration files.
- **Explicit Task Tracking**: Maintain a shared checklist of tasks in `task.md` or `CLAUDE.md`. Mark tasks as `[x]` for complete, `[/]` for in-progress, and `[ ]` for pending.

## Active Handoff

- [2026-06-06 (Claude Code)]: Added agent collaboration rules and initialized handoff log.
