# Instructions

This file provides quick, repository-specific instructions for working with the Midwest Medical Delivery template.

## Project Purpose
- Full-stack Cloudflare Workers + React application template.
- Uses a single Durable Object (DO) for persistent storage via a custom abstraction layer.
- Includes frontend UI scaffolding, shared TypeScript types, and demo backend entities.

## Development
1. Install dependencies:
   ```bash
   bun install
   ```
2. Start development server:
   ```bash
   bun dev
   ```
3. Build production assets:
   ```bash
   bun build
   ```
4. Preview production locally:
   ```bash
   bun preview
   ```

## Key Files
- `src/main.tsx` - App router setup and page registration.
- `src/pages/` - Frontend pages for the application.
- `src/components/` - UI and shared layout components.
- `worker/index.ts` - Worker entrypoint and route registration.
- `worker/user-routes.ts` - API route definitions.
- `worker/entities.ts` - Durable Object entity definitions.
- `worker/core-utils.ts` - DO storage abstraction (do not modify).
- `shared/types.ts` - Shared API/data type definitions.
- `shared/mock-data.ts` - Demo seed data (replace with real data).

## Important Rules
- Do not modify `wrangler.jsonc` or worker bindings.
- Do not directly access Durable Objects; use the provided abstractions.
- Keep frontend routes and error boundaries as configured.
- Replace demo pages, mock data, and demo API routes with your real application logic.

## LLM Coding Guidelines
### 1. Think Before Coding
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them instead of choosing silently.
- If a simpler approach exists, say so and prefer it.
- If something is unclear, stop and name what is confusing.

### 2. Simplicity First
- Implement only what was asked.
- Avoid abstractions for single-use code.
- Do not add configurability or extra behavior that wasn’t requested.
- Do not handle impossible scenarios.
- Prefer shorter, readable code over a longer solution.

### 3. Surgical Changes
- Touch only what is necessary.
- Do not improve unrelated adjacent code, comments, or formatting.
- Match existing style.
- Remove only imports/variables/functions that your changes introduced and made unused.
- Do not delete pre-existing dead code unless asked.

### 4. Goal-Driven Execution
- Turn tasks into verifiable goals.
- Define success criteria before changing code.
- For multi-step work, state a brief plan and verify each step.

## Tips
- Use existing ShadCN UI components in `src/components/ui/*`.
- Use `@/` path aliases for imports.
- Keep business logic in route handlers and entities instead of raw Worker bindings.
- Follow the patterns in `worker/core-utils.ts` and `worker/user-routes.ts` for new endpoints.

## Where to Look Next
- `README.md` for overall project description and deployment guidance.
- `prompts/usage.md` for development and architectural notes.
- `prompts/selection.md` for template selection guidance.
