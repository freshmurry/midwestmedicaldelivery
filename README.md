# Cloudflare Workers React Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/freshmurry/midwestmedicaldelivery)

A production-ready full-stack application template powered by Cloudflare Workers. Features a React frontend with modern UI components and a serverless backend using Durable Objects for persistent entity storage (e.g., Users, ChatBoards, Messages). Perfect for building scalable, real-time apps with end-to-end type safety.

## Features

- **Serverless Backend**: Hono-based API with Cloudflare Durable Objects for stateful entities and indexes.
- **Persistent Storage**: One Durable Object instance per entity with automatic indexing for listing/pagination.
- **Modern Frontend**: React 18, Vite, Tanstack Query, shadcn/ui, Tailwind CSS.
- **Type-Safe**: Shared types between frontend and backend; full TypeScript support.
- **Demo Entities**: Users, ChatBoards (with embedded messages) – easily extendable.
- **Development Workflow**: Hot reload, type generation, Bun-powered scripts.
- **Production-Ready**: CORS, logging, error handling, client error reporting.
- **Responsive Design**: Dark/light themes, mobile-friendly, animations.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide icons
- **State/Data**: Tanstack Query, Zustand, Immer
- **UI/UX**: Radix UI, Framer Motion, Sonner (toasts), Headless UI
- **Tools**: Bun, Wrangler, ESLint, Tailwind CSS Animate
- **Other**: React Router, React Hook Form, Zod validation

## Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo>
   cd <your-repo>
   bun install
   ```

2. **Development**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

3. **Type Generation** (for Workers env):
   ```bash
   bun cf-typegen
   ```

## Development

- **Frontend**: Edit `src/` – hot reloads automatically.
- **Backend Routes**: Add to `worker/user-routes.ts` (auto-reloads in dev).
- **Entities**: Extend `worker/entities.ts` using `IndexedEntity` base class.
- **Build**:
  ```bash
  bun build  # Builds frontend assets
  ```
- **Preview**:
  ```bash
  bun preview
  ```
- **Lint**:
  ```bash
  bun lint
  ```

### API Endpoints (Demo)

- `GET /api/users` – List users (paginated)
- `POST /api/users` – Create user `{ name: string }`
- `GET /api/chats` – List chats
- `POST /api/chats` – Create chat `{ title: string }`
- `GET/POST /api/chats/:chatId/messages` – List/send messages
- `DELETE /api/users/:id`, `/api/chats/:id`
- `POST /api/users/deleteMany { ids: string[] }`

Full API responses: `{ success: boolean; data?: T; error?: string }`.

### Customization

- **Sidebar**: Edit `src/components/app-sidebar.tsx` or remove from layout.
- **Theme**: Toggle via `ThemeToggle`; persists in localStorage.
- **Error Reporting**: Auto-captures client errors to `/api/client-errors`.
- **Shared Types**: `shared/types.ts` & `shared/mock-data.ts`.

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun run deploy
```

Requires Wrangler authentication (`wrangler login`) and a Cloudflare account.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/freshmurry/midwestmedicaldelivery)

**Notes**:
- Assets served as SPA (single-page application).
- Durable Objects persist data across deploys (SQLite-backed).
- Custom domain: Update `wrangler.jsonc`.

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Build for production |
| `bun preview` | Local production preview |
| `bun deploy` | Build + deploy to Cloudflare |
| `bun lint` | Run ESLint |
| `bun cf-typegen` | Generate Worker types |

## Local Testing

- Seed data auto-loads on first API call (e.g., `/api/users`).
- Use `curl` or browser dev tools for API testing.

## Contributing

1. Fork & clone.
2. `bun install`.
3. Make changes, `bun lint`.
4. PR with clear description.

## License

MIT. See [LICENSE](LICENSE) for details.