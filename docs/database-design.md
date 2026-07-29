# Purchase Planner — Database Design

## 1. Database Technology

The application will use PostgreSQL as the relational database management system.

Prisma ORM will be used to:

* define database models;
* manage relations;
* create migrations;
* query the database;
* generate seed data.

---

## 2. Main Entities

The database will contain the following main entities:

* User
* Category
* Product
* Store
* Price
* ShoppingList
* ShoppingListItem
* ComparisonResult

---

## 3. User

The `User` entity stores registered application users.

### Fields

| Field        | Type     | Description                |
| ------------ | -------- | -------------------------- |
| id           | UUID     | Unique user identifier     |
| name         | String   | User display name          |
| email        | String   | Unique email address       |
| passwordHash | String   | Hashed password            |
| role         | UserRole | USER or ADMIN              |
| createdAt    | DateTime | Account creation timestamp |
| updatedAt    | DateTime | Last update timestamp      |

### Rules

* email must be unique;
* password must never be stored as plain text;
* default role is USER;
* one user may own many shopping lists;
* one user may own many comparison results.

---

## 4. Category

The `Category` entity stores product categories.

Examples:

* Dairy
* Meat
* Bakery
* Fruits
* Vegetables
* Beverages

### Fields

| Field     | Type     | Description                 |
| --------- | -------- | --------------------------- |
| id        | UUID     | Unique category identifier  |
| name      | String   | Category name               |
| slug      | String   | URL-friendly category value |
| createdAt | DateTime | Creation timestamp          |
| updatedAt | DateTime | Last update timestamp       |

### Rules

* category name must be unique;
* category slug must be unique;
* one category may contain many products.

---

## 5. Product

The `Product` entity stores grocery products.

### Fields

| Field           | Type        | Description                 |
| --------------- | ----------- | --------------------------- |
| id              | UUID        | Unique product identifier   |
| name            | String      | Product name                |
| brand           | String      | Product brand               |
| packageQuantity | Decimal     | Package amount              |
| unit            | ProductUnit | Unit of measurement         |
| imageUrl        | String?     | Optional product image      |
| barcode         | String?     | Optional product barcode    |
| categoryId      | UUID        | Related category identifier |
| createdAt       | DateTime    | Creation timestamp          |
| updatedAt       | DateTime    | Last update timestamp       |

### Product Units

Possible values:

* GRAM
* KILOGRAM
* MILLILITRE
* LITRE
* PIECE
* PACK

### Rules

* every product must belong to one category;
* one product may have prices in many stores;
* one product may appear in many shopping lists;
* barcode may be unique when provided.

---

## 6. Store

The `Store` entity stores grocery store information.

### Fields

| Field     | Type     | Description               |
| --------- | -------- | ------------------------- |
| id        | UUID     | Unique store identifier   |
| name      | String   | Store name                |
| address   | String   | Store address             |
| city      | String   | Store city                |
| imageUrl  | String?  | Optional store image      |
| isActive  | Boolean  | Store availability status |
| createdAt | DateTime | Creation timestamp        |
| updatedAt | DateTime | Last update timestamp     |

### Rules

* one store may contain prices for many products;
* inactive stores should not participate in new comparisons.

---

## 7. Price

The `Price` entity connects products with stores.

It stores regular prices, sale prices, validity periods, and update sources.

### Fields

| Field        | Type        | Description                |
| ------------ | ----------- | -------------------------- |
| id           | UUID        | Unique price identifier    |
| productId    | UUID        | Related product identifier |
| storeId      | UUID        | Related store identifier   |
| regularPrice | Decimal     | Standard product price     |
| salePrice    | Decimal?    | Optional discounted price  |
| saleStartsAt | DateTime?   | Optional sale start        |
| saleEndsAt   | DateTime?   | Optional sale expiration   |
| source       | PriceSource | MANUAL, CSV, or API        |
| isAvailable  | Boolean     | Product availability       |
| createdAt    | DateTime    | Creation timestamp         |
| updatedAt    | DateTime    | Last update timestamp      |

### Price Sources

Possible values:

* MANUAL
* CSV
* API

### Rules

* regular price must be greater than or equal to zero;
* sale price must be greater than or equal to zero;
* one product may have one current price per store;
* the combination of `productId` and `storeId` must be unique;
* the active sale price is used only when the current date is inside the sale period;
* unavailable products must not be selected by the optimization algorithm.

---

## 8. ShoppingList

The `ShoppingList` entity stores shopping lists created by users.

### Fields

| Field     | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| id        | UUID     | Unique shopping list identifier |
| name      | String   | Shopping list name              |
| userId    | UUID     | List owner identifier           |
| createdAt | DateTime | Creation timestamp              |
| updatedAt | DateTime | Last update timestamp           |

### Rules

* every shopping list must belong to one user;
* one shopping list may contain many shopping list items;
* users must not access lists owned by other users.

---

## 9. ShoppingListItem

The `ShoppingListItem` entity connects products with shopping lists.

### Fields

| Field          | Type     | Description                      |
| -------------- | -------- | -------------------------------- |
| id             | UUID     | Unique item identifier           |
| shoppingListId | UUID     | Related shopping list identifier |
| productId      | UUID     | Related product identifier       |
| quantity       | Int      | Required quantity                |
| createdAt      | DateTime | Creation timestamp               |
| updatedAt      | DateTime | Last update timestamp            |

### Rules

* quantity must be greater than zero;
* the same product must not appear twice in one shopping list;
* the combination of `shoppingListId` and `productId` must be unique;
* adding an existing product may increase its quantity.

---

## 10. ComparisonResult

The `ComparisonResult` entity stores completed comparison results.

The complete result may be stored as JSON because comparison output contains nested data.

### Fields

| Field              | Type     | Description                               |
| ------------------ | -------- | ----------------------------------------- |
| id                 | UUID     | Unique comparison identifier              |
| userId             | UUID     | Result owner identifier                   |
| shoppingListId     | UUID?    | Related shopping list identifier          |
| shoppingListName   | String   | Shopping list name at comparison time     |
| cheapestStoreId    | UUID?    | Cheapest complete store                   |
| cheapestStoreTotal | Decimal? | Cheapest single-store total               |
| optimizedTotal     | Decimal  | Optimized multi-store total               |
| savings            | Decimal  | Calculated savings                        |
| storeTotals        | Json     | Totals and unavailable items by store     |
| optimizedItems     | Json     | Cheapest store selected for every product |
| createdAt          | DateTime | Comparison timestamp                      |

### Rules

* every comparison result must belong to one user;
* comparison data must remain readable even if prices change later;
* the shopping list name should be copied into the result;
* store totals and optimized items should be saved as snapshots;
* users must not access results owned by other users.

---

## 11. Entity Relationships

### User Relationships

```text
User 1 ──── * ShoppingList
User 1 ──── * ComparisonResult
```

### Category Relationships

```text
Category 1 ──── * Product
```

### Product and Store Relationships

```text
Product 1 ──── * Price
Store   1 ──── * Price
```

This creates a many-to-many relationship between products and stores through the `Price` table.

### Shopping List Relationships

```text
ShoppingList 1 ──── * ShoppingListItem
Product      1 ──── * ShoppingListItem
```

This creates a many-to-many relationship between shopping lists and products through the `ShoppingListItem` table.

### Comparison Relationships

```text
User         1 ──── * ComparisonResult
ShoppingList 1 ──── * ComparisonResult
Store        1 ──── * ComparisonResult
```

The shopping list and cheapest store relations may be optional so that historical data remains available after related records are deleted.

---

## 12. Simplified ER Diagram

```text
User
 ├── ShoppingList
 │    └── ShoppingListItem
 │         └── Product
 │              ├── Category
 │              └── Price
 │                   └── Store
 │
 └── ComparisonResult
```

Extended relationship view:

```text
User
  |
  | 1
  |
  | *
ShoppingList
  |
  | 1
  |
  | *
ShoppingListItem
  |
  | *
  |
  | 1
Product
  |
  | *
  |
  | 1
Category

Product
  |
  | 1
  |
  | *
Price
  |
  | *
  |
  | 1
Store

User
  |
  | 1
  |
  | *
ComparisonResult
```

---

## 13. Unique Constraints

The following values or combinations must be unique:

```text
User.email
Category.name
Category.slug
Product.barcode when provided
Price.productId + Price.storeId
ShoppingListItem.shoppingListId + ShoppingListItem.productId
```

---

## 14. Recommended Indexes

Indexes should be added to fields commonly used for filtering and relations.

Recommended indexes:

```text
Product.name
Product.brand
Product.categoryId
Price.productId
Price.storeId
ShoppingList.userId
ShoppingListItem.shoppingListId
ComparisonResult.userId
ComparisonResult.createdAt
```

---

## 15. Delete Behaviour

### User deletion

Recommended behaviour:

* delete related shopping lists;
* delete related shopping list items;
* delete related comparison results.

### Category deletion

Recommended behaviour:

* restrict deletion when products still belong to the category.

### Product deletion

Recommended behaviour:

* delete related prices;
* delete related shopping list items;
* preserve historical comparison snapshots.

### Store deletion

Recommended behaviour:

* delete related current price records;
* preserve store information inside historical comparison JSON snapshots.

### Shopping list deletion

Recommended behaviour:

* delete related shopping list items;
* preserve historical comparison results;
* set the related shopping list ID in comparison results to null.

---

## 16. Monetary Data

All monetary values must use PostgreSQL decimal or numeric types.

Example:

```text
Decimal(10, 2)
```

Floating-point types must not be used for money because they may create rounding errors.

---

## 17. Seed Data

The initial database seed should contain:

* one administrator;
* one regular user;
* at least six categories;
* at least twenty products;
* three stores;
* product prices for every store;
* several active sale prices;
* one example shopping list.

Example stores:

* Walmart
* Real Canadian Superstore
* Save-On-Foods

---

## 18. Comparison Data Requirements

The comparison algorithm will require:

* shopping list items;
* requested quantities;
* active stores;
* available prices;
* regular prices;
* current sale prices;
* sale validity dates.

The algorithm will produce:

* total basket price for each store;
* unavailable products for each store;
* cheapest complete single store;
* cheapest store for each individual product;
* optimized total;
* savings.

---

## Definition of Done

This task is complete when:

* all database entities are documented;
* all entity fields are defined;
* relationships are defined;
* unique constraints are documented;
* indexes are documented;
* deletion behaviour is documented;
* monetary types are defined correctly;
* seed data requirements are documented;
* the file is committed to the repository.
