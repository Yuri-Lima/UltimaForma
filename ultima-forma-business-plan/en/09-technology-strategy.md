# Technology Strategy

## Core Architecture

Ultima Forma operates in distributed architecture:

- **Orchestrator**: Central service that manages flows but does not store credentials
- **DID Resolution**: Service that resolves decentralized identifiers to wallet and issuer endpoints
- **API Gateway**: Entry point for verifiers; authentication, rate limiting, logging

Components are stateless when possible; data transits without persistence of sensitive content.

---

## Decentralized Model

- **Issuers**: Maintain their issuance infrastructure; the platform neither hosts nor replicates credentials.
- **Wallets**: Under user control. Hosted on their device.
- **Orchestrator**: Coordinates requests and responses; not an identity data repository.

Benefit: data responsibility remains with holders and issuers. Ultima Forma minimizes its attack surface and obligations as data controller.

---

## Cryptographic Model

- **Digital signatures**: Credentials signed by issuers with verifiable keys.
- **DIDs**: Decentralized identifiers for endpoint resolution.
- **Verifiable Credentials (W3C*)**: Standard format for credentials and presentations.

Optional (later product phase): zero-knowledge proofs or selective disclosure to reveal only necessary attributes without exposing the complete credential.

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
- **Cache**: DID resolution and issuer metadata cached; sensitive data not cached

---

## Responsibility Reduction

The architecture reduces responsibility because:

1. **We do not store credentials**: Avoids custody obligations and mass breach risk.
2. **Holder consent**: Sharing is always authorized; we do not make decisions about others' data.
3. **Intermediary role**: We facilitate the connection. Issuers and verifiers are responsible for their processes.

---

## Technical Defensibility

- **Open standards**: Interoperability avoids client lock-in to proprietary format.
- **Integration depth**: APIs* and flows integrated with legacy systems create switching cost.
- **Issuer network**: More integrated issuers increase value for verifiers; positive network effect.

---

## Glossary (acronyms and terms)

- **API**: Application Programming Interface; interface for integration between systems.
- **DID**: Decentralized Identifier; decentralized identifier.
- **W3C**: World Wide Web Consortium; standardization body (e.g., Verifiable Credentials).
