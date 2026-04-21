# Smart Inventory & POS System

A full-stack inventory and point-of-sale (POS) system built with:

- Frontend: React (Dashboard UI)
- Backend: ASP.NET Core Web API
- Database: SQLite (EF Core)

---

## Features Implemented

### Inventory Management
- View all products
- Add new product (Modal UI)
- Edit existing product
- Delete product
- Search/filter products (frontend)

### Backend API (RESTful)
- GET /api/products
- POST /api/products
- PUT /api/products/{id}
- DELETE /api/products/{id}

### UI Enhancements
- Modal-based Add/Edit (ProductModal)
- Toast notifications (success/error/info)
- Clean dashboard layout

---

## Architecture

### Backend Structure

backend/
│
├── Controllers/
│ └── ProductsController.cs
│
├── Services/
│ └── ProductService.cs
│
├── Models/
│ └── Product.cs
│
├── DTOs/
│ └── ProductDto.cs
│
├── Data/
│ └── AppDbContext.cs


### Architecture Pattern
- Controller → DTO → Service → Model → Database

---

## Status
🟢 Backend Complete  
🟡 Frontend In Progress 

## Learning Highlights
- React state management
- REST API integration
- Full CRUD operations
- UI Redesign
- Git & GitHub workflow
- Debugging real-world errors

## Upcoming Features
- POS (Point of Sale) module
- Sales tracking
- Authentication (Login system)
- Reports & analytics
- AI demand prediction
- Sales reports page
- Multi-user support

## Setup Instructions (How to Run)

### Backend (ASP.NET Core)

``bash
cd backend
dotnet restore
dotnet build
dotnet ef database update
dotnet run

Backend runs on:

http://localhost:5216

### Frontend (React)
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

API Base URL
http://localhost:5216/api/products

## Live Updates
Follow development on LinkedIn
www.linkedin.com/in/albert-ryan-0510marc


## 👨‍💻 Author

Albert Ryan C Mbuwa
