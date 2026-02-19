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

## Estrutura do Projeto

- **[docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)** — Plano de implementação técnica (Nx, NestJS, Angular, PGVector, OpenAI, MFA, etc.) com controle de progresso

```
ultima-forma-business-plan/   # Plano de negócio completo
├── 01-executive-summary.md
├── 02-vision-mission-values.md
├── 03-problem-statement.md
├── 04-market-thesis.md
├── 05-solution-architecture.md
├── 06-what-we-are-and-are-not.md
├── 07-business-model.md
├── 08-go-to-market.md
├── 09-roadmap-36-months.md
├── 10-technology-strategy.md
├── 11-regulatory-strategy.md
├── 12-competitive-landscape.md
├── 13-moat-and-defensibility.md
├── 14-unit-economics.md
├── 15-risk-analysis.md
├── 16-fundraising-strategy.md
└── 17-appendix.md
```
