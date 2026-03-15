# Estratégia Regulatória

## GDPR e LGPD

Este capítulo considera os princípios do GDPR* e da LGPD* como referência para o desenho do modelo (minimização, consentimento e direitos do titular).

### Princípios Aplicáveis

- **Minimização de dados**: Coletamos apenas o necessário para operar a orquestração (ex.: logs de consentimento, metadados de transação; não conteúdo das credenciais).
- **Consentimento**: Toda verificação depende de consentimento explícito do titular; registramos evidência.
- **Direitos do titular**: Suportamos acesso, retificação, eliminação e portabilidade na medida em que processamos dados. O armazenamento principal é na carteira (wallet) do usuário.
- **Transferência internacional**: Se houver processamento em outra jurisdição, garantir mecanismos adequados (cláusulas padrão, decisões de adequação).

### Posicionamento

A Ultima Forma tende a atuar como **operador/processador** em relação aos verificadores (processando solicitações em seu nome) e como **facilitador** em relação aos titulares (sem armazenar o conteúdo de credenciais). Na prática, a qualificação de papéis (**controlador** vs. **operador/processador**) depende do desenho do produto, do fluxo específico (ex.: logs de consentimento e metadados) e dos contratos (MSA/DPA) com cada verificador e emissor, devendo ser confirmada com parecer jurídico por jurisdição.

---

## eIDAS 2.0 (se aplicável, Europa)

- O regulamento europeu estabelece requisitos para carteiras de identidade digital e atributos qualificados.
- Se operarmos na UE*: avaliar necessidade de qualificação como provedor de serviços de carteira ou de confiança.
- No Brasil: Gov.br e futuras iniciativas podem estabelecer padrões análogos; acompanhar evolução.

---

## AML/KYC

Em relação a obrigações AML* e processos de KYC*, a Ultima Forma atua como infraestrutura de orquestração; a responsabilidade de due diligence permanece com o verificador.

- **Não realizamos KYC**: Conectamos verificadores a credenciais; a decisão de aceitar uma credencial como suficiente para KYC é do verificador.
- **Responsabilidade do verificador**: Instituições financeiras e reguladas mantêm obrigações de due diligence. a Ultima Forma fornece dados attestados, não substitui o juízo de conformidade.
- **Auditoria**: Logs de consentimento e verificação permitem que verificadores demonstrem processo rastreável.

---

## Modelo de Armazenamento e Retenção

| Tipo de Dado | Onde Reside | Retenção |
|--------------|-------------|----------|
| **Credenciais** | Carteira do usuário | Sob controle do titular |
| **Logs de consentimento** | Plataforma | Conforme exigência legal (ex.: 5 anos para disputas) |
| **Metadados de verificação** | Plataforma | Operacional + conformidade; política definida |

Não mantemos repositório de credenciais, e a retenção limita-se a logs e metadados necessários.

---

## Modelo de Responsabilidade

- **Emissores**: Responsáveis pela qualidade e validade das credenciais emitidas.
- **Verificadores**: Responsáveis por decisões baseadas em credenciais (KYC, crédito, etc.).
- **Ultima Forma**: Responsável pela operação da orquestração, disponibilidade e conformidade de processamento (logs, consentimento). Não responsável por conteúdo das credenciais nem por decisões dos verificadores.

---

## Estratégia de Conformidade

- Parecer jurídico inicial sobre posicionamento regulatório
- Políticas de privacidade e termos de uso alinhados a LGPD/GDPR
- Processos de resposta a incidentes e solicitações de titulares
- Revisão periódica conforme mudanças regulatórias

---

## Glossário (siglas e termos)

- **AML**: Anti-Money Laundering; regras e controles de combate à lavagem de dinheiro.
- **eIDAS**: Regulamento europeu de identificação eletrônica e serviços de confiança.
- **GDPR**: General Data Protection Regulation; regulação europeia de proteção de dados.
- **KYC**: Know Your Customer; processo de verificação de identidade de clientes.
- **LGPD**: Lei Geral de Proteção de Dados (Brasil).
- **UE**: União Europeia.
