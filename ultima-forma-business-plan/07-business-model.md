# Modelo de Negócio

## Fluxos de Receita

### 1. Por Verificação

Cobrança por cada verificação realizada via API. Modelo variável, adequado a clientes com volume esporádico ou em fase de teste.

**Estrutura sugerida:**
- [PLACEHOLDER: ex.: R$ X por verificação básica; R$ Y por verificação qualificada]
- Desconto progressivo por faixas de volume

### 2. Assinatura

Planos mensais ou anuais com inclusão de volume de verificações. Adequado a empresas com volume previsível e necessidade de previsibilidade de custo.

**Estrutura sugerida:**
- Plano Starter: [PLACEHOLDER: ex.: até N verificações/mês]
- Plano Growth: [PLACEHOLDER: ex.: até M verificações/mês]
- Plano Scale: volume customizado

### 3. SLA Enterprise

Contratos anuais com garantias de disponibilidade, suporte dedicado e integração assistida. Inclui volume negociado e preço por verificação adicional.

**Elementos típicos:**
- SLA de uptime (ex.: 99,9%)
- Suporte prioritário
- Integração com sistemas legados
- Auditoria e relatórios de conformidade

---

## Estratégia de Precificação

### Fase Early Adopter (0–12 meses)

Preços abaixo do mercado para primeiros clientes, em troca de feedback, casos de uso e referência. Objetivo: validação de produto e tração inicial.

### Fase de Escalagem (12–36 meses)

Preços alinhados ao valor entregue (redução de custo vs. KYC tradicional). Margens aumentam com volume e eficiência operacional.

---

## Receita Recorrente vs. Baseada em Eventos

| Tipo | % Esperada (horizonte 24–36 meses) | Justificativa |
|------|-------------------------------------|---------------|
| **Recorrente** (assinatura + SLA) | [PLACEHOLDER: ex.: 60–70%] | Base previsível; retenção e LTV |
| **Por evento** (verificação) | [PLACEHOLDER: ex.: 30–40%] | Cresce com adoção; margem sobre custo variável |

A meta é predominância de receita recorrente para previsibilidade e valorização.

---

## Escalabilidade

- **Custo marginal decrescente**: Infraestrutura compartilhada; custo por verificação tende a cair com volume.
- **Sem proporcionalidade linear de custo**: Operação não escala 1:1 com verificações (automação, batch processing).
- **Efeito de rede**: Mais emissores e verificadores aumentam valor para todos; potencial de lock-in positivo via interoperabilidade.
