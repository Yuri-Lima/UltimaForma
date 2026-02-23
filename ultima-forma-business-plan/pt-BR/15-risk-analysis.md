# Análise de Risco

## Risco Regulatório

**Descrição:** Mudança regulatória ou interpretação que classifique a Ultima Forma de forma inesperada (ex.: como instituição financeira, controlador de dados com obrigações ampliadas).

**Probabilidade:** Média. **Impacto:** Alto.

**Mitigação:**
- Parecer jurídico prévio sobre posicionamento
- Monitoramento de regulamentação (LGPD*, BACEN*, futuras normas sobre identidade digital)
- Design de arquitetura que minimize pontos de atenção (não armazenar credenciais, não decidir sobre crédito)
- Engajamento com sandboxes e grupos de trabalho quando disponíveis

---

## Risco de Adoção

**Descrição:** Mercado não adotar identidade soberana ou orquestração no ritmo esperado; verificadores preferirem KYC* tradicional; emissores não integrarem.

**Probabilidade:** Média. **Impacto:** Alto.

**Mitigação:**
- Foco em casos de uso com ROI* claro (redução de custo, conformidade)
- Piloto com parceiro âncora para validação
- Mensagens orientadas a valor de negócio, não apenas tecnologia
- Flexibilidade para adaptar produto a fluxos híbridos (credenciais + verificação tradicional) se necessário

---

## Risco Big Tech

**Descrição:** Grandes plataformas lançarem ofertas concorrentes com escala e distribuição superiores.

**Probabilidade:** Média. **Impacto:** Médio–Alto.

**Mitigação:**
- Posicionamento em vertical regulado onde Big Tech enfrenta mais restrições
- Ênfase em neutralidade e interoperabilidade (diferenciador)
- Construção de rede de emissores e verificadores antes de eventual entrada
- Parcerias com governos e instituições que valorizem diversificação de provedores

---

## Risco Tecnológico

**Descrição:** Vulnerabilidade de segurança, falha de infraestrutura ou obsolescência de padrões adotados.

**Probabilidade:** Baixa–Média. **Impacto:** Médio–Alto.

**Mitigação:**
- Uso de padrões maduros (W3C* Verifiable Credentials, DID*)
- Auditorias de segurança e práticas de desenvolvimento seguro
- Redundância e monitoramento de infraestrutura
- Arquitetura que minimiza superfície de ataque (não armazenar dados sensíveis)

---

## Risco de Execução

**Descrição:** Falha em entregar produto no prazo, fechar clientes ou reter talentos; subcapitalização.

**Probabilidade:** Média. **Impacto:** Alto.

**Mitigação:**
- Roadmap realista com marcos incrementais
- Contratação crítica (técnico, comercial) com uso eficiente de capital
- Runway adequado na captação
- Métricas de acompanhamento e ajuste de rumo

---

## Matriz Resumo

| Risco | Prob. | Impacto | Mitigação Principal |
|-------|-------|---------|---------------------|
| Regulatório | Média | Alto | Parecer jurídico, design conservador |
| Adoção | Média | Alto | Piloto, ROI claro, flexibilidade |
| Big Tech | Média | Médio–Alto | Vertical regulado, rede, neutralidade |
| Tecnológico | Baixa–Média | Médio–Alto | Padrões, auditorias, arquitetura |
| Execução | Média | Alto | Roadmap, runway, métricas |

---

## Glossário (siglas e termos)

- **BACEN**: Banco Central do Brasil.
- **DID**: Decentralized Identifier; identificador descentralizado.
- **KYC**: Know Your Customer; processo de verificação de identidade de clientes.
- **LGPD**: Lei Geral de Proteção de Dados (Brasil).
- **ROI**: Return on Investment; retorno sobre investimento.
- **W3C**: World Wide Web Consortium; organismo de padronização (ex.: Verifiable Credentials).
