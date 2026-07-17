# Pizza Dash – AGENTS.md

## Project

Single-page pizza delivery website (Next.js 16, Tailwind CSS v4, shadcn/ui, TypeScript, Prisma/SQLite, Zustand). Built for Pizza Dash, Bulawayo.

## Package manager

Use **bun** only. `bun install`, `bun run dev`, etc. No npm/pnpm/yarn.

## Key commands

| Command | Purpose |
|---|---|
| `bun run dev` | Dev server on :3000, logs to `dev.log` |
| `bun run build` | Standalone build (copies `.next/static/` + `public/` into `.next/standalone/`) |
| `bun run start` | Production start from standalone build |
| `bun run lint` | ESLint (most rules disabled, this almost always passes) |
| `bun run db:push` | Push Prisma schema to SQLite DB |
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:migrate` | Run Prisma migrations |
| `bun run db:reset` | Reset migrations |

## Architecture facts

- **Single route** at `src/app/page.tsx`. No dynamic pages or layouts.
- **Data layer** in `src/lib/pizza-data.ts` (static, no DB). Menu items, testimonials, FAQs, nav links.
- **Cart state** via Zustand in `src/store/cart.ts`. WhatsApp order export `sendToWhatsApp()`.
- **Components**: `src/components/pizza-dash/` (11 app components), `src/components/ui/` (48 shadcn/ui primitives).
- **API**: only `src/app/api/route.ts` returns `{ message: "Hello, world!" }`.
- **Prisma schema** has `User` and `Post` models (SQLite). The pizza dash app does not use them.
- **Path alias** `@/` → `src/`.

## Notable config quirks

- `next.config.ts`: `output: "standalone"`, `typescript.ignoreBuildErrors: true`, `reactStrictMode: false`
- ESLint: nearly all rules disabled (@typescript-eslint, react, next, general JS). Do not waste time on lint fixes.
- Tailwind v4 via `@import "tailwindcss"` in `globals.css` (old `tailwind.config.ts` is unused).
- `components.json`: shadcn/ui "new-york" style, RSC enabled.
- Custom theme: colors `--color-char`, `--color-tomato`, `--color-semolina`, `--color-cheese`, `--color-basil`, `--color-crust`, etc. Fonts: Anton (display, `font-display`), Caveat (marker, `font-marker`), Plus Jakarta Sans (body, `font-sans`).

## Development flow

1. `bun install`
2. `bun run db:push` (creates/updates SQLite DB from Prisma schema)
3. `bun run dev` (dev server on :3000)

The script `.zscripts/dev.sh` automates all three steps plus health check and mini-services startup.

## Mini-services

Optional microservices in `mini-services/` (currently empty, only `.gitkeep`). Built via `.zscripts/mini-services-build.sh` which produces standalone JS bundles using `bun build --target bun`.

## Production deployment

- Caddyfile reverse-proxies `:81` → `:3000`, also supports `?XTransformPort=` for dynamic routing.
- Standalone build output goes into `.next/standalone/`. Production expects `./db/custom.db` at startup.
- `.zscripts/build.sh` creates a tarball with all artifacts + Caddyfile + start script.

## What is missing

- No test framework, no test files.
- No CI/CD configuration.
