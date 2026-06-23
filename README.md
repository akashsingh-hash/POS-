# 🧾 Apex POS - Full-Stack Point of Sale System

Apex POS is a premium, high-performance, and feature-rich Point of Sale (POS) system designed for retail and billing networks. Built on a modern decoupled architecture, it integrates a Spring Boot REST API backend with a responsive, dark glassmorphic React single-page application.

---

## 🎨 Design Theme & Aesthetics

Apex POS features a state-of-the-art **Dark Glassmorphism** interface:
* **Background:** Rich radial pitch-black gradient (`#000000` to `#0d0d0d`).
* **Components:** Dark charcoal glass panels with a translucent border and backdrop blur.
* **Accent Palette:** High-contrast, neon Coral Red-Orange (`#ff5a53`) highlights for CTAs, active states, and navigation cues.
* **Micro-Animations:** Fluid 3D perspective hover cards and floating effects.

---

## 🚀 Key Features

* **🔐 Authentication & Role Security:** Secure JWT token-based authentication. Roles (`ROLE_USER` for Cashiers, `ROLE_ADMIN` for Admins) control dashboard views and block access to restricted routes.
* **🛍 POS Terminal Checkout:** Responsive cashier terminal featuring category filters, live cart management, auto 18% GST tax computations, customizable discounts, and customer details checkout.
* **📊 Executive Dashboard:** Real-time business intelligence showcasing total revenue, completed sales count, catalog item tallies, transaction logs, and printable modal invoices.
* **📂 Catalog Management (CRUD):** Live product inventory and category management sheets with Cloudinary image hosting integrations.
* **👤 User Control (Admin Only):** Direct administrative panels to add, register, or delete cashier/admin accounts.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast SPA user interface styled with Outfit typography and custom glass CSS |
| **Backend** | Spring Boot | REST API gateway exposing secured CRUD routes & transaction handlers |
| **Security** | Spring Security + JWT | Stateless token authorization filter on incoming requests |
| **Database** | MySQL | Persistent storage for orders, items, categories, and users |
| **Storage** | Cloudinary CDN | High-performance image hosting and retrieval |

---

## 🏗 System Architecture

```
                 ┌────────────────────────────────┐
                 │      React + Vite Client       │
                 │    (Outfit Font, Glass CSS)    │
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
    │   ├── components/   # Shared components (Menubar, CategoryForm, RecieptPopup)
    │   ├── context/      # AppContext global state
    │   ├── pages/        # Main views (Explore, Dashboard, Login, Register)
    │   ├── service/      # API Services (Axios wrappers)
    │   ├── App.jsx       # Route guards
    │   └── index.css     # Global glassmorphism overrides
    └── package.json
```

---

## 🔌 API Route Catalog

| Module | Method | Route | Access | Request Body / Multipart |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1.0/login` | Public | `{email, password}` |
| | `POST` | `/api/v1.0/encode` | Public | `{password}` |
| **Categories**| `GET` | `/api/v1.0/categories` | Public | None |
| | `POST` | `/api/v1.0/admin/categories` | Admin JWT | `MultipartFormData` (category JSON + file) |
| | `DELETE`| `/api/v1.0/admin/categories/{id}`| Admin JWT | None |
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
