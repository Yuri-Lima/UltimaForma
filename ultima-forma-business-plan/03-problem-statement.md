# Declaração do Problema

## Problemas no Nível do Usuário

### Fragmentação

Usuários acumulam identidades e credenciais em dezenas de sistemas: bancos, governos, provedores de saúde, plataformas de trabalho. Cada relação exige novo cadastro, documentos e validação. Não há portabilidade: uma credencial emitida em um contexto não é reutilizada em outro.

### Redundância

O mesmo indivíduo repete processos de verificação (documento, selfie, comprovante) inúmeras vezes. Diferentes fontes indicam que brasileiros realizam em dezenas de milhares de verificações de identidade por ano em contextos distintos, cada uma com custo de tempo e exposição de dados.

Dados divulgados pelo Governo Federal indicam que a Assinatura GOV.BR registrou mais de **95 milhões** de assinaturas digitais apenas no primeiro semestre de 2025 ([fonte](https://www.gov.br/gestao/pt-br/assuntos/noticias/2025/julho/uso-da-assinatura-gov-br-cresce-90-no-primeiro-semestre-de-2025)).

Perda de tempo/burocracia (77%): Estatística comumente citada em estudos (pesquisa realizada em 2022 pela Unico - empresa de identidade digital - em parceria com o Instituto Locomotiva) sobre transformação digital e desburocratização no Brasil (como o Índice de Confiança Digital), refletindo a fricção em processos que exigem prova de vida ou identidade presencial.

### Perda de Controle

Após enviar documentos e dados, o usuário perde visibilidade e controle. Não sabe quem acessa o que, por quanto tempo, nem como revogar. A assimetria de poder favorece o coletor de dados.

### Riscos de Privacidade

Bases centralizadas atraem ataques; vazamentos afetam milhões de titulares. Quanto mais dados centralizados, maior o alvo. A economia atual incentiva acúmulo, não minimização.

---

## Problemas no Nível Enterprise

### Custo de KYC

Para clientes de varejo (PF), o processo tradicional de KYC* custa entre R$ 40 e R$ 100 por verificação quando considerados tempo operacional, ferramentas e retrabalho. Empresas com alto volume de onboarding arcam com custos significativos e margens reduzidas.

Clientes Corporativos (PJ): Para empresas, o processo é muito mais caro devido à análise de quadros societários e beneficiários finais. Pesquisas indicam que uma revisão de KYC para um cliente comercial pode custar, em média, mais de USD 2,500 (aprox. R$ 12,500).

### Fraude

Documentos falsos, identidades roubadas e ataques de síntese elevam custos de detecção e recuperação. Sistemas fragmentados dificultam verificação cruzada e consistência.

Pela arquitetura proposta (wallet + credenciais verificáveis + emissores confiáveis + consentimento auditável), causamos um impacto profundo no sucesso das fraudes, principalmente dos seguintes tipos:

Fraude de identidade sintética

* CPF/SSN válido + dados falsos
* Contas abertas com identidade parcialmente inventada

Reuso de identidade roubada

* Dados vazados usados para abrir contas
* Engenharia social baseada em cadastro desatualizado

Manipulação cadastral

* Alteração fraudulenta de endereço
* Troca de telefone/email para takeover de conta

Documentos falsificados

* RG/Passaporte adulterado
* Selfie spoofing

### Inconsistência de Dados

Dados duplicados em sistemas legados geram conflitos, atualizações manuais e erros. Um mesmo titular pode constar com CPF ou endereço diferente em silos distintos.

 Projetos de Master Data Management (MDM*) representam investimentos recorrentes e significativos para grandes empresas, frequentemente ultrapassando milhões de reais em implementação, integração e manutenção.

Esses projetos têm como objetivo consolidar e reconciliar informações críticas de clientes e fornecedores que foram coletadas de forma fragmentada ao longo do tempo por múltiplos sistemas, canais e unidades de negócio.

No entanto, o MDM atua majoritariamente na consolidação posterior dos dados, tratando sintomas como duplicidade, inconsistência e desatualização, sem resolver o problema estrutural: a identidade digital nasce descentralizada, redundante e dependente de múltiplas coletas independentes.

Como consequência:

* Cada empresa mantém sua própria base de identidade
* Processos de KYC são repetidos para os mesmos indivíduos
* Atualizações cadastrais dependem de ações manuais
* Reconciliações de dados se tornam operações contínuas
* Custos de qualidade de dados tornam-se recorrentes, não pontuais

Mesmo após investimentos substanciais em MDM, as organizações continuam enfrentando:

* Dados desatualizados na origem
* Alto custo operacional de manutenção cadastral
* Riscos de fraude de identidade
* Complexidade crescente na governança de dados

A arquitetura proposta atua em um nível anterior ao MDM tradicional, reduzindo drasticamente a necessidade de reconciliação e saneamento posterior.

Ao permitir que dados de identidade sejam verificáveis, portáveis e atualizados na origem com consentimento do usuário, a solução diminui estruturalmente:

* A dependência de processos internos de consolidação
* O esforço recorrente de qualidade de dados
* O retrabalho operacional em bases transacionais e analíticas
* O custo incremental de onboarding e validação

Em vez de investir continuamente para corrigir inconsistências internas, as empresas passam a consumir identidade já validada e sincronizada na fonte.

### Ineficiência Operacional

Equipes dedicadas a validação manual, conciliação e conformidade. Ciclos longos de onboarding prejudicam conversão e experiência do cliente.

A identidade digital atual não funciona como infraestrutura --- funciona
como um conjunto de silos desconectados.

Cada empresa precisa reconstruir do zero o mesmo processo de:

-   Coleta de dados
-   Validação de identidade
-   Verificação antifraude
-   Conformidade regulatória (KYC, AML*, LGPD*)
-   Atualização cadastral contínua

Esse modelo cria uma ineficiência sistêmica que impacta toda a economia
digital.


### Redundância Sistêmica de Validação

A mesma identidade é validada dezenas de vezes ao longo da vida de um
usuário.

Mesmo que um banco já tenha realizado um KYC completo, a próxima
instituição repetirá:

-   Captura de documentos
-   Prova de vida
-   Checagens antifraude
-   Verificação regulatória

Essa redundância gera:

-   Custo recorrente elevado
-   Tempo de processamento desnecessário
-   Complexidade operacional acumulativa

A identidade não é reutilizável. Ela é recriada repetidamente.

### Estrutura Operacional Pesada e Não Escalável

Empresas mantêm equipes dedicadas a:

-   Análise manual de documentos
-   Conciliação entre sistemas
-   Tratamento de inconsistências cadastrais
-   Atendimento relacionado a onboarding e atualização

Esses processos:

-   Escalam com headcount
-   São suscetíveis a erro humano
-   Dependem de múltiplos fornecedores de KYC
-   Aumentam o custo fixo da operação

Sem uma camada de identidade interoperável, a eficiência operacional
atinge um teto estrutural.

### Onboarding Friccional e Perda de Receita

O onboarding tradicional envolve:

-   Formulários longos
-   Upload de documentos
-   Selfie para prova de vida
-   Espera por validação

Cada etapa adicional reduz conversão.

Consequências diretas:

-   Alto abandono no cadastro
-   CAC* (Customer Acquisition Cost) desperdiçado
-   Redução de LTV* potencial
-   Primeira experiência negativa com a marca

Empresas investem pesado em aquisição --- e perdem usuários na validação
de identidade.

------------------------------------------------------------------------

###  Dados Desatualizados e Risco Regulatório

Após o onboarding, o problema continua.

Mudanças de:

-   Endereço
-   Telefone
-   Email
-   Estado civil
-   Renda

não são sincronizadas automaticamente entre instituições.

Isso gera:

-   Bases desatualizadas
-   Comunicação falha
-   Inconsistências regulatórias
-   Campanhas periódicas de recadastramento
-   Custos contínuos de reconciliação

A identidade é estática quando deveria ser dinâmica.

### Impacto Econômico Global

O mercado global de verificação de identidade movimenta bilhões de
dólares por ano --- e cresce impulsionado por:

-   Regulação mais rigorosa
-   Aumento de fraude digital
-   Expansão de serviços financeiros digitais

Porém, o modelo atual é:

-   Fragmentado
-   Redundante
-   Custoso
-   Ineficiente

Empresas gastam bilhões repetindo o mesmo processo.\
Usuários enfrentam fricção constante.\
O sistema como um todo não escala com eficiência.


## Síntese Estratégica

A identidade digital atual:

-   Não é portátil
-   Não é reutilizável
-   Não é sincronizada
-   Não é interoperável

Isso cria uma ineficiência estrutural que:

-   Eleva o custo de aquisição
-   Aumenta o custo operacional
-   Amplifica risco regulatório
-   Reduz conversão
-   Dificulta expansão internacional

---

## Dor Econômica Estimada

| Dimensão | Estimativa | Premissa |
|----------|------------|----------|
| Custo médio por verificação (PJ) | R$ 10.000 - 12.000 | Considerando ferramentas + operação |
| Custo médio por verificação (PF) | R$ 40 - 100 | Considerando ferramentas + operação |
| Tempo médio de onboarding (usuário) | 15 – 45 min | Por verificação |
| Custos de fraude (setor financeiro) | 0,3 - 10 % | Referência setorial |
| Retrabalho por inconsistência | 15 - 30 % | Baseado em estudos de mercado |

As premissas serão refinadas com dados de piloto e parcerias.

---

## Glossário (siglas e termos)

- **AML**: Anti-Money Laundering; regras e controles de combate à lavagem de dinheiro.
- **CAC**: Custo de Aquisição de Cliente.
- **KYC**: Know Your Customer; processo de verificação de identidade de clientes.
- **LGPD**: Lei Geral de Proteção de Dados (Brasil).
- **LTV**: Lifetime Value; valor do cliente ao longo do relacionamento (normalmente em margem bruta).
- **MDM**: Master Data Management; práticas/sistemas de gestão de dados mestres.
