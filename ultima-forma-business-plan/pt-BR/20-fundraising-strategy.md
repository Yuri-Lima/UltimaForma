# Estratégia de Captação

## Tese de Investidor em Infraestrutura

A Ultima Forma é uma jogada de infraestrutura, não uma aplicação. A empresa está construindo a camada de orquestração de identidade — análogo ao que Stripe construiu para pagamentos, Plaid para dados financeiros, Twilio para comunicações e Cloudflare para infraestrutura web.

Investimentos em infraestrutura compartilham características que os tornam atraentes para funds especializados:

- **Dinâmicas winner-take-most.** Efeitos de rede em infraestrutura criam posições de mercado defensáveis. A primeira plataforma a reunir massa crítica em um segmento de mercado torna-se o padrão.
- **Fossos compostos.** Cada novo participante (emissor, verificador, desenvolvedor, usuário de carteira) aumenta o valor da rede para todos os demais. O fosso cresce com o ecossistema, não contra ele.
- **Alavancagem do protocolo aberto.** O protocolo aberto cria uma superfície de adoção que concorrentes proprietários não conseguem igualar. Adoção de desenvolvedores, aceitação regulatória e crescimento do ecossistema de terceiros aceleram porque a camada de confiança é aberta.
- **Altas margens brutas em escala.** Margens brutas de infraestrutura (85%+) se compõem com volume conforme custos fixos se amortizam sobre base de transações crescente.
- **Longos tempos de vida do cliente.** Infraestrutura enterprise é profundamente integrada e difícil de substituir, produzindo alto LTV e baixo churn.

**Resultados comparáveis em infraestrutura:** Stripe (avaliação US$ 65B+), Plaid (avaliação US$ 13B+), Twilio (market cap US$ 15B+ no pico), Cloudflare (market cap US$ 30B+). Essas empresas compartilham o mesmo padrão: infraestrutura neutra, ferramentas abertas para desenvolvedores, rede proprietária, efeitos de rede compostos.

---

## Objetivos por Rodada

### Pre-seed

**Meta:** **R$ 3,5 milhões**

**Objetivo:** Entregar MVP de produção, fechar pilotos pagos e estruturar a base comercial para recorrência (assinatura e primeiros contratos anuais). Publicar bibliotecas de verificação open-source e wallet SDK.

**Runway* alvo:** **16–18 meses** (assumindo burn médio de ~**R$ 220 mil/mês**, com rampa de contratações)

### Seed

**Meta:** **R$ 12 milhões**

**Objetivo:** Escalar aquisição e retenção, consolidar contratos anuais e preparar a empresa para Series A com métricas de eficiência (LTV:CAC, payback) e previsibilidade de receita. Crescer comunidade de desenvolvedores e base de parceiros do ecossistema.

**Runway* alvo:** **18–24 meses** (burn médio **R$ 480–550 mil/mês**, com expansão comercial e de engenharia)

---

## Alocação de Capital (Pre-seed)

| Categoria | % Aproximado | Uso |
|-----------|--------------|-----|
| **Produto / Engenharia** | **45%** | MVP em produção, políticas de verificação (básica/qualificada), trilhas de auditoria, observabilidade, hardening de segurança, releases de bibliotecas open-source |
| **Comercial** | **25%** | Prospecção e vendas consultivas (pilotos), materiais e playbooks, primeiras contratações de BD*/AE* e pré-vendas técnico (parcial) |
| **Operações / Jurídico** | **10%** | LGPD e governança de dados, contratos (MSA*/DPA*), SLAs iniciais, estrutura financeira/contábil |
| **Reserva** | **20%** | Contingência, variação cambial/infra, e extensão de runway se ciclos de venda alongarem |

**Valores de referência (sobre R$ 3,5M)**
- **Produto / Engenharia (45%)**: **R$ 1,58M**
- **Comercial (25%)**: **R$ 875k**
- **Operações / Jurídico (10%)**: **R$ 350k**
- **Reserva (20%)**: **R$ 700k**

---

## Premissas de Runway*

- **Burn rate mensal estimado (médio): R$ 220 mil/mês**
  - Rampa típica: **R$ 180 mil/mês** (meses 1–3) → **R$ 250 mil/mês** (meses 10–18)
  - Compatível com a base fixa de cloud/observabilidade/segurança e operação parcial descrita na sessão "Unit Economics", com crescimento conforme clientes e SLAs
- **Contratados em pre-seed (time núcleo): 6 FTE** (com 1–2 posições opcionais por tração)
- **Receita (conservador, mas não "zero"):** primeiros clientes pagantes a partir de **M6–M9**, com foco em **assinatura Starter/Growth** e pilotos com preço early adopter. Design partners (sem receita) podem preceder clientes pagantes em 3–6 meses.
- **Margem bruta:** alta desde o início (COGS variável baixo), mas **burn** é dominado por time, confiabilidade e aquisição/vendas (go-to-market) (conforme sessão "Unit Economics")

### Detalhamento do Burn Rate (Pre-seed)

| Categoria | M1–M3 (R$/mês) | M4–M9 (R$/mês) | M10–M18 (R$/mês) |
|-----------|----------------:|----------------:|------------------:|
| **Pessoas (CLT fully loaded)** | **110.000** | **140.000** | **170.000** |
| **Cloud + observabilidade + segurança** | **20.000** | **25.000** | **32.000** |
| **Jurídico / compliance** | **15.000** | **15.000** | **12.000** |
| **Comercial (ferramentas, viagens, eventos)** | **10.000** | **18.000** | **20.000** |
| **Outros (escritório, contábil, diversos)** | **10.000** | **12.000** | **16.000** |
| **Total** | **~165.000** | **~210.000** | **~250.000** |

**Nota sobre custo CLT:** O emprego CLT brasileiro adiciona aproximadamente 70–100% de overhead ao salário base (contribuição patronal INSS, FGTS, 13º salário, férias + 1/3, provisão para rescisão). Os custos de pessoas acima refletem custos CLT totalmente carregados para 4 contratações em M1–M3, escalando para 6 FTE até M4–M9. A rampa assume contratações escalonadas alinhadas a marcos de entrega (engenharia primeiro, depois comercial e jurídico).

---

## Marcos Esperados (Pre-seed → Seed)

- **Produto**: MVP em produção com trilhas de auditoria e verificação **básica** e **qualificada** estabilizadas, automação mínima de operação (alertas, limitação de taxa, evidências por evento). Biblioteca de verificação open-source e wallet SDK publicados no GitHub.
- **Tração**: **3–6 clientes pagantes** (mix de pilotos + pelo menos **1–2** assinaturas), com pelo menos **1 caso de uso replicável** (playbook).
- **Receita**: início de recorrência, com meta de **MRR* R$ 40–80k** ao final do período (conservador), priorizando qualidade de base e retenção.
- **Eficiência**: primeiros sinais de LTV:CAC saudável (principalmente em Starter/Growth), ainda com CAC em calibragem.
- **Ecossistema de desenvolvedores**: bibliotecas open-source publicadas com comunidade inicial (500+ estrelas no GitHub, 100+ usuários do sandbox).

---

## Plano de Contratação (Pre-seed)

| Prioridade | Perfil | Objetivo |
|------------|--------|----------|
| 1 | Engenheiro backend / plataforma | Core da API*, performance, trilha de auditoria e reforço de segurança |
| 2 | Engenheiro full-stack / integrações | SDKs, experiência do desenvolvedor (DX), templates de integração e console básico |
| 3 | Product / Tech Lead | Arquitetura, priorização e entrega orientada a casos de uso |
| 4 | Comercial (BD*/AE*) | Pilotos, primeiros contratos de assinatura e pipeline |
| 5 | Pré-vendas técnico (SE) — parcial ou consultor | Acelerar integrações e encurtar ciclo de venda |
| 6 | Jurídico / Compliance — parcial | Contratos, LGPD e requisitos de clientes regulados |

---

## Uso dos Recursos (Seed, quando aplicável)

**Tese do Seed:** Transformar tração inicial em **receita recorrente previsível** (assinaturas e contratos anuais), mantendo eficiência de aquisição (payback) e elevando barreiras competitivas via confiabilidade, evidências auditáveis, integrações e ecossistema de desenvolvedores em crescimento.

**Alocação indicativa (Seed)**

| Área | % | Exemplos de uso |
|---|---:|---|
| **Produto / Engenharia** | **48%** | Escalabilidade, alta disponibilidade, SLAs, automação operacional (SRE), integrações, expansão do pacote qualificado, manutenção do ecossistema open-source |
| **Comercial** | **28%** | Time dedicado (AE + SE), playbooks por vertical, expansão Growth e início de Enterprise/SLA |
| **Developer Relations / Comunidade** | **7%** | Advocacia de desenvolvedores, documentação, hackathons, gestão de comunidade, manutenção open-source |
| **Marketing / Geração de demanda** | **10%** | ABM seletivo, conteúdo técnico/compliance, parcerias, eventos de indústria |
| **Operações / Jurídico / Compliance** | **7%** | Segurança, contratos enterprise, auditorias, governança |

**Valores de referência (sobre R$ 12M)**
- **Produto / Engenharia (48%)**: **R$ 5,76M**
- **Comercial (28%)**: **R$ 3,36M**
- **Developer Relations / Comunidade (7%)**: **R$ 840k**
- **Marketing / Geração de demanda (10%)**: **R$ 1,20M**
- **Operações / Jurídico / Compliance (7%)**: **R$ 840k**

**Metas de resultado ao fim do Seed (referência)**
- **ARR**: **R$ 2–6 milhões** (o limite inferior assume ciclos de venda 50% mais longos que o projetado, e o limite superior assume que o efeito de rede se compõe no ano 2)
- **Mix de receita:** progressão para predominância de recorrente (assinatura + anual/SLA), alinhado à sessão de "Business Model".
- **Carteira:** **20–30 clientes pagantes**, com **3–5 enterprise/anuais** e base Growth como principal motor de ARR
- **Eficiência:** LTV:CAC **≥ 3:1** e payback **≤ 12 meses** (âncoras na sessão "Unit Economics")
- **Ecossistema de desenvolvedores:** 2.000+ estrelas no GitHub, 10.000+ downloads mensais do SDK, 500+ desenvolvedores ativos no sandbox

---

## Investidores-Alvo

- **Funds com foco em infraestrutura**: funds que investem em empresas de nível de protocolo, infraestrutura de API e plataformas para desenvolvedores (a16z infrastructure, funds seed com foco em infraestrutura)
- **Funds de deep tech**: focados em empresas de nível de protocolo e open-source com efeitos de rede
- Funds de early-stage com foco em FinTech, identidade ou infraestrutura
- Angels com experiência em regulado ou identidade digital
- Family offices com apetite para tecnologia e tese B2B de longo prazo
- Corporate venture e estratégicos (quando fizer sentido) em setores intensivos em KYC/compliance

---

## Observações de Consistência (Base do Plano)

- Os valores acima foram calibrados para serem **compatíveis** com a estrutura de preços da sessão "Business Model" e com os custos e margens da sessão "Unit Economics".
- O plano assume que o custo variável por verificação permanece baixo (margem bruta alta), e que o principal determinante de runway é **time + confiabilidade + go-to-market + ecossistema de desenvolvedores**.

---

## Glossário (siglas e termos)

- **API**: Application Programming Interface; interface para integração entre sistemas.
- **BD**: Business Development; desenvolvimento de negócios/parcerias.
- **AE**: Account Executive; executivo de contas (conduz a venda e fechamento de contratos).
- **DX**: Developer Experience; qualidade da interação do desenvolvedor com ferramentas, documentação e APIs.
- **MSA**: Master Service Agreement; contrato-mestre de prestação de serviços.
- **DPA**: Data Processing Addendum; aditivo/termo de tratamento de dados (proteção de dados e obrigações entre as partes).
- **MRR**: Monthly Recurring Revenue; receita recorrente mensal.
- **ARR**: Annual Recurring Revenue; receita recorrente anual.
- **FinTech**: empresa de tecnologia financeira.
- **MVP**: Minimum Viable Product; versão mínima do produto para validar hipóteses com clientes.
- **Pre-seed/Seed/Series A**: estágios típicos de captação (da validação inicial até expansão).
- **Runway**: tempo que a empresa consegue operar com o caixa disponível, dado o burn rate.
- **SRE**: Site Reliability Engineering; disciplina de confiabilidade/operabilidade de sistemas.
