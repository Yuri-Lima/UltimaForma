# Unit Economics

## Assumptions and Methodology

The estimates below use assumptions consistent with the revenue model and prices defined in "Business Model" (pay-per-check, subscription, and SLA*). They are realistic values for an API*-based verification/orchestration platform, with low marginal cost and relevant fixed costs (reliability, security, observability, and operation). They should be recalibrated with pilot data (real cloud costs, verification mix, and support effort).

---

## Cost per Verification

COGS* per verification is composed of (i) infrastructure and observability (compute, database, logs, traffic, WAF*/rate-limit), (ii) persistence of audit trails and metadata (without storing sensitive content), and (iii) proportional allocation of operation (SRE*/on-call) and technical support (mainly for enterprise clients and deep integrations).

**Variable COGS estimate (per verification)**

| Type | Client volume range | Infra + observability + audit (BRL/check) | Operation/support allocated (BRL/check) | **Total COGS (BRL/check)** |
|------|----------------------------|-----------------------------------------------:|------------------------------------:|--------------------------:|
| **Basic** | up to 10k/month | 0.22 | 0.18 | **0.40** |
| **Basic** | 10k–100k/month | 0.14 | 0.10 | **0.24** |
| **Basic** | >100k/month | 0.08 | 0.07 | **0.15** |
| **Qualified** | up to 10k/month | 0.55 | 0.35 | **0.90** |
| **Qualified** | 10k–100k/month | 0.35 | 0.25 | **0.60** |
| **Qualified** | >100k/month | 0.22 | 0.18 | **0.40** |

**Notes**
- **Basic** tends to be dominated by logs/audit cost and stable throughput.
- **Qualified** adds cost of policies, status/revocation verification when available, and evidence generation/delivery (more I/O, logs, processing).
- The "operation/support" portion **does not grow linearly with volume** (automation and standardization), but varies by client profile and SLA level.

**Goal:** Decreasing unit cost with volume (economies of scale).

---

## Infrastructure Cost

**Fixed base (0–12 months, pre-scale)**
- **Cloud + observability + security**: **BRL 18,000–35,000/month**
  - Includes: environments (prod + staging), managed database, queues/events, log/audit storage, monitoring/alerts, WAF/rate limiting, and backups.
- **Operation (on-call/SRE partial) and technical support**: **BRL 25,000–55,000/month** (partial team allocation, per number of active clients and integration complexity).

**At scale**
- Infrastructure grows with throughput, but **cost per verification falls** (efficiency, cloud negotiation, optimizations, and amortization of fixed costs).
- SLA contracts and multiple tenants may require **additional redundancy** (multi-AZ/multi-region), raising fixed — compensated by enterprise price/contract.

---

## Gross Margin Potential

For easier comparison, we use typical **volume mix** in verification: **90% basic / 10% qualified** (actual mix varies by vertical).

| Scenario (reference from "Business Model" section) | Average price (BRL/check) | Average COGS (BRL/check) | **Gross Margin** |
|---|---:|---:|---:|
| **Early adopter/pilots** (2.50 / 8.50) | 3.10 | 0.45 | **85%** |
| **Table** (3.90 / 12.90) | 4.80 | 0.55 | **89%** |
| **10k–100k/month** (1.90 / 6.90) | 2.40 | 0.30 | **88%** |
| **>100k/month** (1.20 / 4.50) | 1.53 | 0.20 | **87%** |

Subscription and SLA plans tend to have higher margin by including support value and predictability.

### Fully Loaded COGS View

The margins above reflect "infrastructure gross margin" -- variable COGS only (compute, storage, observability). A "fully loaded" view includes costs that are real but not captured in per-verification COGS:

| Additional cost | Estimate | Amortization |
|----------------|----------|--------------|
| Issuer integration maintenance | BRL 80–200k per issuer | Across expected annual verification volume from that issuer |
| Sales engineering per enterprise deal | BRL 30–60k per client | Across 12-month contract value |
| Compliance/audit cost per client | BRL 15–30k/year per enterprise client | Across annual contract |

**Fully loaded gross margin (early stage):** 55–70%, improving to 75–85% at scale as fixed costs are amortized across growing volume and issuer integrations serve increasing verification throughput.

### Impact of Ecosystem Incentive Layer

During early network growth, the platform deploys a declining incentive layer (see "Business Model" section): issuer revenue share (BRL 1.00 per verification in Phase 1, declining to zero by Phase 3) and user cashback (BRL 1.00 for the first 10 uses per credential). When these incentives apply, they reduce the platform's net revenue per verification and thus the effective gross margin.

| Scenario | Incentives per check | Platform net (standard basic, BRL 3.90) | Effective gross margin |
|----------|----------------------|------------------------------------------|------------------------|
| **Phase 3 / steady-state** (no incentives) | -- | BRL 3.35 | 86% |
| **Phase 2** (issuer R$ 0.50, no cashback) | BRL 0.50 | BRL 2.85 | 73% |
| **Phase 1** (issuer R$ 1.00, after 10 uses) | BRL 1.00 | BRL 2.35 | 60% |
| **Phase 1** (issuer R$ 1.00, first 10 uses) | BRL 2.00 (issuer + user) | BRL 1.35 | 35% |

The incentive layer is a temporary growth mechanic that declines across three phases. User cashback expires after 10 uses per credential. Issuer revenue share declines from BRL 1.00 (Phase 1, first 3--5 issuers) to BRL 0.50 (Phase 2) to zero (Phase 3). LTV and CAC figures in this document assume steady-state margins. During early growth, actual margins on event-based revenue may be lower when incentive costs apply.

COGS figures throughout this document are modeled estimates based on comparable API infrastructure platforms. They will be validated and recalibrated with production pilot data.

---

## LTV (Lifetime Value)

Below, LTV* is presented as **gross margin LTV** (recurring revenue × gross margin × lifetime), as it is the most useful form to compare with CAC*.

**Common assumptions**
- **Gross margin**: 80% (Starter), 82% (Growth), 85% (Enterprise/SLA)
- **Average useful life (conservative)**: 24–36 months (Starter), 30–42 months (Growth), 36–60 months (Enterprise)
- **Retention**: logo retention tends to increase as integrations deepen; expansion (NRR*) is expected via volume growth and new use cases.

| Segment (pricing anchor) | Typical recurring revenue | Gross margin | Useful life | **LTV (gross margin)** |
|---|---:|---:|---:|---:|
| **Starter** (BRL 7,500/month) | BRL 7,500/month | 80% | 24–36m | **BRL 144,000–216,000** |
| **Growth** (BRL 29,000/month) | BRL 29,000/month | 82% | 30–42m | **BRL 713,000–998,000** |
| **Enterprise/SLA** (≥ BRL 450,000/year) | BRL 37,500/month | 85% | 36–60m | **BRL 1.15M–1.91M** |

---

## CAC (Customer Acquisition Cost)

CAC is presented as **total cost to close and activate** (marketing + sales + pre-sales + part of onboarding effort), and varies strongly by segment.

**Assumptions**
- Sales cycle: 1–3 months (Starter), 3–6 months (Growth), 6–9 months (Enterprise)
- Early adopter strategy reduces CAC via references, pilots, and selective ABM*, with integration support as part of "cost of sale."

| Segment | **Estimated CAC** | Note |
|---|---:|---|
| **Starter** | **BRL 20,000–35,000** | Inside sales + standardized onboarding |
| **Growth** | **BRL 60,000–110,000** | Consultative sales + SE* + pilot |
| **Enterprise/SLA** | **BRL 180,000–320,000** | ABM, security/compliance, legal, and assisted integration |

---

## LTV:CAC and Payback

**Target (healthy for B2B SaaS in regulated verticals)**
- **LTV:CAC**: **≥ 3:1** (industry benchmark for mature B2B SaaS: 3–5x)
- **Payback**: **≤ 12 months** (target: 6–9 months when recurring base matures)

All inputs below are modeled assumptions to be validated with first-cohort data. Churn rates, actual CAC, and ARPU expansion will be measured from the first paying clients and recalibrated quarterly.

**Estimated payback (by monthly gross margin)**

| Segment | Typical monthly gross margin | CAC (range) | **Estimated payback** |
|---|---:|---:|---:|
| **Starter** | BRL 6,000 | BRL 20,000–35,000 | **3–6 months** |
| **Growth** | BRL 23,780 | BRL 60,000–110,000 | **3–5 months** |
| **Enterprise/SLA** | BRL 31,875 | BRL 180,000–320,000 | **6–10 months** |

**NRR target:** 110–120% by end of seed period, driven by client volume expansion (more verifications as their customer base grows) and adoption of new credential types over time.

Values will be calibrated with actual sales and retention data.

---

## Path to Contribution Margin Breakeven

Monthly fixed costs (infrastructure + operations): BRL 43–90k/month. Verification volume needed to cover fixed costs at each incentive phase (90% basic / 10% qualified mix):

| Phase | Platform net per verification | Monthly volume to cover BRL 65k fixed costs |
|-------|----------------------------:|--------------------------------------------:|
| Phase 1 (first 10 uses) | BRL 1.35 | ~48,000 verifications |
| Phase 1 (after 10 uses) | BRL 2.35 | ~28,000 verifications |
| Phase 2 | BRL 2.85 | ~23,000 verifications |
| Phase 3 (steady-state) | BRL 3.35 | ~19,000 verifications |

During Phase 1, the company is funded by equity, not verification revenue. Subscription and SLA revenue provides a recurring base that reduces dependence on per-verification margin.

---

## Issuer Integration Economics

| Cost component | Estimate | Note |
|----------------|----------|------|
| Engineering effort | BRL 50–120k | 2–4 person-months for integration development and testing |
| BD / legal / compliance | BRL 20–50k | Relationship development, contracts, security review |
| Ongoing maintenance | BRL 15–30k/year | Schema updates, API versioning, support |
| **Total per issuer** | **BRL 80–200k** | Amortized across expected annual verification volume |

At 10k verifications/month from one issuer, the integration cost is amortized in 3–8 months at standard pricing.

---

## Operational Metrics (Targets to Be Validated)

| Category | Metric | Target |
|----------|--------|--------|
| Trial activation (integration completed) | 40–60% | Developer tool / API product benchmarks |
| Trial-to-paid conversion | 15–25% | B2B SaaS API product benchmarks |
| Pilot-to-subscription conversion | 50–70% | Enterprise infrastructure benchmarks |
| Credential coverage (verification success rate) | 10–30% at launch, 60%+ at 5 issuers | Grows with issuer integrations |
| NRR | 110–120% by end of seed | Volume expansion + new credential types |

---

## Glossary (acronyms and terms)

- **ABM**: Account-Based Marketing; commercial strategy focused on target accounts.
- **API**: Application Programming Interface; interface for integration between systems.
- **CAC**: Customer Acquisition Cost.
- **COGS**: Cost of Goods Sold; direct cost to deliver the service (variable costs and operational allocations).
- **LTV**: Lifetime Value; value of the customer over the relationship (typically in gross margin).
- **NRR**: Net Revenue Retention; net revenue retention in client base (includes expansion and losses).
- **SE**: Sales Engineer; technical pre-sales professional.
- **SLA**: Service Level Agreement; service level agreement.
- **SRE**: Site Reliability Engineering; discipline of system reliability/operability.
- **WAF**: Web Application Firewall; protection layer against web application attacks.
