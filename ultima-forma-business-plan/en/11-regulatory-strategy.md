# Regulatory Strategy

## GDPR and LGPD

This chapter considers GDPR* and LGPD* principles as reference for the model design (minimization, consent, and holder rights).

### Applicable Principles

- **Data minimization**: We collect only what is necessary to operate the orchestration (e.g., consent logs, transaction metadata; not credential content).
- **Consent**: Every verification depends on explicit holder consent; we record evidence.
- **Holder rights**: We support access, rectification, deletion, and portability to the extent we process data. Primary storage is in the user's wallet.
- **International transfer**: If processing occurs in another jurisdiction, ensure adequate mechanisms (standard clauses, adequacy decisions).

### Positioning

Ultima Forma tends to act as **operator/processor** in relation to verifiers (processing requests on their behalf) and as **facilitator** in relation to holders (without storing credential content). In practice, the qualification of roles (**controller** vs. **operator/processor**) depends on product design, specific flow (e.g., consent logs and metadata), and contracts (MSA/DPA) with each verifier and issuer, and should be confirmed with legal opinion by jurisdiction.

---

## eIDAS 2.0 (if applicable, Europe)

- European regulation establishes requirements for digital identity wallets and qualified attributes.
- If we operate in the EU*: evaluate need for qualification as wallet or trust service provider.
- In Brazil: Gov.br and future initiatives may establish analogous standards; monitor evolution.

---

## AML/KYC

Regarding AML* obligations and KYC* processes, Ultima Forma acts as orchestration infrastructure; due diligence responsibility remains with the verifier.

- **We do not perform KYC**: We connect verifiers to credentials; the decision to accept a credential as sufficient for KYC is the verifier's.
- **Verifier responsibility**: Financial and regulated institutions maintain due diligence obligations. Ultima Forma provides attested data; it does not replace compliance judgment.
- **Audit**: Consent and verification logs allow verifiers to demonstrate traceable process.

---

## Storage and Retention Model

| Data Type | Where It Resides | Retention |
|--------------|-------------|----------|
| **Credentials** | User's wallet | Under holder control |
| **Consent logs** | Platform | Per legal requirement (e.g., 5 years for disputes) |
| **Verification metadata** | Platform | Operational + compliance; policy defined |

We do not maintain a credential repository, and retention is limited to necessary logs and metadata.

---

## Responsibility Model

- **Issuers**: Responsible for quality and validity of issued credentials.
- **Verifiers**: Responsible for decisions based on credentials (KYC, credit, etc.).
- **Ultima Forma**: Responsible for orchestration operation, availability, and processing compliance (logs, consent). Not responsible for credential content or verifier decisions.

---

## Compliance Strategy

- Initial legal opinion on regulatory positioning
- Privacy policies and terms of use aligned with LGPD/GDPR
- Incident response and holder request processes
- Periodic review per regulatory changes

---

## Glossary (acronyms and terms)

- **AML**: Anti-Money Laundering; rules and controls to combat money laundering.
- **eIDAS**: European regulation on electronic identification and trust services.
- **GDPR**: General Data Protection Regulation; European data protection regulation.
- **KYC**: Know Your Customer; process of verifying client identity.
- **LGPD**: General Data Protection Law (Brazil).
- **UE**: European Union.
