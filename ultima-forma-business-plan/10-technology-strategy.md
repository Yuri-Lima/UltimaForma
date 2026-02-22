# Estratégia de Tecnologia

## Arquitetura Core

A Ultima Forma opera em arquitetura distribuída:

- **Orquestrador**: Serviço central que gerencia fluxos, mas não armazena credenciais
- **Resolução de DID**: Serviço que resolve identificadores descentralizados para endpoints de carteiras e emissores
- **API Gateway**: Ponto de entrada para verificadores; autenticação, rate limiting, logging

Os componentes são stateless quando possível; dados transitam sem persistência de conteúdo sensível.

---

## Modelo Descentralizado

- **Emissores**: Mantêm sua infraestrutura de emissão; a plataforma não hospeda nem replica credenciais.
- **Carteiras**: Sob controle do usuário. Hospedada em seu dispositivo.
- **Orquestrador**: Coordena solicitações e respostas; não é repositório de dados de identidade.

Benefício: responsabilidade por dados permanece com titulares e emissores. A Ultima Forma minimiza sua superfície de ataque e obrigações como controlador de dados.

---

## Modelo Criptográfico

- **Assinaturas digitais**: Credenciais assinadas por emissores com chaves verificáveis.
- **DIDs**: Identificadores descentralizados para resolução de endpoints.
- **Verifiable Credentials (W3C*)**: Formato padrão para credenciais e apresentações.

Opcional (fase posterior do produto): zero-knowledge proofs ou selective disclosure para revelar apenas os atributos necessários, sem expor a credencial completa.

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
- **Cache**: Resolução de DID e metadados de emissores cacheados; dados sensíveis não cacheados

---

## Redução de Responsabilidade

A arquitetura reduz responsabilidade porque:

1. **Não armazenamos credenciais**: Evita obrigações de custódia e risco de vazamento em massa.
2. **Consentimento do titular**: O compartilhamento é sempre autorizado; não tomamos decisões sobre dados alheios.
3. **Papel de intermediário**: Facilitamos a conexão. Emissores e verificadores são responsáveis por seus processos.

---

## Defensibilidade Técnica

- **Padrões abertos**: Interoperabilidade evita lock-in de cliente em formato proprietário.
- **Profundidade de integração**: APIs* e fluxos integrados a sistemas legados geram custo de troca.
- **Rede de emissores**: Quanto mais emissores integrados, maior o valor para verificadores; efeito de rede positivo.

---

## Glossário (siglas e termos)

- **API**: Application Programming Interface; interface para integração entre sistemas.
- **DID**: Decentralized Identifier; identificador descentralizado.
- **W3C**: World Wide Web Consortium; organismo de padronização (ex.: Verifiable Credentials).
