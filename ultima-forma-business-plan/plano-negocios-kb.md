# Plano de Negócios — Ultima Forma

Consolidação dos documentos do Plano de Negócios, organizados por tema.

---

## 1. Resumo Executivo

### Visão Geral

A Ultima Forma é uma infraestrutura neutra de orquestração de identidade e credenciais que conecta emissores, verificadores e usuários finais sem centralizar dados. A empresa oferece uma camada de consentimento e interoperabilidade que reduz custos de KYC, elimina redundância e devolve o controle de dados aos titulares. Empresas utilizam a API para realizar verificações de credenciais; usuários mantêm suas credenciais em carteiras soberanas e decidem o que compartilhar.

### Oportunidade de Mercado

O mercado de verificação de identidade e KYC está fragmentado, com custos operacionais elevados (estimativas de R$ 50–200 por verificação em fluxos tradicionais), inconsistência de dados entre sistemas e exposição a fraudes. Drivers regulatórios (eIDAS 2.0, GDPR, LGPD) e tecnológicos (W3C Verifiable Credentials, DID) criam janela de oportunidade para infraestrutura neutra baseada em consentimento.

### Por Que Agora

A regulamentação europeia eIDAS 2.0 estabelece padrões para carteiras de identidade digitais; o GDPR e a LGPD reforçam exigências de consentimento e minimização de dados. A adoção de credenciais verificáveis e identidade soberana passa de conceito para requisito de mercado. O momento é favorável para infraestrutura neutra antes que soluções proprietárias dominem o ecossistema.

### Visão do Produto

A solução contempla: (1) Carteira de Identidade para usuários finais, com armazenamento soberano e controle granular de compartilhamento; (2) Plataforma de Orquestração que conecta emissores, verificadores e carteiras; (3) API Enterprise para integração com sistemas legados e fluxos de KYC/AML.

### Modelo de Negócio

Receita por verificação, planos de assinatura para volumes médios e SLAs enterprise para grandes clientes. Prioridade inicial em receita recorrente via assinaturas, com componente variável por uso.

### Estágio da Empresa

Estágio atual: pré-operacional / pre-seed. Busca-se captação para validação técnica, primeiro piloto e estruturação comercial.

### Captação Solicitada

**[PLACEHOLDER: valor e rodada — ex.: R$ 2,5M em rodada pre-seed]**

**Posicionamento estratégico em uma frase:** A Ultima Forma é a infraestrutura neutra que orquestra credenciais de identidade com consentimento do titular, permitindo que empresas reduzam custos de KYC e usuários mantenham soberania sobre seus dados.

---

## 2. Visão, Missão e Valores

### Visão (Horizonte 10+ Anos)

A Ultima Forma imagina um cenário em que a identidade digital seja infraestrutura portátil e controlada pelo usuário: credenciais emitidas uma vez, reutilizáveis em múltiplos contextos, sempre com consentimento explícito. Empresas e governos interoperam por meio de padrões abertos; a fragmentação de identidade deixa de ser obstáculo estrutural. O modelo centralizado de "pedir tudo e guardar tudo" é substituído por verificação sob demanda, minimizando dados e maximizando privacidade.

### Missão (Horizonte 3 Anos)

Consolidar a Ultima Forma como referência em orquestração de credenciais no mercado alvo, com execução mensurável:

- Realizar [PLACEHOLDER: ex.: 500 mil] verificações por ano
- Fechar [PLACEHOLDER: ex.: 5–10] clientes enterprise em produção
- Estabelecer integrações com pelo menos [PLACEHOLDER: ex.: 3] emissores de credenciais de referência

### Valores Centrais

| Valor | Descrição |
|-------|-----------|
| **Neutralidade** | A infraestrutura não favorece emissores, verificadores ou carteiras específicas. O design é agnóstico; a escolha permanece com o ecossistema. |
| **Consentimento em Primeiro Lugar** | Nenhum dado é compartilhado sem consentimento explícito do titular. O consentimento é granular, revogável e auditável. |
| **Interoperabilidade** | A arquitetura adota padrões abertos (W3C Verifiable Credentials, DIDs) para garantir que credenciais e fluxos funcionem além de um único fornecedor. |
| **Privacidade por Design** | Minimização de dados, ausência de armazenamento centralizado de dados do usuário e garantias criptográficas são requisitos de arquitetura, não opções. |
| **Transparência** | Políticas de dados, fluxos técnicos e posicionamento regulatório são documentados e acessíveis. |

---

## 3. Declaração do Problema

### Problemas no Nível do Usuário

- **Fragmentação**: Usuários acumulam identidades em dezenas de sistemas. Não há portabilidade.
- **Redundância**: O mesmo indivíduo repete processos de verificação inúmeras vezes.
- **Perda de Controle**: Após enviar documentos, o usuário perde visibilidade e controle.
- **Riscos de Privacidade**: Bases centralizadas atraem ataques; vazamentos afetam milhões.

### Problemas no Nível Enterprise

- **Custo de KYC**: Entre [PLACEHOLDER: ex.: R$ 50–200] por verificação.
- **Fraude**: Documentos falsos, identidades roubadas, custos de detecção.
- **Inconsistência de Dados**: Dados duplicados em sistemas legados geram conflitos.
- **Ineficiência Operacional**: Ciclos longos de onboarding prejudicam conversão.

### Dor Econômica Estimada

| Dimensão | Estimativa | Premissa |
|----------|------------|----------|
| Custo médio por verificação (enterprise) | [PLACEHOLDER: ex.: R$ 80–150] | Ferramentas + operação |
| Tempo médio de onboarding (usuário) | [PLACEHOLDER: ex.: 15–45 min] | Por verificação |
| Custos de fraude (setor financeiro) | [PLACEHOLDER: % da receita] | Referência setorial |
| Retrabalho por inconsistência | [PLACEHOLDER: % operacional] | Baseado em estudos de mercado |

---

## 4. Tese de Mercado

### Por Que Este Mercado Existe

Verificação de identidade é necessidade estrutural em setores regulados e em transações digitais. Terceiros precisam confiar em atributos de identidade para decisões de crédito, onboarding e conformidade.

### Por Que Está Crescendo

- **Digitalização**: Transações migram para canais digitais.
- **Regulação**: eIDAS 2.0, LGPD, GDPR elevam exigências de consentimento e portabilidade.
- **Comportamento**: Usuários exigem mais controle sobre dados pessoais.
- **Economia**: Redução de custo por verificação gera interesse em novas abordagens.

### TAM, SAM e SOM

| Métrica | Descrição |
|---------|-----------|
| **TAM** | Mercado global de verificação de identidade e KYC. [PLACEHOLDER: ex.: US$ 15–25 bilhões até 2030, CAGR ~12–15%]. |
| **SAM** | Segmento acessível: FinTech, saúde, setor público em UE, Brasil, LATAM. [PLACEHOLDER: ~15–25% do TAM]. |
| **SOM** | Fatia realista nos primeiros 3–5 anos. [PLACEHOLDER: 0,5–2% do SAM em 36 meses]. |

---

## 5. Arquitetura da Solução

### Componentes Principais

1. **Carteira de Identidade**: Aplicação controlada pelo usuário; armazenamento descentralizado; consentimento granular.
2. **Plataforma de Orquestração**: Backend que conecta emissores, verificadores e carteiras sem centralizar dados.
3. **Emissores de Credenciais**: Governos, bancos, universidades; plataforma orquestra a conexão.
4. **API Enterprise**: Interface para integração de verificadores; fluxos de KYC/AML.

### Modelo de Consentimento

- Cada verificação exige consentimento explícito do titular.
- Consentimento específico: quais atributos, para qual verificador, em qual transação.
- Logs de consentimento mantidos para auditoria.

### Níveis de Confiança

| Nível | Descrição |
|-------|-----------|
| Emissor qualificado | Credenciais de entidades reguladas |
| Emissor registrado | Emissores cadastrados com processos auditados |
| Self-attested | Declarações do titular; uso em cenários de baixo risco |

---

## 6. O Que Somos e O Que Não Somos

### Somos

- **Infraestrutura Neutra**: Arquitetura agnóstica; escolha permanece com o ecossistema.
- **Camada de Consentimento**: Compartilhamento apenas com consentimento explícito e granular.
- **Motor de Interoperabilidade**: Conectamos sistemas que operam em silos.

### Não Somos

- **Banco**: Não captamos recursos nem oferecemos produtos financeiros.
- **Provedor de Crédito**: Não avaliamos risco de crédito.
- **Depósito Centralizado de Dados**: Não armazenamos credenciais.
- **Autoridade de Identidade**: Não emitimos identidades oficiais.

---

## 7. Modelo de Negócio

### Fluxos de Receita

1. **Por Verificação**: Cobrança por cada verificação via API.
2. **Assinatura**: Planos mensais/anuais (Starter, Growth, Scale).
3. **SLA Enterprise**: Contratos anuais com garantias, suporte dedicado e integração assistida.

### Estratégia de Precificação

- **Fase Early Adopter (0–12 meses)**: Preços abaixo do mercado para validação.
- **Fase de Escalagem (12–36 meses)**: Preços alinhados ao valor entregue.

### Meta de Receita Recorrente

[PLACEHOLDER: ex.: 60–70%] recorrente (assinatura + SLA); [PLACEHOLDER: ex.: 30–40%] por evento.

---

## 8. Go-To-Market

### Geografia Inicial

Brasil e LATAM selecionado (México, Colômbia). Expansão para UE em fase posterior.

### Vertical Inicial

**FinTech**: Alto volume de verificações, sensibilidade a custo e regulação.

### Primeiros 3 ICPs

1. **FinTech de Médio Porte**: 50–500 colaboradores; 5–50 mil verificações/ano.
2. **Banco Digital / Neobank**: Operação 100% digital; integração com múltiplos provedores.
3. **Empresa de Pagamentos / PSP**: Onboarding de comerciantes; requisitos AML/KYC.

### Parcerias Estratégicas

| Tipo | Exemplo | Objetivo |
|------|---------|----------|
| Emissor de credenciais | Gov.br, universidade, empregador | Disponibilizar credenciais demandadas |
| Integrador / consultoria | Empresas de TI | Canal de distribuição |
| Associações de setor | ABFintechs | Acesso a rede e credibilidade |
| Regulador | Sandboxes, grupos de trabalho | Alinhamento e visibilidade |

---

## 9. Roadmap 36 Meses

| Fase | Período | Foco |
|------|---------|------|
| **0** | 0–6 meses | MVP, validação técnica |
| **1** | 6–12 meses | 1 parceiro âncora, piloto |
| **2** | 12–24 meses | 5–10 clientes, escala |
| **3** | 24–36 meses | Expansão, Series A |

### Marcos Principais

- **Fase 0**: MVP orquestração, API Enterprise, integração 1 emissor, carteira mínima.
- **Fase 1**: 1 emissor em produção, fluxo end-to-end, parceiro âncora em piloto.
- **Fase 2**: 2–3 emissores, 5–10 clientes enterprise, contratos assinatura e SLA.
- **Fase 3**: Multi-região, expansão vertical, preparação Series A.

---

## 10. Estratégia de Tecnologia

### Arquitetura Core

- **Orquestrador**: Gerencia fluxos; não armazena credenciais.
- **Resolução de DID**: Resolve identificadores para endpoints.
- **API Gateway**: Autenticação, rate limiting, logging.

### Modelo Descentralizado

- Emissores mantêm sua infraestrutura de emissão.
- Carteiras sob controle do usuário.
- Orquestrador coordena; não é repositório de dados.

### Modelo Criptográfico

- Assinaturas digitais por emissores.
- DIDs para resolução.
- W3C Verifiable Credentials.

---

## 11. Estratégia Regulatória

### GDPR e LGPD

- Minimização de dados; consentimento; direitos do titular; transferência internacional.
- Ultima Forma atua como **processador** (verificadores) e **facilitador** (titulares).

### AML/KYC

- Não realizamos KYC; fornecemos dados attestados. Decisão de conformidade é do verificador.
- Logs de consentimento permitem auditoria rastreável.

### Modelo de Armazenamento

| Tipo de Dado | Onde Reside | Retenção |
|--------------|-------------|----------|
| Credenciais | Carteira do usuário | Sob controle do titular |
| Logs de consentimento | Plataforma | Conforme exigência legal |
| Metadados de verificação | Plataforma | Operacional + conformidade |

---

## 12. Panorama Competitivo

### Competidores Diretos

Empresas de orquestração de credenciais e carteiras de identidade. **Diferenciação**: Infraestrutura neutra; não centralizar dados; foco Brasil/LATAM com LGPD.

### Competidores Indiretos

- **Provedores de KYC Tradicional**: Coletam e armazenam documentos. Ultima Forma orquestra credenciais existentes.
- **Provedores de Autenticação**: SSO, MFA. Casos de uso distintos; possibilidade de integração.

### Lacuna Estratégica

Neutra, descentralizada, interoperável, focada em regulado. Competidores diretos poucos no Brasil/LATAM.

---

## 13. Moat e Defensibilidade

| Fator | Força | Premissa |
|-------|-------|----------|
| Efeitos de rede | Média–Alta | Cresce com adoção |
| Profundidade de integração | Média | Aumenta com clientes enterprise |
| Custo de troca | Média | Relevante em produção |
| Infraestrutura de confiança | Alta | Acumulativa, difícil de copiar |
| Posicionamento de marca | Média | Requer consistência e tempo |

### O Que Não É Moat

- Tecnologia isolada; primeiro-mover sem execução; regulação como barreira isolada.

---

## 14. Economia Unitária

### Custo por Verificação

| Componente | Estimativa |
|------------|------------|
| Infraestrutura (compute, storage, rede) | [PLACEHOLDER: ex.: R$ 0,50–2,00] |
| Resolução DID / orquestração | Incluso |
| Suporte / operação | [PLACEHOLDER: alocação proporcional] |

### Meta LTV:CAC

- LTV:CAC > 3:1
- Payback < 18 meses

---

## 15. Análise de Risco

| Risco | Prob. | Impacto | Mitigação Principal |
|-------|-------|---------|---------------------|
| Regulatório | Média | Alto | Parecer jurídico, design conservador |
| Adoção | Média | Alto | Piloto, ROI claro, flexibilidade |
| Big Tech | Média | Médio–Alto | Vertical regulado, rede, neutralidade |
| Tecnológico | Baixa–Média | Médio–Alto | Padrões, auditorias, arquitetura |
| Execução | Média | Alto | Roadmap, runway, métricas |

---

## 16. Estratégia de Captação

### Objetivos por Rodada

- **Pre-seed**: [PLACEHOLDER: R$ 2–3 milhões]; validação técnica, primeiro piloto. Runway 12–18 meses.
- **Seed**: [PLACEHOLDER: R$ 8–15 milhões]; escala de clientes, expansão de produto. Runway 18–24 meses.

### Plano de Contratação (Pre-seed)

1. Engenheiro backend / plataforma
2. Product / Tech Lead
3. Comercial / BD
4. Jurídico / Compliance (parcial)

### Investidores-Alvo

Funds early-stage (FinTech, identidade), angels com experiência em regulado, family offices.

---

## 17. Apêndice

### Diagramas Técnicos

**Fluxo de Emissão de Credencial:** Usuário → Orquestração → Emissor → Carteira → Usuário

**Fluxo de Verificação:** Verificador → Orquestração → Carteira → Usuário (consentimento) → Apresentação → Verificador

### Fluxos de Exemplo

- **Onboarding Bancário**: Gov.br credencial → Fintech solicita CPF/nome → Consentimento → Verificação
- **Qualificação Profissional**: Diploma universidade → Empresa solicita titulação → Fluxo análogo

### Glossário

| Termo | Definição |
|-------|-----------|
| Credencial verificável | Atestado digital assinado criptograficamente |
| DID | Decentralized Identifier |
| Emissor | Entidade que emite credenciais |
| Verificador | Entidade que solicita e recebe atestados |
| Carteira | Aplicação onde o titular armazena credenciais |
| Orquestração | Coordenação entre emissores, carteiras e verificadores |
| Apresentação | Credenciais compartilhadas em resposta a solicitação |
| KYC / AML | Know Your Customer / Anti-Money Laundering |

### Lacunas Críticas a Serem Resolvidas

1. Vertical inicial no Brasil
2. Tipo de MVP
3. Estratégia de validação comercial
4. Modelo de captação inicial
5. Estrutura jurídica da empresa

---

*Documento vivo; revisar periodicamente com evolução do produto e do mercado.*
