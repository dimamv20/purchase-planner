# Purchase Planner

Purchase Planner is a full-stack web application for creating shopping lists, comparing grocery prices across different stores, and finding a more cost-effective shopping plan.

The application allows users to manage shopping lists and budgets, compare product prices, calculate potential savings, and review previous comparison results.

## Live Demo

Frontend:

https://purchase-planner-three.vercel.app

Backend API:

https://purchase-planner-api.onrender.com

API Health Check:

https://purchase-planner-api.onrender.com/api/health

> The backend is hosted on a free Render instance and may require additional time to start after a period of inactivity.

---

## Main Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected application routes
- User ownership checks
- Role-based access control

### Dashboard

The dashboard provides an overview of user activity:

- Number of shopping lists
- Number of completed comparisons
- Total calculated savings
- Savings for the current month
- Recent shopping lists
- Recent comparisons

### Product Catalog

Users can:

- Browse available products
- Search products by name or brand
- Filter products by category
- View product details
- Compare prices for the same product across stores
- View the current best price
- Add products directly to a shopping list

### Shopping Lists

Users can:

- Create shopping lists
- Set a shopping budget
- Update the budget
- Rename a shopping list
- Delete a shopping list
- Add products
- Remove products
- Change product quantities
- Compare shopping list prices

### Price Comparison

Purchase Planner calculates:

- Optimized shopping total
- Cheapest store for each product
- Best single-store option
- Best two-store shopping plan
- Potential savings
- Remaining budget or amount over budget

Sale prices are applied only when the sale period is currently active.

### Comparison History

Users can:

- View previous price comparisons
- Open detailed comparison results
- Review optimized totals
- Review savings
- Review recommended stores and products

### Responsive Interface

The application supports:

- Desktop
- Tablet
- Mobile layouts

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- Zod
- JSON Web Tokens
- bcrypt

### Database

- PostgreSQL
- Neon

### Deployment

- Vercel — frontend
- Render — backend
- Neon — PostgreSQL database

---

## Project Structure

```text
purchase-planner/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md