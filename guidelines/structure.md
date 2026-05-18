# Project Structure

This project uses a modular layout where "modules" are not limited to pages. A module can be a page, a complex window (isolated app area like chat or developer tools), or a non-UI feature (e.g., a worker/service).

## High-level layout

- `src/main.tsx`: Application entry point.
- `src/app`: App shell, pages container, and router configuration.
  - `src/app/root`: Router configuration.
  - `src/app/layouts`: App-level layouts.
- `src/modules`: Feature modules (pages, windows, complex features).
  - Module pattern: `<module>.service`, `<module>.context`, `<module>.template`.
  - Module subviews and page sections should live inside a `_sections` folder.
  - Modals live inside modules and are not considered modules themselves.
- `src/lib`: Shared libraries and platform code.
  - `src/lib/infra`: Third-party adapters/providers (db, web3, etc.).
  - `src/lib/platform`: Internal technology stacks and capabilities.
- `src/ui`: UI components and layouts.
  - `src/ui/infra`: App infrastructure components.
    - `src/ui/infra/app.context`: Injects all providers (3rd-party and internal).
    - `src/ui/infra/app.init`: Runs init-time side effects and optional loading UI.

## Aliases

TypeScript path aliases (configured in `tsconfig.app.json`):

- `@modules/*` → `src/modules/*`
- `@lib/*` → `src/lib/*`
- `@ui/*` → `src/ui/*`
