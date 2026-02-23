# Modelo de Negócio

## Fluxos de Receita

### 1. Por Verificação

Cobrança por cada verificação realizada via API*. Modelo variável, adequado a clientes com volume esporádico, sazonal ou em fase de teste.

**Tabela de Preços (Pay-per-check)**

**Preços unitários (tabela)**
- **Verificação básica**: **R$ 3,90** por verificação
- **Verificação qualificada**: **R$ 12,90** por verificação

**O que cada nível cobre (definição comercial)**
- **Básica**: validação criptográfica e integridade da credencial (assinatura), resolução de DID*/issuer, checagens de formato/schema e registro de auditoria (consentimento + evento de verificação).
- **Qualificada**: tudo da básica **+** aplicação de política (ex.: exigir emissor qualificado/registrado), verificação de status/revogação quando disponível, e entrega de **pacote de evidências auditáveis** para compliance (logs e metadados do evento, sem armazenar conteúdo sensível da credencial).

**Descontos por volume (referência)**
- **Early adopter/pilotos**: **R$ 2,50** (básica) / **R$ 8,50** (qualificada)
- **10k–100k verificações/mês**: **R$ 1,90** (básica) / **R$ 6,90** (qualificada)
- **>100k verificações/mês**: preço **customizado** (referência: **R$ 1,20** / **R$ 4,50**), condicionado a SLA* e suporte

---

### 2. Assinatura

Planos mensais ou anuais com volume incluído e previsibilidade de custo. Ideal para operação contínua e metas de conversão (onboarding) com menor variação de custo.

**Planos de Assinatura (inclui volume + excedente)**

- **Plano Starter — R$ 7.500/mês**
  - Inclui: **2.000** verificações básicas + **200** verificações qualificadas / mês
  - Excedente: **R$ 2,50** (básica) / **R$ 8,50** (qualificada)

- **Plano Growth — R$ 29.000/mês**
  - Inclui: **10.000** verificações básicas + **1.000** verificações qualificadas / mês
  - Excedente: **R$ 1,90** (básica) / **R$ 6,90** (qualificada)

- **Plano Scale — sob proposta**
  - Indicado para **>100k verificações/mês**, múltiplas unidades de negócio e requisitos avançados de suporte/segurança
  - Inclui: volume negociado + excedente com tarifa decrescente + opções de SLA

**Condição anual (recomendado)**
- Pagamento anual com **15% de desconto** sobre o equivalente mensal, sujeito a mínimo de contrato.

---

### 3. SLA Enterprise

Contratos anuais com garantias de disponibilidade, suporte dedicado e integração assistida. Inclui volume negociado e preço por verificação adicional.

**Pacote Enterprise (referência)**
- **A partir de R$ 450.000/ano**
- Inclui: **200.000** verificações básicas + **20.000** verificações qualificadas / ano
- SLA: **99,9%** de uptime
- Suporte prioritário e governança de integração (integração assistida, playbooks operacionais, canais dedicados)
- Auditoria e relatórios de conformidade (evidências por evento, trilhas de auditoria e exportações)
- Excedente: **R$ 1,20** (básica) / **R$ 4,50** (qualificada), sujeito a volume e perfil de risco

---

## Estratégia de Precificação

### Fase Early Adopter (0–12 meses)

Preços abaixo do mercado para primeiros clientes, em troca de feedback, validação de casos de uso e referência. Objetivo: validação de produto, redução de fricção comercial e aceleração de tração inicial.

**Política comercial (prática)**
- Aplicar a tabela **Early adopter/pilotos** por 3–6 meses, com revisão ao atingir marcos (ex.: estabilidade de integração, volume mínimo e caso de uso validado).

### Estratégia de Free Trial (Créditos Promocionais)

Objetivo: reduzir fricção de adoção (integração + prova de valor), acelerar ciclos de venda e habilitar campanhas de marketing com CAC* controlado, preservando a percepção de valor do produto.

**Formato: créditos por uso (e não apenas “tempo grátis”)**
- Trial baseado em créditos de verificação, com validade definida.
- Permite controlar custo variável e reduzir abuso.

**Pacotes de créditos**
1) **Trial para campanhas de marketing (self-serve / growth)**
   - Créditos: **150 verificações básicas + 25 verificações qualificadas**
   - Validade: **90 dias**
   - Este pacote é suficiente para validar **1–2 jornadas completas** (integração + primeiro fluxo em sandbox/produção + avaliação de resultados).
   - Conversão: ao fim do trial, migra para pay-per-check ou assinatura (com opção de crédito bônus no 1º mês para incentivar upgrade).

2) **Trial para clientes estratégicos (ABM* / enterprise)**
   - Créditos: **1.500 verificações básicas + 250 verificações qualificadas**
   - Validade: **120 dias**
   - Este pacote é suficiente para um **piloto com amostra estatística** e avaliação operacional (performance, taxas de falha e requisitos de suporte/SLA).
   - Inclui: suporte de integração e desenho de caso de uso (escopo limitado).
   - Contrapartidas (quando aplicável): feedback estruturado, autorização para case study (mesmo anonimizado) e/ou referência.
   - Conversão: contrato anual/assinatura/SLA ao atingir limites ou ao concluir marcos (ex.: onboarding concluído + estabilidade da integração).

**Guardrails (anti-abuso e controle de custo)**
- Limites por conta/domínio e por tipo de verificação (básica vs. qualificada).
- Rate limit, detecção de padrão anômalo e bloqueio de múltiplas contas.
- Trial padrão em **sandbox**; acesso a produção condicionado a critérios mínimos (validação de domínio, caso de uso declarado, aceite de termos e conformidade).

**Medição de sucesso**
- Métricas: ativação (integração concluída), % contas com 1ª verificação, custo por conta ativada, conversão para pago, tempo até conversão, retenção 30/60/90/120 dias.
- Meta: usar trial como alavanca de aquisição sem “commoditizar” o produto; o valor é capturado na conversão e no aumento de LTV* via assinatura/SLA.

### Fase de Escalagem (12–36 meses)

Preços alinhados ao valor entregue (redução de custo vs. KYC* tradicional). Margens aumentam com volume e eficiência operacional. A estrutura prioriza assinaturas e contratos anuais para previsibilidade e retenção.

---

## Receita Recorrente vs. Baseada em Eventos

| Tipo | % Esperada (horizonte 24–36 meses) | Justificativa |
|------|-------------------------------------|---------------|
| **Recorrente** (assinatura + SLA) | **65%** | Base previsível; retenção e LTV; melhor planejamento de capacidade |
| **Por evento** (verificação) | **35%** | Onboarding e uso sazonal; porta de entrada para assinatura |

A meta é predominância de receita recorrente para previsibilidade e valorização.

---

## Escalabilidade

- **Custo marginal decrescente**: infraestrutura compartilhada; custo por verificação tende a cair com volume.
- **Sem proporcionalidade linear de custo**: operação não escala 1:1 com verificações (automação e padronização de integrações).
- **Efeito de rede**: mais emissores e verificadores aumentam valor para todos; potencial de lock-in positivo via interoperabilidade.

---

## Glossário (siglas e termos)

- **ABM**: Account-Based Marketing; estratégia comercial focada em contas-alvo.
- **API**: Application Programming Interface; interface para integração entre sistemas.
- **CAC**: Custo de Aquisição de Cliente.
- **DID**: Decentralized Identifier; identificador descentralizado.
- **KYC**: Know Your Customer; processo de verificação de identidade de clientes.
- **LTV**: Lifetime Value; valor do cliente ao longo do relacionamento (normalmente em margem bruta).
- **SLA**: Service Level Agreement; acordo de nível de serviço.