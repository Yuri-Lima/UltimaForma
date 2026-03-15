# Go-To-Market

## Geografia Inicial

**Brasil e LATAM selecionado**

A América Latina tem ampliado e atualizado seus marcos de proteção de dados, com leis e autoridades em diferentes níveis de maturidade e escopo. Por isso, tratamos "LATAM selecionado" como expansão para mercados com **regulação de privacidade relevante** e com ecossistema regulado/digital em crescimento, avaliando país a país no processo de entrada (e não como uma lista fixa).

Referências públicas para comparação por jurisdição:
- DLA Piper — [Data Protection Laws of the World](https://www.dlapiperdataprotection.com/)
- IAPP — [Data protection laws in Latin America – an overview](https://iapp.org/news/a/data-protection-laws-in-latin-america-an-overview)

Mercado com LGPD em vigor, ecossistema FinTech em expansão e oportunidade de primeiro-mover em orquestração de credenciais. Expansão para UE* (eIDAS*) em fase posterior, conforme recursos e parcerias.

---

## Vertical Inicial

**FinTech**: Instituições financeiras e fintechs com necessidade intensa de KYC*, onboarding digital e conformidade AML*. Alto volume de verificações, sensibilidade a custo e regulação. Piloto com 1–2 referências abre portas para o segmento.

---

## Primeiros 3 ICPs (Ideal Customer Profiles)

Os ICPs* abaixo definem os perfis iniciais com maior probabilidade de adoção e ROI.

### ICP 1: FinTech de Médio Porte
- **Atributos**: 50–500 colaboradores; volume 5–50 mil verificações/ano; foco em onboarding digital
- **Dor**: Custo de KYC elevado; tempo de conversão longo
- **Gatilho**: Busca de redução de custo e melhoria de conversão

### ICP 2: Banco Digital ou Neobank
- **Atributos**: Operação 100% digital; volume alto de novos clientes; exigências regulatórias (BACEN*)
- **Dor**: Integração com múltiplos provedores de KYC; inconsistência de dados
- **Gatilho**: Simplificação de stack e padronização de fluxos

### ICP 3: Empresa de Pagamentos ou PSP
- **Atributos**: Onboarding de comerciantes e usuários; requisitos AML/KYC; operação como PSP*
- **Dor**: Fraude, retrabalho manual, custo por transação
- **Gatilho**: Automação e credenciais reutilizáveis

---

## Parcerias Estratégicas

| Tipo | Exemplo | Objetivo |
|------|---------|----------|
| **Emissor de credenciais** | Instituições financeiras consolidadas, Telecoms, Utilities, Governo | Disponibilizar credenciais que verificadores demandam |
| **Integrador / consultoria** | Empresas de TI, consultorias regulatórias | Canal de distribuição e implementação |
| **Associações de setor** | ABFintechs, outras associações | Acesso a rede e credibilidade |
| **Regulador** | Participação em sandboxes, grupos de trabalho | Alinhamento e visibilidade |

---

## Canais de Distribuição

- **Venda direta**: Equipe comercial para enterprise; ciclos de 3–6 meses
- **Parcerias**: Integradores e consultorias levam solução ao cliente final
- **Demand generation**: Conteúdo, eventos, webinars sobre identidade digital e KYC
- **Developer-led growth**: SDKs open-source e bibliotecas de verificação no GitHub impulsionam adoção bottom-up. Desenvolvedores descobrem o produto, constroem integrações e geram demanda dentro de suas organizações

### Canal Developer-Led Growth

O canal de desenvolvedores opera em paralelo com vendas enterprise e parcerias. Segue o modelo comprovado por Stripe, Twilio e Plaid:

1. **Descoberta**: Desenvolvedores encontram bibliotecas de verificação open-source no GitHub, npm, PyPI ou através de conteúdo técnico
2. **Adoção**: Desenvolvedores instalam o SDK, validam credenciais localmente e constroem integrações no sandbox
3. **Advocacia interna**: Desenvolvedores que comprovaram a tecnologia tornam-se defensores internos para adoção comercial
4. **Conversão enterprise**: A equipe de vendas engaja organizações onde desenvolvedores já validaram o produto

Este canal reduz CAC ao criar demanda pré-qualificada e encurta ciclos de venda enterprise ao fornecer validação técnica antes de conversas comerciais começarem.

---

## Sequenciamento de Cold-Start

Toda empresa de infraestrutura que redefiniu uma categoria enfrentou a objeção de cold-start. A Twilio convenceu operadoras de telecom a abrir acesso programático. A Plaid fez scraping de dados bancários antes de existirem parcerias formais. O PIX enfrentou resistência dos bancos brasileiros antes de processar mais transações que cartões de crédito e débito combinados em dois anos.

O problema de cold-start é inerente a toda jogada de infraestrutura. A questão não é se ele existirá, mas se o sequenciamento é crível e a proposta de valor é forte o suficiente para que a adoção se torne autorreforçadora.

**Estratégia de sequenciamento:** A Ultima Forma começa pelas instituições mais valiosas e reputadas — grandes bancos e telecoms — porque suas credenciais carregam a maior confiança, sua participação sinaliza legitimidade e elas têm o incentivo econômico mais forte (maiores custos de KYC, maior pressão regulatória). As primeiras 1–2 integrações de emissores desbloqueiam os primeiros pilotos de verificadores. Os primeiros pilotos de verificadores geram dados que aceleram a próxima conversa com emissores. O flywheel é lento no início e depois muito rápido.

**Resiliência a adoção mais lenta.** Se a integração de emissores levar o dobro do tempo projetado, a reserva de capital estende o runway em aproximadamente 3 meses. Os primeiros 1–2 clientes verificadores podem operar como design partners em condições de custo reduzido, gerando dados de integração e validação de caso de uso enquanto o pipeline de emissores amadurece.

---

## Abordagem Piloto Fase 1

- Identificar 1 parceiro âncora disposto a piloto em condições favoráveis
- Escopo limitado: fluxo específico (ex.: verificação de documento + selfie)
- Metas mensuráveis: tempo de integração, volume de verificações, satisfação
- Objetivo: caso de sucesso documentado e depoimento para prospecção

---

## Estratégia de Venda Enterprise

- Entrada via decisor técnico ou de produto; aprovação de compliance e jurídico
- Prova de valor: ROI* vs. custo atual de KYC; conformidade com LGPD
- Ciclo: descoberta → prova de conceito → proposta comercial → contrato
- Retenção: sucesso do cliente, métricas de uso, renovação de SLA*

---

## Glossário (siglas e termos)

- **AML**: Anti-Money Laundering; regras e controles de combate à lavagem de dinheiro.
- **BACEN**: Banco Central do Brasil.
- **CAC**: Customer Acquisition Cost; custo de aquisição de clientes.
- **eIDAS**: Regulamento europeu de identificação eletrônica e serviços de confiança.
- **ICP**: Ideal Customer Profile; perfil de cliente ideal.
- **KYC**: Know Your Customer; processo de verificação de identidade de clientes.
- **LATAM**: América Latina.
- **LGPD**: Lei Geral de Proteção de Dados (Brasil).
- **PSP**: Payment Service Provider; provedor de serviços de pagamento.
- **ROI**: Return on Investment; retorno sobre investimento.
- **SDK**: Software Development Kit; conjunto de ferramentas para construir sobre uma plataforma.
- **SLA**: Service Level Agreement; acordo de nível de serviço.
- **UE**: União Europeia.
