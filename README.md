# 🧾 Apex POS - Full-Stack Point of Sale System

Apex POS is a premium, high-performance, and feature-rich Point of Sale (POS) system designed for retail and billing networks. Built on a modern decoupled architecture, it integrates a Spring Boot REST API backend with a responsive, light cream glassmorphic React single-page application.

---

## 🎨 Design Theme & Aesthetics

Apex POS features a customized **Light Cream Glassmorphism** interface:
* **Background:** Full-screen looping background video featuring a sleek, flowing 3D key structure.
* **Overlay:** Light cream semi-transparent cover layer (`rgba(242, 242, 238, 0.78)`).
* **Typography:** 
  * **Headings:** `Helvetica Now Display Bold` for a clean, structural, premium layout.
  * **Body:** `Inter` (weights 300 to 900) for high legibility.
* **Accent Palette:** Rich violet (`#7342E2`) and slate dark text (`#192837`) for unified styling, buttons, and badges.
* **Skeletons & Transitions:** CSS pulsing loader skeletons on data tables, product grids, category scrolls, and lists for a smooth visual experience during network operations.

---

## 🚀 Key Features

* **🔐 Authentication & Role Security:** Secure JWT token-based authentication. Roles control navigation views. Cashiers (`USER` role) have creation/deletion widgets automatically hidden, while Administrators (`ADMIN` role) enjoy full management access.
* **🛍 POS Terminal Checkout:** Cashier terminal with category filters, live cart calculations, automatic 18% GST computations, custom discounts, customer details fields, and receipt logs.
* **📊 Executive Dashboard:** Live sales intelligence showing revenue tallies, order counts, product stats, printable thermal receipts, and opaque receipt overlays to eliminate background bleed-through.
* **📂 Catalog Management (CRUD):** Product inventory and category managers integrated with Cloudinary image syncing.
* **👤 User Control (Admin Only):** Panel to register, monitor, or remove cashier and admin accounts.
* **ℹ About Us Guide:** Inside app documentation detailing system workflows, features, and quick-start guides.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite + Tailwind CSS v4 | Fast SPA styled with Helvetica/Inter typography, Framer Motion, and glassmorphism. |
| **Backend** | Spring Boot | REST API gateway exposing secured CRUD routes & transaction handlers. |
| **Security** | Spring Security + JWT | Stateless token authorization filter on incoming requests. |
| **Database** | MySQL | Persistent storage for orders, items, categories, and users. |
| **Storage** | Cloudinary CDN | High-performance image hosting and retrieval. |

---

## 🏗 System Architecture

```
                 ┌────────────────────────────────┐
                 │      React + Vite Client       │
                 │   (Helvetica/Inter, Glass CSS) │
                 └───────────────┬────────────────┘
                                 │
                            REST Calls
                         (Axios with JWT)
                                 │
                                 ▼
                 ┌────────────────────────────────┐
                 │      Spring Boot Backend       │
                 │      (Port 8080 / API)         │
                 └───────┬────────────────┬───────┘
                         │                │
                    JPA/Hibernate    Image Upload
                         │                │
                         ▼                ▼
                 ┌─────────────┐   ┌──────────────┐
                 │    MySQL    │   │  Cloudinary  │
                 │  Database   │   │   Service    │
                 └─────────────┘   └──────────────┘
```

---

## 📁 Directory Structure

```
POS/
├── backend/
│   ├── src/main/java/com/akash/BillingSoftware/
│   │   ├── config/       # Security & CORS configurations
│   │   ├── controller/   # REST Controllers (Auth, Categories, Items, Orders, Users)
│   │   ├── entity/       # JPA Entities (Category, Item, Order, OrderItem, User)
│   │   ├── filter/       # JWT request filters
│   │   ├── repo/         # JPA Repositories
│   │   ├── service/      # Service interfaces and implementations
│   │   └── util/         # JWT utility helpers
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── assets/       # Media assets
    │   ├── components/   # Shared components (Menubar, CategoryForm, ItemForm, UserForm)
    │   ├── context/      # AppContext global state
    │   ├── pages/        # Main views (Explore, Dashboard, Login, Register, About)
    │   ├── service/      # API Services (Axios wrappers)
    │   ├── App.jsx       # Route guards and routes
    │   └── index.css     # Global glassmorphism & skeleton overrides
    └── package.json
```

---

## 🔌 API Route Catalog

| Module | Method | Route | Access | Request Body / Multipart |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1.0/login` | Public | `{email, password}` |
| | `POST` | `/api/v1.0/encode` | Public | `{password}` |
| **Categories**| `GET` | `/api/v1.0/categories` | Public | None |
| | `POST` | `/api/v1.0/categories` | Public | `MultipartFormData` (category JSON + file) |
| | `DELETE`| `/api/v1.0/categories/{id}`| Public | None |
| **Items** | `GET` | `/api/v1.0/items` | Public | None |
| | `POST` | `/api/v1.0/admin/items` | Admin JWT | `MultipartFormData` (item JSON + file) |
| | `DELETE`| `/api/v1.0/admin/items/{id}`| Admin JWT | None |
| **Orders** | `POST` | `/api/v1.0/orders` | Cashier JWT | `{customerName, customerPhone, items: [{itemId, quantity}], discount}` |
| | `GET` | `/api/v1.0/orders` | Cashier JWT | None |
| **Users** | `GET` | `/api/v1.0/admin/users` | Admin JWT | None |
| | `POST` | `/api/v1.0/register` | Public | `{name, email, password, role}` |
| | `DELETE`| `/api/v1.0/admin/users/{id}`| Admin JWT | None |

---

## ⚙ Installation & Execution

### 🗄 Database Configuration
Ensure MySQL is running and a database named `billingapp` is created. Update credentials inside [application.properties](file:///c:/6th%20sem/Full%20Stack/PROJECT/POS/backend/src/main/resources/application.properties):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/billingapp?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# Cloudinary Setup
cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET
```

### 🖥 Backend Setup
Navigate to the `backend` folder and boot the server:
```bash
cd backend
mvn clean package
mvn spring-boot:run
```
The backend API is served at `http://localhost:8080/api/v1.0`.

### 🌐 Frontend Setup
Navigate to the `frontend` folder, install dependencies, and launch the dev client:
```bash
cd frontend
npm install
npm run dev
```
The web app is hosted at `http://localhost:5173`.

---

## 👨‍💻 Developed By
* **Akash Singh**
