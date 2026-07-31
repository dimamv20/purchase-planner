# System Architecture

## Overview

Purchase Planner follows a client-server architecture.

The application consists of four main components:

- React frontend
- Express backend
- Prisma ORM
- PostgreSQL database

This architecture separates the user interface, business logic, and data storage, making the application easier to maintain and extend.

---

# Architecture Diagram

```text
+-----------------------+
|     React Client      |
|  (TypeScript + Vite)  |
+-----------+-----------+
            |
            | HTTP / REST API
            |
+-----------v-----------+
|    Express Server     |
| (Node.js + TypeScript)|
+-----------+-----------+
            |
            | Prisma ORM
            |
+-----------v-----------+
|      PostgreSQL       |
|       Database        |
+-----------------------+
```

---

# Frontend

The frontend is responsible for:

- displaying the user interface;
- handling user interactions;
- sending API requests;
- displaying comparison results;
- managing client-side state.

Technologies:

- React
- TypeScript
- Redux Toolkit
- React Router
- Axios

---

# Backend

The backend is responsible for:

- business logic;
- authentication;
- authorization;
- price comparison algorithm;
- shopping list management;
- REST API.

Technologies:

- Node.js
- Express
- TypeScript
- JWT
- bcrypt

---

# Database

PostgreSQL stores all application data, including:

- users;
- products;
- categories;
- stores;
- prices;
- shopping lists;
- comparison history.

Prisma ORM is used to communicate with the database.

---

# Data Flow

1. User sends a request from the React application.
2. Express receives the request.
3. The backend validates the request.
4. Prisma queries the PostgreSQL database.
5. Data is returned to the backend.
6. Express sends a JSON response.
7. React updates the user interface.

---

# Benefits of the Architecture

The selected architecture provides several advantages:

- clear separation of responsibilities;
- scalability;
- maintainability;
- reusable components;
- secure authentication;
- efficient database communication.

---

# Conclusion

The selected client-server architecture is suitable for the Purchase Planner application because it provides a clear separation between the presentation layer, business logic, and data storage while supporting future scalability.