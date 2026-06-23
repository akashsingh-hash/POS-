# Apex POS - System Architecture & Detailed Overview

Welcome to the **Apex POS (Point of Sale)** system documentation. This document provides a detailed overview of the system architecture, database structure, security mechanism, REST APIs, and core workflows.

---

## 1. System Architecture

The project is built on a modern full-stack decoupled architecture:

```
                  ┌──────────────────────────────┐
                  │      React + Vite Client     │
                  │   (Outfit Font, Glass CSS)   │
                  └──────────────┬───────────────┘
                                 │
                            REST Calls
                        (Axios with JWT)
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │     Spring Boot Backend      │
                  │     (Port 8080 / API)        │
                  └──────┬──────────────┬────────┘
                         │              │
                    JPA/Hibernate   Image Upload
                         │              │
                         ▼              ▼
                  ┌────────────┐  ┌─────────────┐
                  │   MySQL    │  │ Cloudinary  │
                  │  Database  │  │   Service   │
                  └────────────┘  └─────────────┘
```

1. **Frontend (React + Vite):** A responsive, dark glassmorphic single-page application styled using Custom CSS and Bootstrap components. State is centralized using the React Context API.
2. **Backend (Spring Boot):** An API service that exposes endpoints for auth, catalog management, and sales transactions.
3. **Database (MySQL):** Persistent storage for users, categories, products, orders, and transaction line items.
4. **Storage (Cloudinary):** Media assets (category and product images) are uploaded to Cloudinary, and secure URLs are stored in the database.

---

## 2. Database Schema (Entities)

The application models its domain using five core JPA entities:

### A. UserEntity (`users` table)
Stores cashier and administrator records for security.
- `id` (Long, PK, Auto)
- `userId` (String, Unique UUID)
- `name` (String)
- `email` (String, Unique)
- `password` (String, BCrypt Encrypted)
- `role` (String, e.g., `ROLE_USER`, `ROLE_ADMIN`)

### B. CategoryEntity (`category` table)
Groupings for products.
- `id` (Long, PK, Auto)
- `categoryId` (String, Unique UUID)
- `name` (String, Unique)
- `description` (String)
- `imgUrl` (String)
- `imgPublicId` (String, for Cloudinary reference deletion)

### C. ItemEntity (`items` table)
Product catalog details.
- `id` (Long, PK, Auto)
- `itemId` (String, Unique UUID)
- `name` (String)
- `price` (BigDecimal)
- `description` (String)
- `imgUrl` (String)
- `imgPublicId` (String)
- `categoryEntity` (ManyToOne -> CategoryEntity via `category_id`)

### D. OrderEntity (`orders` table)
Transaction headers.
- `id` (Long, PK, Auto)
- `orderId` (String, Unique UUID)
- `customerName` (String)
- `customerPhone` (String)
- `subtotal` (BigDecimal)
- `tax` (BigDecimal, 18% GST)
- `discount` (BigDecimal)
- `total` (BigDecimal)
- `createdAt` (Timestamp)

### E. OrderItemEntity (`order_items` table)
Line item records mapping items to transactions.
- `id` (Long, PK, Auto)
- `quantity` (Integer)
- `price` (BigDecimal, price lock at checkout)
- `orderEntity` (ManyToOne -> OrderEntity via `order_id`)
- `itemEntity` (ManyToOne -> ItemEntity via `item_id`)

---

## 3. Core Workflows

### 🔐 Authentication Flow
1. Cashier enters email and password on the **Login** screen.
2. Frontend posts credentials to `/api/v1.0/login`.
3. Backend checks credentials via `AuthenticationManager`.
4. If valid, `JwtUtil` generates a token.
5. Backend returns `AuthResponse` with JWT token, role, and email.
6. Frontend saves the JWT token, role, and email in `localStorage`.
7. Subsequent Axios requests append the token under the header: `Authorization: Bearer <token>`.

### 🛍 POS Terminal Checkout Flow
1. The cashier selects category filter buttons on the **POS Terminal**.
2. Matching products load. Clicking a product adds it to the cart list.
3. Quantities are adjusted (updating pricing tallies live).
4. Enter customer's name, phone number, and any special discounts.
5. The cashier clicks **Place Order**:
   - Submits payload to `POST /api/v1.0/orders`.
   - Backend opens a database transaction (`@Transactional`).
   - Resolves each product ID, accumulates the subtotal, calculates 18% GST tax, subtracts the discount, and writes the `OrderEntity` and `OrderItemEntity` records.
   - Resets cart and issues success toast notification.

---

## 4. REST API Endpoint Catalog

| Module | Method | Route | Access | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1.0/login` | Public | `{email, password}` |
| | `POST` | `/api/v1.0/encode` | Public | `{password}` |
| **Categories**| `GET` | `/api/v1.0/categories` | Public / Cache | None |
| | `POST` | `/api/v1.0/categories` | Public (Dev) | `MultipartFormData` (category JSON + file) |
| | `DELETE`| `/api/v1.0/categories/{id}`| Public (Dev) | None |
| **Items** | `GET` | `/api/v1.0/items` | Public | None |
| | `POST` | `/api/v1.0/admin/items` | Admin JWT | `MultipartFormData` (item JSON + file) |
| | `DELETE`| `/api/v1.0/admin/items/{id}`| Admin JWT | None |
| **Orders** | `POST` | `/api/v1.0/orders` | Public / Cashier | `{customerName, customerPhone, items: [{itemId, quantity}], discount}` |
| | `GET` | `/api/v1.0/orders` | Public / Cashier | None |
| **Users** | `GET` | `/api/v1.0/admin/users` | Admin JWT | None |
| | `POST` | `/api/v1.0/admin/register` | Admin JWT | `{name, email, password, role}` |
| | `DELETE`| `/api/v1.0/admin/users/{id}`| Admin JWT | None |
| **Uploads** | `POST` | `/api/v1.0/upload` | Public | `MultipartFormData` (file) |
