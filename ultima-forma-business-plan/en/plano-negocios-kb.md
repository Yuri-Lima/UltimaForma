# Business Plan — Ultima Forma

Consolidation of Business Plan documents, organized by theme.

---

## 1. Executive Summary

### Overview

Ultima Forma is a neutral identity and credentials orchestration infrastructure that connects issuers, verifiers, and end users without centralizing data. The company provides a consent and interoperability layer that reduces KYC costs, eliminates redundancy, and returns data control to holders. Companies use the API to perform credential verifications; users keep their credentials in sovereign wallets and decide what to share.

### Market Opportunity

The identity verification and KYC market is fragmented, with high operational costs (estimates of BRL 50–200 per verification in traditional flows), data inconsistency between systems, and exposure to fraud. Regulatory (eIDAS 2.0, GDPR, LGPD) and technological drivers (W3C Verifiable Credentials, DID) create a window of opportunity for consent-based neutral infrastructure.

### Why Now

European eIDAS 2.0 regulation sets standards for digital identity wallets; GDPR and LGPD reinforce consent and data minimization requirements. The adoption of verifiable credentials and sovereign identity shifts from concept to market requirement. The timing is favorable for neutral infrastructure before proprietary solutions dominate the ecosystem.

### Product Vision

The solution includes: (1) Identity Wallet for end users, with sovereign storage and granular sharing control; (2) Orchestration Platform connecting issuers, verifiers, and wallets; (3) Enterprise API for integration with legacy systems and KYC/AML flows.

### Business Model

Revenue per verification, subscription plans for medium volumes, and enterprise SLAs for large customers. Initial priority on recurring revenue via subscriptions, with variable usage component.

### Company Stage

Current stage: pre-operational / pre-seed. Seeking funding for technical validation, first pilot, and commercial structure.

### Funding Request

**[PLACEHOLDER: value and round — e.g.: BRL 2.5M in pre-seed round]**

**Strategic positioning in one sentence:** Ultima Forma is the neutral infrastructure that orchestrates identity credentials with holder consent, enabling companies to reduce KYC costs and users to maintain sovereignty over their data.

---

## 2. Vision, Mission & Values

### Vision (10+ Year Horizon)

Ultima Forma envisions a scenario where digital identity is portable infrastructure controlled by the user: credentials issued once, reusable across multiple contexts, always with explicit consent. Companies and governments interoperate through open standards; identity fragmentation ceases to be a structural barrier. The centralized model of "ask for everything and store everything" is replaced by on-demand verification, minimizing data and maximizing privacy.

### Mission (3-Year Horizon)

Establish Ultima Forma as the reference in credential orchestration in the target market, with measurable execution:

- Conduct [PLACEHOLDER: e.g.: 500k] verifications per year
- Close [PLACEHOLDER: e.g.: 5–10] enterprise clients in production
- Establish integrations with at least [PLACEHOLDER: e.g.: 3] reference credential issuers

### Core Values

| Value | Description |
|-------|-------------|
| **Neutrality** | The infrastructure does not favor issuers, verifiers, or specific wallets. The design is agnostic; the choice remains with the ecosystem. |
| **Consent First** | No data is shared without explicit holder consent. Consent is granular, revocable, and auditable. |
| **Interoperability** | The architecture adopts open standards (W3C Verifiable Credentials, DIDs) to ensure credentials and flows work beyond a single vendor. |
| **Privacy by Design** | Data minimization, absence of centralized user data storage, and cryptographic guarantees are architecture requirements, not options. |
| **Transparency** | Data policies, technical flows, and regulatory positioning are documented and accessible. |

---

## 3. Problem Statement

### User-Level Problems

- **Fragmentation**: Users accumulate identities across dozens of systems. There is no portability.
- **Redundancy**: The same individual repeats verification processes countless times.
- **Loss of Control**: After submitting documents, the user loses visibility and control.
- **Privacy Risks**: Centralized databases attract attacks; breaches affect millions.

### Enterprise-Level Problems

- **KYC Cost**: Between [PLACEHOLDER: e.g.: BRL 50–200] per verification.
- **Fraud**: Fake documents, stolen identities, detection costs.
- **Data Inconsistency**: Duplicated data in legacy systems generates conflicts.
- **Operational Inefficiency**: Long onboarding cycles hurt conversion.

### Estimated Economic Pain

| Dimension | Estimate | Assumption |
|----------|------------|----------|
| Average cost per verification (enterprise) | [PLACEHOLDER: e.g.: BRL 80–150] | Tools + operation |
| Average onboarding time (user) | [PLACEHOLDER: e.g.: 15–45 min] | Per verification |
| Fraud costs (financial sector) | [PLACEHOLDER: % of revenue] | Sector reference |
| Rework due to inconsistency | [PLACEHOLDER: operational %] | Based on market studies |

---

## 4. Market Thesis

### Why This Market Exists

Identity verification is a structural need in regulated sectors and digital transactions. Third parties need to trust identity attributes for credit decisions, onboarding, and compliance.

### Why It Is Growing

- **Digitization**: Transactions migrate to digital channels.
- **Regulation**: eIDAS 2.0, LGPD, GDPR raise consent and portability requirements.
- **Behavior**: Users demand more control over personal data.
- **Economics**: Cost reduction per verification generates interest in new approaches.

### TAM, SAM and SOM

| Metric | Description |
|---------|-----------|
| **TAM** | Global identity verification and KYC market. [PLACEHOLDER: e.g.: US$ 15–25 billion by 2030, CAGR ~12–15%]. |
| **SAM** | Accessible segment: FinTech, healthcare, public sector in EU, Brazil, LATAM. [PLACEHOLDER: ~15–25% of TAM]. |
| **SOM** | Realistic share in the first 3–5 years. [PLACEHOLDER: 0.5–2% of SAM in 36 months]. |

---

## 5. Solution Architecture

### Main Components

1. **Identity Wallet**: User-controlled application; decentralized storage; granular consent.
2. **Orchestration Platform**: Backend connecting issuers, verifiers, and wallets without centralizing data.
3. **Credential Issuers**: Governments, banks, universities; platform orchestrates the connection.
4. **Enterprise API**: Interface for verifier integration; KYC/AML flows.

### Consent Model

- Each verification requires explicit holder consent.
- Specific consent: which attributes, for which verifier, in which transaction.
- Consent logs maintained for audit.

### Trust Levels

| Level | Description |
|-------|-------------|
| Qualified issuer | Credentials from regulated entities |
| Registered issuer | Issuers registered with audited processes |
| Self-attested | Holder declarations; use in low-risk scenarios |

---

## 6. What We Are and What We Are Not

### We Are

- **Neutral Infrastructure**: Agnostic architecture; choice remains with the ecosystem.
- **Consent Layer**: Sharing only with explicit and granular consent.
- **Interoperability Engine**: We connect systems operating in silos.

### We Are Not

- **Bank**: We do not take deposits or offer financial products.
- **Credit Provider**: We do not assess credit risk.
- **Centralized Data Repository**: We do not store credentials.
- **Identity Authority**: We do not issue official identities.

---

## 7. Business Model

### Revenue Streams

1. **Per Verification**: Charge per verification via API.
2. **Subscription**: Monthly/annual plans (Starter, Growth, Scale).
3. **Enterprise SLA**: Annual contracts with guarantees, dedicated support, and assisted integration.

### Pricing Strategy

- **Early Adopter Phase (0–12 months)**: Below-market prices for validation.
- **Scaling Phase (12–36 months)**: Prices aligned with delivered value.

### Recurring Revenue Target

[PLACEHOLDER: e.g.: 60–70%] recurring (subscription + SLA); [PLACEHOLDER: e.g.: 30–40%] event-based.

---

## 8. Go-To-Market

### Initial Geography

Brazil and selected LATAM (Mexico, Colombia). Expansion to EU in later phase.

### Initial Vertical

**FinTech**: High verification volume, cost and regulation sensitivity.

### First 3 ICPs

1. **Mid-Size FinTech**: 50–500 employees; 5–50k verifications/year.
2. **Digital Bank / Neobank**: 100% digital operation; integration with multiple providers.
3. **Payment Company / PSP**: Merchant onboarding; AML/KYC requirements.

### Strategic Partnerships

| Type | Example | Objective |
|------|---------|----------|
| Credential issuer | Gov.br, university, employer | Provide demanded credentials |
| Integrator / consultancy | IT companies | Distribution channel |
| Sector associations | ABFintechs | Network access and credibility |
| Regulator | Sandboxes, working groups | Alignment and visibility |

---

## 9. Roadmap 36 Months

| Phase | Period | Focus |
|------|---------|------|
| **0** | 0–6 months | MVP, technical validation |
| **1** | 6–12 months | 1 anchor partner, pilot |
| **2** | 12–24 months | 5–10 clients, scale |
| **3** | 24–36 months | Expansion, Series A |

### Key Milestones

- **Phase 0**: Orchestration MVP, Enterprise API, 1 issuer integration, minimal wallet.
- **Phase 1**: 1 issuer in production, end-to-end flow, anchor partner in pilot.
- **Phase 2**: 2–3 issuers, 5–10 enterprise clients, subscription and SLA contracts.
- **Phase 3**: Multi-region, vertical expansion, Series A preparation.

---

## 10. Technology Strategy

### Core Architecture

- **Orchestrator**: Manages flows; does not store credentials.
- **DID Resolution**: Resolves identifiers to endpoints.
- **API Gateway**: Authentication, rate limiting, logging.

### Decentralized Model

- Issuers maintain their issuance infrastructure.
- Wallets under user control.
- Orchestrator coordinates; not a data repository.

### Cryptographic Model

- Digital signatures by issuers.
- DIDs for resolution.
- W3C Verifiable Credentials.

---

## 11. Regulatory Strategy

### GDPR and LGPD

- Data minimization; consent; holder rights; international transfer.
- Ultima Forma acts as **processor** (verifiers) and **facilitator** (holders).

### AML/KYC

- We do not perform KYC; we provide attested data. Compliance decision is the verifier's.
- Consent logs enable traceable audit.

### Storage Model

| Data Type | Where It Resides | Retention |
|--------------|-------------|----------|
| Credentials | User's wallet | Under holder control |
| Consent logs | Platform | Per legal requirement |
| Verification metadata | Platform | Operational + compliance |

---

## 12. Competitive Landscape

### Direct Competitors

Credential orchestration and identity wallet companies. **Differentiation**: Neutral infrastructure; do not centralize data; Brazil/LATAM focus with LGPD.

### Indirect Competitors

- **Traditional KYC Providers**: Collect and store documents. Ultima Forma orchestrates existing credentials.
- **Authentication Providers**: SSO, MFA. Different use cases; integration possibility.

### Strategic Gap

Neutral, decentralized, interoperable, focused on regulated. Few direct competitors in Brazil/LATAM.

---

## 13. Moat and Defensibility

| Factor | Strength | Assumption |
|-------|-------|----------|
| Network effects | Medium–High | Grows with adoption |
| Integration depth | Medium | Increases with enterprise clients |
| Switching cost | Medium | Relevant in production |
| Trust infrastructure | High | Cumulative, hard to copy |
| Brand positioning | Medium | Requires consistency and time |

### What Is Not a Moat

- Isolated technology; first-mover without execution; regulation as isolated barrier.

---

## 14. Unit Economics

### Cost per Verification

| Component | Estimate |
|------------|------------|
| Infrastructure (compute, storage, network) | [PLACEHOLDER: e.g.: BRL 0.50–2.00] |
| DID resolution / orchestration | Included |
| Support / operation | [PLACEHOLDER: proportional allocation] |

### LTV:CAC Target

- LTV:CAC > 3:1
- Payback < 18 months

---

## 15. Risk Analysis

| Risk | Prob. | Impact | Main Mitigation |
|-------|-------|---------|---------------------|
| Regulatory | Medium | High | Legal opinion, conservative design |
| Adoption | Medium | High | Pilot, clear ROI, flexibility |
| Big Tech | Medium | Medium–High | Regulated vertical, network, neutrality |
| Technological | Low–Medium | Medium–High | Standards, audits, architecture |
| Execution | Medium | High | Roadmap, runway, metrics |

---

## 16. Fundraising Strategy

### Objectives per Round

- **Pre-seed**: [PLACEHOLDER: BRL 2–3 million]; technical validation, first pilot. Runway 12–18 months.
- **Seed**: [PLACEHOLDER: BRL 8–15 million]; client scale, product expansion. Runway 18–24 months.

### Hiring Plan (Pre-seed)

1. Backend / platform engineer
2. Product / Tech Lead
3. Commercial / BD
4. Legal / Compliance (partial)

### Target Investors

Early-stage funds (FinTech, identity), angels with regulated experience, family offices.

---

## 17. Appendix

### Technical Diagrams

**Credential Issuance Flow:** User → Orchestration → Issuer → Wallet → User

**Verification Flow:** Verifier → Orchestration → Wallet → User (consent) → Presentation → Verifier

### Example Flows

- **Bank Onboarding**: Gov.br credential → Fintech requests CPF/name → Consent → Verification
- **Professional Qualification**: University diploma → Company requests degree → Analogous flow

### Glossary

| Term | Definition |
|-------|-----------|
| Verifiable credential | Digital attestation cryptographically signed |
| DID | Decentralized Identifier |
| Issuer | Entity that issues credentials |
| Verifier | Entity that requests and receives attestations |
| Wallet | Application where the holder stores credentials |
| Orchestration | Coordination between issuers, wallets, and verifiers |
| Presentation | Credentials shared in response to a request |
| KYC / AML | Know Your Customer / Anti-Money Laundering |

### Critical Gaps to Be Resolved

1. Initial vertical in Brazil
2. MVP type
3. Commercial validation strategy
4. Initial fundraising model
5. Company legal structure

---

*Living document; review periodically with product and market evolution.*
