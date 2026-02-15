# Estratégia Regulatória

## GDPR e LGPD

### Princípios Aplicáveis

- **Minimização de dados**: Coletamos apenas o necessário para operar a orquestração (ex.: logs de consentimento, metadados de transação; não conteúdo das credenciais).
- **Consentimento**: Toda verificação depende de consentimento explícito do titular; registramos evidência.
- **Direitos do titular**: Suportamos acesso, retificação, eliminação e portabilidade na medida em que processamos dados; o armazenamento principal é na carteira do usuário.
- **Transferência internacional**: Se houver processamento em outra jurisdição, garantir mecanismos adequados (cláusulas padrão, decisões de adequação).

### Posicionamento

A Ultima Forma atua predominantemente como **processador** em relação aos verificadores (processa solicitações em seu nome) e como **facilitador** em relação aos titulares (não armazena credenciais). A qualificação precisa ser confirmada com parecer jurídico em cada jurisdição.

---

## eIDAS 2.0 (se aplicável, Europa)

- O regulamento europeu estabelece requisitos para carteiras de identidade digital e atributos qualificados.
- Se operarmos na UE: avaliar necessidade de qualificação como provedor de serviços de carteira ou de confiança.
- No Brasil: Gov.br e futuras iniciativas podem estabelecer padrões análogos; acompanhar evolução.

---

## AML/KYC

- **Não realizamos KYC**: Conectamos verificadores a credenciais; a decisão de aceitar uma credencial como suficiente para KYC é do verificador.
- **Responsabilidade do verificador**: Instituições financeiras e reguladas mantêm obrigações de due diligence; a Ultima Forma fornece dados attestados, não substitui o juízo de conformidade.
- **Auditoria**: Logs de consentimento e verificação permitem que verificadores demonstrem processo rastreável.

---

## Modelo de Armazenamento e Retenção

| Tipo de Dado | Onde Reside | Retenção |
|--------------|-------------|----------|
| **Credenciais** | Carteira do usuário | Sob controle do titular |
| **Logs de consentimento** | Plataforma | Conforme exigência legal (ex.: 5 anos para disputas) |
| **Metadados de verificação** | Plataforma | Operacional + conformidade; política definida |

Não mantemos repositório de credenciais; retenção limita-se a logs e metadados necessários.

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
