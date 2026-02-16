# Declaração do Problema

## Problemas no Nível do Usuário

### Fragmentação

Usuários acumulam identidades e credenciais em dezenas de sistemas: bancos, governos, provedores de saúde, plataformas de trabalho. Cada relação exige novo cadastro, documentos e validação. Não há portabilidade: uma credencial emitida em um contexto não é reutilizada em outro.

### Redundância

O mesmo indivíduo repete processos de verificação (documento, selfie, comprovante) inúmeras vezes. Diferentes fontes indicam que brasileiros realizam em dezenas de milhares de verificações de identidade por ano em contextos distintos, cada uma com custo de tempo e exposição de dados.

Dados do portal Gov.br, que registrou, por exemplo, mais de 95 milhões de assinaturas digitais apenas no primeiro semestre de 2025.

Perda de tempo/burocracia (77%): Estatística comumente citada em estudos (pesquisa realizada em 2022 pela Unico - empresa de identidade digital - em parceria com o Instituto Locomotiva) sobre transformação digital e desburocratização no Brasil (como o Índice de Confiança Digital), refletindo a fricção em processos que exigem prova de vida ou identidade presencial.

### Perda de Controle

Após enviar documentos e dados, o usuário perde visibilidade e controle. Não sabe quem acessa o que, por quanto tempo, nem como revogar. A assimetria de poder favorece o coletor de dados.

### Riscos de Privacidade

Bases centralizadas atraem ataques; vazamentos afetam milhões de titulares. Quanto mais dados centralizados, maior o alvo. A economia atual incentiva acúmulo, não minimização.

---

## Problemas no Nível Enterprise

### Custo de KYC

Para clientes de varejo (PF), o processo tradicional de KYC custa entre R$ 40 e R$ 100 por verificação quando considerados tempo operacional, ferramentas e retrabalho. Empresas com alto volume de onboarding arcam com custos significativos e margens reduzidas.

Clientes Corporativos (PJ): Para empresas, o processo é muito mais caro devido à análise de quadros societários e beneficiários finais. Pesquisas indicam que uma revisão de KYC para um cliente comercial pode custar, em média, mais de USD 2,500 (aprox. R$ 12,500).

### Fraude

Documentos falsos, identidades roubadas e ataques de síntese elevam custos de detecção e recuperação. Sistemas fragmentados dificultam verificação cruzada e consistência.

Pela arquitetura proposta (wallet + credenciais verificáveis + emissores confiáveis + consentimento auditável), causamos um impacto profundo no sucesso das fraudes, principalmente dos seguintes tipos:

🔒 Fraude de identidade sintética

* CPF/SSN válido + dados falsos
* Contas abertas com identidade parcialmente inventada

🔁 Reuso de identidade roubada

* Dados vazados usados para abrir contas
* Engenharia social baseada em cadastro desatualizado

📝 Manipulação cadastral

* Alteração fraudulenta de endereço
* Troca de telefone/email para takeover de conta

🎭 Documentos falsificados

* RG/Passaporte adulterado
* Selfie spoofing

### Inconsistência de Dados

Dados duplicados em sistemas legados geram conflitos, atualizações manualmente e erros. Um mesmo titular pode constar com CPF ou endereço diferente em silos distintos.

 Projetos de Master Data Management (MDM) representam investimentos recorrentes e significativos para grandes empresas, frequentemente ultrapassando milhões de reais em implementação, integração e manutenção.

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

---

## Dor Econômica Estimada

| Dimensão | Estimativa | Premissa |
|----------|------------|----------|
| Custo médio por verificação (enterprise) | [PLACEHOLDER: ex.: R$ 80–150] | Considerando ferramentas + operação |
| Tempo médio de onboarding (usuário) | [PLACEHOLDER: ex.: 15–45 min] | Por verificação |
| Custos de fraude (setor financeiro) | [PLACEHOLDER: % da receita] | Referência setorial |
| Retrabalho por inconsistência | [PLACEHOLDER: % operacional] | Baseado em estudos de mercado |

As premissas serão refinadas com dados de piloto e parcerias.
