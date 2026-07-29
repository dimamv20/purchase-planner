# Purchase Planner — Non-Functional Requirements

## 1. Performance

### NFR-01 — API Response Time

The system should return standard API responses within 2 seconds under normal operating conditions.

### NFR-02 — Comparison Performance

The shopping comparison algorithm should calculate results within 3 seconds for a shopping list containing up to 100 products and up to 20 stores.

### NFR-03 — Product Catalog Loading

The product catalog should use pagination or incremental loading to avoid loading all products at once.

### NFR-04 — Database Query Efficiency

The backend should avoid unnecessary database queries and should use appropriate relations, filters, and indexes.

---

## 2. Security

### NFR-05 — Password Storage

User passwords must never be stored as plain text.

Passwords must be hashed using bcrypt before being saved in the database.

### NFR-06 — Authentication

Protected API endpoints must require a valid JWT access token.

### NFR-07 — Authorization

The backend must verify user roles before allowing access to administrative operations.

### NFR-08 — Resource Ownership

The backend must verify resource ownership before allowing a user to view, update, or delete personal data.

This includes:

* shopping lists;
* shopping list items;
* comparison results.

### NFR-09 — Input Validation

All data received by the backend must be validated before processing.

### NFR-10 — Sensitive Data

Passwords, secrets, database credentials, and JWT secrets must not be committed to GitHub.

### NFR-11 — Environment Variables

Sensitive configuration must be stored in environment variables.

### NFR-12 — Error Security

API error responses must not expose:

* passwords;
* JWT secrets;
* database credentials;
* stack traces in production;
* internal server configuration.

### NFR-13 — CORS Configuration

The backend must allow requests only from approved frontend origins in production.

### NFR-14 — File Upload Security

CSV uploads must be validated by file type, size, structure, and content before import.

---

## 3. Reliability

### NFR-15 — Error Handling

The backend must use centralized error handling.

### NFR-16 — Invalid Request Handling

Invalid requests must return appropriate HTTP status codes and clear error messages.

### NFR-17 — Partial CSV Import

An invalid CSV row must not stop the import of other valid rows.

### NFR-18 — Database Consistency

Operations involving multiple related database changes should use transactions when partial completion could create inconsistent data.

### NFR-19 — Comparison Consistency

The comparison algorithm must return the same result when it receives the same list, quantities, prices, and active sale dates.

### NFR-20 — Missing Data Handling

The application must handle missing prices and unavailable products without crashing.

---

## 4. Usability

### NFR-21 — Responsive Interface

The frontend must support desktop, tablet, and mobile screen sizes.

### NFR-22 — Clear Navigation

Users should be able to reach the main application pages through clear navigation.

### NFR-23 — Form Feedback

Forms must display clear validation messages near invalid fields.

### NFR-24 — Loading Feedback

The frontend must show a loading indicator during long-running API requests.

### NFR-25 — Empty States

The frontend must display clear empty-state messages when no data is available.

### NFR-26 — Destructive Action Confirmation

The frontend must request confirmation before destructive actions.

Examples include:

* deleting a shopping list;
* deleting a product;
* deleting a store;
* deleting a category.

### NFR-27 — Consistent Interface

Buttons, forms, headings, cards, spacing, and notifications should follow a consistent visual design.

### NFR-28 — Accessibility

Interactive elements should be usable with a keyboard and should include clear accessible labels where necessary.

---

## 5. Maintainability

### NFR-29 — TypeScript

Both frontend and backend must use TypeScript.

### NFR-30 — Project Structure

The frontend and backend must use a clear modular folder structure.

### NFR-31 — Separation of Concerns

The backend should separate:

* routes;
* controllers;
* services;
* middleware;
* validation;
* database access.

### NFR-32 — Reusable Components

The frontend should use reusable components for repeated interface elements.

### NFR-33 — Naming Conventions

Files, variables, functions, database models, and API routes must use consistent naming conventions.

### NFR-34 — Code Formatting

The project must use automated code formatting.

### NFR-35 — Linting

The project must use ESLint to detect code quality issues.

### NFR-36 — Documentation

Important modules, environment variables, setup steps, and API behaviour must be documented.

### NFR-37 — Small Functions

Functions should perform one clear responsibility and should not contain unnecessary business logic.

### NFR-38 — Reusable Comparison Logic

The comparison algorithm must be implemented as an independent service so that it can be tested separately.

---

## 6. Testability

### NFR-39 — Comparison Tests

The comparison algorithm must have automated tests.

### NFR-40 — Authentication Tests

Critical authentication behaviour should have automated tests.

### NFR-41 — Validation Tests

Important validation rules should be testable independently.

### NFR-42 — Deterministic Seed Data

The project should contain repeatable seed data for local development and testing.

### NFR-43 — Test Isolation

Tests should not depend on production data or external production services.

---

## 7. Compatibility

### NFR-44 — Browser Support

The frontend should support current versions of:

* Google Chrome;
* Microsoft Edge;
* Mozilla Firefox;
* Safari.

### NFR-45 — Windows Development

The project must be runnable in a Windows development environment.

### NFR-46 — Node.js Version

The project should define a supported Node.js version in its documentation.

### NFR-47 — Environment Independence

The application should work in development and production using environment-based configuration.

---

## 8. Scalability

### NFR-48 — Modular Architecture

The system should allow new stores, products, categories, and price sources to be added without major architectural changes.

### NFR-49 — Database Pagination

Large database result sets must use pagination.

### NFR-50 — Database Indexes

Frequently searched and filtered database fields should use indexes where appropriate.

Possible indexed fields include:

* product name;
* product category ID;
* price product ID;
* price store ID;
* shopping list user ID;
* comparison result user ID.

### NFR-51 — Stateless Backend

The backend should not store authenticated user sessions in server memory.

Authentication should remain stateless through JWT.

---

## 9. Deployment

### NFR-52 — Frontend Deployment

The frontend must be deployable to Vercel.

### NFR-53 — Backend Deployment

The backend must be deployable to Render, Railway, or another compatible Node.js hosting platform.

### NFR-54 — Database Deployment

The PostgreSQL database must be hosted on a managed database service.

### NFR-55 — Environment Configuration

Development and production environments must use separate configuration values.

### NFR-56 — Production Build

Both frontend and backend must successfully produce production builds.

### NFR-57 — Application Health

The backend should provide a health-check endpoint.

Example:

```text
GET /api/health
```

### NFR-58 — Deployment Documentation

The README must contain deployment and local setup instructions.

---

## 10. Data Integrity

### NFR-59 — Monetary Values

Prices must be stored using a precise decimal database type rather than floating-point values.

### NFR-60 — Unique Price Record

The database should prevent duplicate active price records for the same product and store when such duplication is not intended.

### NFR-61 — Timestamps

Important database records must contain creation and update timestamps.

### NFR-62 — Referential Integrity

Database relationships must use foreign keys.

### NFR-63 — Controlled Deletion

The project must define whether related records are restricted, cascaded, or preserved when parent records are deleted.

---

## Priority

### Must Have

* NFR-05 to NFR-20
* NFR-21 to NFR-27
* NFR-29 to NFR-38
* NFR-39
* NFR-42
* NFR-45 to NFR-47
* NFR-52 to NFR-63

### Should Have

* NFR-01 to NFR-04
* NFR-28
* NFR-40
* NFR-41
* NFR-43
* NFR-44
* NFR-48 to NFR-51

## Definition of Done

This task is complete when:

* performance requirements are documented;
* security rules are documented;
* reliability requirements are documented;
* usability requirements are documented;
* maintainability and testing requirements are documented;
* deployment requirements are documented;
* database integrity rules are documented;
* every requirement has a unique identifier;
* the document is committed to the repository.
