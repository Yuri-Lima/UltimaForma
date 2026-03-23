# Ultima Forma

> Infraestrutura neutra de orquestração de identidade e credenciais que conecta emissores, verificadores e usuários finais sem centralizar dados.

## Visão em Uma Frase

A Ultima Forma é a infraestrutura neutra que orquestra credenciais de identidade com consentimento do titular, permitindo que empresas reduzam custos de KYC e usuários mantenham soberania sobre seus dados.

---

## Oportunidade

- **Mercado fragmentado**: custos de R$ 50–200 por verificação em fluxos tradicionais
- **Regulamentação**: eIDAS 2.0, GDPR e LGPD impulsionam adoção de identidade soberana
- **Momento**: janela antes que soluções proprietárias dominem o ecossistema

---

## Solução

| Componente | Descrição |
|------------|-----------|
| **Carteira de Identidade** | Armazenamento soberano, controle granular de compartilhamento, padrões W3C |
| **Plataforma de Orquestração** | Conecta emissores, verificadores e carteiras sem centralizar dados |
| **API Enterprise** | Integração com sistemas legados e fluxos KYC/AML |

**Princípios**: consentimento explícito, zero-knowledge, sem armazenamento centralizado.

---

## Modelo de Negócio

- **Por verificação**: cobrança variável por evento
- **Assinatura**: planos mensais/anuais com volume incluído (Starter, Growth, Scale)
- **SLA Enterprise**: contratos anuais com uptime, suporte dedicado e integração assistida

Meta: predominância de receita recorrente (assinatura + SLA).

---

## Estágio

**Pré-operacional / pre-seed** — busca captação para validação técnica, primeiro piloto e estruturação comercial.

---

## Desenvolvimento Local

→ **Guia completo**: [docs/COMO_RODAR.md](docs/COMO_RODAR.md)

```bash
pnpm install
# Terminal 1 - API (requer Postgres e Redis)
pnpm run start:api
# Terminal 2 - Frontend
pnpm run start:web
# Terminal 3 - Worker (opcional)
pnpm run start:worker
```

**Migrações**:
```bash
pnpm run db:migration:run
```

## Estrutura do Projeto

- **[docs/COMO_RODAR.md](docs/COMO_RODAR.md)** — Guia completo para rodar o projeto em desenvolvimento e produção
- **[docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)** — Plano de implementação técnica (Nx, NestJS, Angular, PGVector, OpenAI, MFA, etc.) com controle de progresso

Monorepo Nx:

- `apps/api` — Backend NestJS (REST + GraphQL)
- `apps/web` — Frontend Angular
- `apps/worker` — Worker NestJS (BullMQ)
- `libs/shared` — Tipos, DTOs e constantes compartilhados (`@ultima-forma/shared`)

```
ultima-forma-business-plan/   # Plano de negócio completo (por idioma: en/, pt-BR/, ...)
├── 01-executive-summary.md
├── 02-vision-mission-values.md
├── …
├── 09-technology-strategy.md
├── 10-business-model.md
├── 11-go-to-market.md
├── 14-competitive-landscape.md
├── 15-infrastructure-moat.md
├── 17-regulatory-strategy.md
├── 18-unit-economics.md
├── 19-risk-analysis.md
├── 20-fundraising-strategy.md
├── 21-roadmap-36-months.md
└── 22-appendix.md
```
(Outros documentos de apoio também existem em `en/` e `pt-BR/`, por exemplo `ultima-forma-vc-plan.md` e `plano-negocios-kb.md`.)
