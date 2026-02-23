# Problem Statement

## User-Level Problems

### Fragmentation

Users accumulate identities and credentials across dozens of systems: banks, governments, healthcare providers, work platforms. Each relationship requires new registration, documents, and validation. There is no portability: a credential issued in one context is not reused in another.

### Redundancy

The same individual repeats verification processes (document, selfie, proof) countless times. Different sources indicate that Brazilians perform tens of thousands of identity verifications per year in different contexts, each with time cost and data exposure.

Federal Government data indicates that GOV.BR Signature registered more than **95 million** digital signatures in the first half of 2025 alone ([source](https://www.gov.br/gestao/pt-br/assuntos/noticias/2025/julho/uso-da-assinatura-gov-br-cresce-90-no-primeiro-semestre-de-2025)).

Time waste/bureaucracy (77%): Statistic commonly cited in studies (survey conducted in 2022 by Unico - digital identity company - in partnership with Instituto Locomotiva) on digital transformation and debureaucratization in Brazil (such as the Digital Confidence Index), reflecting friction in processes requiring proof of life or in-person identity.

### Loss of Control

After submitting documents and data, the user loses visibility and control. They do not know who accesses what, for how long, or how to revoke. The power asymmetry favors the data collector.

### Privacy Risks

Centralized databases attract attacks; breaches affect millions of holders. The more centralized data, the larger the target. The current economy incentivizes accumulation, not minimization.

---

## Enterprise-Level Problems

### KYC Cost

For retail clients (individuals), the traditional KYC* process costs between BRL 40 and BRL 100 per verification when considering operational time, tools, and rework. Companies with high onboarding volume bear significant costs and reduced margins.

Corporate Clients (businesses): For companies, the process is much more expensive due to analysis of corporate structures and ultimate beneficial owners. Research indicates that a KYC review for a commercial client can cost, on average, more than USD 2,500 (approx. BRL 12,500).

### Fraud

Fake documents, stolen identities, and synthesis attacks increase detection and recovery costs. Fragmented systems hinder cross-verification and consistency.

Through the proposed architecture (wallet + verifiable credentials + trusted issuers + auditable consent), we have a profound impact on the success of fraud, mainly of the following types:

Synthetic identity fraud

* Valid CPF/SSN + fake data
* Accounts opened with partially invented identity

Reuse of stolen identity

* Leaked data used to open accounts
* Social engineering based on outdated registration

Registration manipulation

* Fraudulent address change
* Phone/email change for account takeover

Forged documents

* Tampered ID/Passport
* Selfie spoofing

### Data Inconsistency

Duplicated data in legacy systems generates conflicts, manual updates, and errors. The same holder may appear with different CPF or address in distinct silos.

Master Data Management (MDM*) projects represent recurring and significant investments for large companies, often exceeding millions of reais in implementation, integration, and maintenance.

These projects aim to consolidate and reconcile critical customer and supplier information that was collected in a fragmented manner over time by multiple systems, channels, and business units.

However, MDM primarily acts on post-hoc data consolidation, treating symptoms such as duplication, inconsistency, and outdatedness, without solving the structural problem: digital identity is born decentralized, redundant, and dependent on multiple independent collections.

As a consequence:

* Each company maintains its own identity base
* KYC processes are repeated for the same individuals
* Registration updates depend on manual actions
* Data reconciliations become continuous operations
* Data quality costs become recurring, not one-off

Even after substantial MDM investments, organizations continue to face:

* Outdated data at the source
* High operational cost of registration maintenance
* Identity fraud risks
* Growing complexity in data governance

The proposed architecture operates at a level prior to traditional MDM, drastically reducing the need for subsequent reconciliation and sanitization.

By allowing identity data to be verifiable, portable, and updated at the source with user consent, the solution structurally reduces:

* Dependence on internal consolidation processes
* Recurring data quality effort
* Operational rework in transactional and analytical bases
* Incremental onboarding and validation cost

Instead of continuously investing to fix internal inconsistencies, companies consume identity already validated and synchronized at the source.

### Operational Inefficiency

Teams dedicated to manual validation, reconciliation, and compliance. Long onboarding cycles hurt conversion and customer experience.

Current digital identity does not work as infrastructure --- it works as a set of disconnected silos.

Each company needs to rebuild from scratch the same process of:

-   Data collection
-   Identity validation
-   Anti-fraud verification
-   Regulatory compliance (KYC, AML*, LGPD*)
-   Continuous registration updates

This model creates systemic inefficiency that impacts the entire digital economy.


### Systemic Validation Redundancy

The same identity is validated dozens of times over a user's lifetime.

Even if a bank has already performed full KYC, the next institution will repeat:

-   Document capture
-   Proof of life
-   Anti-fraud checks
-   Regulatory verification

This redundancy generates:

-   High recurring cost
-   Unnecessary processing time
-   Cumulative operational complexity

Identity is not reusable. It is recreated repeatedly.

### Heavy and Non-Scalable Operational Structure

Companies maintain teams dedicated to:

-   Manual document analysis
-   Reconciliation between systems
-   Handling registration inconsistencies
-   Onboarding and update-related support

These processes:

-   Scale with headcount
-   Are susceptible to human error
-   Depend on multiple KYC providers
-   Increase fixed operation cost

Without an interoperable identity layer, operational efficiency hits a structural ceiling.

### Frictional Onboarding and Revenue Loss

Traditional onboarding involves:

-   Long forms
-   Document upload
-   Selfie for proof of life
-   Waiting for validation

Each additional step reduces conversion.

Direct consequences:

-   High registration abandonment
-   CAC* (Customer Acquisition Cost) wasted
-   Potential LTV* reduction
-   Negative first experience with the brand

Companies invest heavily in acquisition --- and lose users in identity validation.

------------------------------------------------------------------------

### Outdated Data and Regulatory Risk

After onboarding, the problem continues.

Changes to:

-   Address
-   Phone
-   Email
-   Marital status
-   Income

are not automatically synchronized between institutions.

This generates:

-   Outdated databases
-   Failed communication
-   Regulatory inconsistencies
-   Periodic re-registration campaigns
-   Continuous reconciliation costs

Identity is static when it should be dynamic.

### Global Economic Impact

The global identity verification market moves billions of dollars per year --- and grows driven by:

-   Stricter regulation
-   Increase in digital fraud
-   Expansion of digital financial services

However, the current model is:

-   Fragmented
-   Redundant
-   Costly
-   Inefficient

Companies spend billions repeating the same process.\
Users face constant friction.\
The system as a whole does not scale efficiently.


## Strategic Summary

Current digital identity:

-   Is not portable
-   Is not reusable
-   Is not synchronized
-   Is not interoperable

This creates structural inefficiency that:

-   Raises acquisition cost
-   Increases operational cost
-   Amplifies regulatory risk
-   Reduces conversion
-   Hinders international expansion

---

## Estimated Economic Pain

| Dimension | Estimate | Assumption |
|----------|------------|----------|
| Average cost per verification (corporate) | BRL 10,000 - 12,000 | Considering tools + operation |
| Average cost per verification (individual) | BRL 40 - 100 | Considering tools + operation |
| Average onboarding time (user) | 15 – 45 min | Per verification |
| Fraud costs (financial sector) | 0.3 - 10 % | Sector reference |
| Rework due to inconsistency | 15 - 30 % | Based on market studies |

Assumptions will be refined with pilot data and partnerships.

---

## Glossary (acronyms and terms)

- **AML**: Anti-Money Laundering; rules and controls to combat money laundering.
- **CAC**: Customer Acquisition Cost.
- **KYC**: Know Your Customer; process of verifying client identity.
- **LGPD**: General Data Protection Law (Brazil).
- **LTV**: Lifetime Value; value of the customer over the relationship (typically in gross margin).
- **MDM**: Master Data Management; practices/systems for master data management.
