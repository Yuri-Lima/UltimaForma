# Tese de Mercado

## Tese de Infraestrutura

A identidade segue o mesmo caminho de pagamentos (Stripe), dados financeiros (Plaid) e comunicações (Twilio) — de soluções pontuais fragmentadas para APIs de infraestrutura unificada. Em cada caso, a empresa vencedora construiu a camada neutra que conectou um ecossistema fragmentado, começando com abordagem aberta e amigável ao desenvolvedor e capturando valor por meio da rede proprietária.

Protocolos abertos criam os maiores mercados endereçáveis. TCP/IP, HTTP e SMTP demonstram que, quando a camada de protocolo é aberta, o ecossistema cresce mais rápido e o operador de infraestrutura captura valor na camada de rede. A Ultima Forma aplica essa lógica à identidade: o protocolo de verificação é aberto, a rede de orquestração é proprietária.

## Por Que Este Mercado Existe

A verificação de identidade é necessidade estrutural em setores regulados (financeiro, seguros, saúde, governo) e em transações digitais em geral. O mercado existe porque terceiros precisam confiar em atributos de identidade (quem é, onde mora, qual a qualificação) para decisões de crédito, onboarding, acesso a serviços e conformidade regulatória.

## Por Que Está Crescendo

- **Digitalização**: Transações e relacionamentos migram para canais digitais. A verificação remota substitui a presencial.
- **Regulação**: eIDAS* 2.0 (Europa), LGPD* (Brasil), GDPR* e marcos locais elevam exigências de consentimento e portabilidade.
- **Comportamento**: Usuários passam a exigir mais controle e transparência sobre dados pessoais.
- **Economia**: Redução de custo por verificação e melhoria de conversão geram interesse em novas abordagens.

## Drivers Regulatórios

| Regulamento | Impacto |
|-------------|---------|
| **GDPR / LGPD** | Consentimento, minimização de dados e direito ao esquecimento impulsionam modelos baseados em portabilidade e controle do titular |
| **eIDAS 2.0** | Carteiras de identidade digital e credenciais qualificadas criam demanda por orquestração interoperável |
| AML*/KYC* | Exigências de verificação de identidade mantêm mercado; modelos descentralizados precisam comprovar conformidade |
| **Verificação de Idade** | Online Safety Act (Reino Unido), Marco Legal Digital (Brasil), Social Media Minimum Age Act (Austrália), DSA* (UE) e leis estaduais nos EUA exigem verificação de idade em plataformas digitais, jogos e redes sociais. Cria demanda por verificação de atributo com preservação de privacidade — caso de uso nativo para credenciais verificáveis e ZKP* |

## Drivers Tecnológicos

- Padrões abertos (W3C* Verifiable Credentials, DID*) permitem interoperabilidade entre sistemas.
- Criptografia e zero-knowledge proofs habilitam verificação sem exposição desnecessária de dados.
- Infraestrutura em nuvem e APIs* padronizadas reduzem custo de integração.

## Mudança Comportamental

Consumidores passam a valorizar privacidade e portabilidade. A aceitação de "compartilhar tudo com cada empresa" declina. A expectativa de "ter uma credencial e reutilizar" aumenta. Empresas percebem risco reputacional e regulatório em modelos centrados em acúmulo de dados.

---

## TAM, SAM e SOM

Para dimensionar o mercado, usamos TAM*, SAM* e SOM*.

### TAM (Total Addressable Market)

Mercado global de verificação de identidade e KYC. Estimativas de referência: US$ 15–25 bilhões até 2030, CAGR* (Compound Annual Growth Rate) em torno de 12–15%.

Metodologia: triangulação de projeções públicas de mercado para "identity verification" e "KYC", observando que diferentes relatórios usam taxonomias e escopos distintos (software vs. serviços, verificação vs. onboarding, biometria vs. não-biométrico). Usamos a faixa **US$ 15–25 bi** como referência conservadora para o escopo de verificação digital e KYC em setores regulados.

Leis de verificação de idade obrigatória em múltiplas jurisdições (Reino Unido, Brasil, Austrália, UE, estados dos EUA) expandem o mercado endereçável para setores antes fora do escopo de verificação de identidade: gaming, redes sociais, plataformas de conteúdo e e-commerce restrito. A verificação de atributo (comprovar que o usuário tem mais de 16 ou 18 anos sem revelar data de nascimento ou outros dados pessoais) é um caso de uso direto de credenciais verificáveis e zero-knowledge proofs, alinhado ao núcleo da solução da Ultima Forma.

**Referências públicas**
- Grand View Research — [Identity Verification Market report (forecast até 2030)](https://grandviewresearch.com/industry-analysis/identity-verification-market-report)
- Grand View Research — [Know Your Customer (KYC) Software Market report (forecast até 2030)](https://grandviewresearch.com/industry-analysis/know-your-customer-software-market-report)
- MarketsandMarkets — [Identity Verification Market (visão geral)](https://www.marketsandmarkets.com/Market-Reports/identity-verification-market-178660742.html) e nota pública com projeção até 2030 em release: [market worth $29.32B by 2030](https://www.prnewswire.com/news-releases/identity-verification-market-worth-29-32-billion-by-2030--exclusive-report-by-marketsandmarkets-302472920.html)
- McKinsey (contexto de adoção/impacto econômico de digital ID) — [Digital identification: A key to inclusive growth](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/digital-identification-a-key-to-inclusive-growth)

### SAM (Serviceable Addressable Market)

Segmento acessível com a solução atual: empresas de médio e grande porte em FinTech, saúde e setor público, em regiões com marco regulatório favorável (UE*, Brasil, LATAM*) - em torno de 15–25% do TAM, considerando vertical e geografia.

### SOM (Serviceable Obtainable Market)

Fatia realista nos primeiros 3–5 anos: clientes enterprise em geografias e verticais iniciais - em torno de 0,5–2% do SAM em horizonte de 36 meses. Premissas conservadoras. Refinamento será realizado com dados de piloto.

---

*Nota: Valores variam por definição de mercado e metodologia de pesquisa. A faixa acima é uma referência triangulada para orientar o dimensionamento (TAM/SAM/SOM) e deve ser refinada na diligência comercial por vertical e geografia.*

---

## Glossário (siglas e termos)

- **AML**: Anti-Money Laundering; regras e controles de combate à lavagem de dinheiro.
- **API**: Application Programming Interface; interface para integração entre sistemas.
- **CAGR**: Compound Annual Growth Rate; taxa de crescimento anual composta.
- **DID**: Decentralized Identifier; identificador descentralizado.
- **DSA**: Digital Services Act; regulamento europeu de serviços digitais.
- **eIDAS**: Regulamento europeu de identificação eletrônica e serviços de confiança.
- **FinTech**: empresa de tecnologia financeira.
- **GDPR**: General Data Protection Regulation; regulação europeia de proteção de dados.
- **KYC**: Know Your Customer; processo de verificação de identidade de clientes.
- **LATAM**: América Latina.
- **LGPD**: Lei Geral de Proteção de Dados (Brasil).
- **SAM/SOM/TAM**: Serviceable/Obtainable/Addressable Market; recortes de mercado (endereçável, atendível e capturável).
- **UE**: União Europeia.
- **W3C**: World Wide Web Consortium; organismo de padronização (ex.: Verifiable Credentials).
- **ZKP**: Zero-Knowledge Proof; prova de conhecimento zero, técnica criptográfica que permite provar um atributo (ex.: idade mínima) sem revelar o dado subjacente.
