# Purchase Planner — Application Structure

## 1. Public Pages

### Home Page

**Route:**

```text
/
```

**Purpose:**

Introduce the application and explain how Purchase Planner helps users compare grocery prices.

**Main elements:**

* application name and short description;
* explanation of the price comparison process;
* registration button;
* login button;
* call-to-action button leading to the product catalog.

---

### Register Page

**Route:**

```text
/register
```

**Purpose:**

Allow a guest to create a new account.

**Form fields:**

* name;
* email;
* password;
* confirm password.

**Actions:**

* submit registration form;
* navigate to the login page;
* display validation and API errors.

---

### Login Page

**Route:**

```text
/login
```

**Purpose:**

Allow an existing user to access their account.

**Form fields:**

* email;
* password.

**Actions:**

* submit login form;
* store authentication data;
* redirect to the product catalog;
* navigate to the registration page.

---

## 2. Authenticated User Pages

### Product Catalog Page

**Route:**

```text
/products
```

**Purpose:**

Display available grocery products.

**Main elements:**

* product search;
* category filter;
* product cards;
* pagination or load more button;
* add-to-shopping-list button;
* loading state;
* empty state.

---

### Product Details Page

**Route:**

```text
/products/:productId
```

**Purpose:**

Display detailed information about a selected product.

**Main elements:**

* product name;
* brand;
* image;
* package size;
* category;
* barcode when available;
* prices by store;
* regular and sale prices;
* add-to-shopping-list action.

---

### Shopping Lists Page

**Route:**

```text
/shopping-lists
```

**Purpose:**

Display all shopping lists owned by the current user.

**Main elements:**

* create shopping list button;
* list cards;
* list name;
* number of products;
* creation date;
* open button;
* delete button;
* empty state.

---

### Create Shopping List Page

**Route:**

```text
/shopping-lists/new
```

**Purpose:**

Allow the user to create a new shopping list.

**Form fields:**

* shopping list name.

**Actions:**

* create the list;
* cancel;
* redirect to the created list.

---

### Shopping List Details Page

**Route:**

```text
/shopping-lists/:listId
```

**Purpose:**

Allow the user to manage products inside a selected shopping list.

**Main elements:**

* shopping list name;
* rename action;
* added products;
* product quantity controls;
* remove product buttons;
* add product button;
* compare prices button;
* delete shopping list button;
* empty list state.

---

### Add Products Page

**Route:**

```text
/shopping-lists/:listId/add-products
```

**Purpose:**

Allow the user to search for and add products to a selected shopping list.

**Main elements:**

* search input;
* category filter;
* product list;
* add product buttons;
* selected shopping list information;
* return-to-list button.

---

### Comparison Results Page

**Route:**

```text
/shopping-lists/:listId/comparison
```

**Purpose:**

Display price comparison results for the selected shopping list.

**Main elements:**

* totals for every store;
* missing products by store;
* cheapest complete single store;
* optimized multi-store basket;
* selected store for every product;
* optimized total;
* savings;
* comparison timestamp.

---

### Comparison History Page

**Route:**

```text
/history
```

**Purpose:**

Display previous comparison results owned by the current user.

**Main elements:**

* comparison date;
* shopping list name;
* cheapest store;
* optimized total;
* savings;
* open result button;
* empty history state.

---

### Historical Comparison Details Page

**Route:**

```text
/history/:comparisonId
```

**Purpose:**

Display one saved comparison result.

**Main elements:**

* original shopping list information;
* store totals;
* optimized basket;
* savings;
* comparison creation date.

---

## 3. Administrator Pages

All administrator routes must require:

* authenticated user;
* ADMIN role.

### Admin Dashboard

**Route:**

```text
/admin
```

**Purpose:**

Provide navigation and summary information for administrative operations.

**Main elements:**

* product count;
* category count;
* store count;
* price count;
* navigation cards.

---

### Admin Products Page

**Route:**

```text
/admin/products
```

**Purpose:**

Allow administrators to view and manage products.

**Main elements:**

* product table;
* search;
* category filter;
* create button;
* edit button;
* delete button;
* pagination.

---

### Create Product Page

**Route:**

```text
/admin/products/new
```

**Purpose:**

Allow an administrator to create a product.

---

### Edit Product Page

**Route:**

```text
/admin/products/:productId/edit
```

**Purpose:**

Allow an administrator to edit a product.

---

### Admin Categories Page

**Route:**

```text
/admin/categories
```

**Purpose:**

Allow administrators to create, view, edit, and delete categories.

---

### Admin Stores Page

**Route:**

```text
/admin/stores
```

**Purpose:**

Allow administrators to create, view, edit, and delete stores.

---

### Admin Prices Page

**Route:**

```text
/admin/prices
```

**Purpose:**

Allow administrators to manage product prices for stores.

**Main elements:**

* price table;
* product filter;
* store filter;
* regular price;
* sale price;
* sale validity dates;
* source;
* last updated date.

---

### CSV Import Page

**Route:**

```text
/admin/import
```

**Purpose:**

Allow administrators to import prices from a CSV file.

**Main elements:**

* file input;
* required CSV format description;
* upload button;
* loading state;
* import summary;
* failed row errors.

---

## 4. System Pages

### Unauthorized Page

**Route:**

```text
/unauthorized
```

**Purpose:**

Inform a user that they do not have permission to access a page.

---

### Not Found Page

**Route:**

```text
*
```

**Purpose:**

Display a 404 message for unknown routes.

---

## 5. Route Access Rules

### Public Routes

```text
/
/login
/register
```

### Authenticated Routes

```text
/products
/products/:productId
/shopping-lists
/shopping-lists/new
/shopping-lists/:listId
/shopping-lists/:listId/add-products
/shopping-lists/:listId/comparison
/history
/history/:comparisonId
```

### Administrator Routes

```text
/admin
/admin/products
/admin/products/new
/admin/products/:productId/edit
/admin/categories
/admin/stores
/admin/prices
/admin/import
```

---

## 6. Main User Flow

```text
Home
→ Register
→ Login
→ Product Catalog
→ Create Shopping List
→ Add Products
→ Change Quantities
→ Compare Prices
→ View Cheapest Store
→ View Optimized Basket
→ View Savings
```

## 7. Administrator Flow

```text
Login
→ Admin Dashboard
→ Create Categories
→ Create Products
→ Create Stores
→ Add or Import Prices
→ Update Existing Prices
```

## 8. Main Navigation

### Guest Navigation

* Home
* Login
* Register

### User Navigation

* Products
* Shopping Lists
* History
* Logout

### Administrator Navigation

* Products
* Shopping Lists
* History
* Admin Dashboard
* Logout

## Definition of Done

This task is complete when:

* all public pages are documented;
* all authenticated pages are documented;
* all administrator pages are documented;
* every page has a route and purpose;
* route access rules are defined;
* the primary user and administrator flows are documented;
* the file is committed to the repository.
