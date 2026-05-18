# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js app with a modular layout. Key paths:
- `src/app`: app shell, layouts, and routing.
- `src/modules`: feature modules (pages, windows, or non-UI features). Module pattern: `<module>.service`, `<module>.context`, `<module>.template`.
- `src/ui`: shared UI components and infrastructure (`src/ui/infra`).
- `src/lib`: shared libraries, platform code, and external API adapters (`src/lib/apis`).
- `public`: static assets.
- `guidelines`: project-specific standards (structure, API, workflow).

## Build, Test, and Development Commands
- `npm run dev`: start local development server.
- `npm run build`: create a production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint checks.

## Coding Style & Naming Conventions
- Language: TypeScript with React and Next.js.
- Formatting: follow ESLint and Prettier configuration (`eslint.config.mjs`, `.prettierrc`).
- Indentation: 2 spaces (default Prettier).
- Modules: use the `<module>.service`, `<module>.context`, `<module>.template` pattern in `src/modules`.
- Imports: prefer path aliases like `@modules/*`, `@lib/*`, `@ui/*` (see `tsconfig.json`).

## Testing Guidelines
No test framework is configured yet. If tests are added, keep them close to features (e.g., `src/modules/<feature>/__tests__`) and document the chosen runner in this file. For now, validate with `npm run lint` and manual QA.

## Commit & Pull Request Guidelines
Recent commit history suggests Conventional Commits (e.g., `feat: ...`, `refactor: ...`). Use that format for new commits.
PRs should include:
- A clear summary of changes.
- Any UI screenshots for layout changes.
- Notes on commands run (e.g., `npm run lint`).

## API & Architecture Notes
- External API calls live under `src/lib/apis` and are accessed via `src/lib/api.ts`.
- Avoid calling `axios` directly in modules; use the shared `api` container.
- Follow the branching workflow in `guidelines/workflow.md` (`feature/*` -> `dev` -> `staging` -> `main`).
