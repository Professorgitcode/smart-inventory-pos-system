# High Level System Design

The system will have five components:

## 1 User Interface Layer

What the cashier or manager interacts with.

### Examples:

- POS screen
- Inventory dashboard
- Sales reports

## 2 Application Backend

Business logic.

### Handles:

- Sales processing
- Stock updates
- Authentication
- Reporting

## 3 Database Layer

### Stores:

- Products
- Sales
- Customers
- Users
- Inventory logs

Relational schema to be displayeed soon.

## 4 AI Prediction Engine

### This module analyzes past sales to predict:

- Future demand
- Restock timing

### Example:

If batteries sell 20 units weekly → system predicts next demand.

## 5 Reporting & Analytics

### Graphs like:

- Daily sales
- Best-selling products
- Inventory trends

## Frontend Architecture (Updated)

The frontend follows a component-based architecture using React.

### Structure:
- layout/ → Sidebar and Navbar
- pages/ → Dashboard, Inventory, POS
- components/ → Reusable UI components

### Features:
- Sidebar navigation
- Page-based rendering
- Dark mode support