# Business Model

## Revenue Streams

### 1. Per Verification

Charge per verification performed via API*. Variable model, suitable for clients with sporadic, seasonal, or testing-phase volume.

**Pricing Table (Pay-per-check)**

**Unit prices (table)**
- **Basic verification**: **BRL 3.90** per verification
- **Qualified verification**: **BRL 12.90** per verification

**What each level covers (commercial definition)**
- **Basic**: cryptographic validation and credential integrity (signature), DID*/issuer resolution, format/schema checks, and audit log (consent + verification event).
- **Qualified**: everything in basic **+** policy application (e.g., require qualified/registered issuer), status/revocation verification when available, and delivery of **auditable evidence package** for compliance (event logs and metadata, without storing sensitive credential content).

**Volume discounts (reference)**
- **Early adopter/pilots**: **BRL 2.50** (basic) / **BRL 8.50** (qualified)
- **10k–100k verifications/month**: **BRL 1.90** (basic) / **BRL 6.90** (qualified)
- **>100k verifications/month**: **custom** price (reference: **BRL 1.20** / **BRL 4.50**), subject to SLA* and support

---

### 2. Subscription

Monthly or annual plans with included volume and cost predictability. Ideal for continuous operation and conversion goals (onboarding) with lower cost variation.

**Subscription Plans (includes volume + excess)**

- **Starter Plan — BRL 7,500/month**
  - Includes: **2,000** basic + **200** qualified verifications / month
  - Excess: **BRL 2.50** (basic) / **BRL 8.50** (qualified)

- **Growth Plan — BRL 29,000/month**
  - Includes: **10,000** basic + **1,000** qualified verifications / month
  - Excess: **BRL 1.90** (basic) / **BRL 6.90** (qualified)

- **Scale Plan — by proposal**
  - For **>100k verifications/month**, multiple business units, and advanced support/security requirements
  - Includes: negotiated volume + excess with declining rate + SLA options

**Annual condition (recommended)**
- Annual payment with **15% discount** on monthly equivalent, subject to minimum contract.

---

### 3. Enterprise SLA

Annual contracts with availability guarantees, dedicated support, and assisted integration. Includes negotiated volume and price per additional verification.

**Enterprise Package (reference)**
- **From BRL 450,000/year**
- Includes: **200,000** basic + **20,000** qualified verifications / year
- SLA: **99.9%** uptime
- Priority support and integration governance (assisted integration, operational playbooks, dedicated channels)
- Audit and compliance reports (evidence per event, audit trails, exports)
- Excess: **BRL 1.20** (basic) / **BRL 4.50** (qualified), subject to volume and risk profile

---

## Pricing Strategy

### Early Adopter Phase (0–12 months)

Below-market prices for first clients, in exchange for feedback, use case validation, and references. Goal: product validation, commercial friction reduction, and initial traction acceleration.

**Commercial policy (practice)**
- Apply **Early adopter/pilots** table for 3–6 months, with review upon reaching milestones (e.g., integration stability, minimum volume, validated use case).

### Free Trial Strategy (Promotional Credits)

Goal: reduce adoption friction (integration + proof of value), accelerate sales cycles, and enable marketing campaigns with controlled CAC*, preserving product value perception.

**Format: usage-based credits (not just "free time")**
- Trial based on verification credits, with defined validity.
- Allows controlling variable cost and reducing abuse.

**Credit packages**
1) **Trial for marketing campaigns (self-serve / growth)**
   - Credits: **150 basic verifications + 25 qualified verifications**
   - Validity: **90 days**
   - This package is sufficient to validate **1–2 complete journeys** (integration + first flow in sandbox/production + results evaluation).
   - Conversion: at trial end, migrate to pay-per-check or subscription (with optional bonus credit in month 1 to encourage upgrade).

2) **Trial for strategic clients (ABM* / enterprise)**
   - Credits: **1,500 basic verifications + 250 qualified verifications**
   - Validity: **120 days**
   - This package is sufficient for a **pilot with statistical sample** and operational evaluation (performance, failure rates, support/SLA requirements).
   - Includes: integration support and use case design (limited scope).
   - Counterpart (when applicable): structured feedback, authorization for case study (even anonymized), and/or reference.
   - Conversion: annual contract/subscription/SLA upon reaching limits or completing milestones (e.g., onboarding completed + integration stability).

**Guardrails (anti-abuse and cost control)**
- Limits per account/domain and per verification type (basic vs. qualified).
- Rate limit, anomalous pattern detection, and multi-account blocking.
- Default trial in **sandbox**; production access conditional on minimum criteria (domain validation, declared use case, terms acceptance, compliance).

**Success measurement**
- Metrics: activation (integration completed), % accounts with 1st verification, cost per activated account, conversion to paid, time to conversion, 30/60/90/120 day retention.
- Goal: use trial as acquisition lever without "commoditizing" the product; value is captured in conversion and LTV* increase via subscription/SLA.

### Scaling Phase (12–36 months)

Prices aligned with delivered value (cost reduction vs. traditional KYC*). Margins increase with volume and operational efficiency. Structure prioritizes subscriptions and annual contracts for predictability and retention.

---

## Recurring vs. Event-Based Revenue

| Type | Expected % (24–36 month horizon) | Justification |
|------|-------------------------------------|---------------|
| **Recurring** (subscription + SLA) | **65%** | Predictable base; retention and LTV; better capacity planning |
| **Event-based** (verification) | **35%** | Onboarding and seasonal use; gateway to subscription |

The goal is recurring revenue predominance for predictability and valuation.

---

## Scalability

- **Decreasing marginal cost**: shared infrastructure; cost per verification tends to fall with volume.
- **No linear cost proportionality**: operation does not scale 1:1 with verifications (automation and integration standardization).
- **Network effect**: more issuers and verifiers increase value for all; positive lock-in potential via interoperability.

---

## Glossary (acronyms and terms)

- **ABM**: Account-Based Marketing; commercial strategy focused on target accounts.
- **API**: Application Programming Interface; interface for integration between systems.
- **CAC**: Customer Acquisition Cost.
- **DID**: Decentralized Identifier; decentralized identifier.
- **KYC**: Know Your Customer; process of verifying client identity.
- **LTV**: Lifetime Value; value of the customer over the relationship (typically in gross margin).
- **SLA**: Service Level Agreement; service level agreement.
