# Purchase Planner — MVP Scope

## Project Goal

Purchase Planner is a web application that helps users create shopping lists, compare grocery prices across different stores, and find the cheapest way to buy all selected products.

## Target Users

- People who want to reduce grocery spending
- Users who regularly compare prices between stores
- Users who want to plan purchases before visiting a store

## User Roles

### Guest

- View the home page
- Register
- Log in

### User

- Browse products
- Search and filter products
- Create shopping lists
- Add products to shopping lists
- Change product quantities
- Compare prices between stores
- View the optimized shopping option
- View previous comparison results

### Admin

- Manage categories
- Manage products
- Manage stores
- Manage product prices
- Import prices from a CSV file

## Must Have Features

- User registration and login
- JWT authentication
- Product catalog
- Product search and category filtering
- Shopping list creation
- Shopping list editing
- Product quantity management
- Three stores
- Product prices for each store
- Regular and sale prices
- Basket price comparison
- Cheapest single-store calculation
- Optimized multi-store calculation
- Savings calculation
- Admin panel
- CSV price import
- Deployment

## Should Have Features

- Comparison history
- Price comparison chart
- Responsive design
- Swagger API documentation
- Backend tests for the comparison algorithm

## Could Have Features

- Favorite products
- Duplicate previous shopping list
- Product data import from Open Food Facts
- Dark mode
- Store limit for optimized shopping

## Out of Scope

The first version will not include:

- Automatic store website scraping
- Google Maps integration
- Route optimization
- Online payments
- Mobile application
- Artificial intelligence recommendations
- Receipt recognition
- Push notifications
- Loyalty card integration
- Automatic price forecasting