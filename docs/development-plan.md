# Purchase Planner — 7-Week Development Plan

## Project Goal

The goal of Purchase Planner is to help users create grocery shopping lists, compare product prices across stores, identify the cheapest store, generate an optimized multi-store basket, and calculate potential savings.

## Main Application Features

- user registration and login;
- product catalog;
- product search and filtering;
- shopping list creation;
- adding products and quantities;
- price comparison between stores;
- cheapest complete store calculation;
- optimized basket calculation;
- savings calculation;
- comparison history;
- administrator management of products, stores, categories, and prices;
- CSV price import.

## Week 1 — Planning and Requirements

### Goal

Define the project concept, scope, architecture, requirements, and development plan.

### Tasks

- define the project problem;
- define the target users;
- define project goals;
- analyze similar solutions;
- define MVP scope;
- write user stories;
- write functional requirements;
- write non-functional requirements;
- define application pages and routes;
- design the database structure;
- create the 7-week implementation plan.

### Expected Result

- clear project scope;
- documented requirements;
- initial architecture;
- database design;
- development roadmap.

## Week 2 — Backend Foundation and Database

### Goal

Create the backend foundation and connect the PostgreSQL database.

### Tasks

- initialize Node.js and TypeScript backend;
- configure Express;
- configure Prisma;
- create PostgreSQL database;
- implement Prisma schema;
- create migrations;
- create seed data;
- create health-check endpoint;
- configure environment variables.

### Expected Result

- running backend server;
- connected database;
- created database tables;
- initial seed data.

## Week 3 — Authentication and Core Admin Features

### Goal

Implement user authentication and basic data management.

### Tasks

- implement user registration;
- implement login;
- hash passwords with bcrypt;
- generate and verify JWT tokens;
- create authentication middleware;
- create role-based authorization;
- implement category CRUD;
- implement store CRUD;
- implement product CRUD.

### Expected Result

- users can register and log in;
- administrators can manage categories, stores, and products.

## Week 4 — Prices and Shopping Lists

### Goal

Implement price management and shopping list functionality.

### Tasks

- implement price CRUD;
- implement sale price logic;
- implement CSV price import;
- implement shopping list creation;
- implement list update and deletion;
- add products to shopping lists;
- change product quantities;
- remove products from lists;
- enforce ownership rules.

### Expected Result

- administrators can manage prices;
- users can create and manage shopping lists.

## Week 5 — Price Comparison Algorithm

### Goal

Implement the main business logic of Purchase Planner.

### Tasks

- calculate basket total for each store;
- identify unavailable products;
- identify the cheapest complete store;
- calculate the cheapest store for each product;
- generate optimized multi-store basket;
- calculate optimized total;
- calculate savings;
- save comparison results;
- create comparison history API.

### Expected Result

- working price comparison;
- optimized basket calculation;
- saved comparison history.

## Week 6 — Frontend Development

### Goal

Create the main React user interface and connect it to the backend.

### Tasks

- initialize React and TypeScript frontend;
- configure React Router;
- configure Redux Toolkit;
- create registration and login pages;
- create product catalog;
- create product details page;
- create shopping list pages;
- create comparison results page;
- create comparison history page;
- create administrator pages;
- connect frontend to API.

### Expected Result

- users can perform the main workflow through the interface;
- administrators can manage application data.

## Week 7 — Testing, Deployment, and Finalization

### Goal

Prepare the project for presentation and submission.

### Tasks

- test core backend endpoints;
- test authentication and authorization;
- test comparison calculations;
- test error handling;
- fix discovered defects;
- improve responsive design;
- deploy frontend;
- deploy backend;
- deploy PostgreSQL database;
- update README;
- prepare project screenshots;
- prepare demonstration scenario;
- prepare final presentation.

### Expected Result

- deployed working application;
- tested core functionality;
- complete project documentation;
- prepared final demonstration.