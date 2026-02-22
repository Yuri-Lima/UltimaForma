# Economia Unitária

## Premissas e Metodologia

As estimativas abaixo utilizam premissas coerentes com o modelo de receita e preços definidos em "Business Model" (pay-per-check, assinatura e SLA*). São valores realistas para uma plataforma de verificação/orquestração via API*, com custo marginal baixo e custos fixos relevantes (confiabilidade, segurança, observabilidade e operação). Devem ser recalibradas com dados de pilotos (custos reais de cloud, mix de verificações e esforço de suporte).

---

## Custo por Verificação

O COGS* por verificação é composto por (i) infraestrutura e observabilidade (compute, banco, logs, tráfego, WAF*/rate-limit), (ii) persistência de trilhas de auditoria e metadados (sem armazenar conteúdo sensível), e (iii) uma alocação proporcional de operação (SRE*/on-call) e suporte técnico (sobretudo para clientes enterprise e integrações profundas).

**Estimativa de COGS variável (por verificação)**

| Tipo | Faixa de volume do cliente | Infra + observabilidade + auditoria (R$/check) | Operação/suporte alocado (R$/check) | **COGS total (R$/check)** |
|------|----------------------------|-----------------------------------------------:|------------------------------------:|--------------------------:|
| **Básica** | até 10k/mês | 0,22 | 0,18 | **0,40** |
| **Básica** | 10k–100k/mês | 0,14 | 0,10 | **0,24** |
| **Básica** | >100k/mês | 0,08 | 0,07 | **0,15** |
| **Qualificada** | até 10k/mês | 0,55 | 0,35 | **0,90** |
| **Qualificada** | 10k–100k/mês | 0,35 | 0,25 | **0,60** |
| **Qualificada** | >100k/mês | 0,22 | 0,18 | **0,40** |

**Notas**
- **Básica** tende a ser dominada por custo de logs/auditoria e throughput estável.
- **Qualificada** adiciona custo de políticas, verificações de status/revogação quando disponíveis e geração/entrega de evidências (mais I/O, logs e processamento).
- A parcela “operação/suporte” **não cresce linearmente com volume** (automação e padronização), mas varia conforme o perfil do cliente e o nível de SLA.

**Meta:** Custo unitário decrescente com volume (economia de escala).

---

## Custo de Infraestrutura

**Base fixa (0–12 meses, pré-escala)**
- **Cloud + observabilidade + segurança**: **R$ 18.000–35.000/mês**
  - Inclui: ambientes (prod + staging), banco gerenciado, filas/eventos, storage de logs/auditoria, monitoramento/alertas, WAF/rate limiting e backups.
- **Operação (on-call/SRE parcial) e suporte técnico**: **R$ 25.000–55.000/mês** (alocação parcial do time, conforme número de clientes ativos e complexidade das integrações).

**Em escala**
- A infraestrutura cresce com throughput, mas o **custo por verificação cai** (eficiência, negociação com cloud, otimizações e amortização de custos fixos).
- Contratos com SLA e múltiplos tenants podem exigir **redundância adicional** (multi-AZ/multi-region), elevando o fixo — compensado por preço/contrato enterprise.

---

## Potencial de Margem Bruta

Para facilitar comparação, usamos **mix de volume** típico em verificação: **90% básica / 10% qualificada** (o mix real varia por vertical).

| Cenário (referência da sessão “Business Model”) | Preço médio (R$/check) | COGS médio (R$/check) | **Margem Bruta** |
|---|---:|---:|---:|
| **Early adopter/pilotos** (2,50 / 8,50) | 3,10 | 0,45 | **85%** |
| **Tabela** (3,90 / 12,90) | 4,80 | 0,55 | **89%** |
| **10k–100k/mês** (1,90 / 6,90) | 2,40 | 0,30 | **88%** |
| **>100k/mês** (1,20 / 4,50) | 1,53 | 0,20 | **87%** |

Planos de assinatura e SLA tendem a ter margem maior por incluir valor de suporte e previsibilidade.

---

## LTV (Lifetime Value)

Abaixo, LTV* é apresentado como **LTV de margem bruta** (receita recorrente × margem bruta × tempo de vida), por ser a forma mais útil para comparar com CAC*.

**Premissas comuns**
- **Margem bruta**: 80% (Starter), 82% (Growth), 85% (Enterprise/SLA)
- **Vida útil média (conservador)**: 24–36 meses (Starter), 30–42 meses (Growth), 36–60 meses (Enterprise)
- **Retenção**: logo retention tende a aumentar conforme integrações aprofundam; expansão (NRR*) é esperada via crescimento de volume e novos casos de uso.

| Segmento (âncora de pricing) | Receita recorrente típica | Margem bruta | Vida útil | **LTV (margem bruta)** |
|---|---:|---:|---:|---:|
| **Starter** (R$ 7.500/mês) | R$ 7.500/mês | 80% | 24–36m | **R$ 144.000–216.000** |
| **Growth** (R$ 29.000/mês) | R$ 29.000/mês | 82% | 30–42m | **R$ 713.000–998.000** |
| **Enterprise/SLA** (≥ R$ 450.000/ano) | R$ 37.500/mês | 85% | 36–60m | **R$ 1,15M–1,91M** |

---

## CAC (Custo de Aquisição de Cliente)

CAC é apresentado como **custo total para fechar e ativar** (marketing + vendas + pré-vendas + parte do esforço de onboarding), e varia fortemente por segmento.

**Premissas**
- Ciclo de venda: 1–3 meses (Starter), 3–6 meses (Growth), 6–9 meses (Enterprise)
- Estratégia early adopters reduz CAC via referências, pilotos e ABM* seletivo, com suporte de integração como parte do “custo de venda”.

| Segmento | **CAC estimado** | Observação |
|---|---:|---|
| **Starter** | **R$ 20.000–35.000** | Inside sales + onboarding padronizado |
| **Growth** | **R$ 60.000–110.000** | Vendas consultivas + SE* + piloto |
| **Enterprise/SLA** | **R$ 180.000–320.000** | ABM, segurança/compliance, jurídico e integração assistida |

---

## LTV:CAC e Payback

**Meta (saudável para SaaS B2B)**
- **LTV:CAC**: **≥ 3:1** (alvo: 4–6:1 em segmentos enterprise/recorrentes)
- **Payback**: **≤ 12 meses** (alvo: 6–9 meses quando a base recorrente amadurecer)

**Payback estimado (por margem bruta mensal)**

| Segmento | Margem bruta mensal típica | CAC (faixa) | **Payback estimado** |
|---|---:|---:|---:|
| **Starter** | R$ 6.000 | R$ 20.000–35.000 | **3–6 meses** |
| **Growth** | R$ 23.780 | R$ 60.000–110.000 | **3–5 meses** |
| **Enterprise/SLA** | R$ 31.875 | R$ 180.000–320.000 | **6–10 meses** |

Valores serão calibrados com dados reais de vendas e retenção.

---

## Glossário (siglas e termos)

- **ABM**: Account-Based Marketing; estratégia comercial focada em contas-alvo.
- **API**: Application Programming Interface; interface para integração entre sistemas.
- **CAC**: Custo de Aquisição de Cliente.
- **COGS**: Cost of Goods Sold; custo direto para entregar o serviço (custos variáveis e alocações operacionais).
- **LTV**: Lifetime Value; valor do cliente ao longo do relacionamento (normalmente em margem bruta).
- **NRR**: Net Revenue Retention; retenção líquida de receita na base de clientes (inclui expansão e perdas).
- **SE**: Sales Engineer; profissional de pré-vendas técnico.
- **SLA**: Service Level Agreement; acordo de nível de serviço.
- **SRE**: Site Reliability Engineering; disciplina de confiabilidade/operabilidade de sistemas.
- **WAF**: Web Application Firewall; camada de proteção contra ataques em aplicações web.
