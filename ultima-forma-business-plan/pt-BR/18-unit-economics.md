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

### Visão de COGS Totalmente Carregado

As margens acima refletem "margem bruta de infraestrutura" — apenas COGS variável (compute, storage, observabilidade). Uma visão "totalmente carregada" inclui custos que são reais mas não capturados no COGS por verificação:

| Custo adicional | Estimativa | Amortização |
|-----------------|------------|-------------|
| Manutenção de integração com emissores | R$ 80–200k por emissor | Ao longo do volume anual esperado de verificação desse emissor |
| Sales engineering por deal enterprise | R$ 30–60k por cliente | Ao longo do valor do contrato de 12 meses |
| Custo de compliance/auditoria por cliente | R$ 15–30k/ano por cliente enterprise | Ao longo do contrato anual |

**Margem bruta totalmente carregada (estágio inicial):** 55–70%, melhorando para 75–85% em escala conforme custos fixos são amortizados em volume crescente e integrações com emissores atendem throughput de verificação crescente.

### Impacto da Camada de Incentivo ao Ecossistema

Durante o crescimento inicial da rede, a plataforma implementa uma camada de incentivo decrescente (ver seção "Modelo de Negócio"): revenue share com emissores (R$ 1,00 por verificação na Fase 1, decrescendo até zero na Fase 3) e cashback para usuários (R$ 1,00 para os primeiros 10 usos por credencial). Quando esses incentivos se aplicam, reduzem a receita líquida da plataforma por verificação e, portanto, a margem bruta efetiva.

| Cenário | Incentivos por check | Receita líquida plataforma (básica padrão, R$ 3,90) | Margem bruta efetiva |
|---------|----------------------|------------------------------------------------------|----------------------|
| **Fase 3 / steady-state** (sem incentivos) | -- | R$ 3,35 | 86% |
| **Fase 2** (emissor R$ 0,50, sem cashback) | R$ 0,50 | R$ 2,85 | 73% |
| **Fase 1** (emissor R$ 1,00, após 10 usos) | R$ 1,00 | R$ 2,35 | 60% |
| **Fase 1** (emissor R$ 1,00, primeiros 10 usos) | R$ 2,00 (emissor + usuário) | R$ 1,35 | 35% |

A camada de incentivo é uma mecânica temporária de crescimento que declina em três fases. O cashback do usuário expira após 10 usos por credencial. O revenue share com emissores diminui de R$ 1,00 (Fase 1, primeiros 3–5 emissores) para R$ 0,50 (Fase 2) até zero (Fase 3). As cifras de LTV e CAC neste documento assumem margens em steady-state. Durante o crescimento inicial, as margens reais sobre receita por evento podem ser menores quando os custos de incentivo se aplicam.

As cifras de COGS ao longo deste documento são estimativas modeladas com base em plataformas de infraestrutura de API comparáveis. Serão validadas e recalibradas com dados de pilotos em produção.

---

## LTV (Lifetime Value)

Abaixo, LTV* é apresentado como **LTV de margem bruta** (receita recorrente × margem bruta × tempo de vida), por ser a forma mais útil para comparar com CAC*.

**Premissas comuns**
- **Margem bruta**: 80% (Starter), 82% (Growth), 85% (Enterprise/SLA)
- **Vida útil média (conservador)**: 24–36 meses (Starter), 30–42 meses (Growth), 36–60 meses (Enterprise)
- **Retenção**: logo retention tende a aumentar conforme integrações aprofundam. Expansão (NRR*) é esperada via crescimento de volume e novos casos de uso.

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

**Meta (saudável para SaaS B2B em verticais reguladas)**
- **LTV:CAC**: **≥ 3:1** (benchmark de mercado para SaaS B2B maduro: 3–5x)
- **Payback**: **≤ 12 meses** (meta: 6–9 meses quando a base recorrente amadurecer)

Todas as premissas abaixo são modeladas e devem ser validadas com dados da primeira coorte. Taxas de churn, CAC real e expansão de ARPU serão medidos a partir dos primeiros clientes pagantes e recalibrados trimestralmente.

**Payback estimado (por margem bruta mensal)**

| Segmento | Margem bruta mensal típica | CAC (faixa) | **Payback estimado** |
|---|---:|---:|---:|
| **Starter** | R$ 6.000 | R$ 20.000–35.000 | **3–6 meses** |
| **Growth** | R$ 23.780 | R$ 60.000–110.000 | **3–5 meses** |
| **Enterprise/SLA** | R$ 31.875 | R$ 180.000–320.000 | **6–10 meses** |

**Meta de NRR:** 110–120% ao final do período seed, impulsionada por expansão de volume dos clientes (mais verificações conforme a base de clientes cresce) e adoção de novos tipos de credencial ao longo do tempo.

Valores serão calibrados com dados reais de vendas e retenção.

---

## Caminho para Breakeven de Margem de Contribuição

Custos fixos mensais (infraestrutura + operações): R$ 43–90k/mês. Volume de verificação necessário para cobrir custos fixos em cada fase de incentivo (mix 90% básica / 10% qualificada):

| Fase | Receita líquida plataforma por verificação | Volume mensal para cobrir R$ 65k de custos fixos |
|------|----------------------------------------:|--------------------------------------------------:|
| Fase 1 (primeiros 10 usos) | R$ 1,35 | ~48.000 verificações |
| Fase 1 (após 10 usos) | R$ 2,35 | ~28.000 verificações |
| Fase 2 | R$ 2,85 | ~23.000 verificações |
| Fase 3 (steady-state) | R$ 3,35 | ~19.000 verificações |

Durante a Fase 1, a empresa é financiada por equity, não por receita de verificação. Receita de assinatura e SLA fornece base recorrente que reduz dependência da margem por verificação.

---

## Economia de Integração de Emissores

| Componente de custo | Estimativa | Observação |
|--------------------|------------|------------|
| Esforço de engenharia | R$ 50–120k | 2–4 pessoa-meses para desenvolvimento e testes de integração |
| BD / jurídico / compliance | R$ 20–50k | Desenvolvimento de relacionamento, contratos, revisão de segurança |
| Manutenção contínua | R$ 15–30k/ano | Atualizações de schema, versionamento de API, suporte |
| **Total por emissor** | **R$ 80–200k** | Amortizado ao longo do volume anual esperado de verificação |

Com 10k verificações/mês de um emissor, o custo de integração é amortizado em 3–8 meses com pricing padrão.

---

## Métricas Operacionais (Metas a Validar)

| Categoria | Métrica | Meta |
|-----------|---------|------|
| Ativação de trial (integração concluída) | 40–60% | Benchmarks de produto API / ferramenta de desenvolvedor |
| Conversão trial-to-paid | 15–25% | Benchmarks de SaaS B2B produto API |
| Conversão piloto-to-assinatura | 50–70% | Benchmarks de infraestrutura enterprise |
| Cobertura de credenciais (taxa de sucesso de verificação) | 10–30% no lançamento, 60%+ com 5 emissores | Cresce com integrações de emissores |
| NRR | 110–120% ao final do seed | Expansão de volume + novos tipos de credencial |

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
