# Estratégia de Tecnologia

## Arquitetura Core

A Ultima Forma opera em arquitetura distribuída:

- **Orquestrador**: Serviço central que gerencia fluxos, mas não armazena credenciais
- **Resolução de DID**: Serviço que resolve identificadores descentralizados para endpoints de carteiras e emissores
- **API Gateway**: Ponto de entrada para verificadores, com autenticação, rate limiting e logging

Os componentes são stateless quando possível. Os dados transitam sem persistência de conteúdo sensível.

---

## Modelo Descentralizado

- **Emissores**: Mantêm sua infraestrutura de emissão. A plataforma não hospeda nem replica credenciais.
- **Carteiras**: Sob controle do usuário. Hospedadas em seu dispositivo.
- **Orquestrador**: Coordena solicitações e respostas. Não é repositório de dados de identidade.

Benefício: responsabilidade por dados permanece com titulares e emissores. A Ultima Forma minimiza sua superfície de ataque e obrigações como controlador de dados.

---

## Modelo Criptográfico

- **Assinaturas digitais**: Credenciais assinadas por emissores com chaves verificáveis.
- **DIDs**: Identificadores descentralizados para resolução de endpoints.
- **Verifiable Credentials (W3C*)**: Formato padrão para credenciais e apresentações.

Opcional (fase posterior do produto): zero-knowledge proofs ou selective disclosure para revelar apenas os atributos necessários, sem expor a credencial completa.

---

## Estratégia de Engenharia Open-Source

Os componentes open-source são responsabilidade de engenharia de primeira linha, não um projeto paralelo:

### Componentes Open-Source

| Componente | Licença | Propósito |
|------------|---------|-----------|
| Biblioteca de verificação de credenciais | Apache 2.0 | Lógica central de validação para W3C VCs e assinaturas criptográficas |
| Wallet SDK | Apache 2.0 | Implementação de referência para desenvolvedores de carteiras |
| Especificação do protocolo | CC BY 4.0 | Especificação publicada que define formatos e fluxos de credenciais |
| Ferramentas CLI para desenvolvedores | Apache 2.0 | Desenvolvimento local, testes e validação de integração |
| Bibliotecas criptográficas | Apache 2.0 | Resolução de DID, selective disclosure, validação de assinaturas |

### Práticas de Engenharia

- **Licença**: Apache 2.0 para código (permissiva, compatível com adoção enterprise). CC BY 4.0 para especificação e documentação.
- **Diretrizes de contribuição**: guia de contribuidores publicado, código de conduta, CLA (Contributor License Agreement) para clareza de IP*.
- **Divulgação de segurança**: processo de divulgação responsável com correção coordenada. Correções críticas de segurança desenvolvidas em privado, liberadas simultaneamente com a divulgação.
- **Cadência de release**: releases mensais para bibliotecas, releases trimestrais para atualizações da especificação do protocolo.
- **Gates de qualidade**: todos os componentes open-source exigem cobertura de testes de 90%+, CI/CD automatizado e scanning de segurança antes do release.

### Developer Experience (DX) como Prioridade de Engenharia

DX é uma preocupação de engenharia de primeira linha, não um pensamento posterior:

- Documentação faz parte da definição de pronto para toda feature
- Mensagens de erro explicam o problema e sugerem a correção
- APIs dos SDKs seguem convenções de nomenclatura consistentes e tipos de retorno entre linguagens
- Ambiente sandbox mantido com o mesmo SLA da documentação de produção
- Breaking changes seguem política de depreciação com guias de migração

---

## Design de Infraestrutura

- Hospedagem em cloud (AWS, GCP, Azure ou DigitalOcean) com redundância (High-Availability)
- Separação de ambientes (dev, staging, produção)
- Secrets e chaves em gerenciadores dedicados
- Monitoramento de disponibilidade, latência e erros

---

## Escalabilidade

- **Horizontal**: Orquestrador e API podem escalar com múltiplas instâncias
- **Assíncrono**: Operações pesadas (ex.: validação criptográfica) em filas
- **Cache**: Resolução de DID e metadados de emissores cacheados, dados sensíveis não cacheados

---

## Redução de Responsabilidade

A arquitetura reduz responsabilidade porque:

1. **Não armazenamos credenciais**: Evita obrigações de custódia e risco de vazamento em massa.
2. **Consentimento do titular**: O compartilhamento é sempre autorizado. Não tomamos decisões sobre dados alheios.
3. **Papel de intermediário**: Facilitamos a conexão. Emissores e verificadores são responsáveis por seus processos.

---

## Defensibilidade Técnica

- **Protocolo aberto**: O protocolo aberto se torna um padrão em torno do qual o mercado constrói. Migrar do padrão é mais difícil que trocar de fornecedor.
- **Padrões abertos**: Interoperabilidade evita lock-in de cliente em formato proprietário.
- **Profundidade de integração**: APIs* e fluxos integrados a sistemas legados geram custo de troca.
- **Rede de emissores**: Quanto mais emissores integrados, maior o valor para verificadores, com efeito de rede positivo.
- **Ecossistema de desenvolvedores**: SDKs abertos e bibliotecas de verificação criam uma comunidade de desenvolvedores que impulsiona adoção bottom-up e amplia o alcance da plataforma.

---

## Glossário (siglas e termos)

- **API**: Application Programming Interface; interface para integração entre sistemas.
- **CLA**: Contributor License Agreement; acordo jurídico que rege o direito de propriedade intelectual de contribuições open-source.
- **IP**: Intellectual Property; propriedade intelectual — direitos legais sobre criações como código, especificações e documentação.
- **CLI**: Command-Line Interface; ferramenta de desenvolvedor para interação via terminal.
- **DID**: Decentralized Identifier; identificador descentralizado.
- **DX**: Developer Experience; qualidade da interação do desenvolvedor com ferramentas, documentação e APIs.
- **SDK**: Software Development Kit; conjunto de ferramentas para construir sobre uma plataforma.
- **W3C**: World Wide Web Consortium; organismo de padronização (ex.: Verifiable Credentials).
