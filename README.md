# 📝 Multi-Tenant SaaS Notes Application

A full-stack multi-tenant SaaS notes application built with **Node.js**, **Express**, **MongoDB Atlas**, **Next.js**, and **JWT authentication**. This application supports multiple tenants with strict data isolation, role-based access control, and subscription-based feature gating.

---

## 🚀 Project Objective

The goal of this project is to provide a secure SaaS Notes application where different companies (tenants) can manage their users and notes independently.

### Key Features:
- **Role-Based Access Control (RBAC):**
  - **Admin**: Manage users, upgrade subscription plans.
  - **Member**: Create, view, edit, and delete notes.
- **Subscription Plans:**
  - **Free Plan**: Maximum of 3 notes per tenant.
  - **Pro Plan**: Unlimited notes after upgrading.

---

## 🛠️ Tech Stack

### Backend:
- **Node.js** with **Express.js** for the API.
- **MongoDB Atlas** with **Mongoose** for database management.
- **JWT** for authentication and authorization.
- **CORS** for cross-origin resource sharing.

### Frontend:
- **Next.js** (React framework) for the user interface.
- **CSS** for styling.

### Deployment:
- **Vercel** for both frontend and backend hosting.

---

## 🏢 Multi-Tenancy Approach

This application uses a **shared schema with a tenant ID column**:

- Each `User` and `Note` document references a `Tenant` by its `_id`.
- All database queries are filtered by the tenant ID, ensuring strict data isolation.
- This approach is scalable and keeps the schema simple.

---

## 🌐 Deployment URLs

- **Backend (Base URL)**: [https://multi-tenant-notes-saas.vercel.app](https://multi-tenant-notes-saas.vercel.app/)
  - Health Check: `/health` → `{ "status": "ok" }`
- **Frontend**: [https://multi-tenant-notes-saas-frontend.vercel.app](https://multi-tenant-notes-saas-frontend.vercel.app/)

---

## 🔑 Test Accounts

All test accounts use the password: `password`.

| Email              | Role   | Tenant  |
|--------------------|--------|---------|
| admin@acme.test    | Admin  | Acme    |
| user@acme.test     | Member | Acme    |
| admin@globex.test  | Admin  | Globex  |
| user@globex.test   | Member | Globex  |

---

## 📌 Features

### Authentication & Authorization:
- JWT-based login and authentication middleware.
- Role-based access control (Admin vs Member).

### Multi-Tenancy:
- Tenant isolation ensures no cross-tenant access.
- Each tenant has its own set of users and notes.

### Subscription Plans:
- **Free Plan**: Maximum of 3 notes per tenant.
- **Pro Plan**: Unlimited notes after upgrading.
- Upgrade endpoint: `POST /tenants/:tenantId/upgrade` (Admin only).

### Notes Management:
- Create, Read, Update, and Delete (CRUD) operations for notes.
- Notes are scoped to the tenant.

### User Management:
- Admins can invite users to their tenant.
- Default password for invited users is `password`.

---

## 🖥️ Run Locally

### 1. Clone the Repository:
```bash
git clone https://github.com/yourusername/Multi-Tenant-Notes-Saas.git
cd Multi-Tenant-Notes-Saas
```

### 2. Setup Backend:
```bash
cd backend
npm install
cp .env.example .env   # Add MongoDB URI & JWT secret
npm run dev
```
The backend will run at: `http://localhost:5000`

### 3. Setup Frontend:
```bash
cd frontend
npm install
cp .env.example .env   # Set NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```
The frontend will run at: `http://localhost:3000`

---

## 📂 Folder Structure

```
Multi-Tenant-Notes-Saas/
│
├── backend/       # Express.js + MongoDB + JWT API
│   ├── src/       # Source code for the backend
│   │   ├── config/  # Database and environment configuration
│   │   ├── controllers/  # API controllers
│   │   ├── middleware/   # Authentication and error handling middleware
│   │   ├── models/       # Mongoose models (User, Note, Tenant)
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   ├── .env.example      # Environment variable example file
│   └── server.js         # Entry point for the backend
│
├── frontend/      # Next.js + CSS frontend
│   ├── components/  # Reusable React components
│   ├── lib/         # API utility functions
│   ├── pages/       # Next.js pages (Dashboard, Login, etc.)
│   ├── public/      # Static assets
│   ├── styles/      # CSS styles
│   ├── .env.example # Environment variable example file
│   └── next.config.js # Next.js configuration
│
└── README.md       # Project documentation
```

---

## ✅ Health Check

- **GET** `/health` → `{ "status": "ok" }`

---

## 🖋️ License

This project was created for the **Yardstick Internship Assignment** evaluation. It is not licensed for production use.
