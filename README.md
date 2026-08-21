# next-template

A single Next.js application template for small products deployed on Vercel.
The app, UI, and server entry points live in one project without a workspace
or a separate backend service.

## Stack

- Next.js canary with React Compiler and Cache Components
- React
- TypeScript
- StyleX
- TanStack Query
- XState
- Oxfmt and Oxlint
- pnpm

## Requirements

- [Nodeup](https://nodeup.delino.io/installation), installed globally for local
  development
- Node.js, pinned in `.node-version` for local development and declared in
  `package.json` for Vercel
- pnpm, pinned in `package.json` and dispatched by Nodeup
- Docker Engine with Docker Compose, only when running local object storage

The exact local Node.js release is pinned in `.node-version`. The
deployment-compatible Node.js range and the exact pnpm release are declared in
`package.json`.

## Dependency updates

Renovate tracks the package manifest, pnpm lockfile, `.node-version`, and
standard Docker image references. Annotate non-image Dockerfile tool versions
so the Dockerfile version manager can identify their release source:

```dockerfile
# renovate: datasource=github-releases depName=owner/tool
ARG TOOL_VERSION=1.2.3
```

## Start

```bash
brew install delinoio/tap/nodeup
export PATH="$HOME/.local/bin:$PATH"
./scripts/setup-nodeup.sh
pnpm install
pnpm dev
```

Add `$HOME/.local/bin` to your shell profile once so the Nodeup shims remain
available in future shells. The setup script installs the pinned Node.js
runtime, registers the current clone or worktree as a directory override, and
creates the `node`, `npm`, `npx`, `yarn`, and `pnpm` shims. Run it once for each
clone or worktree because Nodeup stores overrides by absolute path.

Nodeup resolves the exact `packageManager` value in `package.json` and runs pnpm
through the selected runtime's `npm exec`. The first pnpm invocation can
therefore depend on npm registry access or a warm npm cache.

Open [http://localhost:3000](http://localhost:3000).

## Codex Cloud

Codex Cloud setup runs in a separate Bash session from the agent, so its PATH
export must also be persisted in `~/.bashrc`. Configure the environment with
the following Setup script. It builds the pinned Nodeup release with the Rust
toolchain from the universal image, then reuses the repository bootstrap and
installs dependencies while setup internet access is available:

```bash
set -euo pipefail

NODEUP_VERSION="0.2.0"
LOCAL_ROOT="$HOME/.local"
BIN_DIR="$LOCAL_ROOT/bin"
NODEUP_BIN="$BIN_DIR/nodeup"
PATH_LINE='export PATH="$HOME/.local/bin:$PATH"'

repo_root="$(git rev-parse --show-toplevel)"

mkdir -p "$BIN_DIR"
touch "$HOME/.bashrc"

grep -qxF "$PATH_LINE" "$HOME/.bashrc" ||
  printf '%s\n' "$PATH_LINE" >> "$HOME/.bashrc"

export PATH="$BIN_DIR:$PATH"

if ! command -v cargo >/dev/null 2>&1 && [[ -f "$HOME/.cargo/env" ]]; then
  # shellcheck disable=SC1091
  source "$HOME/.cargo/env"
fi

if ! command -v cargo >/dev/null 2>&1; then
  printf 'error: cargo is required to install nodeup in Codex Cloud\n' >&2
  exit 1
fi

if [[ ! -x "$NODEUP_BIN" ]] ||
  [[ "$("$NODEUP_BIN" --version)" != "nodeup $NODEUP_VERSION" ]]; then
  cargo install \
    --locked \
    --force \
    --version "$NODEUP_VERSION" \
    --root "$LOCAL_ROOT" \
    nodeup
fi

hash -r

cd "$repo_root"
./scripts/setup-nodeup.sh
pnpm install --frozen-lockfile
```

Configure this Maintenance script for cached containers. It reapplies the
runtime override for the checked-out branch and refreshes dependencies when
`.node-version` or `pnpm-lock.yaml` changes:

```bash
set -euo pipefail

export PATH="$HOME/.local/bin:$PATH"

repo_root="$(git rev-parse --show-toplevel)"

cd "$repo_root"
./scripts/setup-nodeup.sh
pnpm install --frozen-lockfile
```

Changing either Cloud script invalidates the environment cache. If a cached
container is otherwise incompatible or its Nodeup binary is missing, use
**Reset cache** in the environment settings so the Setup script runs again.
See the
[Codex Cloud environment guide](https://learn.chatgpt.com/docs/environments/cloud-environment)
for setup sessions, maintenance scripts, internet access, and cache behavior.

## Local object storage

Local object storage runs as a single-node
[RustFS](https://docs.rustfs.com/en/installation/container/docker) service in
Docker. Its object data is kept in a named volume, so replacing or stopping the
container does not remove stored objects.

Create the ignored local environment file and set both RustFS credential values
to unique values:

```bash
cp .env.example .env
```

Start RustFS and verify its S3 API health endpoint:

```bash
pnpm storage:up
curl --fail http://localhost:9000/health
```

The S3 API is available at [http://localhost:9000](http://localhost:9000), and
the administration console is available at
[http://localhost:9001](http://localhost:9001). Both listeners bind to the
development machine only. Use the `RUSTFS_ACCESS_KEY` and `RUSTFS_SECRET_KEY`
values from your environment or `.env` to sign in or configure an S3-compatible
client.

```bash
pnpm storage:logs
pnpm storage:down
```

`storage:down` keeps the named volume. Run
`pnpm storage:down -- --volumes` only when you intentionally want to delete all
locally stored objects. RustFS is a local development dependency; it is not
started during `pnpm check` and does not add a Vercel runtime requirement.

## Commands

```bash
pnpm dev
pnpm check
pnpm build
pnpm start
pnpm format
pnpm format:check
pnpm lint
pnpm lint:fix
pnpm storage:up
pnpm storage:logs
pnpm storage:down
pnpm typecheck
```

All commands run directly against the root application. There is no Turbo
task layer, workspace filter, or internal package build.

`pnpm check` is the release gate. It verifies formatting, lint rules, types,
and a credential-free production build in that order.

## Structure

```text
src/
├── app/       # App Router pages, layouts, providers, and server entry points
├── examples/  # Compile-checked reference implementations
└── lib/       # Shared application primitives
```

The starter page stays intentionally small. The profile flow under
`src/examples` demonstrates how TanStack Query and XState can work together
without becoming part of the default route.

## Template contract

The tracked base stays deployable before any optional Vercel product is
configured:

- A clean clone passes `pnpm install` followed by `pnpm check` without secrets.
- Optional integrations do not leave dormant dependencies, routes, or
  `vercel.json` entries in the base.
- Environment examples contain names and safe placeholders, never credentials.
- Analytics, Speed Insights, Cron, Blob, observability, and similar platform
  features are added only when a product chooses them.

Keep the repository root as the application and deployment root. Introduce a
workspace or another service only when a concrete product boundary requires it.

## Cache Components

Cache Components are enabled in `next.config.ts`. Dynamic data stays uncached
by default; add `use cache` only where the product has an explicit caching
policy. See the [Next.js Cache Components guide](https://nextjs.org/docs/app/getting-started/cache-components)
before introducing cached boundaries.

## Server boundaries

Keep product code inside Next.js until a concrete requirement justifies
another boundary:

- Use Server Components for server-side reads used during rendering.
- Use Server Actions for mutations initiated by the application UI.
- Use Route Handlers for public HTTP APIs, webhooks, callbacks, and file
  responses.
- Import shared server logic directly from Server Components instead of
  calling the application's own Route Handlers over HTTP.

If an API grows enough to need shared HTTP middleware, versioned routing, or
portable handlers, mount Hono from a catch-all Route Handler such as
`src/app/api/[[...route]]/route.ts`. Hono is not installed by default.

Vercel Cron Jobs and Queues should be added when the product needs scheduled
or durable background work. They are intentionally not preconfigured in the
base template.

## Conventions

- [StyleX authoring](docs/agent-references/stylex-authoring.md)
- [Frontend state and data flow](docs/frontend/state-management.md)

TanStack Query owns server data and cache state. XState owns local UI state,
workflows, and editable drafts. Keep values derived for rendering out of both
stores when they can be computed from their source.

## Deploy

Import the repository into [Vercel](https://vercel.com/new) as a standard
Next.js project. The repository root is the application root, so no monorepo
root-directory or workspace configuration is required.

No Vercel integration, secret, or dashboard toggle is required before the
first deployment. Keep **Automatically expose System Environment Variables**
enabled so Preview deployments can identify themselves and opt out of search
indexing.

Set `SITE_URL` to the production HTTP(S) origin when you need to override
Vercel's production-domain system variable, such as when selecting a custom
canonical domain. The value must be an origin without a path, query, fragment,
or credentials. Preview deployments publish `noindex, nofollow` metadata and a
disallowing `robots.txt`; Production deployments remain indexable.

After deployment, configure only the platform resources the application has
actually adopted. Record required variable names in `.env.example`, keep their
values in Vercel, and run `pnpm check` before pushing the integration.
