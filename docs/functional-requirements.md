# Purchase Planner — Functional Requirements

## 1. Authentication and Authorization

### FR-01 — User Registration

The system shall allow a guest to create a new user account.

### FR-02 — Registration Data Validation

The system shall validate the user's name, email address, and password before creating an account.

### FR-03 — Unique Email Address

The system shall prevent registration if the provided email address is already associated with an existing account.

### FR-04 — Password Security

The system shall store user passwords in hashed form.

### FR-05 — User Login

The system shall allow a registered user to log in using an email address and password.

### FR-06 — Authentication Token

The system shall generate an authentication token after a successful login.

### FR-07 — Current User Session

The system shall allow an authenticated user to retrieve their account information.

### FR-08 — Persistent Authentication

The frontend shall preserve the user's authenticated state after the page is refreshed.

### FR-09 — User Logout

The system shall allow an authenticated user to log out.

### FR-10 — Protected Resources

The system shall prevent unauthenticated users from accessing protected pages and API endpoints.

### FR-11 — Role-Based Authorization

The system shall support the following roles:

* USER
* ADMIN

### FR-12 — Administrator Access

The system shall restrict administrative operations to users with the ADMIN role.

---

## 2. Product Categories

### FR-13 — View Categories

The system shall allow users to retrieve the list of product categories.

### FR-14 — Create Category

The system shall allow an administrator to create a product category.

### FR-15 — Edit Category

The system shall allow an administrator to edit an existing product category.

### FR-16 — Delete Category

The system shall allow an administrator to delete a product category if it is not required by protected business rules.

---

## 3. Product Management

### FR-17 — View Products

The system shall allow authenticated users to view available products.

### FR-18 — View Product Details

The system shall allow authenticated users to view detailed information about a selected product.

### FR-19 — Search Products

The system shall allow users to search for products by name or brand.

### FR-20 — Filter Products

The system shall allow users to filter products by category.

### FR-21 — Paginate Products

The system shall divide large product result sets into pages or incremental batches.

### FR-22 — Create Product

The system shall allow an administrator to create a product.

### FR-23 — Edit Product

The system shall allow an administrator to edit an existing product.

### FR-24 — Delete Product

The system shall allow an administrator to delete an existing product.

### FR-25 — Product Data Validation

The system shall validate required product fields before saving a product.

### FR-26 — Product Information

A product shall contain:

* name;
* brand;
* category;
* package quantity;
* unit of measurement;
* image URL;
* optional barcode.

---

## 4. Store Management

### FR-27 — View Stores

The system shall allow users to view available stores.

### FR-28 — Create Store

The system shall allow an administrator to create a store.

### FR-29 — Edit Store

The system shall allow an administrator to edit an existing store.

### FR-30 — Delete Store

The system shall allow an administrator to delete an existing store.

### FR-31 — Store Information

A store shall contain:

* name;
* address;
* city;
* optional image URL.

---

## 5. Price Management

### FR-32 — View Product Prices

The system shall allow users to view available prices for a product.

### FR-33 — Create Product Price

The system shall allow an administrator to assign a product price to a store.

### FR-34 — Edit Product Price

The system shall allow an administrator to edit an existing product price.

### FR-35 — Delete Product Price

The system shall allow an administrator to delete an existing product price.

### FR-36 — Regular Price

Each product price record shall contain a regular price.

### FR-37 — Sale Price

A product price record may contain a sale price.

### FR-38 — Sale Validity Period

A sale price may contain a start date and an expiration date.

### FR-39 — Effective Price Calculation

The system shall use the sale price when the sale is active.

Otherwise, the system shall use the regular price.

### FR-40 — Price Validation

The system shall reject negative or invalid price values.

### FR-41 — Price Update Timestamp

The system shall store the date and time when a product price was last updated.

### FR-42 — Price Source

The system shall store the source of each product price.

Possible values may include:

* MANUAL
* CSV
* API

---

## 6. CSV Price Import

### FR-43 — Upload CSV File

The system shall allow an administrator to upload a CSV file containing product prices.

### FR-44 — Validate CSV Structure

The system shall validate that the uploaded CSV file contains all required columns.

### FR-45 — Validate CSV Rows

The system shall validate each CSV row before importing it.

### FR-46 — Match Products and Stores

The system shall match imported rows with existing products and stores.

### FR-47 — Import Valid Rows

The system shall create or update price records for valid CSV rows.

### FR-48 — Reject Invalid Rows

The system shall reject invalid CSV rows without stopping the entire import operation.

### FR-49 — Import Summary

The system shall return an import summary containing:

* total processed rows;
* successful rows;
* failed rows;
* validation errors.

---

## 7. Shopping List Management

### FR-50 — Create Shopping List

The system shall allow an authenticated user to create a shopping list.

### FR-51 — Name Shopping List

The system shall allow a user to assign a custom name to a shopping list.

### FR-52 — View Shopping Lists

The system shall allow a user to view all shopping lists owned by that user.

### FR-53 — View Shopping List Details

The system shall allow a user to view the products and quantities contained in a selected shopping list.

### FR-54 — Rename Shopping List

The system shall allow a user to rename a shopping list.

### FR-55 — Delete Shopping List

The system shall allow a user to delete a shopping list.

### FR-56 — Add Product to Shopping List

The system shall allow a user to add a product to a shopping list.

### FR-57 — Prevent Duplicate List Items

The system shall prevent duplicate product rows within the same shopping list.

When the same product is added again, the system may increase its quantity.

### FR-58 — Update Product Quantity

The system shall allow a user to change the quantity of a product in a shopping list.

### FR-59 — Validate Product Quantity

The system shall only allow quantities greater than zero.

### FR-60 — Remove Product from Shopping List

The system shall allow a user to remove a product from a shopping list.

### FR-61 — Shopping List Ownership

The system shall prevent users from viewing or modifying shopping lists owned by other users.

---

## 8. Price Comparison

### FR-62 — Start Price Comparison

The system shall allow a user to compare prices for a selected shopping list.

### FR-63 — Calculate Store Total

The system shall calculate the total shopping list cost for each store.

### FR-64 — Apply Product Quantity

The system shall multiply each product price by the quantity specified in the shopping list.

### FR-65 — Use Effective Price

The comparison algorithm shall use the current effective price for each product.

### FR-66 — Cheapest Single Store

The system shall identify the cheapest store where the shopping list can be purchased.

### FR-67 — Optimized Multi-Store Basket

The system shall identify the cheapest available store for each product.

### FR-68 — Optimized Total

The system shall calculate the total price of the optimized multi-store basket.

### FR-69 — Savings Calculation

The system shall calculate savings using the difference between:

* the cheapest complete single-store basket;
* the optimized multi-store basket.

### FR-70 — Unavailable Product Handling

The system shall indicate when a product is unavailable in a specific store.

### FR-71 — Incomplete Store Basket

The system shall identify stores that cannot provide all products from the shopping list.

### FR-72 — Comparison Result Details

The comparison result shall include:

* total price for each store;
* unavailable products;
* cheapest single store;
* optimized product distribution;
* optimized total;
* calculated savings.

---

## 9. Comparison History

### FR-73 — Save Comparison Result

The system shall save completed comparison results.

### FR-74 — View Comparison History

The system shall allow users to view previous comparison results.

### FR-75 — View Historical Comparison Details

The system shall allow users to open a selected historical comparison result.

### FR-76 — Comparison Ownership

The system shall prevent users from accessing comparison results owned by other users.

---

## 10. Administrative Interface

### FR-77 — Admin Dashboard

The system shall provide an administrative dashboard.

### FR-78 — Product Administration

The administrator interface shall provide product creation, editing, viewing, and deletion.

### FR-79 — Category Administration

The administrator interface shall provide category creation, editing, viewing, and deletion.

### FR-80 — Store Administration

The administrator interface shall provide store creation, editing, viewing, and deletion.

### FR-81 — Price Administration

The administrator interface shall provide price creation, editing, viewing, and deletion.

### FR-82 — CSV Import Interface

The administrator interface shall provide a form for uploading CSV files.

---

## 11. System Feedback

### FR-83 — Loading State

The frontend shall display a loading state while data is being retrieved or submitted.

### FR-84 — Success Feedback

The frontend shall notify users when an operation is completed successfully.

### FR-85 — Validation Errors

The frontend shall display validation errors near the relevant fields.

### FR-86 — API Error Feedback

The frontend shall display a clear error message when an API request fails.

### FR-87 — Empty State

The frontend shall display an appropriate message when no products, lists, prices, or results are available.

### FR-88 — Delete Confirmation

The frontend shall request confirmation before destructive operations such as deleting products, stores, or shopping lists.

---

## Priority

### Must Have

* FR-01 to FR-15
* FR-17 to FR-25
* FR-27 to FR-49
* FR-50 to FR-72
* FR-77 to FR-88

### Should Have

* FR-16
* FR-26
* FR-31
* FR-73 to FR-76

## Definition of Done

This task is complete when:

* every major MVP module has functional requirements;
* requirements use unique identifiers;
* each requirement describes one testable system behaviour;
* administrator and user functionality are separated;
* comparison algorithm requirements are documented;
* the file is committed to the repository.
