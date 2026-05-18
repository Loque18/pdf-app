# External API Structure

## Overview
External API calls live under `src/lib/api/apis` and are accessed through the shared `api` container in `src/lib/api/api.ts`. This keeps HTTP details out of services and keeps DTOs centralized.

## Folder Layout
- `src/lib/api/api.ts`: exports the `api` object used by services.
- `src/lib/api/apis/<api-name>.api.ts`: implementation with `axios` calls.
- `src/lib/api/apis/<api-name>.dto.ts`: request/response DTOs for that API.
- `src/lib/api/endpoints.ts`: centralized map of endpoint paths.

## Usage Pattern
Services import from `@lib/api/api` and call the specific client:

```ts
import { api } from "@lib/api/api";

const funding = await api.pacifica.getFunding(account);
```

## Adding a New API
1. Create `src/lib/api/apis/<api-name>.dto.ts` with the response/request types.
2. Implement `src/lib/api/apis/<api-name>.api.ts` using `axios`.
3. Register the client in `src/lib/api/api.ts`.
4. Use the client from services; avoid direct `axios` calls in modules.

## Example
Example client:
- Implementation: `src/lib/api/apis/example.api.ts`
- DTOs: `src/lib/api/apis/example.dto.ts`
