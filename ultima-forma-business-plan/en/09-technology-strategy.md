# Technology Strategy

## Core Architecture

Ultima Forma operates in distributed architecture:

- **Orchestrator**: Central service that manages flows but does not store credentials
- **DID Resolution**: Service that resolves decentralized identifiers to wallet and issuer endpoints
- **API Gateway**: Entry point for verifiers: authentication, rate limiting, logging

Components are stateless when possible. Data transits without persistence of sensitive content.

---

## Decentralized Model

- **Issuers**: Maintain their issuance infrastructure. The platform neither hosts nor replicates credentials.
- **Wallets**: Under user control. Hosted on their device.
- **Orchestrator**: Coordinates requests and responses. It is not an identity data repository.

Benefit: data responsibility remains with holders and issuers. Ultima Forma minimizes its attack surface and obligations as data controller.

---

## Cryptographic Model

- **Digital signatures**: Credentials signed by issuers with verifiable keys.
- **DIDs**: Decentralized identifiers for endpoint resolution.
- **Verifiable Credentials (W3C*)**: Standard format for credentials and presentations.

Optional (later product phase): zero-knowledge proofs or selective disclosure to reveal only necessary attributes without exposing the complete credential.

---

## Open-Source Engineering Strategy

The open-source components are a first-class engineering responsibility, not a side project:

### Open-Source Components

| Component | License | Purpose |
|-----------|---------|---------|
| Credential verification library | Apache 2.0 | Core validation logic for W3C VCs and cryptographic signatures |
| Wallet SDK | Apache 2.0 | Reference implementation for wallet developers |
| Protocol specification | CC BY 4.0 | Published spec defining credential formats and flows |
| Developer CLI tools | Apache 2.0 | Local development, testing, and integration validation |
| Cryptographic libraries | Apache 2.0 | DID resolution, selective disclosure, signature validation |

### Engineering Practices

- **License**: Apache 2.0 for code (permissive, compatible with enterprise adoption) and CC BY 4.0 for specification and documentation.
- **Contribution guidelines**: published contributor guide, code of conduct, CLA (Contributor License Agreement) for IP clarity.
- **Security disclosure**: responsible disclosure process with coordinated patching. Security-critical fixes developed privately, released simultaneously with disclosure.
- **Release cadence**: monthly releases for libraries, quarterly releases for protocol specification updates.
- **Quality gates**: all open-source components require 90%+ test coverage, automated CI/CD, and security scanning before release.

### Developer Experience (DX) as Engineering Priority

DX is a first-class engineering concern, not an afterthought:

- Documentation is part of the definition of done for every feature
- Error messages explain the problem and suggest the fix
- SDK APIs follow consistent naming conventions and return types across languages
- Sandbox environment is maintained with the same SLA as production documentation
- Breaking changes follow deprecation policy with migration guides

---

## Infrastructure Design

- Cloud hosting (AWS, GCP, Azure or DigitalOcean) with redundancy (High-Availability)
- Environment separation (dev, staging, production)
- Secrets and keys in dedicated managers
- Availability, latency, and error monitoring

---

## Scalability

- **Horizontal**: Orchestrator and API can scale with multiple instances
- **Asynchronous**: Heavy operations (e.g., cryptographic validation) in queues
- **Cache**: DID resolution and issuer metadata cached. Sensitive data not cached

---

## Responsibility Reduction

The architecture reduces responsibility because:

1. **We do not store credentials**: Avoids custody obligations and mass breach risk.
2. **Holder consent**: Sharing is always authorized. We do not make decisions about others' data.
3. **Intermediary role**: We facilitate the connection. Issuers and verifiers are responsible for their processes.

---

## Technical Defensibility

- **Open protocol**: The open protocol becomes a standard that the market builds around. Switching away from the standard is harder than switching vendors.
- **Open standards**: Interoperability avoids client lock-in to proprietary format.
- **Integration depth**: APIs* and flows integrated with legacy systems create switching cost.
- **Issuer network**: More integrated issuers increase value for verifiers. Positive network effect.
- **Developer ecosystem**: Open SDKs and verification libraries create a developer community that drives bottom-up adoption and extends the platform's reach.

---

## Glossary (acronyms and terms)

- **API**: Application Programming Interface; interface for integration between systems.
- **CLA**: Contributor License Agreement; legal agreement governing intellectual property of open-source contributions.
- **CLI**: Command-Line Interface; developer tool for terminal-based interaction.
- **DID**: Decentralized Identifier; decentralized identifier.
- **DX**: Developer Experience; quality of the developer's interaction with tools, documentation, and APIs.
- **SDK**: Software Development Kit; set of tools for building on a platform.
- **W3C**: World Wide Web Consortium; standardization body (e.g., Verifiable Credentials).
