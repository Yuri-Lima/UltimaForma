/**
 * Pitch deck section context for AI explain and follow-up prompts.
 * Content from the pitch deck and ultima-forma-business-plan.
 * Provides the LLM with the actual content so explanations and answers
 * are grounded in the real pitch deck and business plan.
 */

import type { PitchSectionId } from './pitch';

export const PITCH_SECTION_CONTEXT: Record<PitchSectionId, string> = {
  hero: `THE IDENTITY PROBLEM (Pitch Deck Hero + Executive Summary)

Pitch: Your data passes through dozens of hands. None of them are yours. Every company collects your documents from scratch. Every verification costs money, time, and trust. We built the infrastructure that changes this.

Key stats: R$ 40–100 per KYC verification today; 77% say bureaucracy wastes their time (Unico/Locomotiva 2022); 95M+ digital signatures in Brazil (Gov.br H1 2025); $15–25B global identity market by 2030.

Business Plan context: Ultima Forma is a neutral identity and credentials orchestration infrastructure connecting issuers, verifiers, and end users without centralizing data. Reduces KYC costs, eliminates redundancy, returns data control to holders. Credential issuer as Single Source of Truth (SSOT). Why now: eIDAS 2.0, GDPR, LGPD, W3C Verifiable Credentials create window for consent-based neutral infrastructure.`,

  problem: `THE TENSION (Problem Statement)

Pitch: Identity verification is broken at every level. Users repeat the same process dozens of times. Companies spend fortunes verifying what others already verified. Data gets outdated before it's even used.

User-level: Fragmentation (credentials across dozens of systems, no portability). Redundancy (tens of thousands of verifications/year per Brazilian, time cost, data exposure). Loss of control (user loses visibility after submitting). Privacy risks (centralized DBs attract attacks).

Enterprise-level: KYC cost R$ 40–100/verification (retail); corporate KYC USD 2,500+ (BRL 12,500). Fraud (fake docs, synthetic identity, stolen identity). Data inconsistency (duplicated data, MDM projects, manual updates). Brazilians perform tens of thousands of identity verifications/year in different contexts.

After Ultima Forma: R$ 3.90/verification via API; credential issued once, reusable; onboarding in seconds; attributes updated at source with consent; no centralized credential storage.`,

  solution: `THE REVEAL (Solution Architecture + What We Are and Are Not)

Pitch: Neutral infrastructure for verifiable credentials. Ultima Forma orchestrates issuers, verifiers, and users — without centralizing data. Holder controls what to share, when, and with whom.

Strategic positioning: Ultima Forma is the neutral infrastructure that orchestrates identity credentials with holder consent, enabling companies to reduce KYC costs and users to maintain sovereignty over their data.

Three pillars: (1) Identity Wallet — sovereign storage, granular consent, W3C Verifiable Credentials; (2) Orchestration Platform — connects issuers, verifiers, wallets; DID resolution, signature validation, audit logs; no credential persistence; (3) Enterprise API — verifiers request verification, receive attested results, integrate KYC/AML flows.

Consent model: Explicit, granular, revocable consent per verification. Holder may revoke. Consent logs for audit (what was consented, not data content).

Trust levels: Qualified issuer (regulated entities, crypto signature); Registered issuer (audited); Self-attested (holder declarations, low-risk).

We ARE: Neutral infrastructure (agnostic, interoperability); Consent layer (explicit, granular, revocable); Interoperability engine (open standards, no single vendor).

We ARE NOT: Bank (no deposits, credit, financial products); Credit provider (no credit decisions); Data repository (no credential storage); Identity authority (we connect, governments issue). Rationale: avoid banking/credit regulation, minimize LGPD/GDPR as controller, reduce breach risk.`,

  steps: `HOW IT WORKS (6-step flow + Data Flow)

Pitch: From request to verification in 6 steps. User always controls what is shared.

Step 1 Verifier requests: Company verifies attributes (CPF, address, income) via API.
Step 2 Orchestration routes: Platform forwards request to wallet with policy and scope.
Step 3 User consents: Holder sees attributes and verifier; authorizes or denies.
Step 4 Wallet presents: Verifiable presentation with selected attributes + crypto evidence.
Step 5 Platform validates: Issuer signature, revocation when applicable, event metadata.
Step 6 Result delivered: Verifier receives attested result; immutable audit trail.

Principle (Business Plan): Sensitive data transits wallet ↔ verifier via orchestration; platform does NOT persist credential content. Security: crypto signatures, zero-knowledge/selective disclosure, no centralized storage, audit for compliance.`,

  personas: `WHO BENEFITS (User, Bank, Insurance, Government)

User: No more scanning/uploading to every institution. Credentials in wallet. One tap replaces 15 min of forms. Benefits: one wallet, granular consent, no centralized data exposure. Loss of control reversed: user decides what to share.

Bank/FinTech: Replace R$ 40–100 per KYC with R$ 3.90 per API call. Cryptographic credentials instead of PDFs. Benefits: up to 90% KYC cost reduction, fraud prevention (synthetic identity, stolen identity, forged docs addressed by architecture), compliance audit trails.

Insurance: Consent-based automatic updates when policyholder attributes change (address, income, marital status). No outdated records, no periodic re-registration. First use case: automatic data sync between FinTech and Insurer.

Government: Issue verifiable digital credentials. Control lifecycle: issuance, verification, revocation. Enable partners to verify directly. Benefits: verifiable issuance, full governance, interoperability with private sector.`,

  arch: `ARCHITECTURE (Pragmatic vs Device-Based + Technology Strategy)

Pitch: Pragmatic today. Decentralized tomorrow.

MVP Pragmatic: Cloud-backed wallet (encrypted storage, device-key access, cross-device); fast time-to-market (REST APIs, minimal client requirements); enterprise-ready (SLA, audit trails, managed infra).

100% Device-Based: On-device storage (sovereign control, no cloud); zero-knowledge ready (selective disclosure, ZK proofs); W3C pure compliance (VC, DID specs).

Business Plan: Wallet stores credentials on user device. Orchestration manages flows, DID resolution, signature validation, audit logs (consent logs, not credential content). Trust levels: Qualified issuer, Registered issuer, Self-attested. Security primitives: crypto signatures, selective disclosure, no centralized storage, immutable audit.`,

  market: `MARKET OPPORTUNITY (Market Thesis + Moat)

Pitch: $15–25B market by 2030. TAM: global identity verification & KYC. SAM: FinTech, healthcare, gov in Brazil/LATAM/EU (15–25%). SOM: 0.5–2% in first 36 months.

Business Plan: Market exists (structural need in regulated sectors). Growing: digitization, regulation (eIDAS 2.0, LGPD, GDPR), user demand for control, cost reduction. TAM methodology: triangulation, US$ 15–25B by 2030, CAGR 12–15%. References: Grand View Research, MarketsandMarkets, McKinsey.

Flywheel: More issuers → more credentials → more verifiers → more users. Each participant increases value.

Moat (from business plan): Network effects (medium-high); integration depth (switching cost, ERP/CRM); trust infrastructure (relationship with qualified issuers, certifications, cumulative asset); brand (neutral, trustworthy). Not a moat: isolated tech, first-mover without execution.`,

  biz: `BUSINESS MODEL (Revenue Streams + Unit Economics)

Pitch: Three streams. Per verification R$ 3.90–12.90. Subscription R$ 7.5k–29k/month. Enterprise SLA ≥R$ 450k/year. 85–89% gross margin; 65% recurring; ≥3:1 LTV:CAC; 3–10 month payback.

Business Plan detail: Basic verification R$ 3.90 (crypto validation, DID resolution, audit log). Qualified R$ 12.90 (policy, revocation check, auditable evidence). Volume discounts: early adopter R$ 2.50/8.50; 10k–100k/mo R$ 1.90/6.90; >100k custom. Subscription: Starter R$ 7.5k/mo (2k basic + 200 qualified); Growth R$ 29k/mo (10k + 1k). Enterprise from R$ 450k/year, 99.9% SLA. COGS: Basic ~R$ 0.24–0.40/check; Qualified ~R$ 0.60–0.90. Gross margin 85–89% across scenarios.`,

  roadmap: `ROADMAP (36 months, 4 phases)

Business Plan detail:

Phase 0 (0–6 mo) Foundation: MVP, Enterprise API basic flow, 1 issuer (Bank or Telecom), minimal wallet Android/iOS. Docs, ICP conversations. LGPD/AML mapping.

Phase 1 (6–12 mo) Pilot: 1 issuer in production, validated end-to-end, 1 anchor partner, 10k verifications. Legal opinion, consent/audit documented.

Phase 2 (12–24 mo) Initial Scale: 2–3 issuers, 5–10 enterprise clients, 200–500k verifications/year, first subscription and SLA contracts. Certifications, LATAM adaptation.

Phase 3 (24–36 mo) Expansion: Multi-region (Brazil + LATAM or EU), 1–2M verifications/year, Series A prep. eIDAS alignment if EU.`,

  risks: `RISK ANALYSIS (from Business Plan)

Regulatory (Medium prob, High impact): Reclassification as financial institution or expanded data controller. Mitigation: legal opinion, conservative design (no credential storage, no credit decisions), sandboxes.

Adoption (Medium, High): Market doesn't adopt sovereign identity. Mitigation: ROI-focused use cases, anchor pilot, hybrid flows flexibility.

Big Tech (Medium, Medium-High): Competing offerings. Mitigation: regulated verticals, neutrality, build network before entry, gov/institution partnerships.

Technology (Low-Med, Medium-High): Security/infra failure, standards obsolescence. Mitigation: W3C VC/DID, audits, redundancy, minimal attack surface.

Execution (Medium, High): Delivery, clients, talent. Mitigation: incremental milestones, hiring, runway, metrics.`,

  ask: `THE ASK (Fundraising Strategy)

Pitch: R$ 3.5M Pre-Seed. 16–18 months runway. Allocation: Product/Engineering 45%; Commercial 25%; Ops/Legal 10%; Reserve 20%. Milestones: MVP production; 3–6 paying clients; MRR R$ 40–80k; 1 replicable use case.

Business Plan: Pre-seed target R$ 3.5M. Runway 16–18 months, burn ~R$ 220k/month. Allocation: Product R$ 1.58M (MVP, policies, audit, observability); Commercial R$ 875k (BD/AE, pilots); Ops R$ 350k (LGPD, contracts, SLAs); Reserve R$ 700k. Hiring: Backend/platform, Full-stack, Product/Tech Lead, Commercial, Pre-sales (partial), Legal (partial). Milestones: basic+qualified verification stabilized; 3–6 paying clients (pilots + 1–2 subscriptions); MRR R$ 40–80k; 1 playbook. Seed target R$ 12M.`,

  team: `THE TEAM

Pitch: Built by experts in identity, AI, and regulated environments.

Pedro Drummond — Enterprise Data Architect: Digital identification, identity resolution, Big Data. High-criticality government environments: Federal Police, ABIN, Central Bank of Brazil, Attorney General's Office.

Yuri Lima — AI Expert: Market-reference in AI-first systems. Reliability, cost, security. Automation and governance in regulated environments.`,
};
