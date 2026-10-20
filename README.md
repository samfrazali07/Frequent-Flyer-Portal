# Frequent Flyer Portal — Floor Staff Management (Ticket ENG-163087)

**Ticket**: `ENG-163087` — End-to-End Frequent Flyer Portal  
**Epic**: Core Infrastructure Overhaul  
**Priority**: P1 — High | **Story Points**: 5  
**Reporter**: Amit Sharma, Senior Staff Engineer  
**Role**: Senior Software Engineer, QA Engineer, UI/UX Designer, TDD Mentor  

---

## 1. Project Overview

The **Frequent Flyer Portal** replaces manual paper logs and Excel spreadsheets with a robust, enterprise-grade digital operational desk portal for airline floor and customer service staff. Staff can register new frequent flyer members, update member profiles, view detailed passenger flight miles histories, search and filter records instantaneously, and record miles credits or redemptions with strict real-time balance integrity checks.

---

## 2. Implemented Features

### A. Dashboard Metrics & Calculated Statistics
- **Total Registered Members**: Direct count of all records in PostgreSQL.
- **Active Members**: Count of active members with status calculation.
- **Aggregate Points / Miles**: Sum of points across all members.
- **Recent Floor Transactions**: Transaction ledger count.
- Consistent calculations that strictly reflect underlying database records.

### B. Member Management (CRUD)
- **Directory Table**: Display of Member ID, Full Name, Email, Phone, Membership Tier (Standard, Silver, Gold, Platinum), Status (Active, Inactive, Suspended), and Points Balance.
- **Search & Filtering**: Real-time search across Full Name, Member ID, and Email, combined with Tier and Status filters.
- **Add Member**: Accessible modal with strict validation:
  - Required fields, unique Member ID formatting, RFC-compliant email validation, non-negative balance checks.
  - Inline error messages linked via `aria-describedby` and red border highlight tokens.
- **Edit Member**: In-place profile updates for tier, status, contact details, and balance adjustments.
- **Delete Member**: Modal confirmation preventing accidental data loss.
- **Clear Empty States**:
  - Filter empty state: "No data found" with single-click reset.
  - Empty directory state: "No members registered yet" with quick add action.

### C. Points / Miles Transactions
- **Credit Points (+)**: Add points with reason/flight description and resulting balance calculation.
- **Redeem Points (-)**: Deduct points with balance check. Prevents redemptions exceeding available balance.
- **Live Impact Preview**: Real-time computation of resulting balance before committing the transaction.
- **Duplicate Prevention**: Buttons disabled during pending async transactions.
- **Transaction History**: Audit trail recording Transaction ID, Member ID, Type, Amount, Resulting Balance, Description, and Timestamp.

### D. User Feedback & Accessibility
- **Toast Notifications**: `aria-live="polite"` status announcements for success and error messages.
- **WCAG AA Compliance**: High-contrast monochromatic palette, visible `:focus-visible` rings, semantic landmarks (`<header>`, `<main>`, `<section>`, `<nav>`, `<table>`, `<dialog>`), keyboard navigation.
- **Sanitization & XSS Prevention**: Safe text rendering, HTML tag stripping, and SQL injection prevention via parameterized queries in Drizzle ORM.

### E. Telemetry Simulation
- Whenever a primary action completes successfully, logs:
  `[Analytics] User interacted with End-to-End Frequent Flyer Portal`
  with sanitized non-sensitive metadata (emails and phone numbers are strictly redacted).

---

## 3. Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM with `pg` driver
- **Styling**: Tailwind CSS v4 with monochromatic enterprise tokens
- **Icons**: Lucide React
- **Testing**: Vitest 5 (TDD Test-First Suite)

---

## 4. Setup and Run Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL database instance

### Database Setup
The database connection string is configured in `.env` as `DATABASE_URL`.
Run schema push:
```bash
npx drizzle-kit push
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build & Start
```bash
npm run build
npm run start
```

---

## 5. Test and Lint Commands

### Run Vitest Automated Test Suite
```bash
npx vitest run
```
Both test suites (`tests/frequent-flyer.test.ts` and `tests/api-and-edge-cases.test.ts`) test all 15 explicit acceptance criteria from the master ticket.

### Run Linter
```bash
npm run lint
```

### Run TypeScript Type Check
```bash
npm run typecheck
```

---

## 6. Data Persistence & Architecture

- **PostgreSQL Database**: Persistent storage for all member records and transactions via `drizzle-orm`.
- **Drizzle Schema** (`src/db/schema.ts`):
  - `members`: `id`, `member_id`, `full_name`, `email`, `phone`, `tier`, `balance`, `status`, `join_date`, `created_at`, `updated_at`.
  - `transactions`: `id`, `transaction_id`, `member_id`, `type`, `amount`, `description`, `resulting_balance`, `created_at`.
- **Demo Data Reset**: Staff can click "Reset Demo Data" in the top bar to reload realistic sample records on demand (`/api/seed`). Sample records are clearly tagged and simulated.

---

## 7. Accessibility and Security Considerations

1. **Accessibility**:
   - Semantic HTML5 landmarks (`header`, `main`, `footer`, `nav`, `section`).
   - All interactive controls have accessible names and labels (`aria-label`, `aria-labelledby`, `aria-describedby`).
   - Focus indicator outlines (`outline: 2px solid #0f172a`, `outline-offset: 2px`).
   - Reduced motion preferences honored via `@media (prefers-reduced-motion: reduce)`.
2. **Security**:
   - User inputs sanitized before database insertion and state updates (`safeSanitize`).
   - Drizzle ORM uses parameterized queries, preventing SQL injection.
   - React JSX escapes interpolated strings, preventing XSS injection.
   - PII (email, phone, passwords) redacted from simulated analytics logging.
   - No hardcoded secrets or credentials in source code.

---

## 8. Definition of Done Checklist

- [x] Application builds and runs without fatal errors.
- [x] Automated tests were written before implementation (Phase A).
- [x] All 21 required test cases pass (Phase B).
- [x] ESLint passes with zero errors and zero warnings.
- [x] Member management (Add, Edit, Delete, Search, Filter) works reliably.
- [x] Points transactions preserve balance consistency and prevent overdraft.
- [x] Empty states, loading indicators, and field-level validation work.
- [x] Inputs are rendered safely and no secrets are hard-coded.
- [x] Keyboard accessibility and semantic contrast verified.
- [x] Telemetry simulation logged for primary actions.
- [x] `PROMPTS.md` exists in repository root documenting complete prompt sequence.
- [x] `README.md` is complete and up to date.
- [x] Production build passes cleanly.
