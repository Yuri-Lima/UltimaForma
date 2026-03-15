# Framework de Confiança

## Framework Público de Confiança

A Ultima Forma publica um framework de confiança que define como a confiança é estabelecida, verificada e mantida em todo o ecossistema. Este framework é público, versionado e governado por critérios transparentes — permitindo que qualquer participante compreenda e verifique as garantias de confiança do sistema.

---

## Componentes do Framework

### 1. Protocolo Aberto

- **Especificação publicada**: a especificação do protocolo está disponível publicamente, versionada e mantida com garantias explícitas de compatibilidade retroativa.
- **Versionamento semântico**: todas as alterações do protocolo seguem versionamento semântico. Mudanças incompatíveis exigem incrementos de versão major com guias de migração.
- **Governança pública**: alterações na especificação seguem um processo de proposta-revisão-aprovação com períodos de revisão comunitária. Decisões de governança são documentadas e publicamente acessíveis.
- **Implementação de referência**: as bibliotecas de verificação *open-source* servem como implementação de referência do protocolo, garantindo que a especificação e a implementação estejam sempre alinhadas.

### 2. Criptografia Pública

- **Operações auditáveis**: todas as operações criptográficas — validação de assinatura, resolução de *DID*, divulgação seletiva — são implementadas em código *open-source*. Nenhuma "caixa preta" proprietária executa funções críticas de segurança.
- **Algoritmos padrão**: o protocolo usa padrões criptográficos bem estabelecidos (Ed25519, secp256k1, BBS+ para divulgação seletiva) em vez de algoritmos proprietários ou novos.
- **Verificação independente**: qualquer parte pode verificar independentemente a autenticidade de credenciais usando as bibliotecas abertas sem depender da infraestrutura da Ultima Forma. A verificação não exige acesso à plataforma.
- **Transparência de chaves**: chaves públicas de emissores são resolvíveis por mecanismos padrão de resolução *DID*, garantindo que a confiança seja matematicamente verificável em vez de afirmada.

### 3. Componentes Auditáveis

- **Bibliotecas de verificação open-source**: a lógica central de verificação é pública. Pesquisadores de segurança, reguladores e clientes podem inspecionar cada linha de código que processa dados de identidade.
- **Auditorias de segurança contínuas**: os componentes *open-source* passam por auditorias de segurança regulares por firmas independentes. Relatórios de auditoria são publicados.
- **Programa de bug bounty**: o programa de bounty focado em segurança incentiva a divulgação responsável de vulnerabilidades na camada de confiança.
- **Builds reproduzíveis**: implantações de produção podem ser verificadas em relação ao código-fonte publicado, garantindo que o que roda em produção corresponda ao que foi auditado.

### 4. Certificação de Emissores

- **Critérios públicos**: o framework de confiança define critérios claros e públicos para níveis de confiança de emissores (Qualificado, Registrado, Autoatestado). Os critérios são baseados em status regulatório, histórico de auditoria, qualidade dos dados e práticas operacionais.
- **Pontuação transparente**: os níveis de confiança dos emissores são determinados por critérios publicados, não por processos internos opacos. Qualquer emissor pode entender o que é necessário para alcançar um determinado nível de confiança.
- **Métricas de qualidade de credenciais**: emissores são avaliados por taxas de rejeição de credenciais, atualidade dos dados, latência de resposta e conformidade com requisitos de schema. Emissores de alta qualidade conquistam posicionamento premium no ecossistema.
- **Revogação e descontinuação**: o framework define como os níveis de confiança dos emissores são revisados, rebaixados ou revogados — com devido processo, períodos de aviso e mecanismos de recurso.
- **Requisitos mínimos de segurança**: integração de um emissor não é apenas decisão técnica, mas de governança. O framework exige requisitos mínimos de segurança, critérios de onboarding, política de revogação e padrões operacionais. Emissores devem atender SLA de comunicação de incidentes e aceitar direito de auditoria. A segmentação por nível de confiança permite que verificadores definam quais emissores aceitam para cada tipo de atributo.

### 5. Integridade Sistêmica e Contenção

O framework prevê capacidade de kill switch operacional para pausar um emissor ou tipo de credencial em caso de incidente. A arquitetura identifica quais partes receberam determinada atualização, interrompe propagação adicional quando necessário e aciona workflows de remediação. Eventos suspeitos entram em quarentena antes da propagação. Essa capacidade de contenção e rollback é diferencial de governança da rede e reforça que a Ultima Forma não opera como roteador passivo.

---

## Como o Framework de Confiança Possibilita a Aceitação Regulatória

### Compatibilidade Transjurisdicional

O framework público de confiança é projetado para se alinhar com requisitos regulatórios em diversas jurisdições:

| Regulamentação | Alinhamento com o Framework de Confiança |
|----------------|------------------------------------------|
| **LGPD** (Brasil) | Transparência de consentimento, minimização de dados, direitos do titular, lógica de processamento pública |
| **GDPR** (Europa) | Proteção de dados por design, direito à auditoria, transparência do processador |
| **eIDAS 2.0** (Europa) | Framework de serviços de confiança, atestação eletrônica qualificada, certificação de carteiras |
| **AML/KYC** | Certificação de emissores, níveis de confiança de credenciais, requisitos de trilha de auditoria |

Reguladores podem referenciar o framework de confiança em orientações regulatórias, reduzindo a carga de conformidade para empresas que adotam o protocolo. Isso cria uma vantagem regulatória: empresas que usam o protocolo da Ultima Forma podem demonstrar conformidade por meio do framework de confiança publicado em vez de construir documentação de conformidade personalizada.

### Inspeção Regulatória

O framework de confiança permite que reguladores:

- Inspecionem a especificação do protocolo sem exigir cooperação do fornecedor
- Auditem o código de verificação *open-source* independentemente
- Revisem critérios de certificação de emissores e atribuições de nível de confiança
- Verifiquem que o sistema opera conforme documentado por meio de builds reproduzíveis

Este nível de transparência é impossível por design com sistemas de identidade fechados, criando uma preferência regulatória por infraestrutura de protocolo aberto.

---

## Como Terceiros Constroem sobre o Framework de Confiança

O framework público de confiança permite serviços de terceiros que estendem o ecossistema:

- **Serviços de auditoria**: firmas de auditoria independentes podem certificar emissores de credenciais contra os critérios do framework de confiança, criando um mercado para certificação de confiança
- **Ferramentas de conformidade**: empresas de tecnologia de conformidade podem construir ferramentas de monitoramento automatizado que referenciam os requisitos do framework de confiança
- **Produtos de seguro**: provedores de seguro cibernético podem usar conformidade com o framework de confiança como critério de subscrição, criando incentivos econômicos para adoção
- **Tecnologia regulatória**: empresas de regtech podem construir ferramentas de relatório que mapeiam conformidade com o framework de confiança para requisitos regulatórios específicos

Cada serviço de terceiros construído sobre o framework de confiança aumenta o valor do ecossistema e cria incentivos adicionais de adoção.

---

## Evolução do Framework de Confiança

| Fase | Marco do Framework de Confiança |
|------|--------------------------------|
| **Fase 0** (0–6 meses) | Framework de confiança v0.1 publicado; critérios de certificação de emissores definidos para níveis Qualificado e Registrado |
| **Fase 1** (6–12 meses) | Framework de confiança v1.0; primeiras certificações de emissores concluídas; engajamento regulatório no Brasil |
| **Fase 2** (12–24 meses) | Alinhamento transjurisdicional (LGPD + eIDAS 2.0); serviços de auditoria de terceiros iniciam |
| **Fase 3** (24–36 meses) | Modelo de governança de fundação para o framework de confiança; referências regulatórias internacionais |

---

## Glossário (siglas e termos)

- **AML**: Anti-Money Laundering; regras e controles para combater lavagem de dinheiro.
- **DID**: Decentralized Identifier; identificador descentralizado.
- **eIDAS**: Regulamentação europeia sobre identificação eletrônica e serviços de confiança.
- **GDPR**: General Data Protection Regulation; regulamentação europeia de proteção de dados.
- **KYC**: Know Your Customer; processo de verificação de identidade do cliente.
- **LGPD**: Lei Geral de Proteção de Dados (Brasil).
- **W3C**: World Wide Web Consortium; órgão de padronização (ex.: Verifiable Credentials).
