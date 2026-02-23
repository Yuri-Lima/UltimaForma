# @ultima-forma/shared

Biblioteca compartilhada entre o frontend (Angular) e o backend (NestJS). Contém tipos, DTOs e constantes usados por `apps/api` e `apps/web`.

## Conteúdo

- **Tipos** (`types/`): interfaces como `AuthUser`, `AuthResponse`
- **DTOs** (`dto/`): classes com `class-validator` para validação (`LoginDto`, `RegisterDto`, `MfaVerifyDto`, `RefreshDto`)
- **Constantes** (`constants/`): `API_BASE` (path base da API)

## Uso

```ts
// No frontend (Angular) ou backend (NestJS)
import {
  AuthUser,
  AuthResponse,
  LoginDto,
  RegisterDto,
  MfaVerifyDto,
  RefreshDto,
  API_BASE,
} from '@ultima-forma/shared';
```

## Building

```bash
pnpm nx build shared
```

O Nx compila a lib automaticamente quando `api` ou `web` são buildados (dependência implícita).

## Running unit tests

```bash
pnpm nx test shared
```

Os testes usam Vitest e cobrem validação dos DTOs e constantes.
