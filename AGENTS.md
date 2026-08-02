<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## StyleX

When writing or reviewing StyleX code, read and follow
`docs/agent-references/stylex-authoring.md`.

The local guide mirrors the official
[StyleX authoring guide](https://github.com/facebook/stylex/blob/main/packages/docs/static/llm/stylex-authoring.md)
and was synced on 2026-07-23.

## Frontend state and data flow

Before writing or reviewing React state, XState machines, TanStack Query code,
asynchronous actors, or prefetching under `src`, read and follow
`docs/frontend/state-management.md`.

- XState owns local UI state, workflows, and editable drafts.
- TanStack Query owns server data, cache state, freshness, loading, errors, and
  refetching.
- Keep derived values derived; never mirror query data, status, or errors into
  machine context.
- Use `fromPromise` when a machine owns async timing and outcome, and keep
  TanStack Query hook constraints behind the query adapter boundary.
- Keep flow and API dependencies referentially stable; inject clients through
  a flow factory rather than storing them in machine context.

## Vercel and template boundaries

Before adding or reviewing a Vercel integration, use current official Vercel
documentation or official Vercel agent tooling when it is available.

- Keep the base deployable with `pnpm check` and without runtime credentials.
- Add platform dependencies, routes, and `vercel.json` entries only for a
  selected product feature; do not preconfigure speculative integrations.
- Never commit secret values. Document required names and safe placeholders in
  `.env.example`, then keep real values in the deployment environment.
- Treat agent skills and plugins as contributor tooling. Do not vendor or
  install them into the project unless the user explicitly requests a
  project-scoped installation.
- Run `pnpm check` before handing off a template or Vercel integration change.
